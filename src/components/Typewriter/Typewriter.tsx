import './Typewriter.css';
import { TypewriterProperties } from './TypewriterInterfaces';
import { useTypewriter } from '../../hooks/useTypewriter';

function Typewriter(props: TypewriterProperties) {
  const { currentTypingText, currentText } = useTypewriter(props.textsToType);

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