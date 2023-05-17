import './Typewriter.css';
import { TypewriterProperties } from './typewriter-types';
import { TypewriterStatus, useTypewriter } from '../../hooks/useTypewriter';

function Typewriter(props: TypewriterProperties) {
  const { currentTypingText, currentText, status } = useTypewriter(props.textsToType);

  return (
    <h2>
      <span>{props.staticText}</span>{' '}
      <span
        className={
          `typewriter-cursor
           ${status !== TypewriterStatus.Deleting ? 'end-cursor' : ''}
           ${status === TypewriterStatus.Pausing ? 'blinking' : ''}`
        }
        aria-label={currentText}
      >
        {currentTypingText}
      </span>
    </h2>
  )
}

export default Typewriter;