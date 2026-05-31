// backend/dataset.js

// Note: tags add kiye gaye hain taaki pata chale data kahan se aaya hai. 
// Production mein deploy karne se pehle aap chahein toh in tags ko hata sakte hain taaki chat clean dikhe.

const harshData = {
  greetings: "Hello! 👋 I am Harsh's AI assistant. I can tell you about his MERN stack skills, projects, education, or contact details. How can I help you today?",

  contact: "You can reach Harsh at hs324178@gmail.com or call him at 6307184242[cite: 3]. He is currently based in Khajuri, Varanasi, Uttar Pradesh, India[cite: 2]. You can also find him on LinkedIn, GitHub, and his Portfolio[cite: 49].",
  
  skills: "Harsh's technical skills include Frontend (HTML, CSS, JavaScript, React JS, Bootstrap, Tailwind) [cite: 21, 22], Backend (Node JS, Express JS) [cite: 23], Databases (MySQL, MongoDB) [cite: 24], Version Control (Git, GitHub) [cite: 25], and Deployment (Netlify, Render)[cite: 26].",
  
  education: "Harsh is currently pursuing his B.Tech in Computer Science and Engineering at Kashi Institute of Technology (2023-Ongoing)[cite: 11, 12, 13]. Previously, he completed his 12th in Science (61.2%) in 2022 and 10th in Science (69%) in 2020 from St. George Prep School, Sarnath, Varanasi[cite: 14, 16, 17, 19].",
  
  projects: "Harsh has built several impressive projects: 1. AI Assistant using MERN, Gemini API, and JWT[cite: 28, 30, 31]. 2. Zerodha Clone (Trading Platform Dashboard) using React, Node, and REST APIs[cite: 33, 34]. 3. Airbnb Clone using Node, MongoDB, and EJS[cite: 37, 38]. 4. Real-Time Weather Application using React and OpenWeatherMap API[cite: 41]. 5. A full Library Management System (LMS) built using the MERN stack[cite: 7].",
  
  experience: "Through his projects, Harsh has gained strong knowledge of authentication, role-based access, backend APIs, and database modeling[cite: 8]. Building clone projects like Airbnb and Zerodha improved his understanding of UI/UX patterns, reusable components, and responsive layouts[cite: 9].",
  
  summary: "Harsh is a Pre-final year B.Tech CSE student with strong hands-on experience in the MERN stack and AI integration[cite: 5]. He is passionate about developing scalable, intelligent web applications to solve complex real-world problems[cite: 5].",
  
  certifications: "Harsh is completing a Full Stack Development certification from Apna College (Jan 2025 - Jul 2025)[cite: 46, 47].",
  
  devops: "Yes, Harsh uses Git and GitHub for version control [cite: 25] and has experience deploying applications using platforms like Netlify and Render[cite: 26].",

  default: "I am currently running in offline mode. I can tell you about Harsh's skills, education, projects, contact details, or experience. What would you like to know?"
};

// Keyword matcher function jo server.js use karega
function getFallbackResponse(message) {
  const msg = message.toLowerCase();
  
  // Greetings Check
  if (/\b(hi|hello|hey|namaste|good morning|good afternoon|good evening|sup|how are you)\b/.test(msg)) return harshData.greetings;
  
  if (msg.includes('contact') || msg.includes('email') || msg.includes('phone') || msg.includes('number') || msg.includes('reach') || msg.includes('call') || msg.includes('linkedin') || msg.includes('github')) return harshData.contact;
  
  if (msg.includes('devops') || msg.includes('deploy') || msg.includes('host') || msg.includes('netlify') || msg.includes('render') || msg.includes('git') || msg.includes('version control')) return harshData.devops;

  if (msg.includes('skill') || msg.includes('tech') || msg.includes('stack') || msg.includes('know') || msg.includes('language') || msg.includes('frontend') || msg.includes('backend') || msg.includes('database')) return harshData.skills;
  
  if (msg.includes('education') || msg.includes('college') || msg.includes('degree') || msg.includes('school') || msg.includes('study') || msg.includes('b.tech') || msg.includes('institute') || msg.includes('10th') || msg.includes('12th')) return harshData.education;
  
  if (msg.includes('project') || msg.includes('work') || msg.includes('portfolio') || msg.includes('build') || msg.includes('made') || msg.includes('clone') || msg.includes('app') || msg.includes('zerodha') || msg.includes('airbnb') || msg.includes('weather')) return harshData.projects;
  
  if (msg.includes('certificate') || msg.includes('course') || msg.includes('apna college')) return harshData.certifications;
  
  if (msg.includes('experience') || msg.includes('internship') || msg.includes('role') || msg.includes('knowledge') || msg.includes('ui/ux')) return harshData.experience;
  
  if (msg.includes('about') || msg.includes('summary') || msg.includes('who') || msg.includes('intro')) return harshData.summary;
  
  return harshData.default;
}

module.exports = { getFallbackResponse };