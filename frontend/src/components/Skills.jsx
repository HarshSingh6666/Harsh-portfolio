import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Code, Server, Database, Cloud, BrainCircuit, ShieldAlert } from 'lucide-react';

const skillCategories = [
  { title: "Frontend Development", icon: <Code className="w-6 h-6 text-purple-400" />, skills: ["React.js", "JavaScript", "Tailwind CSS", "Framer Motion"] },
  { title: "Backend Development", icon: <Server className="w-6 h-6 text-blue-400" />, skills: ["Node.js", "Express.js", "Socket.io", "RESTful APIs"] },
  { title: "Databases", icon: <Database className="w-6 h-6 text-emerald-400" />, skills: ["MongoDB", "MySQL", "Mongoose"] },
  { title: "Cloud & Deployment", icon: <Cloud className="w-6 h-6 text-cyan-400" />, skills: ["Railway", "Render", "Netlify", "Git", "GitHub"] },
  { title: "AI & Modern Tech", icon: <BrainCircuit className="w-6 h-6 text-pink-400" />, skills: ["AI/ML Integrations", "Generative AI", "OpenAI APIs"] },
  { title: "Cybersecurity & Extras", icon: <ShieldAlert className="w-6 h-6 text-yellow-400" />, skills: ["Deception Technology", "System Automation", "Hardware Interfacing"] }
];

// ==========================================
// 3D Tilt Card Component
// ==========================================
const TiltCard = ({ category, index }) => {
  const ref = useRef(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring physics setup for mouse movement
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  // Map mouse coordinates to rotation values (e.g., -15 to 15 degrees)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    // Reset back to center when mouse leaves
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d", // Necessary for 3D effect
      }}
      className="group relative bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-sm cursor-pointer"
    >
      {/* 3D Inner Content Container - translateZ makes it pop out */}
      <div 
        style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }} 
        className="w-full h-full relative z-10 pointer-events-none"
      >
        <div className="flex items-center gap-3 mb-6 relative z-10">
          <div className="p-3 bg-white/5 rounded-lg border border-white/5 shadow-inner">
            {category.icon}
          </div>
          <h4 className="text-xl font-semibold text-gray-100">{category.title}</h4>
        </div>
        <div className="flex flex-wrap gap-2 relative z-10">
          {category.skills.map((skill, skillIndex) => (
            <span 
              key={skillIndex} 
              // Slightly push skills closer to viewer
              style={{ transform: "translateZ(20px)" }}
              className="px-3 py-1 text-sm bg-white/5 border border-white/10 rounded-full text-gray-300 pointer-events-auto hover:text-white hover:border-purple-500/50 hover:bg-purple-500/10 transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      
      {/* Glow Effect behind the card on hover */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10 pointer-events-none"
        style={{ transform: "translateZ(-30px)" }}
      ></div>
      
      {/* Solid border on hover */}
      <div className="absolute inset-0 border border-transparent group-hover:border-purple-500/50 rounded-2xl transition-colors duration-300 pointer-events-none"></div>
      
    </motion.div>
  );
};

// ==========================================
// Main Skills Section
// ==========================================
const Skills = () => {
  return (
    <section className="relative z-20 min-h-screen py-20 px-4 md:px-10 flex flex-col items-center justify-center border-t border-white/5">
      {/* Perspective wrapper - Crucial for the 3D effect to look real */}
      <div className="absolute inset-0 -z-10" style={{ perspective: "1000px" }}></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true, margin: "-100px" }} 
        transition={{ duration: 0.6 }} 
        className="text-center mb-16"
      >
        <h2 className="text-purple-400 font-medium tracking-widest text-sm uppercase mb-3">My Arsenal</h2>
        <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Skills</span>
        </h3>
      </motion.div>
      
      {/* Added perspective utility to the grid container as well */}
      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl" style={{ perspective: "1200px" }}>
        {skillCategories.map((category, index) => (
          <TiltCard key={index} category={category} index={index} />
        ))}
      </motion.div>
    </section>
  );
};

export default Skills;