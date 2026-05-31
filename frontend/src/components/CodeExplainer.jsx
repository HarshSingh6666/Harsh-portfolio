import React, { useState } from 'react';
import { motion } from 'framer-motion';
// Trash2 icon ko lucide-react se import kiya hai
import { Terminal, Cpu, Trash2 } from 'lucide-react';

const CodeExplainer = () => {
  const [code, setCode] = useState('');
  const [explanation, setExplanation] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Analyze Code Logic
  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!code.trim()) return;

    setIsAnalyzing(true);
    setExplanation('');

    try {
      const response = await fetch('http://localhost:5000/api/explain-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code }),
      });

      const data = await response.json();

      if (response.ok) {
        setExplanation(data.explanation);
      } else {
        setExplanation("Error: " + (data.error || "Failed to analyze code."));
      }
    } catch (error) {
      console.error("Code Explainer API Error:", error);
      setExplanation("Oops! Could not connect to the AI server. Please make sure your backend is running on port 5000.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Naya Function: Code aur Explanation ko clear karne ke liye
  const handleClear = () => {
    setCode('');
    setExplanation('');
  };

  return (
    <section className="py-20 relative z-20 w-full px-4" id="ai-playground">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto bg-[#0a0a0a] border border-cyan-500/30 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(34,211,238,0.1)] backdrop-blur-sm"
      >
        <div className="bg-gradient-to-r from-cyan-900/40 to-purple-900/40 p-4 border-b border-white/10 flex items-center gap-3">
          <Cpu className="text-cyan-400" />
          <h2 className="text-xl font-bold text-white">
            AI Code Explainer <span className="text-xs text-black font-bold bg-cyan-400 px-2 py-1 rounded ml-2">Live Demo</span>
          </h2>
        </div>
        
        <div className="p-6 grid md:grid-cols-2 gap-6">
          {/* Input Area */}
          <div>
            <label className="text-gray-400 text-sm mb-2 flex items-center gap-2">
              <Terminal size={14} /> Paste your code here:
            </label>
            <textarea 
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-64 bg-[#050505] border border-white/10 rounded-lg p-4 text-sm font-mono text-gray-300 focus:outline-none focus:border-cyan-500 transition-colors custom-scrollbar resize-none"
              placeholder="function helloWorld() {\n  console.log('AI is awesome!');\n}"
            />
            
            {/* Buttons Container: Flexbox ka use kiya hai taaki dono side-by-side aayein */}
            <div className="mt-4 flex gap-3">
              <button 
                onClick={handleAnalyze}
                disabled={isAnalyzing || !code.trim()}
                className="flex-1 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {isAnalyzing ? 'Running AI Engine...' : 'Explain Code'}
              </button>

              {/* Naya Clear Button */}
              <button 
                onClick={handleClear}
                disabled={isAnalyzing || (!code && !explanation)} // Agar loading ho ya pehle se empty ho toh disable rahega
                className="px-5 py-3 bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 hover:border-red-500/50 text-red-400 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                title="Clear Everything"
              >
                <Trash2 size={18} />
                Clear
              </button>
            </div>
          </div>

          {/* Output Area */}
          <div>
            <label className="text-gray-400 text-sm mb-2 block">AI Explanation Output:</label>
            <div className="w-full h-64 bg-black/60 border border-white/5 rounded-lg p-4 overflow-y-auto custom-scrollbar relative">
              {isAnalyzing && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#050505]/80 backdrop-blur-sm rounded-lg z-10">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-2 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin" />
                    <span className="text-cyan-400 text-sm animate-pulse">Analyzing logic...</span>
                  </div>
                </div>
              )}
              {explanation ? (
                <pre className="text-sm text-cyan-100 font-mono whitespace-pre-wrap">{explanation}</pre>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-600 text-sm text-center italic">
                  Awaiting code input to process...
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CodeExplainer;