import React, { useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';

const SpaceBackground = () => {
  const canvasRef = useRef(null);

  // OPTIMIZATION 1: Reduced number of DOM elements (Meteors and Dust)
  const meteors = useMemo(() => Array.from({ length: 5 }).map((_, i) => ({ 
    id: i,
    left: `${Math.random() * 100}vw`,
    top: `${Math.random() * -80}vh`,
    animationDuration: `${Math.random() * 4 + 4}s`, 
    animationDelay: `${Math.random() * 10}s`,
  })), []);

  const materials = useMemo(() => Array.from({ length: 15 }).map((_, i) => ({ 
    id: i,
    left: `${Math.random() * 100}vw`,
    top: `${Math.random() * 100}vh`,
    size: Math.random() * 2 + 1 + 'px',
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  })), []);

  // NEW FEATURE: Lightweight AI/Binary Floating Data Nodes
  const aiDataNodes = useMemo(() => {
    const symbols = ['0', '1', '{ }', '</>', 'AI', 'λ', '01'];
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      text: symbols[Math.floor(Math.random() * symbols.length)],
      left: `${Math.random() * 100}vw`,
      top: `${100 + Math.random() * 20}vh`, // Start below the screen
      animationDuration: `${Math.random() * 15 + 15}s`, // Very slow upward float
      animationDelay: `${Math.random() * -20}s`, // Random start times (even negative so they exist immediately)
      fontSize: `${Math.random() * 0.8 + 0.4}rem`, // Varying sizes
      opacity: Math.random() * 0.2 + 0.05 // Very faint opacity (5% to 25%)
    }));
  }, []);

  // CONSTELLATION NETWORK LOGIC
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false }); 
    
    let animationFrameId;
    let particles = [];

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();

    // Cap max particles for performance
    const particleCount = Math.min(Math.floor(window.innerWidth / 30), 40); 
    const connectionDistance = 150;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.8; 
        this.vy = (Math.random() - 0.5) * 0.8; 
        this.radius = Math.random() * 1.5 + 0.5;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        // Made the constellation nodes slightly more "Cyan/Teal" to match AI vibe
        ctx.fillStyle = '#22d3ee'; 
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          
          if (Math.abs(dx) > connectionDistance || Math.abs(dy) > connectionDistance) continue;
          
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = 1 - (distance / connectionDistance);
            
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            // Cyan-ish connector lines for AI feel
            ctx.strokeStyle = `rgba(34, 211, 238, ${opacity * 0.3})`;
            ctx.lineWidth = 1;
            ctx.stroke();

            // Triangle mesh logic (Slightly purple to blend space with AI)
            for (let k = j + 1; k < particles.length; k++) {
              const dx2 = particles[j].x - particles[k].x;
              const dy2 = particles[j].y - particles[k].y;
              if (Math.abs(dx2) > connectionDistance || Math.abs(dy2) > connectionDistance) continue;

              const dx3 = particles[k].x - particles[i].x;
              const dy3 = particles[k].y - particles[i].y;
              if (Math.abs(dx3) > connectionDistance || Math.abs(dy3) > connectionDistance) continue;

              const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
              const dist3 = Math.sqrt(dx3 * dx3 + dy3 * dy3);

              if (dist2 < connectionDistance && dist3 < connectionDistance) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.lineTo(particles[k].x, particles[k].y);
                ctx.closePath();
                ctx.fillStyle = `rgba(168, 85, 247, ${opacity * 0.02})`;
                ctx.fill();
              }
            }
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();

    let resizeTimer;
    const handleResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(setCanvasSize, 200);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      
      <style>
        {`
          @keyframes gridMove {
            0% { background-position: 0 0; }
            100% { background-position: 0 60px; }
          }
          .animate-grid {
            animation: gridMove 3s linear infinite;
            will-change: background-position;
          }
          
          @keyframes meteorShower {
            0% { transform: rotate(215deg) translateX(0); opacity: 0; }
            10% { opacity: 1; }
            80% { opacity: 1; }
            100% { transform: rotate(215deg) translateX(-1800px); opacity: 0; }
          }
          
          .meteor {
            position: absolute;
            width: 150px;
            height: 2px;
            background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%);
            opacity: 0;
            transform-origin: top left;
            animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); 
            will-change: transform, opacity;
          }
          .meteor::before {
            content: '';
            position: absolute;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background: white;
            background: radial-gradient(circle, rgba(255,255,255,1) 30%, rgba(168,85,247,0.5) 100%);
            top: -1px;
            left: 0;
          }

          /* CSS Animation for Lightweight Floating AI Data */
          @keyframes floatUpwards {
            0% { transform: translateY(0) scale(0.8); opacity: 0; }
            10% { opacity: var(--max-opacity); }
            90% { opacity: var(--max-opacity); }
            100% { transform: translateY(-120vh) scale(1.2); opacity: 0; }
          }
          
          .ai-data-node {
            position: absolute;
            font-family: monospace;
            color: #22d3ee; /* Cyan color */
            will-change: transform, opacity;
            text-shadow: 0 0 8px rgba(34, 211, 238, 0.4);
            animation: floatUpwards linear infinite;
          }
        `}
      </style>

      {/* DEEP SPACE BACKGROUND */}
      {/* Changed the base colors slightly to look more like a digital matrix/cyber space */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#1a153a] to-[#050505] z-0" />
      
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[100px] z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-600/5 rounded-full blur-[120px] z-0" />

      {/* THE 3D MOVING FLOOR GRID */}
      <div className="absolute bottom-0 w-full h-[60vh] opacity-30 z-10" style={{ perspective: '800px' }}>
        <div 
          className="absolute w-[200%] h-[200%] left-[-50%] top-0 animate-grid"
          style={{
            transform: 'rotateX(75deg) translateY(0)',
            transformOrigin: 'top center',
            backgroundImage: `
              linear-gradient(to right, rgba(168, 85, 247, 0.25) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(34, 211, 238, 0.25) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            boxShadow: 'inset 0 100px 100px -50px #1a153a' 
          }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#1a153a]/20 to-[#0a0a0f] z-10" />

      {/* NEW: LIGHTWEIGHT FLOATING AI DATA NODES */}
      <div className="absolute inset-0 z-10">
        {aiDataNodes.map((node) => (
          <div
            key={`data-${node.id}`}
            className="ai-data-node"
            style={{
              left: node.left,
              top: node.top,
              fontSize: node.fontSize,
              '--max-opacity': node.opacity, // Custom CSS variable for dynamic opacity
              animationDuration: node.animationDuration,
              animationDelay: node.animationDelay,
            }}
          >
            {node.text}
          </div>
        ))}
      </div>

      {/* INTERACTIVE CONSTELLATION NETWORK */}
      <canvas ref={canvasRef} className="absolute inset-0 z-20 w-full h-full mix-blend-screen opacity-80" />

      {/* METEORS / SHOOTING STARS */}
      <div className="absolute inset-0 z-20">
        {meteors.map((meteor) => (
          <div
            key={`meteor-${meteor.id}`}
            className="meteor"
            style={{
              left: meteor.left,
              top: meteor.top,
              animation: `meteorShower ${meteor.animationDuration} cubic-bezier(0.16, 1, 0.3, 1) infinite`,
              animationDelay: meteor.animationDelay,
            }}
          />
        ))}
      </div>

      {/* FLOATING DUST/MATERIALS */}
      {materials.map((mat) => (
        <motion.div
          key={`mat-${mat.id}`}
          className="absolute rounded-full bg-cyan-400 z-20" // Changed dust to cyan
          style={{
            width: mat.size,
            height: mat.size,
            left: mat.left,
            top: mat.top,
            backgroundColor: 'rgba(34,211,238,0.6)' 
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 40 - 20, 0],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: mat.duration,
            repeat: Infinity,
            delay: mat.delay,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

export default SpaceBackground;