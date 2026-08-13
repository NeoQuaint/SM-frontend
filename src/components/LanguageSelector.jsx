import { useNeo } from '../context/NeoContext';
import { FaGlobe } from 'react-icons/fa';

const LanguageSelector = () => {
  const { language, setLanguage } = useNeo();

  return (
    <div className="language-selector">
      <FaGlobe />
      <select 
        value={language} 
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="en">English</option>
        <option value="zu">Zulu</option>
        <option value="tn">Setswana</option>
      </select>
    </div>
  );
};

export default LanguageSelector;