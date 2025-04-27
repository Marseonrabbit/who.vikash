import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import ProjectsIcon from "@/components/icons/ProjectsIcon";
import { fadeInUp, staggerContainer, staggerItems } from "@/lib/animation";

const projects = [
  {
    id: 1,
    title: "Culinary Delights",
    description: "A collection of premium food photography for high-end restaurants in the city.",
    year: "2022-2023",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1981&q=80"
  },
  {
    id: 2,
    title: "Natural Wonders",
    description: "Exploring breathtaking landscapes across national parks and remote locations.",
    year: "2021-Present",
    image: "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 3,
    title: "Urban Portraits",
    description: "Street photography capturing authentic moments and personal stories.",
    year: "2020-2022",
    image: "https://images.unsplash.com/photo-1542596594-649edbc13630?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
  }
];

const ProjectsSection = () => {
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
        <ProjectsIcon className="w-8 h-8 mr-3 text-primary" />
        <h1 className="text-3xl md:text-4xl font-bold">PROJECTS</h1>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={staggerItems}
      >
        {projects.map((project, index) => (
          <motion.div 
            key={project.id}
            variants={fadeInUp}
            custom={index}
            className="group"
          >
            <Card className="bg-card rounded-lg overflow-hidden transition-transform duration-300 group-hover:-translate-y-2">
              <div className="h-60 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <CardContent className="p-5">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-muted-foreground">{project.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-primary text-sm">{project.year}</span>
                  <a href="#" className="text-foreground hover:text-primary transition-colors">View Gallery →</a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
      
      <Navigation currentSection="projects" />
    </motion.section>
  );
};

export default ProjectsSection;
