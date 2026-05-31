// backend/server.js
const nodemailer = require('nodemailer');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// 📦 Nayi dataset file ko import kiya
const { getFallbackResponse } = require('./dataset'); 

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Google Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// ==========================================
// ROUTE 1: AI Code Explainer API
// ==========================================
app.post('/api/explain-code', async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) return res.status(400).json({ error: "Code is required" });

    const prompt = `You are an expert Senior Software Engineer. Explain the following code concisely. Highlight its logic flow, and any potential optimizations. Keep it professional and use bullet points:\n\n${code}`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    res.json({ explanation: response.text() });
  } catch (error) {
    console.error("Code Explainer Error:", error);
    res.status(500).json({ error: "Failed to analyze code." });
  }
});

// ==========================================
// ROUTE 2: Personal Resume Chatbot API
// ==========================================
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  try {
    // 1. Try Gemini API First
    const systemPrompt = `You are the personal AI assistant for Harsh Kumar Singh. 
    Context about Harsh: He is a pre-final year B.Tech CSE student at Kashi Institute of Technology. He specializes in the MERN stack (MongoDB, Express, React, Node.js), cloud deployment (Railway, Render), and integrating AI into software.
    
    Rule: Answer the user's question politely and concisely (2-3 sentences max). If asked something completely outside Harsh's professional scope, politely say you only answer questions related to his portfolio.
    
    User's message: ${message}`;

    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    res.json({ reply: response.text() });
    
  } catch (error) {
    console.error("Gemini API Failed. Switching to Fallback Dataset module...");
    
    // 2. 🚨 FALLBACK ACTIVATED: Agar API fail hui, toh dataset.js se answer laayega
    const fallbackReply = getFallbackResponse(message);
    
    res.json({ 
      reply: `[Offline Mode] ${fallbackReply}` 
    });
  }
});


app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required!" });
  }

  try {
    // 1. Apne Gmail ka transporter banayein
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Apna Gmail daalein (e.g., hs324178@gmail.com)
        pass: process.env.EMAIL_PASS  // Apna Gmail 'App Password' daalein (Normal password nahi)
      }
    });

    // 2. Email ka format set karein
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'hs324178@gmail.com', // Aapko is mail par message aayega
      subject: `Portfolio Contact: ${subject || 'New Message'} from ${name}`,
      text: `You have a new message from your portfolio:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    // 3. Email bhejein
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: "Message sent successfully!" });

  } catch (error) {
    console.error("Email Error:", error);
    res.status(500).json({ error: "Failed to send message. Please try again later." });
  }
});

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 AI Backend Server running on port ${PORT}`);
});