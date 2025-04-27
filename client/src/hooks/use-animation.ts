
import { useEffect, useState } from 'react';

export const useAnimation = (initialValue: number, finalValue: number, duration: number = 1000) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const startTime = Date.now();
    const animationFrame = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setValue(initialValue + (finalValue - initialValue) * progress);

      if (progress < 1) {
        requestAnimationFrame(animationFrame);
      }
    };

    requestAnimationFrame(animationFrame);
  }, [initialValue, finalValue, duration]);

  return Math.round(value);
};
