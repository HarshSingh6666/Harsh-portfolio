import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Server, Bot, Code2, Database } from 'lucide-react';

const servicesData = [
  { num: "01", title: "Full-Stack Web Development", description: "Building fast, responsive, and scalable web applications from scratch using the MERN stack.", icon: <Layout className="w-8 h-8 text-purple-400" /> },
  { num: "02", title: "GenAI & LLM Integration", description: "Embedding smart AI features into existing products like intelligent chatbots and automated documentation tools.", icon: <Bot className="w-8 h-8 text-cyan-400" /> },
  { num: "03", title: "Backend Architecture & APIs", description: "Designing robust server-side architectures, RESTful APIs, and real-time data streaming setups.", icon: <Server className="w-8 h-8 text-blue-400" /> },
  { num: "04", title: "Frontend & UI/UX Engineering", description: "Crafting intuitive, pixel-perfect, and highly interactive user interfaces using React.js and Tailwind.", icon: <Code2 className="w-8 h-8 text-pink-400" /> },
  { num: "05", title: "Database Design & Cloud Deployment", description: "Structuring complex data models and securely deploying applications on cloud platforms.", icon: <Database className="w-8 h-8 text-emerald-400" /> }
];

const Services = () => {
  return (
    <section className="relative z-20 min-h-screen py-20 px-4 md:px-10 flex flex-col items-center justify-center border-t border-white/5 overflow-hidden">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="text-center mb-20">
        <h2 className="text-purple-400 font-medium tracking-widest text-sm uppercase mb-3">What I Do</h2>
        <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          My <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Services</span>
        </h3>
      </motion.div>
      <div className="w-full max-w-5xl flex flex-col gap-6">
        {servicesData.map((service, index) => (
          <motion.div key={index} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: index * 0.1 }} className="group relative flex flex-col md:flex-row items-start md:items-center gap-6 bg-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm hover:bg-white/[0.04] hover:border-purple-500/40 transition-all duration-300 overflow-hidden">
            <div className="absolute -right-4 -bottom-8 text-[120px] font-black text-white/[0.02] group-hover:text-purple-500/[0.05] transition-colors pointer-events-none select-none">{service.num}</div>
            <div className="relative z-10 flex-shrink-0 p-4 bg-black/40 border border-white/10 rounded-xl shadow-inner">{service.icon}</div>
            <div className="relative z-10 flex-1">
              <h4 className="text-2xl font-bold text-gray-100 mb-2">{service.title}</h4>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-3xl">{service.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;