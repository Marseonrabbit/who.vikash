import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { typingEffect } from "@/lib/typing-effect";

// Import the dragon image
import dragontLogo from "@assets/1.png"; 

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const [prefix, setPrefix] = useState("");
  const [command, setCommand] = useState("");
  const typingTextRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    // First show the dragon image
    const timer1 = setTimeout(() => {
      // First type the prompt prefix
      const prefixText = "kali@Rabbit:~ ";
      const prefixCleanup = typingEffect(prefixText, (currentText) => {
        setPrefix(currentText);
      }, 100);
      
      // After prefix is done, start typing the whoami command
      const timer2 = setTimeout(() => {
        const commandText = "whoami";
        const commandCleanup = typingEffect(commandText, (currentText) => {
          setCommand(currentText);
        }, 150);
        
        // After typing is done, wait and then transition to main content
        setTimeout(() => {
          onComplete();
        }, 2500);
        
        return commandCleanup;
      }, prefixText.length * 100 + 300); // Wait for prefix typing to complete + small pause
      
      return () => {
        prefixCleanup();
        clearTimeout(timer2);
      };
    }, 2000);

    return () => clearTimeout(timer1);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
    >
      {/* Dragon Image */}
      <motion.div
        className="w-64 h-64 mb-12 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <img 
          src={dragontLogo} 
          alt="Dragon Logo" 
          className="max-w-full max-h-full object-contain" 
        />
      </motion.div>
      
      {/* Terminal Text */}
      <motion.div
        className="terminal-text text-lg md:text-xl mt-4 font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <span className="text-primary">{prefix}</span>
        <span ref={typingTextRef}>{command}</span>
        <span className="terminal-cursor"></span>
      </motion.div>
    </motion.div>
  );
};

export default IntroAnimation;
