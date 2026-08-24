import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Wand2, Layout, Code, Sparkles, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import CosmicBackground from '../components/CosmicBackground';
import AuthModal from '../components/AuthModal';

export default function Home() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('uiverse_token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleAction = (e: React.MouseEvent) => {
    if (isLoggedIn) {
      navigate('/studio');
    } else {
      setIsAuthOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-primary-text flex flex-col relative overflow-hidden font-sans">
      
      {/* Background Component */}
      <CosmicBackground />

      {/* Navigation */}
      <nav className="w-full h-20 flex items-center justify-between px-8 max-w-7xl mx-auto relative z-10 mt-6 bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#6366f1] flex items-center justify-center shadow-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-2xl tracking-wide text-white">UIverse</span>
        </div>
        <div className="flex items-center gap-6">
          {!isLoggedIn ? (
            <button 
              onClick={() => setIsAuthOpen(true)}
              className="text-sm font-medium text-white hover:text-gray-300 transition-colors cursor-pointer relative z-20"
            >
              Login
            </button>
          ) : (
            <button 
              onClick={() => {
                localStorage.removeItem('uiverse_token');
                localStorage.removeItem('uiverse_user');
                setIsLoggedIn(false);
              }}
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors cursor-pointer relative z-20 flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          )}
          <button 
            onClick={handleAction}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] text-white text-sm font-medium hover:opacity-90 transition-all flex items-center gap-2 cursor-pointer relative z-20 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]"
          >
            {isLoggedIn ? 'Go to Studio' : 'Get Started'} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 relative z-10 max-w-5xl mx-auto w-full pt-16 pb-24">
        


        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-6xl md:text-[5.5rem] font-bold tracking-tight mb-6 text-white leading-[1.1]"
        >
          Turn ideas into <br />
          <motion.span 
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b5cf6] via-[#3b82f6] to-[#8b5cf6] bg-[length:200%_auto]"
          >
            interfaces.
          </motion.span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed font-light"
        >
          The AI-Assisted UI Generation Studio. Provide a wireframe, prompt, or existing code, and let UIverse generate production-ready React components.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 relative z-20"
        >
          <button 
            onClick={handleAction}
            className="px-7 py-3 rounded-xl bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] text-white font-medium hover:opacity-90 transition-all flex items-center gap-2 cursor-pointer hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]"
          >
            <Wand2 className="w-5 h-5" />
            Open Studio
          </button>
          <button className="px-7 py-3 rounded-xl bg-transparent border border-white/20 text-white font-medium hover:bg-white/5 hover:border-white/40 transition-colors flex items-center gap-2">
            <Code className="w-5 h-5" />
            View Documentation
          </button>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mt-32 relative"
        >
          {[
            { 
              title: "Wireframe to Code", 
              desc: "Convert any wireframe into clean, responsive React components.", 
              icon: Layout, 
              color: "text-blue-400",
              bgColor: "bg-blue-500/10"
            },
            { 
              title: "Prompt Driven", 
              desc: "Describe your UI in natural language and see it come to life.", 
              icon: Wand2, 
              color: "text-purple-400",
              bgColor: "bg-purple-500/10"
            },
            { 
              title: "Code Refinement", 
              desc: "Improve and adapt existing code with AI suggestions.", 
              icon: Code, 
              color: "text-blue-400",
              bgColor: "bg-blue-500/10"
            },
          ].map((feature, i) => (
             <motion.div 
                key={i} 
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="flex flex-col items-center text-center p-8 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-xl hover:bg-white/[0.04] transition-colors hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] group"
             >
                <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3 tracking-wide">{feature.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed font-light">{feature.desc}</p>
             </motion.div>
          ))}
        </motion.div>

      </main>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
}
