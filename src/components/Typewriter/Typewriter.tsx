import './Typewriter.css';
import { TypewriterProperties } from './typewriter-types';
import { useTypewriter } from '../../hooks/useTypewriter';

function Typewriter(props: TypewriterProperties) {
  const { currentTypingText, currentText } = useTypewriter(props.textsToType);

  return (
    <h2>
      <span>{props.staticText}</span>{' '}
      <span
        className="typewriter-cursor"
        aria-label={currentText}
      >
        {currentTypingText}
      </span>
    </h2>
  )
}

export default Typewriter;