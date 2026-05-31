import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Video import
import introVideo from '../assets/intro.mp4'; 

const Hero = () => {
  const [step, setStep] = useState('name');
  // 1. Initial state ko TRUE rakhein taaki autoplay block na ho
  const [isMuted, setIsMuted] = useState(true); 
  const videoRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStep('video');
    }, 3200); 
    return () => clearTimeout(timer);
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      // Toggle the actual video element property
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  // Jab video khatam hogi tab ye function chalega
  const handleVideoEnd = () => {
    if (videoRef.current) {
      videoRef.current.muted = true; // Video rukne par mute ho jaye
      setIsMuted(true);              // State update ho jaye
    }
  };

  return (
    <section className="relative z-20 flex items-center justify-center min-h-screen w-full overflow-hidden bg-transparent">
      <AnimatePresence mode="wait">
        
        {step === 'name' && (
          <motion.div
            key="name-reveal"
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{
              opacity: [0, 1, 1, 0], 
              y: [30, 0, 0, -30],    
              filter: ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]
            }}
            transition={{ duration: 3, times: [0, 0.2, 0.8, 1], ease: "easeInOut" }}
            className="text-center px-4"
          >
            <h2 className="text-purple-400 font-semibold text-xs md:text-sm uppercase mb-3 tracking-[0.2em]">
              Portfolio 2026
            </h2>
            <h1 className="text-5xl md:text-8xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-200 to-gray-500 tracking-tighter">
              Harsh Kumar Singh
            </h1>
            <p className="text-gray-400 text-lg md:text-2xl font-light tracking-wide mt-4">
              Full-Stack Developer • MERN Enthusiast • AI Integrator
            </p>
          </motion.div>
        )}

        {step === 'video' && (
          <motion.div
            key="video-reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full bg-black"
          >
            <video
              ref={videoRef}
              className="w-full h-full object-cover" 
              autoPlay
              muted={isMuted} // Controlled by state (starts as true)
              playsInline
              onEnded={handleVideoEnd} // Stops and mutes on end
            >
              <source src={introVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Floating Mute/Unmute Button */}
            <button 
              onClick={toggleMute}
              className="absolute bottom-10 right-10 z-50 bg-white/10 backdrop-blur-md text-white border border-white/20 px-4 py-2 rounded-full text-sm font-medium hover:bg-white/20 transition-all cursor-pointer"
            >
              {isMuted ? "🔊 Unmute" : "🔇 Mute"}
            </button>
            
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/20 pointer-events-none" />
          </motion.div>
        )}

      </AnimatePresence>
    </section>
  );
};

export default Hero;