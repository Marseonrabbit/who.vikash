import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useSectionStore } from "@/hooks/use-section";

interface NavigationProps {
  currentSection: string;
}

const Navigation = ({ currentSection }: NavigationProps) => {
  const { setActiveSection } = useSectionStore();

  const sections = [
    { id: "about", label: "About Me" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "books", label: "Books" },
  ];

  // Filter out the current section
  const filteredSections = sections.filter(section => section.id !== currentSection);

  return (
    <motion.div 
      className="flex flex-wrap justify-center gap-4 mt-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      {filteredSections.map((section) => (
        <Button
          key={section.id}
          variant="outline"
          className="nav-button px-8 py-3 rounded-full bg-card hover:bg-primary/10 text-foreground transition-all duration-300"
          onClick={() => setActiveSection(section.id)}
        >
          {section.label}
        </Button>
      ))}
    </motion.div>
  );
};

export default Navigation;
