import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import DragonIcon from "@/components/icons/DragonIcon";
import { typingEffect } from "@/lib/typing-effect";

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const [typedText, setTypedText] = useState("");
  const typingTextRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      const text = "kali@Rabbit:~ whoami";
      const cleanup = typingEffect(text, (currentText) => {
        setTypedText(currentText);
      }, 100);

      // After typing is done, wait and then transition to main content
      setTimeout(() => {
        onComplete();
      }, 2500);

      return cleanup;
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
    >
      <motion.div
        className="w-48 h-48 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <DragonIcon className="w-full h-full text-primary" />
      </motion.div>
      
      <motion.div
        className="terminal-text text-lg md:text-xl mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <span ref={typingTextRef}>{typedText}</span>
        <span className="terminal-cursor"></span>
      </motion.div>
    </motion.div>
  );
};

export default IntroAnimation;
