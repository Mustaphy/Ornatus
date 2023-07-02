import { useEffect, useState } from 'react';

const typewriterStatuses = [
  'typing', 'pausing', 'deleting'
] as const;
type TypewriterStatus = typeof typewriterStatuses[number];

export const useTypewriter = (textsToType: string[]) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [status, setStatus] = useState<TypewriterStatus>('typing');
  const [currentTypingText, setCurrentTypingText] = useState('');

  const TYPING_SPEED = 100;
  const TYPING_PAUSE = 2000;
  const DELETING_SPEED = 70;
  const DELETING_PAUSE = 700;

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    switch (status) {
      case 'typing': {
        // Add a letter to the text that is displayed, to visualize the word slowly being typed
        const nextTextToType = textsToType[selectedIndex].slice(0, currentTypingText.length + 1);

        // Go to the next status if we completed writing the current text
        if (nextTextToType === currentTypingText) {
          setStatus('pausing');
          break;
        }

        timeout = setTimeout(() => {
          setCurrentTypingText(nextTextToType);
        }, TYPING_SPEED);

        break;
      }
      case 'pausing': {
        timeout = setTimeout(() => {
          setStatus('deleting');
        }, TYPING_PAUSE);

        break;
    }
      case 'deleting': {
        // Remove the last letter of the word, to visualize the word slowly being deleted
        // Is undefined when the word was already fully deleted
        const remainingText = currentTypingText.slice(0, -1);

        // If the text that is displayed is fully deleted, move on to the next text
        if (!currentTypingText) {
          timeout = setTimeout(() => {
            const nextIndex = selectedIndex + 1;
            setSelectedIndex(textsToType[nextIndex] ? nextIndex : 0);
            setStatus('typing');
          }, DELETING_PAUSE);
        }

        timeout = setTimeout(() => {
          setCurrentTypingText(remainingText);
        }, DELETING_SPEED);

        break;
      }
    }

    return () => clearTimeout(timeout);
  }, [textsToType, currentTypingText, selectedIndex, status]);

  return {
    currentTypingText,
    currentText: textsToType[selectedIndex]
  };
};
