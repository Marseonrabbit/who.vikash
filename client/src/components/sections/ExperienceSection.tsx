import { motion } from "framer-motion";
import {
  Badge,
} from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Navigation from "@/components/Navigation";
import ExperienceIcon from "@/components/icons/ExperienceIcon";
import { fadeInUp, staggerContainer, staggerItems } from "@/lib/animation";

const experiences = [
  {
    id: 1,
    title: "Freelance Photographer",
    period: "2022 - Present",
    description: "Working with various clients on food photography, product shoots, and landscape photography for publications.",
    skills: ["Food Photography", "Landscape", "Editorial"]
  },
  {
    id: 2,
    title: "Assistant Photographer",
    period: "2021 - 2022",
    description: "Worked with established photographers on various commercial projects, learning professional techniques and client management.",
    skills: ["Studio Work", "Commercial", "Lighting"]
  },
  {
    id: 3,
    title: "Photography Internship",
    period: "2020 - 2021",
    description: "Learned fundamental photography skills and post-processing techniques at a local studio.",
    skills: ["Basics", "Post-processing", "Client Relations"]
  }
];

const ExperienceSection = () => {
  return (
    <motion.section
      className="min-h-screen container mx-auto px-4 md:px-6 py-16"
      variants={staggerContainer}
      initial="hidden"
      animate="show"
    >
      <motion.div 
        className="flex items-center mb-12"
        variants={fadeInUp}
      >
        <ExperienceIcon className="w-8 h-8 mr-3 text-primary" />
        <h1 className="text-3xl md:text-4xl font-bold">EXPERIENCE</h1>
      </motion.div>
      
      <motion.div 
        className="space-y-12 w-full max-w-6xl mx-auto"
        variants={staggerItems}
      >
        {experiences.map((experience, index) => (
          <motion.div
            key={experience.id}
            className="relative pl-8 border-l-2 border-primary"
            variants={fadeInUp}
            custom={index}
          >
            <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary"></div>
            <div className="mb-8">
              <div className="flex flex-wrap justify-between items-center mb-2">
                <h3 className="text-xl font-semibold">{experience.title}</h3>
                <span className="text-primary text-sm">{experience.period}</span>
              </div>
              <p className="text-muted-foreground mb-4">{experience.description}</p>
              <div className="flex flex-wrap gap-2">
                {experience.skills.map(skill => (
                  <Badge key={skill} variant="outline" className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      <Navigation currentSection="experience" />
    </motion.section>
  );
};

export default ExperienceSection;
