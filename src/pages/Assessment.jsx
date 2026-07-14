import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Assessment.css';
import { FaArrowRight, FaArrowLeft, FaCheck, FaStar, FaPlay } from 'react-icons/fa';

const Assessment = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [marks, setMarks] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    const data = localStorage.getItem('smartclass_user');
    if (data) setUserData(JSON.parse(data));
    else navigate('/');
  }, [navigate]);

  if (!userData) {
    return (
      <div className="assess-loading">
        <div className="assess-spinner"></div>
      </div>
    );
  }

  const avatarMap = { 'AVO': '/AVO.png', 'CAT': '/CAT.png', 'STRAW': '/STRAW.png', 'ORANGE': '/ORANGE.png', 'DOG': '/DOG.png' };
  const subjects = userData.subjects || ['Mathematics'];

  const handleMarkChange = (subject, value) => {
    setMarks(prev => ({ ...prev, [subject]: value }));
  };

  const diagnosticQuestions = [
    { id: 1, question: 'What is the value of x in: 2x + 5 = 13?', options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'], correct: 1 },
    { id: 2, question: 'If a triangle has angles of 60° and 80°, what is the third angle?', options: ['30°', '40°', '50°', '60°'], correct: 1 },
    { id: 3, question: 'Simplify: 3(2x - 4) + 2x', options: ['8x - 12', '6x - 4', '8x - 4', '6x - 12'], correct: 0 },
  ];

  const handleAnswer = (questionId, answerIndex) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const calculateResults = () => {
    let correct = 0;
    diagnosticQuestions.forEach(q => {
      if (answers[q.id] === q.correct) correct++;
    });
    return Math.round((correct / diagnosticQuestions.length) * 100);
  };

  const score = calculateResults();

  const handleFinish = () => {
    const assessmentData = {
      marks,
      diagnosticScore: score,
      completedAt: new Date().toISOString(),
    };
    const updatedUser = { ...userData, assessment: assessmentData };
    localStorage.setItem('smartclass_user', JSON.stringify(updatedUser));
    navigate('/dashboard');
  };

  return (
    <div className="assess-app">
      {/* Header - matching app style */}
      <header className="assess-header">
        <span className="assess-header-greeting">Hi {userData.fullName.split(' ')[0]} 👋</span>
        <div className="assess-header-progress">
          <div className="assess-header-bar">
            <div className="assess-header-fill" style={{ width: step === 1 ? '50%' : step === 2 && !showResults ? '75%' : '100%' }}></div>
          </div>
        </div>
      </header>

      <main className="assess-main">
        {/* STEP 1: ENTER MARKS */}
        {step === 1 && (
          <div className="assess-card">
            <div className="assess-neo">
              <img src={avatarMap[userData.avatar]} alt="" className="assess-neo-img" />
              <div>
                <h2>Let's personalize your learning</h2>
                <p>Enter your current marks so I know where to start.</p>
              </div>
            </div>

            <div className="marks-list">
              {subjects.map((subject) => (
                <div key={subject}>
                  <label>{subject}</label>
                  <div className="mark-input-wrap">
                    <input
                      type="number"
                      placeholder="e.g. 65"
                      min="0" max="100"
                      value={marks[subject] || ''}
                      onChange={(e) => handleMarkChange(subject, e.target.value)}
                    />
                    <span className="mark-symbol">%</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              className="assess-btn"
              onClick={() => setStep(2)}
              disabled={subjects.some(s => !marks[s] || marks[s] < 0 || marks[s] > 100)}
            >
              Continue <FaArrowRight />
            </button>
          </div>
        )}

        {/* STEP 2: QUESTIONS */}
        {step === 2 && !showResults && (
          <div className="assess-card">
            <span className="question-num">Question {currentQuestion + 1} of 3</span>
            <h3 className="question-text">{diagnosticQuestions[currentQuestion].question}</h3>

            <div className="options-list">
              {diagnosticQuestions[currentQuestion].options.map((option, i) => (
                <button
                  key={i}
                  className={`option-btn ${answers[diagnosticQuestions[currentQuestion].id] === i ? 'selected' : ''}`}
                  onClick={() => handleAnswer(diagnosticQuestions[currentQuestion].id, i)}
                >
                  <span className="option-letter">{['A', 'B', 'C', 'D'][i]}</span>
                  {option}
                  {answers[diagnosticQuestions[currentQuestion].id] === i && <FaCheck className="option-check" />}
                </button>
              ))}
            </div>

            <div className="question-nav">
              {currentQuestion > 0 && (
                <button className="qnav-btn back" onClick={() => setCurrentQuestion(prev => prev - 1)}>
                  <FaArrowLeft />
                </button>
              )}
              {currentQuestion < 2 ? (
                <button
                  className="qnav-btn next"
                  onClick={() => setCurrentQuestion(prev => prev + 1)}
                  disabled={answers[diagnosticQuestions[currentQuestion].id] === undefined}
                >
                  Next <FaArrowRight />
                </button>
              ) : (
                <button
                  className="qnav-btn finish"
                  onClick={() => setShowResults(true)}
                  disabled={Object.keys(answers).length < 3}
                >
                  See Results <FaStar />
                </button>
              )}
            </div>
          </div>
        )}

        {/* RESULTS */}
        {step === 2 && showResults && (
          <div className="assess-card results-card">
            <div className="results-wheel">
              <svg width="100" height="100" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#F5F5F5" strokeWidth="6" />
                <circle cx="50" cy="50" r="42" fill="none" stroke={score >= 70 ? '#4CAF50' : score >= 40 ? '#FF9800' : '#E57373'} strokeWidth="6"
                  strokeDasharray="263.9" strokeDashoffset={263.9 - (score / 100) * 263.9}
                  strokeLinecap="round" transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="results-wheel-text">
                <span className="rw-score">{score}%</span>
              </div>
            </div>

            <h2 className="results-title">
              {score >= 70 ? 'Great start!' : score >= 40 ? 'Good foundation' : 'Room to grow'}
            </h2>
            <p className="results-message">
              {score >= 70 ? "You're ready. Let's build on this." : score >= 40 ? 'Solid base. We know where to focus.' : 'No stress. We start from where you are.'}
            </p>

            <button className="assess-btn primary" onClick={handleFinish}>
              <FaPlay /> Start Learning
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Assessment;