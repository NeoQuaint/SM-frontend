import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useNeo } from '../context/NeoContext';
import NeoVoiceInput from '../components/NeoVoiceInput';
import { FaArrowLeft, FaBookOpen } from 'react-icons/fa';
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

  const handleVoiceTranscript = (transcript) => {
    if (transcript && !isTeaching) {
      continueLesson(transcript);
    }
  };

  const handleEndLesson = () => {
    endLesson();
    navigate('/dashboard');
  };

  const messages = currentLesson?.messages || [];

  return (
    <div className="subject-lesson">
      <header className="sl-header">
        <button className="sl-back" onClick={handleEndLesson}>
          <FaArrowLeft /> Dashboard
        </button>
        <div className="sl-title">
          <FaBookOpen />
          <span>{subject}</span>
        </div>
      </header>

      <main className="sl-messages">
        {messages.length === 0 && !isTeaching && (
          <div className="sl-typing">Neo is preparing your lesson...</div>
        )}
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

      <footer className="sl-input">
        <NeoVoiceInput onTranscript={handleVoiceTranscript} />
        <input
          type="text"
          placeholder="Type your answer or ask Neo a question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          disabled={isTeaching}
          style={{ marginLeft: '10px', flex: 1 }}
        />
      </footer>
    </div>
  );
};

export default SubjectLesson;