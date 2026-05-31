import React from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const navItems = ["About", "Services", "Skills", "AI Demo", "Projects", "Education", "Contact"];

  // Smooth scroll function to navigate through sections
  const handleScroll = (item) => {
    // FIX: Agar item "AI Demo" hai, toh usko "ai-playground" par bhejenge
    const id = item === "AI Demo" ? "ai-playground" : item.toLowerCase();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    // fixed, top-0, aur z-40 se yeh video ke upar float karega bina kisi background box ke
    <nav className="fixed top-0 left-0 w-full h-20 flex items-center justify-between px-6 md:px-12 z-40 bg-transparent pointer-events-none">
      
      {/* Logo Text / Initials (Pure Link, No Box) */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 2.2 }} // Loader aur name animation ke baad aayega
        className="text-white font-black tracking-tighter text-xl pointer-events-auto cursor-pointer selection:bg-transparent"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        HKS<span className="text-purple-500">.</span>
      </motion.div>

      {/* Nav Links Only (Pure Links, No Box Container) */}
      <div className="flex items-center gap-6 md:gap-8 pointer-events-auto">
        {navItems.map((item, index) => (
          <motion.button
            key={item}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2.2 + index * 0.1 }} // Ek ke baad ek links reveal honge
            onClick={() => handleScroll(item)} // FIX: item pass kiya, item.toLowerCase() nahi
            className="text-xs md:text-sm font-medium tracking-widest uppercase text-gray-400 hover:text-white transition-colors duration-300 relative group cursor-pointer selection:bg-transparent"
          >
            
            {/* Special Styling for AI Demo */}
            {item === "AI Demo" ? (
              <span className="flex items-center gap-1.5 text-cyan-400 group-hover:text-cyan-300 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                {item}
              </span>
            ) : (
              item
            )}

            {/* Premium Underline Effect on Hover (AI Demo ke liye cyan underline) */}
            <span 
              className={`absolute -bottom-1 left-0 w-0 h-[1px] transition-all duration-300 group-hover:w-full ${
                item === "AI Demo" ? "bg-cyan-400" : "bg-purple-500"
              }`} 
            />
          </motion.button>
        ))}
      </div>

    </nav>
  );
};

export default Navbar;