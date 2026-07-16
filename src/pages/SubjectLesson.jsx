import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useNeo } from '../context/NeoContext';
import NeoVoice from '../components/NeoVoice';
import { FaArrowLeft, FaPaperPlane, FaBookOpen } from 'react-icons/fa';
import '../css/SubjectLesson.css';

const SubjectLesson = () => {
  const { subject } = useParams();
  const navigate = useNavigate();
  const { currentLesson, startLesson, continueLesson, endLesson, isTeaching, neoMessage } = useNeo();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('smartclass_user') || '{}');
    
    if (!currentLesson || currentLesson.subject !== subject) {
      startLesson(subject, userData);
    }
  }, [subject]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentLesson?.messages]);

  const handleSend = () => {
    if (!input.trim() || isTeaching) return;
    continueLesson(input);
    setInput('');
  };

  const handleEndLesson = () => {
    endLesson();
    navigate('/dashboard');
  };

  const messages = currentLesson?.messages || [];

  return (
    <div className="subject-lesson">
      {/* Header */}
      <header className="sl-header">
        <button className="sl-back" onClick={handleEndLesson}>
          <FaArrowLeft /> Dashboard
        </button>
        <div className="sl-title">
          <FaBookOpen />
          <span>{subject}</span>
        </div>
        <NeoVoice 
          onSpeechResult={(transcript) => {
            setInput(transcript);
            continueLesson(transcript);
          }}
          neoMessage={neoMessage}
        />
      </header>

      {/* Messages */}
      <main className="sl-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`sl-message ${msg.sender === 'Neo' ? 'neo' : 'student'}`}>
            <div className="sl-message-sender">
              {msg.sender === 'Neo' ? '💜 Neo' : '🎓 You'}
            </div>
            <div className="sl-message-text">{msg.text}</div>
          </div>
        ))}
        {isTeaching && (
          <div className="sl-typing">Neo is teaching...</div>
        )}
        <div ref={messagesEndRef} />
      </main>

      {/* Input */}
      <footer className="sl-input">
        <input
          type="text"
          placeholder="Ask Neo a question or tell her you're ready for the next step..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          disabled={isTeaching}
        />
        <button onClick={handleSend} disabled={!input.trim() || isTeaching}>
          <FaPaperPlane />
        </button>
      </footer>
    </div>
  );
};

export default SubjectLesson;