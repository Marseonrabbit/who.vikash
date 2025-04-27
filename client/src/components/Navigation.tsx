import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useSectionStore } from "@/hooks/use-section";

interface NavigationProps {
  currentSection: 'about' | 'projects' | 'experience' | 'skills' | 'books';
}

const Navigation = ({ currentSection }: NavigationProps) => {
  const { setActiveSection } = useSectionStore();

  const sections = [
    { id: "about" as const, label: "About Me" },
    { id: "projects" as const, label: "Projects" },
    { id: "experience" as const, label: "Experience" },
    { id: "skills" as const, label: "Skills" },
    { id: "books" as const, label: "Books" },
  ];

  // Filter out the current section
  const filteredSections = sections.filter(section => section.id !== currentSection);

  return (
    <>
      <div className="section-separator mt-8"></div>
      <motion.div 
        className="flex flex-wrap justify-center gap-8 mt-4 mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        {filteredSections.map((section) => (
          <Button
            key={section.id}
            variant="ghost"
            className="nav-button px-8 py-2 text-foreground transition-all duration-300"
            onClick={() => setActiveSection(section.id)}
          >
            {section.label}
          </Button>
        ))}
      </motion.div>
    </>
  );
};

export default Navigation;
