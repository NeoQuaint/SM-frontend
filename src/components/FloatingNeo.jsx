import { useState, useRef, useEffect } from 'react';
import { FaTimes, FaPaperPlane } from 'react-icons/fa';
import NeoVoice from './NeoVoice';
import '../css/FloatingNeo.css';

const FloatingNeo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'Neo', text: 'Hi! I\'m Neo. Ask me anything about your studies. 📚' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [neoMessage, setNeoMessage] = useState('');
  const messagesEndRef = useRef(null);

  const API_URL = 'https://smartclass-wlgb.onrender.com';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text) => {
    const msgText = text || input.trim();
    if (!msgText) return;

    const userMsg = { sender: 'You', text: msgText };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const userData = JSON.parse(localStorage.getItem('smartclass_user') || '{}');
      
      const response = await fetch(`${API_URL}/api/neo/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: msgText,
          subject: userData.subjects?.[0] || 'General',
          userId: userData.id || 'anonymous',
        })
      });

      const data = await response.json();
      const neoMsg = { sender: 'Neo', text: data.reply || 'Sorry, try again.' };
      setMessages(prev => [...prev, neoMsg]);
      setNeoMessage(data.reply || '');
    } catch (err) {
      setMessages(prev => [...prev, { sender: 'Neo', text: 'I\'m having trouble connecting. Try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button className="floating-neo-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : '💬'}
      </button>

      {isOpen && (
        <div className="floating-neo-panel">
          <div className="floating-neo-header">
            <span>💜 Neo</span>
            <NeoVoice 
              onSpeechResult={(transcript) => sendMessage(transcript)}
              neoMessage={neoMessage}
            />
            <button onClick={() => setIsOpen(false)}><FaTimes /></button>
          </div>
          
          <div className="floating-neo-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`floating-neo-msg ${msg.sender === 'Neo' ? 'neo' : 'user'}`}>
                <strong>{msg.sender}</strong>
                <p>{msg.text}</p>
              </div>
            ))}
            {isLoading && <div className="floating-neo-typing">Neo is thinking...</div>}
            <div ref={messagesEndRef} />
          </div>

          <div className="floating-neo-input">
            <input
              type="text"
              placeholder="Ask Neo anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={() => sendMessage()} disabled={!input.trim() || isLoading}>
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingNeo;