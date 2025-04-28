import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import CoursesIcon from "@/components/icons/CoursesIcon";
import { fadeInUp, staggerContainer, staggerItems } from "@/lib/animation";

interface Course {
  id: number;
  title: string;
  description: string;
}

const courses: Course[] = [
  {
    id: 1,
    title: "CompTIA IT Fundamentals+",
    description: "Introduction to basic IT concepts, hardware, software, security, and troubleshooting."
  },
  {
    id: 2,
    title: "CompTIA A+ Core 1",
    description: "Focused on mobile devices, networking technology, hardware, virtualization, and cloud computing."
  },
  {
    id: 3,
    title: "CompTIA A+ Core 2",
    description: "Covered operating systems, security, software troubleshooting, and operational procedures."
  },
  {
    id: 4,
    title: "CompTIA Network+",
    description: "In-depth training on networking concepts, infrastructure, operations, and security."
  },
  {
    id: 5,
    title: "CompTIA Security+",
    description: "Comprehensive coverage of core security functions including risk management, threat analysis, and incident response."
  },
  {
    id: 6,
    title: "CompTIA PenTest+",
    description: "Training on penetration testing methodologies, vulnerability assessment, and exploitation techniques."
  },
  {
    id: 7,
    title: "CompTIA Linux+",
    description: "Linux system administration, scripting, security, and troubleshooting in enterprise environments."
  },
  {
    id: 8,
    title: "Python for Complete Automation",
    description: "Developed automation scripts for security operations, data handling, and system tasks."
  },
  {
    id: 9,
    title: "Bash for Automation",
    description: "Focused on automating repetitive system and network tasks in Unix/Linux environments."
  }
];

const CoursesSection = () => {
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
          <CoursesIcon className="w-8 h-8 mr-3 text-primary" />
          <h1 className="text-3xl md:text-4xl font-bold">COURSES & CERTIFICATIONS</h1>
        </motion.div>
        
        <motion.div 
          className="space-y-6"
          variants={staggerItems}
        >
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              className="bg-card rounded-lg p-6 hover:shadow-lg transition-shadow"
              variants={fadeInUp}
              custom={index}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-1">
                  <div className="w-2 h-2 rounded-full bg-primary mr-4"></div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                  <p className="text-muted-foreground">{course.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <Navigation currentSection="courses" />
      </div>
    </motion.section>
  );
};

export default CoursesSection;