import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import harshImage from '../assets/harsh.jpg'; 

const About = () => {
  const [isGuiding, setIsGuiding] = useState(false);

  const scrollToContact = () => {
    // Animation trigger karo
    setIsGuiding(true);
    
    // Thoda sa delay dekar scroll start karo taaki animation dikhe
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 200);

    // Animation ko 1.5 second baad gayab kar do (jab tak scroll complete ho jayega)
    setTimeout(() => {
      setIsGuiding(false);
    }, 1500);
  };

  return (
    <section className="relative z-20 min-h-screen flex items-center justify-center text-white border-t border-white/10 px-4 py-20" id="about">
      
      {/* 🚀 GUIDING ANIMATION (Shooting Star / Data Stream) */}
      <AnimatePresence>
        {isGuiding && (
          <motion.div
            initial={{ top: '-10vh', opacity: 1 }}
            animate={{ top: '110vh', opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="fixed left-1/2 -translate-x-1/2 z-[100] pointer-events-none flex flex-col items-center"
          >
            {/* Tail of the light */}
            <div className="w-1 h-32 bg-gradient-to-b from-transparent via-purple-500 to-cyan-400 rounded-full" />
            {/* Head of the light (Glowing Dot) */}
            <div className="w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_30px_5px_#22d3ee] animate-pulse" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row-reverse items-center justify-center gap-12 w-full">
        
        {/* RIGHT SIDE: IMAGE SECTION */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="peer relative w-48 h-48 md:w-64 md:h-64 cursor-pointer transition-all duration-700 ease-in-out hover:scale-[1.25] hover:z-30"
        >
          <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full blur-lg opacity-40 peer-hover:opacity-80 peer-hover:animate-pulse transition duration-700"></div>
          
          <img 
            src={harshImage} 
            alt="Harsh Kumar Singh" 
            className="relative w-full h-full object-cover rounded-full border border-cyan-500/30 shadow-[0_0_30px_rgba(34,211,238,0.2)] flex items-center justify-center text-center text-sm text-gray-400 bg-white/5"
          />
        </motion.div>

        {/* LEFT SIDE: TEXT & BUTTONS */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex-1 text-center md:text-left transition-all duration-700 ease-in-out md:peer-hover:-translate-x-16 md:peer-hover:opacity-50 z-10"
        >
          <h2 className="text-purple-400 font-medium tracking-widest text-sm uppercase mb-3">About Me</h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-6">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Harsh</span>
          </h3>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl mx-auto md:mx-0">
            I am a pre-final year B.Tech Computer Science student specializing in building scalable web applications. I have a strong focus on integrating Artificial Intelligence to solve real-world problems. From crafting seamless user experiences with the MERN stack to exploring deception technology in cybersecurity, I enjoy turning complex ideas into functional digital products.
          </p>

          {/* BUTTONS SECTION */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            
            {/* Hire Me (Now with Animation Trigger) */}
            <button 
              onClick={scrollToContact}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white px-6 py-3 rounded-full font-semibold transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] hover:-translate-y-1 relative overflow-hidden group"
            >
              {/* Button Shine Effect */}
              <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:left-[100%] transition-all duration-700 ease-in-out"></div>
              
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              <span className="relative z-10">Hire Me</span>
            </button>

            {/* Resume */}
            <a 
              href="https://drive.google.com/file/d/1lc7V88jds5ZLPfNGLYWBKnZ8-Q-Xq38G/view?usp=drive_link" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-purple-500/50 hover:border-purple-400 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 px-6 py-3 rounded-full font-semibold transition-all hover:-translate-y-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              Resume
            </a>

            {/* Social Icons */}
            <div className="flex gap-3 ml-0 sm:ml-4 mt-4 sm:mt-0">
              <a 
                href="https://github.com/your-username" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-white/5 border border-white/10 hover:border-white/30 rounded-full text-gray-400 hover:text-white transition-all hover:bg-white/10 hover:-translate-y-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.5-1.4 6.5-7.17A5.05 5.05 0 0 0 19 5.32a5.5 5.5 0 0 0-.5-4.03s-1.4-.4-4.5 1.7a13.4 13.4 0 0 0-8 0c-3.1-2.1-4.5-1.7-4.5-1.7a5.5 5.5 0 0 0-.5 4.03 5.05 5.05 0 0 0-1.5 3.78c0 5.76 3.35 6.79 6.5 7.17A4.8 4.8 0 0 0 8 18v4"></path><path d="M3 19c-3.4 1-3.4-3-7-3"></path></svg>
              </a>
              <a 
                href="https://linkedin.com/in/your-username" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-white/5 border border-white/10 hover:border-cyan-500/50 rounded-full text-gray-400 hover:text-cyan-400 transition-all hover:bg-cyan-500/10 hover:-translate-y-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
            </div>

          </div>
        </motion.div>
        
      </div>
    </section>
  );
};

export default About;