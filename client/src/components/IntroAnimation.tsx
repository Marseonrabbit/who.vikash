import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { typingEffect } from "@/lib/typing-effect";

// Import the dragon image
import dragontLogo from "@assets/1.png"; 

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const [prefix, setPrefix] = useState("");
  const [command, setCommand] = useState("");
  const [showDragon, setShowDragon] = useState(true);
  const [showTerminal, setShowTerminal] = useState(false);
  const typingTextRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    // First show the dragon image for a few seconds
    const timer1 = setTimeout(() => {
      // Then fade out the dragon
      setShowDragon(false);
      
      // After dragon fades out, show terminal
      const timer2 = setTimeout(() => {
        setShowTerminal(true);
        
        // Start typing the prompt prefix
        const prefixText = "kali@Rabbit:~ ";
        const prefixCleanup = typingEffect(prefixText, (currentText) => {
          setPrefix(currentText);
        }, 100);
        
        // After prefix is done, start typing the whoami command
        const timer3 = setTimeout(() => {
          const commandText = "whoami";
          const commandCleanup = typingEffect(commandText, (currentText) => {
            setCommand(currentText);
          }, 150);
          
          // After typing is done, wait and then transition to main content
          setTimeout(() => {
            onComplete();
          }, 2000);
          
          return commandCleanup;
        }, prefixText.length * 100 + 300); // Wait for prefix typing to complete + small pause
        
        return () => {
          prefixCleanup();
          clearTimeout(timer3);
        };
      }, 800); // Wait for dragon to fade out
      
      return () => clearTimeout(timer2);
    }, 2500); // Show dragon for 2.5 seconds

    return () => clearTimeout(timer1);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
    >
      {/* Dragon Image */}
      <AnimatePresence>
        {showDragon && (
          <motion.div
            className="w-[400px] h-[400px] flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src={dragontLogo} 
              alt="Dragon Logo" 
              className="max-w-full max-h-full object-contain" 
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Terminal Text */}
      {showTerminal && (
        <motion.div
          className="terminal-text text-xl md:text-2xl font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary">{prefix}</span>
          <span ref={typingTextRef}>{command}</span>
          <span className="terminal-cursor"></span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default IntroAnimation;
