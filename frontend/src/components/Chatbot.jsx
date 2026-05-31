import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Loader2 } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      sender: 'bot', 
      text: "Hi! I'm Harsh's AI Assistant. Ask me anything about his MERN stack skills, projects, or his journey at Kashi Institute of Technology!" 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    // 1. User ka message UI mein add karo
    setMessages((prev) => [...prev, { sender: 'user', text: userMessage }]);
    setInput('');
    setIsTyping(true); // AI "Typing..." state on karo

    try {
      // 2. Real Backend API Call (Node.js/Gemini)
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();

      // 3. AI ka reply UI mein add karo
      setMessages((prev) => [...prev, { sender: 'bot', text: data.reply }]);
    } catch (error) {
      console.error("Chat API Error:", error);
      // Agar server band ho toh error message dikhao
      setMessages((prev) => [...prev, { 
        sender: 'bot', 
        text: "Oops! My AI brain is currently offline. Please make sure the backend server is running." 
      }]);
    } finally {
      setIsTyping(false); // Typing state off karo
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-80 sm:w-96 h-[450px] bg-[#0a0a0a] border border-purple-500/30 rounded-2xl shadow-[0_0_30px_rgba(168,85,247,0.15)] flex flex-col overflow-hidden backdrop-blur-md"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 p-4 flex justify-between items-center border-b border-white/10">
              <div>
                <h3 className="text-white font-semibold flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  Harsh-AI
                </h3>
                <p className="text-gray-400 text-xs">Always online</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-4 overflow-y-auto custom-scrollbar flex flex-col gap-3">
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.sender === 'user' 
                      ? 'bg-purple-600 text-white self-end rounded-tr-sm' 
                      : 'bg-white/10 text-gray-200 self-start rounded-tl-sm border border-white/5'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="max-w-[80%] p-3 rounded-2xl text-sm bg-white/10 text-gray-400 self-start rounded-tl-sm border border-white/5 flex items-center gap-2">
                  <Loader2 size={14} className="animate-spin" /> Thinking...
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form 
              onSubmit={handleSendMessage} 
              className="p-3 bg-black/40 border-t border-white/10 flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about my skills..."
                disabled={isTyping}
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors disabled:opacity-50"
              />
              <button 
                type="submit"
                disabled={isTyping || !input.trim()}
                className="bg-purple-600 hover:bg-purple-500 text-white p-2 rounded-full transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.4)] flex items-center justify-center text-white ml-auto"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>
    </div>
  );
};

export default Chatbot;