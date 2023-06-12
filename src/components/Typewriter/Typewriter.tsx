import './Typewriter.css';
import { TypewriterProperties } from './TypewriterTypes';
import { useTypewriter } from '../../hooks/useTypewriter';

function Typewriter({textsToType}: TypewriterProperties) {
  const { currentTypingText, currentText } = useTypewriter(textsToType);

  return (
    <span
      className="typewriter-cursor"
      aria-label={currentText}
    >
      {currentTypingText}
    </span>
  )
}

export default Typewriter;