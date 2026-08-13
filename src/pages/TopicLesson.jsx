import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useNeo } from '../context/NeoContext';
import NeoVoiceIndicator from '../components/NeoVoiceIndicator';
import { FaArrowLeft, FaCamera, FaCheck, FaArrowRight, FaSpinner, FaVolumeUp } from 'react-icons/fa';
import '../css/TopicLesson.css';

// Typewriter component — writes text character by character
const Typewriter = ({ text, onComplete, speed = 30 }) => {
  const [displayed, setDisplayed] = useState('');
  const [cursor, setCursor] = useState(true);

  useEffect(() => {
    setDisplayed('');
    let index = 0;
    
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayed(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  // Blinking cursor
  useEffect(() => {
    const blink = setInterval(() => setCursor(prev => !prev), 500);
    return () => clearInterval(blink);
  }, []);

  const isComplete = displayed.length === text.length;

  return (
    <span className="typewriter">
      {displayed}
      {!isComplete && <span className={`typewriter-cursor ${cursor ? 'visible' : ''}`}>|</span>}
    </span>
  );
};

// Math highlight component — highlights parts of an equation
const MathHighlight = ({ equation, highlightPart, isActive }) => {
  if (!highlightPart) {
    return <span className="math-normal">{equation}</span>;
  }

  const parts = equation.split(new RegExp(`(${highlightPart.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
  
  return (
    <span className={`math-highlight-container ${isActive ? 'active' : ''}`}>
      {parts.map((part, i) => 
        part.toLowerCase() === highlightPart.toLowerCase() 
          ? <span key={i} className="math-highlighted">{part}</span>
          : <span key={i} className="math-normal">{part}</span>
      )}
    </span>
  );
};

const TopicLesson = () => {
  const { subject, topicId } = useParams();
  const navigate = useNavigate();
  const { neoMessage, setNeoMessage, neoEngine, language } = useNeo();
  const fileInputRef = useRef(null);
  
  const [currentEquationIndex, setCurrentEquationIndex] = useState(0);
  const [equations, setEquations] = useState([]);
  const [showTeaching, setShowTeaching] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [teachingSteps, setTeachingSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stepWritingComplete, setStepWritingComplete] = useState(false);
  const [highlightPart, setHighlightPart] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(true);
  const [completedEquations, setCompletedEquations] = useState([]);
  const [showStudentWork, setShowStudentWork] = useState(false);
  const [studentMistake, setStudentMistake] = useState('');

  const topicName = topicId?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) || 'Topic';
  const API_URL = 'https://smartclass-wlgb.onrender.com';

  useEffect(() => {
    generateEquations();
  }, [topicId]);

  const generateEquations = async () => {
    setIsGenerating(true);
    
    const userData = JSON.parse(localStorage.getItem('smartclass_user') || '{}');
    const grade = userData?.grade || '10';

    try {
      const response = await fetch(`${API_URL}/api/neo/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Generate 15 math equations for the topic "${topicName}" in ${subject}, Grade ${grade}. 
          Return ONLY a JSON array. Each object: id (like "1.1"), equation (problem string), instruction (brief).
          Progressive difficulty. Start easy, build up. Cover the full topic scope.
          Example: [{"id":"1.1","equation":"2x + 5 = 13","instruction":"Solve for x"},{"id":"1.2","equation":"3(x - 2) = 9","instruction":"Solve for x"}]`,
          subject,
          userId: userData?.id || userData?.email || 'student',
        })
      });

      const data = await response.json();
      
      try {
        const jsonMatch = data.reply.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          setEquations(parsed);
        } else {
          setEquations(generateFallbackEquations());
        }
      } catch {
        setEquations(generateFallbackEquations());
      }
    } catch {
      setEquations(generateFallbackEquations());
    } finally {
      setIsGenerating(false);
      
      const saved = JSON.parse(localStorage.getItem(`smartclass_equations_${subject}_${topicId}`) || '[]');
      setCompletedEquations(saved);
      if (saved.length > 0) setCurrentEquationIndex(saved.length);

      setNeoMessage(
        language === 'zu' ? 'Ake siqale! Yixazulule ephepheni lakho bese uthatha isithombe.' :
        language === 'tn' ? 'A re simolole! E rarabolole mo pampiring ya gago.' :
        'Let\'s start! Solve it on your paper, then take a photo.'
      );
    }
  };

  const generateFallbackEquations = () => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: `1.${i + 1}`,
      equation: `Solve for x: ${i + 2}x + ${(i + 1) * 3} = ${(i + 2) * 5}`,
      instruction: 'Show all steps',
    }));
  };

  const handleCameraClick = () => fileInputRef.current?.click();

  const handleImageCapture = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsLoading(true);

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result.split(',')[1];
      await checkAnswer(base64);
    };
    reader.readAsDataURL(file);
  };

  const checkAnswer = async (imageBase64) => {
    const currentEquation = equations[currentEquationIndex];
    
    try {
      const response = await fetch(`${API_URL}/api/neo/vision`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64,
          subject,
          message: `Student solved: "${currentEquation.equation}". ${currentEquation.instruction}.
          
          If CORRECT, respond EXACTLY: "CORRECT: Well done!"
          
          If WRONG, respond with "INCORRECT:" followed by a teaching breakdown. Format:
          - First line after INCORRECT: What the student did wrong (brief)
          - Then "STEPS:" on its own line
          - Then each step on a new line, each starting with ">>" followed by the step text
          - After each step line, add "HIGHLIGHT:" followed by the part of the equation to highlight
          
          Example:
          INCORRECT: You forgot to divide both sides.
          STEPS:
          >> First, write the equation: 2x + 5 = 13 HIGHLIGHT:2x + 5 = 13
          >> Subtract 5 from both sides HIGHLIGHT:- 5
          >> This gives us: 2x = 8 HIGHLIGHT:2x = 8
          >> Now divide both sides by 2 HIGHLIGHT:÷ 2
          >> Final answer: x = 4 HIGHLIGHT:x = 4`,
        })
      });

      const data = await response.json();
      const reply = data.reply || '';

      if (reply.startsWith('CORRECT:')) {
        setIsCorrect(true);
        const newCompleted = [...completedEquations, currentEquation.id];
        setCompletedEquations(newCompleted);
        localStorage.setItem(`smartclass_equations_${subject}_${topicId}`, JSON.stringify(newCompleted));
        setNeoMessage(language === 'zu' ? '✅ Kuyiqiniso! Umsebenzi omuhle!' : language === 'tn' ? '✅ Go siame!' : '✅ Correct! Great work!');
      } else {
        setIsCorrect(false);
        
        // Parse the teaching response
        const afterIncorrect = reply.replace('INCORRECT:', '').trim();
        const mistakeMatch = afterIncorrect.match(/^([\s\S]*?)STEPS:/);
        const mistake = mistakeMatch ? mistakeMatch[1].trim() : '';
        const stepsText = afterIncorrect.replace(/^[\s\S]*?STEPS:/, '').trim();
        
        setStudentMistake(mistake);
        
        // Parse steps with highlights
        const stepLines = stepsText.split('\n').filter(line => line.trim().startsWith('>>'));
        const parsedSteps = stepLines.map(line => {
          const highlightMatch = line.match(/HIGHLIGHT:(.*)$/);
          const stepText = line
            .replace(/^>>\s*/, '')
            .replace(/HIGHLIGHT:.*$/, '')
            .trim();
          return {
            text: stepText,
            highlight: highlightMatch ? highlightMatch[1].trim() : '',
          };
        });

        setTeachingSteps(parsedSteps);
        setCurrentStepIndex(0);
        setStepWritingComplete(false);
        setHighlightPart('');
        setShowStudentWork(true);
        setShowTeaching(true);
        
        setNeoMessage(language === 'zu' ? 'Ake ngikubonise indlela...' : language === 'tn' ? 'A ke go bontshe tsela...' : 'Let me show you how...');
      }
    } catch {
      setNeoMessage(language === 'zu' ? 'Nginenkinga. Zama futhi.' : 'Failed to check. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStepWritingComplete = () => {
    setStepWritingComplete(true);
    // Set highlight for current step
    if (teachingSteps[currentStepIndex]?.highlight) {
      setHighlightPart(teachingSteps[currentStepIndex].highlight);
    }
  };

  const handleNextStep = () => {
    if (currentStepIndex < teachingSteps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
      setStepWritingComplete(false);
      setHighlightPart('');
    }
  };

  const handleNextEquation = () => {
    if (currentEquationIndex < equations.length - 1) {
      setCurrentEquationIndex(prev => prev + 1);
      setIsCorrect(null);
      setShowTeaching(false);
      setTeachingSteps([]);
      setCurrentStepIndex(0);
      setStepWritingComplete(false);
      setHighlightPart('');
      setShowStudentWork(false);
      setStudentMistake('');
      setNeoMessage(language === 'zu' ? 'Nansi elandelayo!' : 'Here\'s the next one!');
    } else {
      const progress = JSON.parse(localStorage.getItem(`smartclass_progress_${subject}`) || '{}');
      progress[topicId] = 100;
      localStorage.setItem(`smartclass_progress_${subject}`, JSON.stringify(progress));
      navigate(`/subjects/${subject}`);
    }
  };

  // Speak the current step
  useEffect(() => {
    if (showTeaching && teachingSteps[currentStepIndex] && !stepWritingComplete) {
      // Neo will speak once the typewriter is done
    }
  }, [currentStepIndex, showTeaching, stepWritingComplete]);

  const currentEquation = equations[currentEquationIndex];
  const progressPercent = equations.length > 0 ? Math.round((completedEquations.length / equations.length) * 100) : 0;

  if (isGenerating) {
    return (
      <div className="tl-app">
        <header className="tl-header">
          <button className="tl-back" onClick={() => navigate(`/subjects/${subject}`)}>
            <FaArrowLeft /> {topicName}
          </button>
        </header>
        <main className="tl-main">
          <div className="tl-generating">
            <FaSpinner className="tl-spinner-icon" />
            <h2>{language === 'zu' ? 'Iyalungiselela...' : 'Preparing your equations...'}</h2>
            <p>{language === 'zu' ? 'I-Neo yakha izibalo eziyi-15.' : 'Neo is generating 15 equations.'}</p>
          </div>
        </main>
      </div>
    );
  }

  if (!currentEquation) {
    return (
      <div className="tl-loading"><div className="tl-spinner"></div></div>
    );
  }

  return (
    <div className="tl-app">
      <header className="tl-header">
        <button className="tl-back" onClick={() => navigate(`/subjects/${subject}`)}>
          <FaArrowLeft /> {topicName}
        </button>
        <div className="tl-progress-mini">
          <div className="tl-progress-bar-mini">
            <div className="tl-progress-fill-mini" style={{ width: `${progressPercent}%` }}></div>
          </div>
          <span className="tl-progress-text-mini">{completedEquations.length}/{equations.length}</span>
        </div>
        <NeoVoiceIndicator neoMessage={neoMessage} />
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
        {!showTeaching ? (
          <div className="tl-equation-section">
            <span className="tl-equation-label">Equation {currentEquation.id}</span>
            <div className="tl-equation-card">
              <h1 className="tl-equation-text">{currentEquation.equation}</h1>
              <p className="tl-equation-instruction">{currentEquation.instruction}</p>
            </div>
            
            <p className="tl-equation-hint">
              {language === 'zu' ? 'Yixazulule ephepheni lakho, bese uthatha isithombe.' :
               language === 'tn' ? 'E rarabolole mo pampiring ya gago.' :
               'Solve it on your paper, then take a photo.'}
            </p>

            {isCorrect !== null && (
              <div className={`tl-result ${isCorrect ? 'correct' : 'incorrect'}`}>
                <div className={`tl-result-icon ${isCorrect ? 'correct' : 'incorrect'}`}>
                  {isCorrect ? <FaCheck /> : <span className="tl-result-x">✕</span>}
                </div>
                {!isCorrect && (
                  <p className="tl-result-text">
                    {language === 'zu' ? 'Akukho lutho! Ake ngikubonise.' : 'Not quite! Let me show you.'}
                  </p>
                )}
              </div>
            )}

            {isCorrect === null && (
              <button className="tl-camera-btn" onClick={handleCameraClick} disabled={isLoading}>
                <FaCamera />
                {isLoading ? 'Checking...' : language === 'zu' ? 'Thatha isithombe' : 'Take photo of your work'}
              </button>
            )}

            <input type="file" ref={fileInputRef} onChange={handleImageCapture}
              accept="image/*" capture="environment" style={{ display: 'none' }} />

            {isCorrect && (
              <button className="tl-next-btn" onClick={handleNextEquation}>
                {currentEquationIndex < equations.length - 1 ? 'Next Equation' : 'Complete Topic'}
                <FaArrowRight />
              </button>
            )}
          </div>
        ) : (
          <div className="tl-teaching-section">
            {/* Student mistake bubble */}
            {showStudentWork && studentMistake && (
              <div className="tl-mistake-bubble">
                <div className="tl-mistake-icon">💡</div>
                <p>{studentMistake}</p>
              </div>
            )}

            {/* Equation being taught */}
            <div className="tl-teaching-equation">
              <MathHighlight 
                equation={currentEquation.equation} 
                highlightPart={highlightPart}
                isActive={!!highlightPart}
              />
            </div>

            {/* Animated step cards */}
            <div className="tl-teaching-steps-container">
              {teachingSteps.map((step, i) => (
                <div 
                  key={i}
                  className={`tl-teaching-step ${i === currentStepIndex ? 'active' : i < currentStepIndex ? 'done' : 'pending'}`}
                >
                  <div className="tl-step-indicator">
                    {i < currentStepIndex ? <FaCheck /> : 
                     i === currentStepIndex ? <div className="tl-step-pulse"></div> :
                     <span>{i + 1}</span>}
                  </div>
                  <div className="tl-step-content">
                    {i === currentStepIndex ? (
                      <Typewriter 
                        text={step.text} 
                        speed={25}
                        onComplete={handleStepWritingComplete}
                      />
                    ) : i < currentStepIndex ? (
                      <p>{step.text}</p>
                    ) : (
                      <p className="tl-step-pending-text">{step.text}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="tl-teaching-nav">
              {stepWritingComplete && currentStepIndex < teachingSteps.length - 1 && (
                <button className="tl-next-step-btn" onClick={handleNextStep}>
                  {language === 'zu' ? 'Isinyathelo esilandelayo' : 'Next Step'} <FaArrowRight />
                </button>
              )}
              {(currentStepIndex === teachingSteps.length - 1 && stepWritingComplete) && (
                <button className="tl-next-btn" onClick={handleNextEquation}>
                  {currentEquationIndex < equations.length - 1 ? 'Next Equation' : 'Complete Topic'}
                  <FaArrowRight />
                </button>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default TopicLesson;