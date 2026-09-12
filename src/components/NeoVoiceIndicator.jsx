import { useState, useEffect } from 'react';
import { useNeo } from '../context/NeoContext';

const NeoVoiceIndicator = ({ neoMessage, isSpeaking }) => {
  const { language } = useNeo();

  return (
    <div className="neo-indicator">
      {isSpeaking && (
        <div className="neo-speaking-wave">
          <span className="wave-dot"></span>
          <span className="wave-dot"></span>
          <span className="wave-dot"></span>
        </div>
      )}
    </div>
  );
};

export default NeoVoiceIndicator;