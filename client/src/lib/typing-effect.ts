/**
 * Creates a typing effect for text
 * @param text The full text to type
 * @param onUpdate Callback function that receives the current text
 * @param speed Typing speed in milliseconds per character
 * @returns Cleanup function
 */
export function typingEffect(
  text: string,
  onUpdate: (text: string) => void,
  speed = 100
): () => void {
  let i = 0;
  const timer = setInterval(() => {
    if (i < text.length) {
      onUpdate(text.substring(0, i + 1));
      i++;
    } else {
      clearInterval(timer);
    }
  }, speed);

  return () => clearInterval(timer);
}
