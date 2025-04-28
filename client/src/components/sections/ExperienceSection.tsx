import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import ExperienceIcon from "@/components/icons/ExperienceIcon";
import { fadeInUp, staggerContainer, staggerItems } from "@/lib/animation";
import { useState } from "react";

interface Experience {
  id: number;
  title: string;
  period: string;
  description: string;
  skills: string[];
  details?: {
    responsibilities?: string[];
    achievements?: string[];
  };
}

const experiences: Experience[] = [
  {
    id: 1,
    title: "SEO & Digital Marketer – Digital Miles, Jaipur",
    period: "February 2023 – March 2024",
    description: "Acted as the primary point of contact for multiple clients, handling SEO and Google Ads campaigns while providing detailed performance analysis.",
    skills: ["SEO", "Google Ads", "Client Management", "Digital Strategy"],
    details: {
      responsibilities: [
        "Client Handling: Acted as the primary point of contact for multiple clients, understanding their goals and creating tailored digital marketing strategies.",
        "SEO Management: Handled on-page and off-page SEO for various client websites, conducted keyword research, competitor analysis, and implemented content strategies to improve search engine rankings.",
        "Google Ads Optimization: Managed and optimized Google Ads campaigns to maximize ROI. This included setting up campaigns, A/B testing ad creatives, refining target audiences, and monitoring performance metrics.",
        "Reporting & Analysis: Created monthly performance reports using Google Analytics and Google Ads dashboards to provide actionable insights to clients.",
        "Collaboration: Worked closely with design and content teams to align marketing efforts and ensure consistent brand messaging across digital platforms."
      ],
      achievements: [
        "Increased organic traffic for key clients by up to 46% through strategic SEO improvements.",
        "Reduced Google Ads CPC by 40% on average while improving conversion rates.",
        "Successfully managed 10+ client accounts simultaneously with consistent positive feedback."
      ]
    }
  },
  {
    id: 2,
    title: "Freelance Photographer",
    period: "2022 - Present",
    description: "Working with various clients on food photography, product shoots, and landscape photography for publications.",
    skills: ["Food Photography", "Landscape", "Editorial"]
  },
  {
    id: 3,
    title: "Assistant Photographer",
    period: "2021 - 2022",
    description: "Worked with established photographers on various commercial projects, learning professional techniques and client management.",
    skills: ["Studio Work", "Commercial", "Lighting"]
  },
  {
    id: 4,
    title: "Photography Internship",
    period: "2020 - 2021",
    description: "Learned fundamental photography skills and post-processing techniques at a local studio.",
    skills: ["Basics", "Post-processing", "Client Relations"]
  }
];

const ExperienceSection = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

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
          <ExperienceIcon className="w-8 h-8 mr-3 text-primary" />
          <h1 className="text-3xl md:text-4xl font-bold">EXPERIENCE</h1>
        </motion.div>
        
        <motion.div 
          className="space-y-8 w-full"
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
                <div className="flex flex-wrap gap-2 mb-3">
                  {experience.skills.map(skill => (
                    <Badge key={skill} variant="outline" className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
                
                {expandedId === experience.id && experience.details && (
                  <div className="mt-4 mb-6 bg-card/50 p-4 rounded-md border border-primary/20">
                    {experience.details.responsibilities && (
                      <div className="mb-4">
                        <h4 className="text-lg font-medium mb-2 text-primary">Responsibilities:</h4>
                        <ul className="list-none space-y-2">
                          {experience.details.responsibilities.map((responsibility, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-primary mr-2 mt-1">▹</span>
                              <span>{responsibility}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {experience.details.achievements && (
                      <div>
                        <h4 className="text-lg font-medium mb-2 text-primary">Key Achievements:</h4>
                        <ul className="list-none space-y-2">
                          {experience.details.achievements.map((achievement, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-primary mr-2 mt-1">✓</span>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="flex justify-end">
                  <button 
                    onClick={() => toggleExpand(experience.id)}
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    {expandedId === experience.id ? "Show Less ←" : "Read More →"}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <Navigation currentSection="experience" />
      </div>
    </motion.section>
  );
};

export default ExperienceSection;
