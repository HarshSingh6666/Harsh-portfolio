import React from 'react';
import { motion } from 'framer-motion';

const projectsList = [
  {
    num: "01",
    title: "Aura-chat",
    subtitle: "Real-Time Communication Platform",
    description: "A feature-rich chat application with seamless MERN backend and Socket.io. Delivering low-latency data streaming and intuitive user interaction for modern teams.",
    tech: ["React.js", "Socket.io", "Node.js", "MERN", "Railway"],
    liveLink: "#",
    githubLink: "#",
    mockupColor: "from-purple-900/40 via-black to-black",
  },
  {
    num: "02",
    title: "DeviDocs",
    subtitle: "AI-Integrated Documentation System",
    description: "An automated solution built to generate code documentation and synopsis using cutting-edge Generative AI models. Designed to boost developer productivity.",
    tech: ["MERN Stack", "GenAI", "OpenAI APIs", "Prompt Engineering"],
    liveLink: "#",
    githubLink: "#",
    mockupColor: "from-cyan-900/40 via-black to-black",
  },
  {
    num: "03",
    title: "Library Management",
    subtitle: "Comprehensive Admin Dashboard",
    description: "A robust dashboard managing complex book inventories, user authentication, and data schemas with high reliability and clean UX.",
    tech: ["React", "Node.js", "MySQL", "Admin Dashboard"],
    liveLink: "#",
    githubLink: "#",
    mockupColor: "from-emerald-900/40 via-black to-black",
  }
];

const Projects = () => {
  return (
    // DHYAN DEIN: Yahan se 'overflow-hidden' hata diya hai taaki sticky scroll kaam kare
    <section className="relative z-20 py-20 px-4 md:px-10 flex flex-col items-center justify-center border-t border-white/5">
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-20"
      >
        <h2 className="text-purple-400 font-medium tracking-widest text-sm uppercase mb-3">
          My Creations
        </h2>
        <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
          Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Projects</span>
        </h3>
      </motion.div>

      {/* Projects List Container (Extra gap and padding for smooth scrolling) */}
      <div className="w-full max-w-7xl flex flex-col gap-32 pb-32">
        {projectsList.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            // STICKY MAGIC LAGA DIYA HAI YAHAN 👇
            className="sticky group relative flex flex-col md:flex-row items-center gap-8 bg-[#0a0a0a] border-t border-white/10 rounded-3xl p-8 shadow-[0_-15px_40px_-15px_rgba(0,0,0,0.8)] hover:border-purple-500/30 transition-all duration-300"
            style={{ 
              top: `calc(10vh + ${index * 30}px)`, // Har naya card purane wale se 30px niche rukega (Stacking Effect)
              zIndex: index + 10 // Har naye card ka Z-index zyada hoga taaki wo upar overlay kare
            }}
          >
            {/* Background Giant Number */}
            <div className="absolute -left-4 -top-10 text-[140px] font-black text-white/[0.02] group-hover:text-purple-500/[0.04] transition-colors pointer-events-none select-none z-0">
              {project.num}
            </div>

            {/* Left Content */}
            <div className="relative z-10 flex-1 flex flex-col bg-[#0a0a0a]/50 p-2 rounded-xl">
              <span className="text-sm font-medium text-gray-500 group-hover:text-purple-400 transition-colors tracking-widest mb-2 uppercase">
                {project.subtitle}
              </span>
              <h4 className="text-4xl font-extrabold text-gray-100 group-hover:text-white transition-colors mb-4 tracking-tighter">
                {project.title}
              </h4>
              <p className="text-gray-400 text-base leading-relaxed max-w-2xl mb-8 group-hover:text-gray-300 transition-colors">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                {project.tech.map((tech, i) => (
                  <span key={i} className="text-xs font-semibold text-purple-300 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-5 relative z-10">
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-sm font-medium text-gray-400 hover:text-white transition-all">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  Source Code
                </a>
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-purple-400 transition-all group-hover:scale-105 duration-300">
                  <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24"><path d="M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                  Live Preview
                </a>
              </div>
            </div>

            {/* Right Mockup */}
            <div className={`relative z-10 w-full md:w-[45%] h-64 md:h-[400px] rounded-xl overflow-hidden border border-white/10 group-hover:border-purple-500/50 transition-all bg-gradient-to-br ${project.mockupColor} p-2 shadow-inner group-hover:scale-[1.02] duration-500`}>
                <div className="absolute top-0 w-full h-8 bg-black/50 border-b border-white/5 flex items-center px-4 gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                </div>
                <div className="w-full h-full pt-10 flex items-center justify-center">
                    <div className="w-3/4 h-3/4 rounded-lg bg-black/80 border border-white/5 shadow-2xl flex flex-col p-4">
                        <div className="w-1/2 h-2.5 bg-gray-700/50 rounded mb-3"></div>
                        <div className="w-full h-2 bg-gray-800/50 rounded mb-2"></div>
                        <div className="w-full h-2 bg-gray-800/50 rounded mb-2"></div>
                        <div className="w-3/4 h-2 bg-gray-800/50 rounded mb-6"></div>
                    </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20 pointer-events-none" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;