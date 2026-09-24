import { FaPlay, FaStop } from 'react-icons/fa';
import { useNeo } from '../context/NeoContext';

const NeoVoiceIndicator = ({
  neoMessage,
  isSpeaking,
  autoMode = false,
  onToggleAuto,
}) => {
  const { language } = useNeo();

  return (
    <div className="neo-indicator">
      {isSpeaking && !autoMode && (
        <div className="neo-speaking-wave">
          <span className="wave-dot"></span>
          <span className="wave-dot"></span>
          <span className="wave-dot"></span>
        </div>
      )}

      {onToggleAuto && (
        <button
          className={`auto-switch ${autoMode ? 'on' : 'off'}`}
          onClick={onToggleAuto}
          aria-pressed={autoMode}
          aria-label={autoMode ? 'Stop Auto mode' : 'Start Auto mode'}
        >
          <span className="auto-switch-label">
            <span className="auto-switch-icon">
              {autoMode ? <FaStop /> : <FaPlay />}
            </span>
            {autoMode ? 'Stop' : 'Auto'}
          </span>
          <span className="auto-switch-knob">
            {autoMode ? <FaStop /> : <FaPlay />}
          </span>
        </button>
      )}
    </div>
  );
};

export default NeoVoiceIndicator;