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
          <div className="text-lg">
            <ul className="list-disc pl-6 space-y-3">
              <li>
                Hello, my name is Aaron Loeb. I am 23 years old and have a hobby of photography. I am a photographer with 3 years experience as a food and landscape photography portrait photographer. I started my career in photographer since I was 19 years old.
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
      
      <Navigation currentSection="projects" />
    </motion.section>
  );
};

export default ProjectsSection;
