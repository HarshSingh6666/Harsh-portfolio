import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send } from 'lucide-react'; 

const Contact = () => {
  // Form state manage karne ke liye
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ loading: false, message: '', error: false });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ loading: false, message: "Please fill all required fields.", error: true });
      return;
    }

    setStatus({ loading: true, message: "Sending...", error: false });

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ loading: false, message: "Message Sent Successfully! I'll get back to you soon.", error: false });
        // Form clear karein
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({ loading: false, message: data.error || "Failed to send message.", error: true });
      }
    } catch (error) {
      console.error(error);
      setStatus({ loading: false, message: "Server connection failed. Is the backend running?", error: true });
    }
    
    // Status message ko 5 seconds baad gayab kar dein
    setTimeout(() => setStatus({ loading: false, message: '', error: false }), 5000);
  };

  return (
    <section className="relative z-20 min-h-screen py-20 px-4 md:px-10 flex flex-col items-center justify-center border-t border-white/5">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
        <h2 className="text-purple-400 font-medium tracking-widest text-sm uppercase mb-3">Get In Touch</h2>
        <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          Let's Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Together</span>
        </h3>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-12 max-w-5xl w-full">
        {/* Left Side: Contact Info */}
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:w-1/3 flex flex-col justify-center gap-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10"><Mail className="text-purple-400" /></div>
            <div>
              <p className="text-sm text-gray-400">Email Me At</p>
              <a href="mailto:hs324178@gmail.com" className="text-lg text-gray-100 hover:text-purple-400 transition-colors">hs324178@gmail.com</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10"><MapPin className="text-cyan-400" /></div>
            <div>
              <p className="text-sm text-gray-400">Location</p>
              <p className="text-lg text-gray-100">Varanasi, India</p>
            </div>
          </div>
          
          <div className="flex gap-4 mt-4">
            {/* GitHub */}
            <a href="https://github.com/HarshSingh6666" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-purple-500/20 hover:border-purple-500/50 transition-all">
              <svg className="w-5 h-5 fill-current text-gray-300" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/harshkumarsingh666/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BRC8Lj5pBQcWDtydOB3ZCsA%3D%3D" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-blue-500/20 hover:border-blue-500/50 transition-all">
              <svg className="w-5 h-5 fill-current text-gray-300" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>
        </motion.div>

        {/* Right Side: Contact Form */}
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:w-2/3 bg-white/[0.02] border border-white/10 p-8 rounded-2xl backdrop-blur-sm">
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Your Name" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-gray-200 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all" />
              <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Your Email" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-gray-200 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all" />
            </div>
            <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject (Optional)" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-gray-200 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all" />
            <textarea name="message" value={formData.message} onChange={handleChange} required rows="5" placeholder="Your Message..." className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-gray-200 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all resize-none"></textarea>
            
            {/* Status Message Display */}
            {status.message && (
              <div className={`p-3 rounded-lg text-sm text-center ${status.error ? 'bg-red-500/20 text-red-400 border border-red-500/50' : 'bg-green-500/20 text-green-400 border border-green-500/50'}`}>
                {status.message}
              </div>
            )}

            <button type="submit" disabled={status.loading} className="group flex items-center justify-center gap-2 w-full md:w-auto px-8 py-3 bg-white/5 border border-white/10 rounded-lg text-white font-medium hover:bg-purple-600 hover:border-purple-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
              {status.loading ? 'Sending...' : 'Send Message'} <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </form>
        </motion.div>
      </div>
      <div className="absolute bottom-6 text-gray-500 text-sm">
        © 2026 Harsh Kumar Singh. Portfolio
      </div>
    </section>
  );
};

export default Contact;
