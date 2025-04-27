import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import Navigation from "@/components/Navigation";
import SkillsIcon from "@/components/icons/SkillsIcon";
import { fadeInUp, staggerContainer, staggerItems } from "@/lib/animation";
import { Camera, Layers, ShoppingBag, User } from "lucide-react";

const technicalSkills = [
  { name: "Photography Composition", percentage: 95 },
  { name: "Lighting Techniques", percentage: 90 },
  { name: "Post-Processing (Lightroom)", percentage: 85 },
  { name: "Photo Manipulation (Photoshop)", percentage: 80 },
  { name: "Studio Equipment", percentage: 75 }
];

const specialtySkills = [
  { 
    name: "Food Photography", 
    description: "Culinary shoots, restaurant menus, food styling.",
    icon: <Layers className="w-10 h-10 mb-4 text-primary" />
  },
  { 
    name: "Landscape", 
    description: "Natural vistas, cityscapes, environmental.",
    icon: <Camera className="w-10 h-10 mb-4 text-primary" />
  },
  { 
    name: "Portraiture", 
    description: "Headshots, lifestyle, environmental portraits.",
    icon: <User className="w-10 h-10 mb-4 text-primary" />
  },
  { 
    name: "Commercial", 
    description: "Product photography, branding, e-commerce.",
    icon: <ShoppingBag className="w-10 h-10 mb-4 text-primary" />
  }
];

const SkillsSection = () => {
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
          <SkillsIcon className="w-8 h-8 mr-3 text-primary" />
          <h1 className="text-3xl md:text-4xl font-bold">SKILLS</h1>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
          {/* Technical Skills */}
          <motion.div variants={fadeInUp}>
            <h2 className="text-2xl font-semibold mb-6 text-primary">Technical Skills</h2>
            
            <motion.div 
              className="space-y-6"
              variants={staggerItems}
            >
              {technicalSkills.map((skill, index) => (
                <motion.div key={skill.name} variants={fadeInUp} custom={index}>
                  <div className="flex justify-between mb-1">
                    <span>{skill.name}</span>
                    <span className="text-primary">{skill.percentage}%</span>
                  </div>
                  <Progress value={skill.percentage} className="h-2" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Photography Specialties */}
          <motion.div variants={fadeInUp}>
            <h2 className="text-2xl font-semibold mb-6 text-primary">Photography Specialties</h2>
            
            <motion.div 
              className="grid grid-cols-2 gap-4"
              variants={staggerItems}
            >
              {specialtySkills.map((specialty, index) => (
                <motion.div 
                  key={specialty.name} 
                  className="p-5 bg-card rounded-lg transition-transform duration-300 hover:-translate-y-1"
                  variants={fadeInUp}
                  custom={index}
                >
                  {specialty.icon}
                  <h3 className="text-lg font-medium mb-2">{specialty.name}</h3>
                  <p className="text-muted-foreground text-sm">{specialty.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
        
        <Navigation currentSection="skills" />
      </div>
    </motion.section>
  );
};

export default SkillsSection;
