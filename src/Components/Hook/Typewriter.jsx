import { useState, useEffect } from 'react';

function useTypewriter(text, speed = 1050, delay = 1000) {
  const [displayedText, setDisplayedText] = useState('');
  const [loop, setLoop] = useState(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, index + 1));
      index++;
      if (index === text.length) {
        clearInterval(interval);
        setTimeout(() => {
          setLoop(!loop); // Toggle loop to restart typing
        }, delay); // Delay before restarting the typewriter effect
      }
    }, speed);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [text, speed, loop]);

  return displayedText;
}

export default useTypewriter;
