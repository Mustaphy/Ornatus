import { useEffect, useState } from 'react';

export enum TypewriterStatus {
  Typing,
  Pausing,
  Deleting,
}

const TYPING_SPEED = 100;
const TYPING_PAUSE = 2000;
const DELETING_SPEED = 70;
const DELETING_PAUSE = 700;

export const useTypewriter = (textsToType: string[]) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [status, setStatus] = useState(TypewriterStatus.Typing);
  const [currentTypingText, setCurrentTypingText] = useState('');

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    switch (status) {
      case TypewriterStatus.Typing:
        // Add a letter to the text that is displayed, to visualize the word slowly being typed
        const nextTextToType = textsToType[selectedIndex].slice(0, currentTypingText.length + 1);;

        // Go to the next status if we completed writing the current text
        if (nextTextToType === currentTypingText) {
          setStatus(TypewriterStatus.Pausing);
          break;
        }

        timeout = setTimeout(() => {
          setCurrentTypingText(nextTextToType);
        }, TYPING_SPEED);

        break;

      case TypewriterStatus.Pausing:
        timeout = setTimeout(() => {
          setStatus(TypewriterStatus.Deleting);
        }, TYPING_PAUSE);

        break;

      case TypewriterStatus.Deleting:
        // Remove the last letter of the word, to visualize the word slowly being deleted
        // Is undefined when the word was already fully deleted
        const remainingText = currentTypingText.slice(0, -1);

        // If the text that is displayed is fully deleted, move on to the next text
        if (!currentTypingText) {
          timeout = setTimeout(() => {
            const nextIndex = selectedIndex + 1;
            setSelectedIndex(textsToType[nextIndex] ? nextIndex : 0);
            setStatus(TypewriterStatus.Typing);
          }, DELETING_PAUSE);
        }

        timeout = setTimeout(() => {
          setCurrentTypingText(remainingText);
        }, DELETING_SPEED);

        break;
    }

    return () => clearTimeout(timeout);
  }, [textsToType, currentTypingText, selectedIndex, status]);

  return {
    currentTypingText,
    currentText: textsToType[selectedIndex],
    status,
  };
};
