import { motion } from "framer-motion";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import ProjectsIcon from "@/components/icons/ProjectsIcon";
import { fadeInUp, staggerContainer } from "@/lib/animation";

const ProjectsSection = () => {
  const [expanded, setExpanded] = useState(false);
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
              <h2 className="text-3xl font-bold mb-4">Project 1: SR2000 – Multi-IP & Hash Analysis Tool</h2>
              {expanded ? (
                <>
                  <p className="text-lg mb-4">
                    While working with our SOC team, we ran into a recurring issue analyzing multiple IP addresses one at a time was inefficient and time-consuming. To solve this, I created SR2000, a custom tool that enables bulk IP analysis, streamlining the workflow for security teams.
                  </p>
                  <p className="text-lg mb-4">
                    I developed the entire backend from scratch and deployed it for public use. The tool is now live and actively used by analysts and peers in the community.
                  </p>
                </>
              ) : (
                <p className="text-lg mb-4">
                  A custom tool that enables bulk IP analysis and hash verification, streamlining security teams' workflow...
                </p>
              )}
              
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
                  sr2000.onrender.com
                </a>
                <button 
                  className="text-primary hover:underline ml-auto"
                  onClick={() => setExpanded(!expanded)}
                >
                  {expanded ? "Show less ←" : "Read more →"}
                </button>
              </div>
            </div>
            
            <div className="bg-card rounded-lg p-6 hover:shadow-lg transition-shadow mt-8">
              <h2 className="text-3xl font-bold mb-4">Project 2: Advanced Metadata Extraction Tool</h2>
              {expanded ? (
                <>
                  <p className="text-lg mb-4">
                    I developed an advanced metadata extraction tool capable of retrieving detailed metadata from various file types including documents, images, PDFs, audio, and more. The tool supports deep inspection and analysis, making it useful for digital forensics, red teaming, and OSINT investigations.
                  </p>
                  <div className="space-y-2 mb-4">
                    <p className="text-lg">Key Features:</p>
                    <ul className="list-none space-y-2">
                      <li className="flex items-center">
                        <span className="text-primary mr-2">🔹</span>
                        Multi-format support (Documents, Images, PDFs, Audio)
                      </li>
                      <li className="flex items-center">
                        <span className="text-primary mr-2">🔹</span>
                        Deep metadata inspection and analysis
                      </li>
                      <li className="flex items-center">
                        <span className="text-primary mr-2">🔹</span>
                        Digital forensics and OSINT capabilities
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <p className="text-lg mb-4">
                  An advanced tool for extracting and analyzing metadata from various file types...
                </p>
              )}
              <div className="flex justify-end mt-4">
                <button 
                  className="text-primary hover:underline"
                  onClick={() => setExpanded(!expanded)}
                >
                  {expanded ? "Show less ←" : "Read more →"}
                </button>
              </div>
            </div>

            <div className="bg-card rounded-lg p-6 hover:shadow-lg transition-shadow mt-8">
              <h2 className="text-3xl font-bold mb-4">Project 3: Hacked the RFID Tech of Jaipur Metro Station</h2>
              {expanded ? (
                <>
                  <p className="text-lg mb-4">
                    In this project, I explored vulnerabilities in the Jaipur Metro's RFID-based fare system. I developed an Android application that could read and regenerate the RFID tokens (metro coins), allowing them to be reused multiple times.
                  </p>
                  <div className="space-y-2 mb-4">
                    <p className="text-lg">Approach:</p>
                    <ul className="list-none space-y-2">
                      <li className="flex items-center">
                        <span className="text-primary mr-2">🔹</span>
                        RFID Token Cloning: Using an RFID reader and my Android application, I successfully read the unique identification data from Jaipur Metro's RFID tokens.
                      </li>
                      <li className="flex items-center">
                        <span className="text-primary mr-2">🔹</span>
                        App Development: The application I created was capable of regenerating the RFID data onto new, blank tags, effectively cloning the metro token for repeated use.
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-2 mb-4">
                    <p className="text-lg">Findings:</p>
                    <ul className="list-none space-y-2">
                      <li className="flex items-center">
                        <span className="text-primary mr-2">🔹</span>
                        The metro's RFID system lacked robust encryption, allowing the cloned tokens to be used repeatedly without detection.
                      </li>
                      <li className="flex items-center">
                        <span className="text-primary mr-2">🔹</span>
                        This vulnerability could lead to unauthorized access to the metro system, enabling fare evasion.
                      </li>
                    </ul>
                  </div>
                  <p className="text-lg mb-4">
                    This project highlighted the weaknesses in Jaipur Metro's RFID ticketing system. By exposing these vulnerabilities, I aimed to raise awareness about the importance of securing fare collection systems and recommended measures to improve system integrity.
                  </p>
                </>
              ) : (
                <p className="text-lg mb-4">
                  A security research project exploring vulnerabilities in the Jaipur Metro's RFID-based fare system...
                </p>
              )}
              <div className="flex justify-end mt-4">
                <button 
                  className="text-primary hover:underline"
                  onClick={() => setExpanded(!expanded)}
                >
                  {expanded ? "Show less ←" : "Read more →"}
                </button>
              </div>
            </div>

            <div className="bg-card rounded-lg p-6 hover:shadow-lg transition-shadow mt-8">
              <h2 className="text-3xl font-bold mb-4">Project 4: Developed an Android RAT Using a Free Music Streaming App</h2>
              {expanded ? (
                <>
                  <p className="text-lg mb-4">
                    In this project, I explored the security vulnerabilities in Android applications by modifying a free music streaming app to inject malicious code, gaining access to the device's camera, microphone, location, and keystrokes. After open sourcing the code, I deleted it to prevent malicious use.
                  </p>
                  <div className="space-y-2 mb-4">
                    <p className="text-lg">Key Findings:</p>
                    <ul className="list-none space-y-2">
                      <li className="flex items-center">
                        <span className="text-primary mr-2">⚠️</span>
                        Successfully demonstrated how seemingly harmless apps could be modified for malicious purposes
                      </li>
                      <li className="flex items-center">
                        <span className="text-primary mr-2">🔹</span>
                        Gained insights into Android app security vulnerabilities
                      </li>
                      <li className="flex items-center">
                        <span className="text-primary mr-2">🔹</span>
                        Highlighted the importance of thorough app security testing
                      </li>
                    </ul>
                  </div>
                  <div className="bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-lg mb-4">
                    <p className="text-sm">
                      <strong>Warning:</strong> This project was aimed at highlighting the importance of app security and the potential risks of malicious software. I strongly discourage any malicious use of the code and believe that the insights gained should only be used for improving security and protecting users.
                    </p>
                  </div>
                </>
              ) : (
                <p className="text-lg mb-4">
                  A security research project exploring Android application vulnerabilities through code injection...
                </p>
              )}
              <div className="flex justify-end mt-4">
                <button 
                  className="text-primary hover:underline"
                  onClick={() => setExpanded(!expanded)}
                >
                  {expanded ? "Show less ←" : "Read more →"}
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
