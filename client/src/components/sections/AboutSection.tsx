import { motion } from "framer-motion";
import { 
  Github, 
  Instagram, 
  Mail, 
  Phone 
} from "lucide-react";
import Navigation from "@/components/Navigation";
import { fadeInUp, staggerContainer, slideInFromLeft } from "@/lib/animation";

// Import profile image from assets
import profileImage from "@assets/WhatsApp Image 2025-04-27 at 12.13.21 PM.jpeg";

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
          className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-2 border-primary flex-shrink-0"
          variants={slideInFromLeft}
        >
          <img 
            src={profileImage}
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
              Hi, I'm Vikash - part of HighSchool Hackers and currently working as a Cyber Security Operations Engineer at SafeAeon. I'm a passionate techie who loves to build and break things — always experimenting, always exploring. I'm driven by an endless curiosity to learn everything I can, and I live by the mindset: 'When you see a good move, look for a better one.'
            </p>
            
            <div className="flex gap-6 mt-8">
              {/* Social Links */}
              <motion.a 
                href="https://github.com/Marseonrabbit" 
                className="social-link text-white hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
              >
                <Github className="w-8 h-8" />
              </motion.a>
              <motion.a 
                href="https://www.instagram.com/vikashpoonia911?igsh=bzVlYzJ6OTI0ZDBo" 
                className="social-link text-white hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
              >
                <Instagram className="w-8 h-8" />
              </motion.a>
              <motion.a 
                href="mailto:vikashpoonia91165@gmail.com" 
                className="social-link text-white hover:text-primary"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
              >
                <Mail className="w-8 h-8" />
              </motion.a>
              <motion.a 
                href="tel:+919351988380" 
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
