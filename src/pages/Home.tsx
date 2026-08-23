import { motion } from 'framer-motion';
import { ArrowRight, Wand2, Layout, Zap, Code } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-primary-text flex flex-col relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-primary-accent/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-secondary-accent/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Navigation */}
      <nav className="w-full h-20 flex items-center justify-between px-8 max-w-7xl mx-auto relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-accent to-secondary-accent flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.5)]">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-2xl tracking-wide">UIverse</span>
        </div>
        <div className="flex gap-4">
          <Link to="/studio" className="px-6 py-2.5 rounded-xl bg-panel border border-border text-sm font-medium hover:bg-elevated-panel transition-colors flex items-center gap-2">
            Login
          </Link>
          <Link to="/studio" className="px-6 py-2.5 rounded-xl bg-primary-accent text-white text-sm font-medium hover:bg-primary-accent/90 transition-all shadow-[0_0_15px_rgba(139,92,246,0.4)] flex items-center gap-2">
            Get Started <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 relative z-10 max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elevated-panel border border-border mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-secondary-accent animate-pulse" />
          <span className="text-xs font-medium text-secondary-text">UIverse 1.0 is live</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-6xl md:text-8xl font-bold tracking-tight mb-6"
        >
          Turn ideas into <br />
          <span className="text-transparent bg-clip-text bg-hero-gradient">
            interfaces.
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-secondary-text max-w-2xl mb-12"
        >
          The AI-Assisted UI Generation Studio. Provide a wireframe, prompt, or existing code, and let UIverse generate production-ready React components.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link to="/studio" className="px-8 py-4 rounded-xl bg-white text-background font-semibold hover:scale-105 transition-transform flex items-center gap-2">
            <Wand2 className="w-5 h-5" />
            Open Studio
          </Link>
          <button className="px-8 py-4 rounded-xl bg-panel border border-border text-white font-semibold hover:bg-elevated-panel transition-colors flex items-center gap-2">
            <Code className="w-5 h-5" />
            View Documentation
          </button>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mt-24"
        >
          {[
            { title: "Wireframe to Code", desc: "Upload hand-drawn wireframes and instantly get structured React components.", icon: Layout },
            { title: "Prompt Driven", desc: "Describe your UI naturally and let the AI generate the perfect layout.", icon: Wand2 },
            { title: "Code Refinement", desc: "Paste your existing JSX and have UIverse style, animate, and optimize it.", icon: Code },
          ].map((feature, i) => (
             <div key={i} className="flex flex-col items-center text-center p-6 rounded-2xl bg-panel/30 border border-border backdrop-blur-sm">
                <div className="w-12 h-12 rounded-full bg-elevated-panel flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-secondary-accent" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-secondary-text">{feature.desc}</p>
             </div>
          ))}
        </motion.div>

      </main>
    </div>
  );
}
