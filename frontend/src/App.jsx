import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar'; 
import SpaceBackground from './components/SpaceBackground';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Chatbot from './components/Chatbot'; 
import VoiceNavigator from './components/VoiceNavigator'; 
import CodeExplainer from './components/CodeExplainer';

// ==========================================
// 🚀 AI / DATA SCIENCE THEMED LOADER
// ==========================================
const Loader = () => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing System...");

  const techPhrases = [
    "Compiling Neural Networks...",
    "Fetching MERN Stack Architecture...",
    "Initializing AI Assistant...",
    "Decrypting Data Pipelines...",
    "Securing JWT Sessions...",
    "Establishing Server Connections...",
    "Loading Deception Tech Modules...",
    "Optimizing User Interfaces..."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 2));
    }, 35); 

    const textTimer = setInterval(() => {
      setLoadingText(techPhrases[Math.floor(Math.random() * techPhrases.length)]);
    }, 400); 

    return () => {
      clearInterval(timer);
      clearInterval(textTimer);
    };
  }, []);

  return (
    <motion.div 
      exit={{ opacity: 0, y: -50 }} 
      transition={{ duration: 0.8, ease: "easeInOut" }} 
      className="fixed inset-0 bg-[#050505] z-50 flex flex-col items-center justify-center font-mono overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-md px-6">
        <motion.div 
          animate={{ opacity: [0.3, 1, 0.3] }} 
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-cyan-400/40 text-xs mb-8 text-center break-all tracking-widest hidden md:block"
        >
          01001000 01100001 01110010 01110011 01101000 <br/>
          0x00F8A 0x88B2C 0x11A0F ... SYS.READY
        </motion.div>

        <span className="text-white text-5xl md:text-7xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-2 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
          {progress}%
        </span>
        
        <div className="w-full h-1 bg-gray-800 rounded-full mt-4 overflow-hidden relative">
          <motion.div 
            className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-8 text-cyan-400 text-sm md:text-base h-6 flex items-center justify-center">
          <span className="mr-3 text-purple-500 font-bold">&gt;</span>
          {loadingText}
          <motion.span 
            animate={{ opacity: [0, 1, 0] }} 
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="w-2 h-4 bg-cyan-400 ml-1 inline-block"
          />
        </div>
      </div>
    </motion.div>
  );
};

// ==========================================
// 🌐 MAIN APP COMPONENT
// ==========================================
function App() {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Loader 2 second baad hata dega
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050505] text-white font-sans selection:bg-purple-500/30">
      <AnimatePresence mode="wait">
        {loading && <Loader />}
      </AnimatePresence>

      {!loading && (
        <>
          <Navbar /> 
          <SpaceBackground />
          
          <main className="relative z-20">
            <Hero />
            <div id="about"><About /></div>
            <div id="services"><Services /></div>
            <div id="skills"><Skills /></div>
            <CodeExplainer />
            <div id="projects"><Projects /></div>
            <div id="education"><Education /></div>
            <div id="contact"><Contact /></div>
          </main>
          
          <Chatbot /> 
          <VoiceNavigator />
        </>
      )}
    </div>
  );
}

// YAHI LINE MISSING THI JISKI WAJAH SE ERROR AA RAHA THA 👇
export default App;