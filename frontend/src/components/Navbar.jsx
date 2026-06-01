import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = ["About", "Services", "Skills", "AI Demo", "Projects", "Education", "Contact"];

  const handleScroll = (item) => {
    const id = item === "AI Demo" ? "ai-playground" : item.toLowerCase();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false); // Mobile mein click karne ke baad menu band ho jaye
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-20 flex items-center justify-between px-6 md:px-12 z-40 bg-transparent">
      
      {/* 🔹 Logo Text */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 2.2 }}
        className="text-white font-black tracking-tighter text-xl cursor-pointer selection:bg-transparent z-50"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        HKS<span className="text-purple-500">.</span>
      </motion.div>

      {/* 🔹 Desktop Navigation (Hidden on Mobile) */}
      <div className="hidden md:flex items-center gap-8">
        {navItems.map((item, index) => (
          <motion.button
            key={item}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2.2 + index * 0.1 }}
            onClick={() => handleScroll(item)}
            className="text-sm font-medium tracking-widest uppercase text-gray-400 hover:text-white transition-colors duration-300 relative group cursor-pointer"
          >
            {item === "AI Demo" ? (
              <span className="flex items-center gap-1.5 text-cyan-400 group-hover:text-cyan-300 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                {item}
              </span>
            ) : (
              item
            )}
            <span className={`absolute -bottom-1 left-0 w-0 h-[1px] transition-all duration-300 group-hover:w-full ${item === "AI Demo" ? "bg-cyan-400" : "bg-purple-500"}`} />
          </motion.button>
        ))}
      </div>

      {/* 🔹 Mobile Menu Toggle Button (Visible only on Mobile) */}
      <motion.button 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
        className="md:hidden text-white p-2 z-50 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} className="text-gray-400 hover:text-white transition-colors" /> : <Menu size={28} className="text-gray-400 hover:text-white transition-colors" />}
      </motion.button>

      {/* 🔹 Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={{ duration: 0.3 }}
            className="absolute top-20 left-0 w-full bg-[#050505]/95 backdrop-blur-lg border-b border-white/10 flex flex-col items-center gap-6 py-10 md:hidden z-40 shadow-2xl"
          >
            {navItems.map((item, index) => (
              <motion.button
                key={item}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleScroll(item)}
                className="text-lg font-medium tracking-widest uppercase text-gray-400 hover:text-white transition-colors duration-300 relative group cursor-pointer"
              >
                {item === "AI Demo" ? (
                  <span className="flex items-center gap-2 text-cyan-400">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    {item}
                  </span>
                ) : (
                  item
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

    </nav>
  );
};

export default Navbar;
