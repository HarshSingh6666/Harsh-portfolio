import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff } from 'lucide-react';

const VoiceNavigator = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const startListening = () => {
    // Browser support check
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser doesn't support Voice Navigation. Try Chrome!");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.start();
    setIsListening(true);
    setTranscript('Listening... Speak a section name.');

    recognition.onresult = (event) => {
      const command = event.results[0][0].transcript.toLowerCase();
      setTranscript(`Heard: "${command}"`);
      
      // Routing logic based on keywords
      if (command.includes('home') || command.includes('top')) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (command.includes('about')) {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
      } else if (command.includes('service')) { // Added Services
        document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
      } else if (command.includes('skill')) {
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
      } else if (command.includes('demo') || command.includes('ai') || command.includes('playground') || command.includes('explain')) { // Added AI Demo
        document.getElementById('ai-playground')?.scrollIntoView({ behavior: 'smooth' });
      } else if (command.includes('project') || command.includes('work')) {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
      } else if (command.includes('education')) {
        document.getElementById('education')?.scrollIntoView({ behavior: 'smooth' });
      } else if (command.includes('contact')) {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      } else {
         setTranscript(`Unknown command: "${command}"`);
      }
      
      // Auto-hide transcript after 3 seconds
      setTimeout(() => {
        setIsListening(false);
        setTranscript('');
      }, 3000);
    };

    recognition.onerror = () => {
      setIsListening(false);
      setTranscript('Could not hear clearly. Try again!');
      setTimeout(() => setTranscript(''), 2000);
    };
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center gap-3">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={startListening}
        className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-colors ${
          isListening ? 'bg-red-500 animate-pulse' : 'bg-cyan-600 hover:bg-cyan-500'
        }`}
      >
        {isListening ? <MicOff size={24} /> : <Mic size={24} />}
      </motion.button>
      
      <AnimatePresence>
        {transcript && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="bg-black/60 border border-cyan-500/30 text-cyan-400 px-4 py-2 rounded-lg text-sm backdrop-blur-md"
          >
            {transcript}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VoiceNavigator;
