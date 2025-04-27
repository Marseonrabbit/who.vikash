import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import ProjectsIcon from "@/components/icons/ProjectsIcon";
import { fadeInUp, staggerContainer } from "@/lib/animation";

const ProjectsSection = () => {
  return (
    <motion.section
      className="min-h-screen container mx-auto py-10 md:py-16 flex flex-col justify-center"
      variants={staggerContainer}
      initial="hidden"
      animate="show"
    >
      <div className="w-full max-w-6xl mx-auto px-4 md:px-6">
        <motion.div 
          className="flex items-center mb-8"
          variants={fadeInUp}
        >
          <ProjectsIcon className="w-8 h-8 mr-3 text-primary" />
          <h1 className="text-3xl md:text-4xl font-bold">PROJECTS</h1>
        </motion.div>
        
        <motion.div 
          className="space-y-4"
          variants={fadeInUp}
        >
          <div className="space-y-8">
            <div className="bg-card rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold mb-4">SR2000 – Multi-IP & Hash Analysis Tool</h3>
              <p className="text-lg mb-4">
                While working on a different task, I realized the need for a tool that could handle multiple IP analyses simultaneously — so I created SR2000. I developed the entire backend myself, and the tool is now live and actively used by others in the community.
              </p>
              
              <div className="space-y-2 mb-4">
                <p className="text-lg">Key Features:</p>
                <ul className="list-none space-y-2">
                  <li className="flex items-center">
                    <span className="text-primary mr-2">🔹</span>
                    Bulk IP analysis
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">🔹</span>
                    Multiple hash analysis support (MD5, SHA-1, SHA-256, etc.)
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">🔹</span>
                    OSINT integrations for enhanced investigation and threat intelligence
                  </li>
                </ul>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-primary">🛠️</span>
                <a 
                  href="https://sr2000.onrender.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Live demo
                </a>
                <button 
                  className="text-primary hover:underline ml-auto"
                  onClick={() => window.open('https://sr2000.onrender.com', '_blank')}
                >
                  Read more →
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      <Navigation currentSection="projects" />
    </motion.section>
  );
};

export default ProjectsSection;
