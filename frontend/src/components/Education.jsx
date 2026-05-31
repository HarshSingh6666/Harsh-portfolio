import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase } from 'lucide-react';

const timelineData = [
  { type: 'education', title: "B.Tech in Computer Science and Engineering", organization: "Kashi Institute of Technology (AKTU)", date: "Pre-final Year (3rd Year)", description: "Focusing on core computer science concepts, Full-Stack Web Development (MERN), and integrating Artificial Intelligence into software projects.", icon: <GraduationCap className="w-5 h-5 text-purple-400" /> },
  { type: 'experience', title: "Candidate / Trainee", organization: "Site Guru Pvt. Ltd.", date: "May 2026", description: "Completed Level-2 technical assessment for internship. Engaged in advanced web development tasks and problem-solving.", icon: <Briefcase className="w-5 h-5 text-cyan-400" /> }
];

const Education = () => {
  return (
    <section className="relative z-20 min-h-screen py-20 px-4 md:px-10 flex flex-col items-center justify-center border-t border-white/5">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
        <h2 className="text-purple-400 font-medium tracking-widest text-sm uppercase mb-3">Journey</h2>
        <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          Education & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Experience</span>
        </h3>
      </motion.div>

      <div className="max-w-3xl w-full relative">
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 via-white/10 to-transparent transform md:-translate-x-1/2" />
        {timelineData.map((item, index) => (
          <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.3 }} className={`flex flex-col md:flex-row items-start mb-12 relative ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
            <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-[#050505] border border-white/20 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
              {item.icon}
            </div>
            <div className={`ml-20 md:ml-0 w-full md:w-[45%] bg-white/[0.02] border border-white/10 p-6 rounded-2xl backdrop-blur-sm hover:border-purple-500/30 transition-colors ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
              <span className="text-sm font-medium text-purple-400 tracking-wider mb-2 block">{item.date}</span>
              <h4 className="text-xl font-bold text-gray-100 mb-1">{item.title}</h4>
              <h5 className="text-md text-gray-400 mb-4">{item.organization}</h5>
              <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Education;