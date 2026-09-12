import { useState, useEffect, useCallback } from 'react';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';

const NeoVoice = ({ onSpeechResult, neoMessage }) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  // Initialize speech recognition (voice INPUT only)
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recog = new SpeechRecognition();
      recog.continuous = false;
      recog.interimResults = false;
      recog.lang = 'en-ZA';

      recog.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (onSpeechResult) onSpeechResult(transcript);
        setIsListening(false);
      };

      recog.onerror = () => setIsListening(false);
      recog.onend = () => setIsListening(false);

      setRecognition(recog);
    }
  }, [onSpeechResult]);

  const toggleListening = useCallback(() => {
    if (!recognition) return;
    
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
  }, [recognition, isListening]);

  return (
    <div className="neo-voice-controls">
      <button 
        className={`neo-voice-btn ${isListening ? 'listening' : ''}`}
        onClick={toggleListening}
        title={isListening ? 'Stop listening' : 'Ask Neo with your voice'}
      >
        {isListening ? <FaMicrophoneSlash /> : <FaMicrophone />}
      </button>
    </div>
  );
};

export default NeoVoice;