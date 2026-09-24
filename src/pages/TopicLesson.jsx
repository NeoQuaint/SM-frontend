import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useNeo } from '../context/NeoContext';
import NeoVoiceIndicator from '../components/NeoVoiceIndicator';
import AnimatedGraph from '../components/AnimatedGraph';
import NeoTeacher from '../components/NeoTeacher';
import NeoDemo from '../components/NeoDemo';
import { mathToSpoken } from '../utils/speakHelpers';
import { FaArrowLeft, FaCheck, FaArrowRight, FaSpinner, FaRedo, FaCamera, FaSync, FaTimes, FaBook } from 'react-icons/fa';
import '../css/TopicLesson.css';

// ==========================================
// NEO TEACHING CONTENT (VISUAL-FIRST)
// ==========================================
const TeachingContent = {
  sections: [
    {
      type: 'heading',
      text: "Let's look at this function together.",
    },
    {
      type: 'scene',
      sceneId: 'function-intro',
      steps: 4,
      stepDuration: 3400,
      config: {
        a: 1,
        b: 2,
        c: -4,
        equation: 'f(x) = 2^x - 4',
        asymptote: -4,
        xIntercepts: [2],
      },
      caption: 'This is f(x) = 2^x - 4. Watch the shape.',
    },
    {
      type: 'concept',
      label: 'The key idea',
      text: 'The "2 to the power x" makes it grow fast. The minus 4 pushes everything down 4 units.',
    },
    {
      type: 'concept',
      label: 'Now you try',
      text: 'Same shape. Different number. What if it was 2 to the power x minus 8?',
    },
  ],
};

// ==========================================
// DEMO CONTENT — first question, teacher shows the way
// ==========================================
const DemoContent = {
  equation: 'f(x) = 2^x - 8',
  question: 'Question: Write down the equation of the asymptote of f.',
  answer: 'y = -8',
  graphConfig: {
    functionType: 'exponential',
    equation: 'f(x) = 2^x - 8',
    a: 1,
    b: 2,
    c: -8,
    asymptote: -8,
    xIntercepts: [3],
    showAsymptote: true,
    showXIntercept: true,
    showYIntercept: true,
  },
  steps: [
    {
      label: 'Step 1',
      text: 'Here is the function: 2 to the power x, minus 8.',
    },
    {
      label: 'Step 2',
      text: 'The asymptote is always the number at the end. That is minus 8.',
    },
    {
      label: 'Step 3',
      text: 'So the graph hugs the line y equal minus 8 without ever touching it.',
    },
  ],
};

// ==========================================
// FUNCTIONS & GRAPHS - MASTER QUESTION BANK
// ==========================================
const QuestionBank = {
  tier1: [
    {
      id: 'T1A',
      source: 'Practice • Apply what you just learned',
      functionText: 'f(x) = 2^x - 8',
      domain: 'x ∈ [-2; 4)',
      parts: [
        {
          part: '1.1',
          prompt: 'Write down the equation of the asymptote of f.',
          answer: 'y = -8',
          marks: 1,
          formulas: [
            'You just saw: the number added at the end is the asymptote',
          ],
          graphConfig: {
            functionType: 'exponential', a: 1, b: 2, c: -8,
            asymptote: -8, showAsymptote: true, showXIntercept: false,
            showYIntercept: true,
          },
        },
        {
          part: '1.2',
          prompt: 'Determine the coordinates of the x-intercept of f.',
          answer: '(3; 0)',
          marks: 2,
          formulas: [
            'X-intercept: put y = 0 and solve for x',
            '2 to the power x equals 8, so x equals 3',
          ],
          graphConfig: {
            functionType: 'exponential', a: 1, b: 2, c: -8,
            asymptote: -8, showAsymptote: true, showXIntercept: true,
            xIntercepts: [3], showYIntercept: true,
          },
        },
      ],
    },
    {
      id: 'T1B',
      source: '2023 NSC P1, Q4.1-4.3',
      functionText: 'f(x) = 2^x - 4',
      domain: 'x ∈ [-2; 4)',
      parts: [
        {
          part: '4.1',
          prompt: 'Write down the equation of the asymptote of f.',
          answer: 'y = -4',
          marks: 1,
          formulas: [
            'Asymptote: horizontal line the graph approaches',
            'Look at the dotted line on the graph',
          ],
          graphConfig: {
            functionType: 'exponential', a: 1, b: 2, c: -4,
            asymptote: -4, showAsymptote: true, showXIntercept: false,
            showYIntercept: true, closedDotAt: -2, openDotAt: 4,
          },
        },
        {
          part: '4.2',
          prompt: 'Determine the coordinates of B (the x-intercept of f).',
          answer: 'B(2; 0)',
          marks: 2,
          formulas: [
            'X-intercept: Put y = 0 and solve for x',
          ],
          graphConfig: {
            functionType: 'exponential', a: 1, b: 2, c: -4,
            asymptote: -4, showAsymptote: true, showXIntercept: true,
            xIntercepts: [2], pointAt: { x: 2, y: 0, label: 'B' },
          },
        },
        {
          part: '4.3',
          prompt: 'Determine the equation of k, passing through A (y-intercept) and B.',
          answer: 'k(x) = 1.5x - 3',
          marks: 4,
          formulas: [
            'Gradient: m = (y₂ - y₁)/(x₂ - x₁)',
            'Line equation: y = mx + c',
          ],
          graphConfig: {
            functionType: 'exponential', a: 1, b: 2, c: -4,
            asymptote: -4, showAsymptote: true, showXIntercept: true,
            showYIntercept: true, xIntercepts: [2],
            showLineK: true, lineK: { a: 1.5, c: -3 },
          },
        },
      ],
    },
  ],

  tier2: [
    {
      id: 'T2A',
      source: '2023 NSC P1, Q4.4-4.7',
      functionText: 'f(x) = 2^x - 4',
      domain: 'x ∈ [-2; 4)',
      parts: [
        {
          part: '4.4',
          prompt: 'Calculate the vertical distance between k and f at x = 1.',
          answer: '0.5 units',
          marks: 2,
          formulas: [
            'Distance = |f(x) - k(x)|',
            'Substitute x = 1 into both',
          ],
          graphConfig: {
            functionType: 'exponential', a: 1, b: 2, c: -4,
            asymptote: -4, showAsymptote: true, showXIntercept: true,
            showYIntercept: true, xIntercepts: [2],
            showLineK: true, lineK: { a: 1.5, c: -3 },
          },
        },
        {
          part: '4.5',
          prompt: 'Write down the equation of g if g(x) = f(x) + 4.',
          answer: 'g(x) = 2^x',
          marks: 1,
          formulas: [
            'Adding shifts the graph UP by that amount',
          ],
          graphConfig: {
            functionType: 'exponential', a: 1, b: 2, c: 0,
            asymptote: 0, showAsymptote: true, showXIntercept: false,
            showYIntercept: true,
          },
        },
        {
          part: '4.6',
          prompt: 'Write down the equation of g⁻¹ in the form y = ...',
          answer: 'y = log₂(x)',
          marks: 2,
          formulas: [
            'Inverse: Swap x and y, then solve for y',
          ],
          graphConfig: {
            functionType: 'exponential', a: 1, b: 2, c: 0,
            asymptote: 0, showAsymptote: true, showXIntercept: false,
            showYIntercept: true,
          },
        },
      ],
    },
    {
      id: 'T2B',
      source: '2024 NSC P1, Q4.1-4.4',
      functionText: 'f(x) = a^x - 1, a > 0',
      domain: 'x ∈ R',
      parts: [
        {
          part: '4.1',
          prompt: 'Calculate the value of a if B(2; -5/9) lies on f.',
          answer: 'a = 2/3',
          marks: 3,
          formulas: [
            'Substitute the point into the equation',
          ],
          graphConfig: {
            functionType: 'exponential', a: 2/3, b: 0, c: -1,
            asymptote: -1, showAsymptote: true, showXIntercept: false,
            showYIntercept: true,
          },
        },
        {
          part: '4.2',
          prompt: 'Write down the range of f.',
          answer: 'y > -1',
          marks: 1,
          formulas: [
            'Range: all y values the graph can take',
            'The graph is always ABOVE the asymptote',
          ],
          graphConfig: {
            functionType: 'exponential', a: 2/3, b: 0, c: -1,
            asymptote: -1, showAsymptote: true, showXIntercept: false,
            showYIntercept: true,
          },
        },
      ],
    },
  ],

  tier3: [
    {
      id: 'T3A',
      source: '2022 NSC P1, Q4.2.1-4.2.5',
      functionText: 'f(x) = x² - 4x - 5',
      domain: 'x ∈ R',
      parts: [
        {
          part: '4.2.1',
          prompt: 'Write down the y-coordinate of C (y-intercept).',
          answer: 'y = -5',
          marks: 1,
          formulas: [
            'Y-intercept: Put x = 0',
          ],
          graphConfig: {
            functionType: 'parabola', a: 1, b: -4, c: -5,
            showXIntercept: true, showYIntercept: true,
            xIntercepts: [-1, 5],
          },
        },
        {
          part: '4.2.2',
          prompt: 'Determine the coordinates of D (turning point of f).',
          answer: 'D(2; -9)',
          marks: 3,
          formulas: [
            'Turning point: x = -b/(2a)',
            'Substitute x back to find y',
          ],
          graphConfig: {
            functionType: 'parabola', a: 1, b: -4, c: -5,
            showXIntercept: true, showYIntercept: true,
            xIntercepts: [-1, 5], showVertex: true,
          },
        },
      ],
    },
    {
      id: 'T3B',
      source: '2025 NSC P1, Q5.1-5.6',
      functionText: 'f(x) = -0.5x² + 3x + 3.5',
      domain: 'x ∈ R',
      parts: [
        {
          part: '5.1',
          prompt: 'Write down the domain of g.',
          answer: 'x ≠ 3',
          marks: 1,
          formulas: [
            'Domain: all x values EXCEPT where denominator = 0',
          ],
          graphConfig: {
            functionType: 'parabola', a: -0.5, b: 3, c: 3.5,
            showXIntercept: true, showYIntercept: true,
            showVertex: true,
          },
        },
        {
          part: '5.2',
          prompt: 'Write down the range of f.',
          answer: 'y ≤ 8',
          marks: 2,
          formulas: [
            'Range: all y values from the turning point',
            'For a downward parabola, y ≤ vertex y-value',
          ],
          graphConfig: {
            functionType: 'parabola', a: -0.5, b: 3, c: 3.5,
            showXIntercept: true, showYIntercept: true,
            showVertex: true,
          },
        },
      ],
    },
  ],

  tier4: [
    {
      id: 'T4A',
      source: '2024 NSC P1, Q6.1-6.4',
      functionText: 'f(x) = -x² + 4x + 5',
      domain: 'x ∈ R',
      parts: [
        {
          part: '6.1',
          prompt: 'Calculate coordinates of B (turning point of f).',
          answer: 'B(2; 9)',
          marks: 3,
          formulas: [
            'Turning point: x = -b/(2a)',
            'Substitute x back to find y',
          ],
          graphConfig: {
            functionType: 'parabola', a: -1, b: 4, c: 5,
            showXIntercept: true, showYIntercept: true,
            xIntercepts: [-1, 5], showVertex: true,
          },
        },
        {
          part: '6.3',
          prompt: 'Calculate the maximum length of EH (vertical distance for f > g).',
          answer: '4 units',
          marks: 4,
          formulas: [
            'Distance = f(x) - g(x)',
            'Maximum at vertex: x = -b/(2a)',
          ],
          graphConfig: {
            functionType: 'parabola', a: -1, b: 4, c: 5,
            showXIntercept: true, showYIntercept: true,
            xIntercepts: [-1, 5], showVertex: true,
            showLineK: true, lineK: { a: 2, c: 2 },
          },
        },
      ],
    },
    {
      id: 'T4B',
      source: '2021 NSC P1, Q7.4-7.5',
      functionText: 'f(x) = (x + 4)(x - 6)',
      domain: 'x ∈ R',
      parts: [
        {
          part: '7.4',
          prompt: 'Calculate gradient of AE.',
          answer: 'm = 0.25',
          marks: 2,
          formulas: [
            'Gradient: m = tan(θ)',
            'Gradient: m = (y₂ - y₁)/(x₂ - x₁)',
          ],
          graphConfig: {
            functionType: 'parabola', a: 1, b: -2, c: -24,
            showXIntercept: true, showYIntercept: true,
            xIntercepts: [-4, 6], showVertex: true,
          },
        },
      ],
    },
  ],

  tier5: [
    {
      id: 'T5A',
      source: '2025 NSC P1, Q9.1-9.4',
      functionText: 'f(x) = x³ - 8x² + 5x + 14',
      domain: 'x ∈ R',
      parts: [
        {
          part: '9.1',
          prompt: 'Calculate coordinates of E (local minimum).',
          answer: 'E(5; -36)',
          marks: 4,
          formulas: [
            "Find derivative: f'(x)",
            "Set f'(x) = 0 and solve",
            'Test which x gives a minimum',
          ],
          graphConfig: {
            functionType: 'cubic', a: 1, b: -8, c: 5,
            showXIntercept: true, showYIntercept: true,
          },
        },
        {
          part: '9.2',
          prompt: 'For which values of x is f concave down?',
          answer: 'x < 8/3',
          marks: 2,
          formulas: [
            "Concave down: f''(x) < 0",
            'Find the SECOND derivative',
          ],
          graphConfig: {
            functionType: 'cubic', a: 1, b: -8, c: 5,
            showXIntercept: true, showYIntercept: true,
          },
        },
      ],
    },
    {
      id: 'T5B',
      source: '2024 NSC P1, Q9.1-9.4',
      functionText: 'Cubic with turning points A(1; 9) and B(2.5; 8)',
      domain: 'x ∈ R',
      parts: [
        {
          part: '9.1',
          prompt: 'For which values of x is f decreasing?',
          answer: 'x ∈ (1; 2.5)',
          marks: 2,
          formulas: [
            "Decreasing where f'(x) < 0",
            'Between the turning points',
          ],
          graphConfig: {
            functionType: 'cubic', a: 1, b: -8, c: 5,
            showXIntercept: true, showYIntercept: true,
          },
        },
        {
          part: '9.2',
          prompt: "Write down the x-intercepts of f'.",
          answer: 'x = 1 and x = 2.5',
          marks: 1,
          formulas: [
            "X-intercepts of f' are the turning points of f",
          ],
          graphConfig: {
            functionType: 'cubic', a: 1, b: -8, c: 5,
            showXIntercept: true, showYIntercept: true,
          },
        },
      ],
    },
  ],
};

const TopicLesson = () => {
  const { subject, topicId } = useParams();
  const navigate = useNavigate();
  const { neoMessage, setNeoMessage } = useNeo();
  const fileInputRef = useRef(null);
  const audioRef = useRef(null);
  const audioUnlockedRef = useRef(false);

  const [currentTier, setCurrentTier] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [aiCorrection, setAiCorrection] = useState('');
  const [aiMistake, setAiMistake] = useState('');
  const [aiTeaching, setAiTeaching] = useState('');
  const [showGraphInCorrection, setShowGraphInCorrection] = useState(false);
  const [showAnotherWay, setShowAnotherWay] = useState(false);
  const [alternativeExplanation, setAlternativeExplanation] = useState('');
  const [alternativeCount, setAlternativeCount] = useState(0);
  const [isGraphEnlarged, setIsGraphEnlarged] = useState(false);
  const [studentImage, setStudentImage] = useState(null);
  const [markingView, setMarkingView] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);
  const [isCheckingAccess, setIsCheckingAccess] = useState(true);
  const [showTeaching, setShowTeaching] = useState(true);
  const [showDemo, setShowDemo] = useState(true);

  const topicName = 'Functions and Graphs';
  const API_URL = 'https://smartclass-wlgb.onrender.com';

  const tierKey = `tier${currentTier}`;
  const tierQuestions = QuestionBank[tierKey] || QuestionBank.tier1;
  const activeQuestionSet = tierQuestions[currentQuestionIndex % tierQuestions.length];
  const currentQuestion = activeQuestionSet?.parts[currentPartIndex] || null;

  // ==================== ACCESS CHECK ====================
  useEffect(() => {
    const checkAccess = () => {
      const subscription = JSON.parse(localStorage.getItem('smartclass_subscription') || 'null');
      const hasActiveSub = subscription?.active === true;
      const currentPackage = subscription?.package || null;

      if (hasActiveSub) {
        if (currentPackage === 'Basic') {
          const allowedSubjects = JSON.parse(localStorage.getItem('smartclass_basic_subjects') || '[]');
          if (allowedSubjects.includes(subject)) {
            setAccessGranted(true);
          } else {
            navigate('/paywall');
            return;
          }
        } else {
          setAccessGranted(true);
        }
      } else {
        const claimedRaw = localStorage.getItem('smartclass_claimed_free_topic');

        if (claimedRaw) {
          const claimed = JSON.parse(claimedRaw);
          if (claimed.subject === subject && claimed.topicId === topicId) {
            setAccessGranted(true);
          } else {
            navigate('/paywall');
            return;
          }
        } else {
          navigate(`/subjects/${subject}`);
          return;
        }
      }

      setIsCheckingAccess(false);
    };

    checkAccess();
  }, [subject, topicId, navigate]);

  // Unlock audio
  useEffect(() => {
    const unlockAudio = () => {
      if (audioUnlockedRef.current) return;
      audioUnlockedRef.current = true;
      const silentAudio = new Audio('data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAABHgD///////////////////////////////////////8AAAA8TEFNRTMuOThyAc0AAAAAAAAAABSAJAChoQAAgAAAJQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
      silentAudio.volume = 0;
      silentAudio.play().then(() => { silentAudio.pause(); }).catch(() => {});
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
    };
    window.addEventListener('click', unlockAudio);
    window.addEventListener('touchstart', unlockAudio);
    return () => {
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
    };
  }, []);

  // Speak — converts math symbols, returns Promise with real audio duration (ms)
  const speakText = (text) => {
    return new Promise((resolve) => {
      try {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }

        const spokenText = mathToSpoken(text);
        const cleanText = spokenText.replace(/[^a-zA-Z0-9\s.,!?()+\-']/g, '');
        if (!cleanText.trim()) {
          resolve(0);
          return;
        }

        setIsSpeaking(true);

        fetch(`${API_URL}/api/neo/speak`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: cleanText }),
        })
          .then((response) => {
            if (!response.ok) throw new Error('Speak failed');
            return response.blob();
          })
          .then((audioBlob) => {
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            audioRef.current = audio;
            audio.volume = 1.0;

            audio.addEventListener('loadedmetadata', () => {
              resolve(audio.duration * 1000);
            });

            audio.onended = () => {
              URL.revokeObjectURL(audioUrl);
              audioRef.current = null;
              setIsSpeaking(false);
            };

            audio.onerror = () => {
              URL.revokeObjectURL(audioUrl);
              audioRef.current = null;
              setIsSpeaking(false);
              resolve(0);
            };

            audio.play().catch(() => {
              setIsSpeaking(false);
              resolve(0);
            });
          })
          .catch((error) => {
            console.error('Voice error:', error);
            setIsSpeaking(false);
            resolve(0);
          });
      } catch (error) {
        console.error('Voice error:', error);
        setIsSpeaking(false);
        resolve(0);
      }
    });
  };

  // Welcome — after teaching AND demo are done
  useEffect(() => {
    if (accessGranted && !showTeaching && !showDemo) {
      const userData = JSON.parse(localStorage.getItem('smartclass_user') || '{}');
      const firstName = userData.fullName?.split(' ')[0] || 'there';
      const welcomeMsg = `${firstName}, it's your turn now. Type your answer when ready.`;
      setNeoMessage(welcomeMsg);
      setTimeout(() => speakText(welcomeMsg), 800);
    }
    return () => { if (audioRef.current) audioRef.current.pause(); };
  }, [accessGranted, showTeaching, showDemo]);

  // Check typed answer
  const checkTypedAnswer = async () => {
    if (!typedAnswer.trim() || !currentQuestion) return;
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/neo/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Compare the student's answer to the memorandum.
          
          Student's answer: "${typedAnswer.trim()}"
          Correct answer: ${currentQuestion.answer}
          
          Accept equivalent forms.
          
          If CORRECT:
          "CORRECT: [3 words max]"
          
          If WRONG:
          "INCORRECT: [what they wrote vs correct]
          WHY: [ONE sentence]
          FIX: [ONE sentence]
          AGAIN: [Try again!]"`,
          subject,
          userId: 'student',
        })
      });

      const data = await response.json();
      const reply = data.reply || '';

      if (reply.startsWith('CORRECT:')) {
        setIsCorrect(true);
        const praise = "Your answer is correct! Great job! Now let's do the next question.";
        setAiCorrection(praise);
        setNeoMessage('✅ ' + praise);
        speakText(praise);
      } else {
        setIsCorrect(false);
        const incorrectMatch = reply.match(/INCORRECT:\s*([^\n]+)/);
        const mistakeMatch = reply.match(/WHY:\s*([^\n]+)/) || reply.match(/MISTAKE:\s*([^\n]+)/);
        const teachingMatch = reply.match(/FIX:\s*([^\n]+)/) || reply.match(/TEACHING:\s*([\s\S]+)/);

        setAiCorrection(incorrectMatch ? incorrectMatch[1].trim() : '');
        setAiMistake(mistakeMatch ? mistakeMatch[1].trim() : '');
        setAiTeaching(teachingMatch ? teachingMatch[1].trim() : '');
        setShowGraphInCorrection(true);

        const speakMsg = teachingMatch ? teachingMatch[1].trim() : '';
        if (speakMsg) {
          setNeoMessage(speakMsg);
          speakText(speakMsg);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setNeoMessage('Failed to check. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Check photo answer
  const checkPhotoAnswer = async (imageBase64) => {
    if (!currentQuestion) return;
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/neo/vision`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64,
          subject,
          message: `QUESTION: ${currentQuestion.prompt}
          Correct answer: ${currentQuestion.answer}
          
          Compare the student's answer.
          
          If CORRECT: "CORRECT: [3 words max]"
          If WRONG: "INCORRECT: [what they wrote vs correct]
          WHY: [ONE sentence]
          FIX: [ONE sentence]"
          If UNCLEAR: "UNCLEAR"`,
        })
      });

      const data = await response.json();
      const reply = data.reply || '';

      if (reply.startsWith('CORRECT:')) {
        setIsCorrect(true);
        const praise = "Your answer is correct! Great job! Now let's do the next question.";
        setAiCorrection(praise);
        setNeoMessage('✅ ' + praise);
        speakText(praise);
        setMarkingView(false);
      } else if (reply.startsWith('UNCLEAR')) {
        setNeoMessage("I can't read that. Please type your answer instead.");
        speakText("I can't read that. Please type your answer instead.");
        setIsCorrect(null);
        setMarkingView(false);
      } else {
        setIsCorrect(false);
        const incorrectMatch = reply.match(/INCORRECT:\s*([^\n]+)/);
        const mistakeMatch = reply.match(/WHY:\s*([^\n]+)/) || reply.match(/MISTAKE:\s*([^\n]+)/);
        const teachingMatch = reply.match(/FIX:\s*([^\n]+)/) || reply.match(/TEACHING:\s*([\s\S]+)/);

        setAiCorrection(incorrectMatch ? incorrectMatch[1].trim() : '');
        setAiMistake(mistakeMatch ? mistakeMatch[1].trim() : '');
        setAiTeaching(teachingMatch ? teachingMatch[1].trim() : '');
        setShowGraphInCorrection(true);
        setMarkingView(false);

        const speakMsg = teachingMatch ? teachingMatch[1].trim() : '';
        if (speakMsg) {
          setNeoMessage(speakMsg);
          speakText(speakMsg);
        }
      }
    } catch (error) {
      console.error('Photo error:', error);
      setNeoMessage('Failed to check. Try typing your answer.');
      setMarkingView(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCameraClick = () => fileInputRef.current?.click();

  const handleImageCapture = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setMarkingView(true);

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result.split(',')[1];
      await checkPhotoAnswer(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleAnotherApproach = async () => {
    if (alternativeCount >= 2) return;
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/neo/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `The student doesn't understand. Give ONE short alternative explanation.
          
          Question: ${currentQuestion.prompt}
          
          MAX 2 SENTENCES. Different analogy. Keep it SHORT.`,
          subject,
          userId: 'student',
        })
      });

      const data = await response.json();
      const reply = data.reply || '';

      setAlternativeExplanation(reply);
      setShowAnotherWay(true);
      setAlternativeCount(prev => prev + 1);
      setNeoMessage(reply);
      speakText(reply);
    } catch (error) {
      console.error('Alternative error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleGraphEnlarge = () => setIsGraphEnlarged(!isGraphEnlarged);

  const handleProceed = () => {
    setTypedAnswer('');
    setAiCorrection('');
    setAiMistake('');
    setAiTeaching('');
    setShowGraphInCorrection(false);
    setShowAnotherWay(false);
    setAlternativeExplanation('');
    setAlternativeCount(0);
    setIsGraphEnlarged(false);
    setIsCorrect(null);
    setStudentImage(null);
    setMarkingView(false);

    if (showDemo) setShowDemo(false);

    if (isCorrect) {
      if (currentPartIndex < activeQuestionSet.parts.length - 1) {
        setCurrentPartIndex(currentPartIndex + 1);
        const nextMsg = `Now let's do the next part.`;
        setNeoMessage(nextMsg);
        speakText(nextMsg);
      } else {
        if (currentTier < 5) {
          const nextTier = currentTier + 1;
          setCurrentTier(nextTier);
          setCurrentPartIndex(0);
          setCurrentQuestionIndex(0);
          const userData = JSON.parse(localStorage.getItem('smartclass_user') || '{}');
          const firstName = userData.fullName?.split(' ')[0] || 'there';
          const doneMsg = `${firstName}, you've mastered Tier ${currentTier}! Moving to Tier ${nextTier}!`;
          setNeoMessage(doneMsg);
          speakText(doneMsg);
        } else {
          const userData = JSON.parse(localStorage.getItem('smartclass_user') || '{}');
          const firstName = userData.fullName?.split(' ')[0] || 'there';
          const doneMsg = `${firstName}, you've completed ALL of Functions and Graphs! You're ready for the exam!`;
          setNeoMessage(doneMsg);
          speakText(doneMsg);
          setTimeout(() => navigate(`/subjects/${subject}`), 3000);
        }
      }
    } else {
      const nextIndex = (currentQuestionIndex + 1) % tierQuestions.length;
      setCurrentQuestionIndex(nextIndex);
      setCurrentPartIndex(0);

      const userData = JSON.parse(localStorage.getItem('smartclass_user') || '{}');
      const firstName = userData.fullName?.split(' ')[0] || 'there';
      const msg = `${firstName}, let's try a different question. You've got this!`;
      setNeoMessage(msg);
      speakText(msg);
    }
  };

  if (isCheckingAccess) {
    return <div className="tl-loading"><div className="tl-spinner"></div></div>;
  }

  if (!accessGranted) {
    return <div className="tl-loading"><div className="tl-spinner"></div></div>;
  }

  const avatarMap = { 'AVO': '/AVO.png', 'CAT': '/CAT.png', 'STRAW': '/STRAW.png', 'ORANGE': '/ORANGE.png', 'DOG': '/DOG.png' };
  const userData = JSON.parse(localStorage.getItem('smartclass_user') || '{}');

  // ==========================================
  // PHASE 1: TEACHING
  // ==========================================
  if (showTeaching) {
    return (
      <div className="tl-app">
        <header className="tl-header">
          <button className="tl-back" onClick={() => navigate(`/subjects/${subject}`)}>
            <FaArrowLeft /> {topicName}
          </button>
          <div className="tl-progress-mini">
            <div className="tl-progress-bar-mini">
              <div className="tl-progress-fill-mini" style={{ width: '15%' }}></div>
            </div>
            <span className="tl-progress-text-mini">Teaching</span>
          </div>
          <NeoVoiceIndicator neoMessage={neoMessage} isSpeaking={isSpeaking} />
        </header>

        <NeoTeacher
          content={TeachingContent}
          avatarSrc={avatarMap[userData.avatar] || '/AVO.png'}
          onSpeak={speakText}
          onComplete={() => setShowTeaching(false)}
        />
      </div>
    );
  }

  // ==========================================
  // PHASE 2: DEMO
  // ==========================================
  if (showDemo) {
    return (
      <div className="tl-app">
        <header className="tl-header">
          <button className="tl-back" onClick={() => navigate(`/subjects/${subject}`)}>
            <FaArrowLeft /> {topicName}
          </button>
          <div className="tl-progress-mini">
            <div className="tl-progress-bar-mini">
              <div className="tl-progress-fill-mini" style={{ width: '30%' }}></div>
            </div>
            <span className="tl-progress-text-mini">Watch Neo</span>
          </div>
          <NeoVoiceIndicator neoMessage={neoMessage} isSpeaking={isSpeaking} />
        </header>

        <NeoDemo
          demo={DemoContent}
          onSpeak={speakText}
          onComplete={() => setShowDemo(false)}
        />
      </div>
    );
  }

  // ==========================================
  // PHASE 3: PRACTICE
  // ==========================================
  if (!currentQuestion) {
    return <div className="tl-loading"><div className="tl-spinner"></div></div>;
  }

  const isFourPlusMarks = currentQuestion.marks >= 4;

  return (
    <div className="tl-app">
      <header className="tl-header">
        <button className="tl-back" onClick={() => navigate(`/subjects/${subject}`)}>
          <FaArrowLeft /> {topicName}
        </button>
        <div className="tl-progress-mini">
          <div className="tl-progress-bar-mini">
            <div className="tl-progress-fill-mini" style={{ width: `${(currentTier / 5) * 100}%` }}></div>
          </div>
          <span className="tl-progress-text-mini">Tier {currentTier}/5</span>
        </div>
        <NeoVoiceIndicator neoMessage={neoMessage} isSpeaking={isSpeaking} />
      </header>

      {neoMessage && (
        <div className="tl-neo-message">
          <div className="tl-neo-wave">
            <span className="wave-bar"></span><span className="wave-bar"></span>
            <span className="wave-bar"></span><span className="wave-bar"></span>
            <span className="wave-bar"></span>
          </div>
          <p>{neoMessage}</p>
        </div>
      )}

      <main className="tl-main">
        <div className="tl-equation-section">
          <span className="tl-equation-label">
            Tier {currentTier} • {activeQuestionSet.source} • Part {currentQuestion.part} • {currentQuestion.marks} mark{currentQuestion.marks > 1 ? 's' : ''}
          </span>

          <div className="tl-equation-card">
            <h1 className="tl-equation-text">{activeQuestionSet.functionText}</h1>
            <p className="tl-equation-instruction">{currentQuestion.prompt}</p>
          </div>

          {currentQuestion.graphConfig && (
            <div className="tl-graph-animation">
              <AnimatedGraph
                functionType={currentQuestion.graphConfig.functionType}
                equation={activeQuestionSet.functionText}
                a={currentQuestion.graphConfig.a || 1}
                b={currentQuestion.graphConfig.b || 2}
                c={currentQuestion.graphConfig.c || -4}
                showAsymptote={currentQuestion.graphConfig.showAsymptote}
                asymptote={currentQuestion.graphConfig.asymptote}
                showXIntercept={currentQuestion.graphConfig.showXIntercept}
                showYIntercept={currentQuestion.graphConfig.showYIntercept}
                xIntercepts={currentQuestion.graphConfig.xIntercepts || []}
                showLineK={currentQuestion.graphConfig.showLineK}
                lineK={currentQuestion.graphConfig.lineK}
                closedDotAt={currentQuestion.graphConfig.closedDotAt}
                openDotAt={currentQuestion.graphConfig.openDotAt}
                pointAt={currentQuestion.graphConfig.pointAt}
              />
            </div>
          )}

          {currentQuestion.formulas && currentQuestion.formulas.length > 0 && (
            <div className="tl-formulas-panel">
              <span className="tl-formulas-title"><FaBook /> Formulas</span>
              {currentQuestion.formulas.map((formula, i) => (
                <div key={i} className="tl-formula-item">{formula}</div>
              ))}
            </div>
          )}

          {isCorrect === false && (
            <div className="tl-correction-panel">
              <span className="tl-panel-label">Neo's Correction</span>
              <div className="tl-wrong-msg">
                {showGraphInCorrection && currentQuestion.graphConfig && (
                  <div
                    className={`tl-correction-graph-corner ${isGraphEnlarged ? 'enlarged' : ''}`}
                    onClick={toggleGraphEnlarge}
                  >
                    <AnimatedGraph
                      functionType={currentQuestion.graphConfig.functionType}
                      equation={activeQuestionSet.functionText}
                      a={currentQuestion.graphConfig.a || 1}
                      b={currentQuestion.graphConfig.b || 2}
                      c={currentQuestion.graphConfig.c || -4}
                      showAsymptote={true}
                      asymptote={currentQuestion.graphConfig.asymptote}
                      showXIntercept={true}
                      showYIntercept={true}
                      xIntercepts={currentQuestion.graphConfig.xIntercepts || []}
                      showLineK={currentQuestion.graphConfig.showLineK}
                      lineK={currentQuestion.graphConfig.lineK}
                      pointAt={currentQuestion.graphConfig.pointAt}
                    />
                    <span className="tl-graph-hint">{isGraphEnlarged ? 'Tap to close' : 'Tap to enlarge'}</span>
                  </div>
                )}
                {aiCorrection && (
                  <div className="tl-what-you-wrote">
                    <strong>Your answer:</strong>
                    <p>{aiCorrection}</p>
                  </div>
                )}
                {aiMistake && (
                  <div className="tl-mistake-type">
                    <strong>💡 Why:</strong>
                    <p>{aiMistake}</p>
                  </div>
                )}
                {aiTeaching && (
                  <div className="tl-teaching-correct">
                    <strong>📝 Fix:</strong>
                    <p>{aiTeaching}</p>
                  </div>
                )}
                {showAnotherWay && alternativeExplanation && (
                  <div className="tl-alternative-approach">
                    <strong>🔄 Another way:</strong>
                    <p>{alternativeExplanation}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {isCorrect === null && !markingView && (
            <div className="tl-typed-answer-area">
              <div className="tl-input-row">
                <textarea
                  className="tl-typed-input"
                  placeholder="Type your answer here..."
                  value={typedAnswer}
                  onChange={(e) => setTypedAnswer(e.target.value)}
                  rows={2}
                />

                {isFourPlusMarks && (
                  <button className="tl-camera-icon-btn" onClick={handleCameraClick} disabled={isLoading} title="Take photo of working">
                    <FaCamera />
                  </button>
                )}
              </div>

              <button
                className="tl-submit-answer-btn"
                onClick={checkTypedAnswer}
                disabled={!typedAnswer.trim() || isLoading}
              >
                {isLoading ? 'Checking...' : 'Submit Answer'} <FaArrowRight />
              </button>

              <input type="file" ref={fileInputRef} onChange={handleImageCapture}
                accept="image/*" capture="environment" style={{ display: 'none' }} />
            </div>
          )}

          {markingView && (
            <div className="tl-checking">
              <FaSpinner className="tl-spinner-icon" />
              <p>Neo is checking your work...</p>
            </div>
          )}

          {isCorrect === true && (
            <div className="tl-correct-msg">
              <span className="tl-correct-icon">✅</span>
              <p>{aiCorrection}</p>
            </div>
          )}

          {isCorrect !== null && (
            <div className="tl-action-buttons">
              {isCorrect === false && alternativeCount < 2 && (
                <button className="tl-another-way-btn" onClick={handleAnotherApproach}>
                  <FaSync /> Explain Another Way
                </button>
              )}
              <button className="tl-proceed-btn" onClick={handleProceed}>
                {isCorrect ? 'Next Question' : 'Try Another Question'} <FaArrowRight />
              </button>
            </div>
          )}
        </div>
      </main>

      <AnimatePresence>
        {isGraphEnlarged && (
          <motion.div
            className="tl-graph-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleGraphEnlarge}
          >
            <motion.div
              className="tl-graph-overlay-content"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="tl-graph-close-btn" onClick={toggleGraphEnlarge}>
                <FaTimes />
              </button>
              <AnimatedGraph
                functionType={currentQuestion?.graphConfig?.functionType || 'exponential'}
                equation={activeQuestionSet.functionText}
                a={currentQuestion?.graphConfig?.a || 1}
                b={currentQuestion?.graphConfig?.b || 2}
                c={currentQuestion?.graphConfig?.c || -4}
                showAsymptote={true}
                asymptote={currentQuestion?.graphConfig?.asymptote}
                showXIntercept={true}
                showYIntercept={true}
                xIntercepts={currentQuestion?.graphConfig?.xIntercepts || []}
                showLineK={currentQuestion?.graphConfig?.showLineK}
                lineK={currentQuestion?.graphConfig?.lineK}
                pointAt={currentQuestion?.graphConfig?.pointAt}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TopicLesson;