import { AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import IntroAnimation from "@/components/IntroAnimation";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import SkillsSection from "@/components/sections/SkillsSection";
import BooksSection from "@/components/sections/BooksSection";
import { useSectionStore } from "@/hooks/use-section";

function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const { activeSection } = useSectionStore();

  // Skip intro animation if returning to site (for development purposes mainly)
  useEffect(() => {
    const hasVisitedBefore = sessionStorage.getItem("visited");
    if (hasVisitedBefore) {
      setIntroComplete(true);
    } else {
      sessionStorage.setItem("visited", "true");
    }
  }, []);

  return (
    <TooltipProvider>
      <AnimatePresence>
        {!introComplete && (
          <IntroAnimation onComplete={() => setIntroComplete(true)} />
        )}
      </AnimatePresence>
      
      <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <Toaster />
        <AnimatePresence mode="wait">
          {introComplete && (
            <>
              {activeSection === "about" && <AboutSection key="about" />}
              {activeSection === "projects" && <ProjectsSection key="projects" />}
              {activeSection === "experience" && <ExperienceSection key="experience" />}
              {activeSection === "skills" && <SkillsSection key="skills" />}
              {activeSection === "books" && <BooksSection key="books" />}
            </>
          )}
        </AnimatePresence>
      </main>
    </TooltipProvider>
  );
}

export default App;
