import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useNeo } from '../context/NeoContext';
import NeoVoiceIndicator from '../components/NeoVoiceIndicator';
import { FaArrowLeft, FaPlay, FaLock, FaCheck, FaStar } from 'react-icons/fa';
import '../css/Topics.css';

const TOPICS_DATA = {
  'Mathematics': [
    { id: 'algebra', name: 'Algebra', description: 'Equations, expressions, and functions', sessions: 3, icon: '📐' },
    { id: 'geometry', name: 'Geometry', description: 'Shapes, angles, and proofs', sessions: 3, icon: '📏' },
    { id: 'trigonometry', name: 'Trigonometry', description: 'Sine, cosine, and tangent', sessions: 3, icon: '🔺' },
    { id: 'statistics', name: 'Statistics', description: 'Data, probability, and graphs', sessions: 3, icon: '📊' },
    { id: 'calculus', name: 'Calculus', description: 'Limits, derivatives, and integrals', sessions: 3, icon: '∫' },
  ],
  'Physical Sciences': [
    { id: 'mechanics', name: 'Mechanics', description: 'Forces, motion, and energy', sessions: 3, icon: '⚡' },
    { id: 'waves', name: 'Waves & Sound', description: 'Wave properties and sound', sessions: 3, icon: '🌊' },
    { id: 'electricity', name: 'Electricity', description: 'Circuits and electromagnetism', sessions: 3, icon: '⚡' },
    { id: 'matter', name: 'Matter & Materials', description: 'Atoms, molecules, and reactions', sessions: 3, icon: '🧪' },
  ],
  'English': [
    { id: 'comprehension', name: 'Comprehension', description: 'Reading and understanding texts', sessions: 3, icon: '📖' },
    { id: 'grammar', name: 'Grammar', description: 'Parts of speech and sentence structure', sessions: 3, icon: '✏️' },
    { id: 'writing', name: 'Writing', description: 'Essays, letters, and creative writing', sessions: 3, icon: '📝' },
    { id: 'literature', name: 'Literature', description: 'Poetry, novels, and drama', sessions: 3, icon: '📚' },
  ],
  'Life Sciences': [
    { id: 'cells', name: 'Cells & Organisms', description: 'Building blocks of life', sessions: 3, icon: '🔬' },
    { id: 'ecology', name: 'Ecology', description: 'Ecosystems and environment', sessions: 3, icon: '🌍' },
    { id: 'genetics', name: 'Genetics', description: 'DNA, inheritance, and evolution', sessions: 3, icon: '🧬' },
    { id: 'physiology', name: 'Human Physiology', description: 'Body systems and functions', sessions: 3, icon: '💪' },
  ],
};

const DEFAULT_TOPICS = [
  { id: 'topic-1', name: 'Topic 1', description: 'Introduction and fundamentals', sessions: 3, icon: '📝' },
  { id: 'topic-2', name: 'Topic 2', description: 'Building on the basics', sessions: 3, icon: '📝' },
  { id: 'topic-3', name: 'Topic 3', description: 'Advanced concepts', sessions: 3, icon: '📝' },
];

const Topics = () => {
  const { subject } = useParams();
  const navigate = useNavigate();
  const { neoMessage, setNeoMessage, neoEngine, language } = useNeo();
  const [topicProgress, setTopicProgress] = useState({});
  const [userData, setUserData] = useState(null);

  const topics = TOPICS_DATA[subject] || DEFAULT_TOPICS;

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('smartclass_user') || '{}');
    setUserData(data);

    const progress = JSON.parse(localStorage.getItem(`smartclass_progress_${subject}`) || '{}');
    setTopicProgress(progress);

    const lastTopic = Object.keys(progress).find(t => progress[t] > 0 && progress[t] < 100);
    const topicName = topics.find(t => t.id === lastTopic)?.name || 'your last topic';
    
    if (lastTopic) {
      if (language === 'zu') {
        setNeoMessage(`Ushiye ku-${topicName}. Usulungele ukuqhubeka?`);
      } else if (language === 'tn') {
        setNeoMessage(`O tlogetse kwa ${topicName}. A o itumedetse go tswelela?`);
      } else {
        setNeoMessage(`You left off from ${topicName}. Ready to resume?`);
      }
    } else {
      if (language === 'zu') {
        setNeoMessage(`Siyakwamukela ku-${subject}! Khetha isihloko ukuze uqale ukufunda.`);
      } else if (language === 'tn') {
        setNeoMessage(`O amogetswe kwa ${subject}! Tlhopa setlhogo go simolola go ithuta.`);
      } else {
        setNeoMessage(`Welcome to ${subject}! Pick a topic to start learning.`);
      }
    }
  }, [subject, language]);

  const getTopicStatus = (topicId, index) => {
    const progress = topicProgress[topicId] || 0;
    if (progress === 100) return 'completed';
    if (progress > 0) return 'in-progress';
    if (index > 0 && (topicProgress[topics[index - 1].id] || 0) !== 100) return 'locked';
    return 'available';
  };

  const canUnlock = (index) => {
    if (index === 0) return true;
    const prevTopic = topics[index - 1];
    return (topicProgress[prevTopic.id] || 0) === 100;
  };

  return (
    <div className="topics-app">
      <header className="topics-header">
        <button className="topics-back" onClick={() => navigate('/dashboard')}>
          <FaArrowLeft /> Dashboard
        </button>
        <h1>{subject}</h1>
        <NeoVoiceIndicator neoMessage={neoMessage} />
      </header>

      {neoMessage && (
        <div className="topics-neo-message">
          <div className="topics-neo-wave">
            <span className="wave-bar"></span>
            <span className="wave-bar"></span>
            <span className="wave-bar"></span>
            <span className="wave-bar"></span>
            <span className="wave-bar"></span>
          </div>
          <p>{neoMessage}</p>
        </div>
      )}

      <main className="topics-main">
        <div className="topics-grid">
          {topics.map((topic, index) => {
            const status = getTopicStatus(topic.id, index);
            const unlocked = canUnlock(index);
            const progress = topicProgress[topic.id] || 0;

            return (
              <div 
                key={topic.id}
                className={`topic-card ${status} ${!unlocked ? 'locked' : ''}`}
                onClick={() => {
                  if (unlocked) {
                    navigate(`/lesson/${subject}/${topic.id}`);
                  }
                }}
              >
                <div className="topic-card-header">
                  <span className="topic-icon">{topic.icon}</span>
                  <span className="topic-status-icon">
                    {status === 'completed' && <FaCheck />}
                    {status === 'in-progress' && <FaStar />}
                    {status === 'locked' && <FaLock />}
                  </span>
                </div>
                <h3 className="topic-name">{topic.name}</h3>
                <p className="topic-description">{topic.description}</p>
                
                <div className="topic-progress-section">
                  <div className="topic-progress-bar">
                    <div 
                      className="topic-progress-fill" 
                      style={{ width: `${unlocked ? progress : 0}%` }}
                    ></div>
                  </div>
                  <span className="topic-progress-text">
                    {!unlocked 
                      ? (language === 'zu' ? 'Qedela isihloko esandulele' : language === 'tn' ? 'Fetsa setlhogo se se fetileng' : 'Complete previous topic')
                      : status === 'completed' 
                        ? (language === 'zu' ? 'Kuqediwe' : language === 'tn' ? 'E fedile' : 'Completed')
                        : `${progress}% ${language === 'zu' ? 'kuqediwe' : language === 'tn' ? 'e fedile' : 'complete'}`}
                  </span>
                </div>

                <button 
                  className={`topic-action-btn ${status}`}
                  disabled={!unlocked}
                >
                  {!unlocked ? <FaLock /> :
                   status === 'completed' ? <><FaCheck /> {language === 'zu' ? 'Buyekeza' : language === 'tn' ? 'Tlhatlhoba' : 'Review'}</> :
                   status === 'in-progress' ? <><FaPlay /> {language === 'zu' ? 'Qhubeka' : language === 'tn' ? 'Tswelela' : 'Resume'}</> :
                   <><FaPlay /> {language === 'zu' ? 'Qala' : language === 'tn' ? 'Simolola' : 'Start'}</>}
                </button>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Topics;