import { useState, useEffect, useCallback } from 'react';
import { FaMicrophone, FaMicrophoneSlash, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

const NeoVoice = ({ onSpeechResult, neoMessage }) => {
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [recognition, setRecognition] = useState(null);

  // Initialize speech recognition
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

  // Speak Neo's message
  useEffect(() => {
    if (neoMessage && !isMuted && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(neoMessage);
      
      const voices = speechSynthesis.getVoices();
      const preferredVoice = voices.find(v => 
        v.name.includes('Female') || 
        v.name.includes('Google UK English Female') ||
        v.name.includes('Microsoft Zira') ||
        v.name.includes('Samantha')
      );
      
      if (preferredVoice) utterance.voice = preferredVoice;
      utterance.rate = 0.95;
      utterance.pitch = 1.05;
      utterance.volume = 1;

      window.speechSynthesis.speak(utterance);
    }
  }, [neoMessage, isMuted]);

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
      <button 
        className={`neo-voice-btn ${isMuted ? 'muted' : ''}`}
        onClick={() => setIsMuted(!isMuted)}
        title={isMuted ? 'Unmute Neo' : 'Mute Neo'}
      >
        {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
      </button>
    </div>
  );
};

export default NeoVoice;