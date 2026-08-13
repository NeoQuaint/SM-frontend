import { useState, useEffect } from 'react';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { useNeo } from '../context/NeoContext';

const NeoVoiceIndicator = ({ neoMessage }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const { language } = useNeo();

  useEffect(() => {
    if (neoMessage && !isMuted && 'speechSynthesis' in window) {
      setIsSpeaking(true);
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(neoMessage);
      
      // Set language based on user preference
      const langMap = { en: 'en-ZA', zu: 'zu-ZA', tn: 'tn-ZA' };
      utterance.lang = langMap[language] || 'en-ZA';
      
      const voices = speechSynthesis.getVoices();
      const preferredVoice = voices.find(v => 
        v.lang === utterance.lang ||
        v.name.includes('Female') || 
        v.name.includes('Google') ||
        v.name.includes('Microsoft Zira')
      );
      
      if (preferredVoice) utterance.voice = preferredVoice;
      utterance.rate = 0.95;
      utterance.pitch = 1.05;

      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    }
  }, [neoMessage, isMuted, language]);

  return (
    <div className="neo-indicator">
      {isSpeaking && (
        <div className="neo-speaking-wave">
          <span className="wave-dot"></span>
          <span className="wave-dot"></span>
          <span className="wave-dot"></span>
        </div>
      )}
      <button 
        className="neo-mute-btn"
        onClick={() => setIsMuted(!isMuted)}
        title={isMuted ? 'Unmute Neo' : 'Mute Neo'}
      >
        {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
      </button>
    </div>
  );
};

export default NeoVoiceIndicator;