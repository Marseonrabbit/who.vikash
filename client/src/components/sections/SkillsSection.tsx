import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import Navigation from "@/components/Navigation";
import SkillsIcon from "@/components/icons/SkillsIcon";
import { fadeInUp, staggerContainer, staggerItems } from "@/lib/animation";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { useState } from "react";

const technicalSkills = [
  { name: "Photography Composition", percentage: 95 },
  { name: "Lighting Techniques", percentage: 90 },
  { name: "Post-Processing (Lightroom)", percentage: 85 },
  { name: "Photo Manipulation (Photoshop)", percentage: 80 },
  { name: "Studio Equipment", percentage: 75 }
];

// Skills for radar chart
const skillsData = [
  { subject: 'Composition', A: 95, fullMark: 100 },
  { subject: 'Lighting', A: 90, fullMark: 100 },
  { subject: 'Creativity', A: 85, fullMark: 100 },
  { subject: 'Technical', A: 80, fullMark: 100 },
  { subject: 'Post-Processing', A: 85, fullMark: 100 },
  { subject: 'Client Relations', A: 88, fullMark: 100 },
  { subject: 'Adaptability', A: 92, fullMark: 100 },
  { subject: 'Attention to Detail', A: 93, fullMark: 100 },
];

const SkillsSection = () => {
  // State to manage updated skill data
  const [radarData, setRadarData] = useState(skillsData);

  // Function to update skills - this can be triggered when new skills are added or modified
  const updateSkillData = (newSkill: { subject: string; A: number; fullMark: number }) => {
    // Check if skill already exists
    const existingIndex = radarData.findIndex(item => item.subject === newSkill.subject);
    
    if (existingIndex >= 0) {
      // Update existing skill
      const updatedData = [...radarData];
      updatedData[existingIndex] = newSkill;
      setRadarData(updatedData);
    } else {
      // Add new skill
      setRadarData([...radarData, newSkill]);
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
          
          {/* Skills Radar Chart */}
          <motion.div variants={fadeInUp}>
            <h2 className="text-2xl font-semibold mb-6 text-primary">Skills Overview</h2>
            
            <motion.div
              className="w-full h-[400px] bg-card p-6 rounded-lg relative overflow-hidden"
              variants={fadeInUp}
              style={{ background: 'linear-gradient(180deg, #0a1629 0%, #112240 100%)' }}
            >
              <div className="absolute top-0 left-0 w-full text-center py-2 text-sm text-gray-300">
                PHOTOGRAPHY SKILLS OVERVIEW
              </div>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="rgba(255, 255, 255, 0.3)" />
                  <PolarAngleAxis 
                    dataKey="subject" 
                    tick={{ fill: '#fff', fontSize: 12 }} 
                    stroke="rgba(255, 255, 255, 0.5)"
                  />
                  <PolarRadiusAxis 
                    angle={30} 
                    domain={[0, 100]} 
                    tick={{ fill: '#fff' }} 
                    stroke="rgba(255, 255, 255, 0.3)"
                    axisLine={false}
                  />
                  <Radar
                    name="Skills"
                    dataKey="A"
                    stroke="#4d86ff"
                    fill="#4d86ff"
                    fillOpacity={0.6}
                  />
                  <Radar
                    name="Baseline"
                    dataKey="fullMark"
                    stroke="rgba(255, 255, 255, 0.1)"
                    fill="none"
                    strokeWidth={1}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </motion.div>
          </motion.div>
        </div>
        
        <Navigation currentSection="skills" />
      </div>
    </motion.section>
  );
};

export default SkillsSection;