import { motion } from "framer-motion";
import { 
  Github, 
  Instagram, 
  Mail, 
  Phone 
} from "lucide-react";
import Navigation from "@/components/Navigation";
import { fadeInUp, staggerContainer, slideInFromLeft } from "@/lib/animation";

const AboutSection = () => {
  return (
    <motion.section
      className="min-h-screen container mx-auto py-10 md:py-16 flex flex-col justify-center"
      variants={staggerContainer}
      initial="hidden"
      animate="show"
    >
      <div className="about-container flex flex-col md:flex-row items-center md:items-start gap-10 w-full max-w-6xl mx-auto px-4 md:px-6">
        <motion.div 
          className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-2 border-primary flex-shrink-0"
          variants={slideInFromLeft}
        >
          <img 
            src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        <div className="flex flex-col">
          <motion.h1 
            className="text-3xl md:text-4xl font-bold mb-6"
            variants={fadeInUp}
          >
            ABOUT ME
          </motion.h1>
          
          <motion.div 
            className="flex-1 max-w-2xl"
            variants={fadeInUp}
          >
            <p className="text-lg mb-6">
              Hello, my name is Aaron Loeb. I am 23 years old and have a hobby of photography. I am a photographer with 3 years experience as a food and landscape photography portrait photographer. I started my career in photographer since I was 19 years old.
            </p>
            
            <div className="flex gap-6 mt-8">
              {/* Social Links */}
              <motion.a 
                href="https://github.com/" 
                className="social-link text-white hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
              >
                <Github className="w-8 h-8" />
              </motion.a>
              <motion.a 
                href="https://instagram.com/" 
                className="social-link text-white hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
              >
                <Instagram className="w-8 h-8" />
              </motion.a>
              <motion.a 
                href="mailto:contact@example.com" 
                className="social-link text-white hover:text-primary"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
              >
                <Mail className="w-8 h-8" />
              </motion.a>
              <motion.a 
                href="tel:+1234567890" 
                className="social-link text-white hover:text-primary"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
              >
                <Phone className="w-8 h-8" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
      
      <Navigation currentSection="about" />
    </motion.section>
  );
};

export default AboutSection;
