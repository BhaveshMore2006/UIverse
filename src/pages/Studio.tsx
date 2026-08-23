import { useState } from 'react';
import { motion } from 'framer-motion';
import { ImagePlus, Code2, Send, Wand2, Play, Maximize2 } from 'lucide-react';
import { cn } from '@/utils/cn';
import Editor from '@monaco-editor/react';

export default function Studio() {
  const [prompt, setPrompt] = useState('');
  const [activeTab, setActiveTab] = useState<'prompt' | 'code' | 'image'>('prompt');
  
  return (
    <div className="flex-1 flex flex-col h-full relative z-10 p-6 gap-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Studio</h1>
          <p className="text-sm text-muted-text mt-1">Design and generate your interfaces</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-panel border border-border rounded-lg text-sm font-medium hover:bg-elevated-panel transition-colors flex items-center gap-2">
            <Play className="w-4 h-4 text-success" />
            Preview
          </button>
          <button className="px-4 py-2 bg-primary-accent text-white rounded-lg text-sm font-medium hover:bg-primary-accent/90 transition-colors shadow-[0_0_15px_rgba(139,92,246,0.4)] flex items-center gap-2">
            <Wand2 className="w-4 h-4" />
            Generate UI
          </button>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
        
        {/* Left Panel: Inputs */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-3 flex flex-col bg-secondary-background border border-border rounded-2xl overflow-hidden"
        >
          <div className="flex items-center border-b border-border p-2 gap-2 bg-panel/50">
            {[
              { id: 'prompt', label: 'Prompt', icon: Send },
              { id: 'code', label: 'Code', icon: Code2 },
              { id: 'image', label: 'Wireframe', icon: ImagePlus },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all",
                  activeTab === tab.id 
                    ? "bg-elevated-panel text-white shadow-sm border border-border/50" 
                    : "text-muted-text hover:text-primary-text hover:bg-panel"
                )}
              >
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex-1 p-4 flex flex-col relative">
            {activeTab === 'prompt' && (
              <div className="flex-1 flex flex-col">
                <label className="text-sm font-medium text-secondary-text mb-2">Describe your component</label>
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. A futuristic pricing card with a cosmic gradient border..."
                  className="flex-1 bg-panel border border-border rounded-xl p-4 text-sm text-primary-text resize-none focus:outline-none focus:border-primary-accent/50 focus:ring-1 focus:ring-primary-accent/50 transition-all placeholder:text-muted-text/50"
                />
              </div>
            )}
            {activeTab === 'code' && (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-border rounded-xl bg-panel/50">
                <Code2 className="w-8 h-8 text-muted-text mb-3" />
                <h3 className="text-sm font-medium text-primary-text mb-1">Upload React/JSX Code</h3>
                <p className="text-xs text-muted-text mb-4">Provide existing code as a starting point</p>
                <button className="px-4 py-2 bg-elevated-panel border border-border rounded-lg text-xs font-medium hover:bg-panel transition-colors">
                  Browse Files
                </button>
              </div>
            )}
            {activeTab === 'image' && (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-border rounded-xl bg-panel/50 hover:border-primary-accent/30 transition-colors cursor-pointer group">
                <div className="w-12 h-12 rounded-full bg-elevated-panel flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <ImagePlus className="w-5 h-5 text-secondary-accent" />
                </div>
                <h3 className="text-sm font-medium text-primary-text mb-1">Upload Wireframe</h3>
                <p className="text-xs text-muted-text">Drag & drop or click to upload</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Middle Panel: Code Editor */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="col-span-5 flex flex-col bg-secondary-background border border-border rounded-2xl overflow-hidden"
        >
          <div className="h-12 border-b border-border bg-panel/50 flex items-center px-4 justify-between">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-primary-accent" />
              <span className="text-sm font-medium text-primary-text">Component.tsx</span>
            </div>
            <div className="flex items-center gap-1">
               <div className="w-2.5 h-2.5 rounded-full bg-error/80" />
               <div className="w-2.5 h-2.5 rounded-full bg-warning/80" />
               <div className="w-2.5 h-2.5 rounded-full bg-success/80" />
            </div>
          </div>
          <div className="flex-1 p-2">
            <Editor
              height="100%"
              defaultLanguage="typescript"
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 13,
                fontFamily: 'JetBrains Mono, monospace',
                padding: { top: 16 },
                scrollBeyondLastLine: false,
                smoothScrolling: true,
              }}
              value={`export default function GeneratedComponent() {\n  return (\n    <div className="p-6 bg-panel rounded-xl border border-border">\n      <h2 className="text-xl font-bold text-white mb-2">\n        Welcome to UIverse\n      </h2>\n      <p className="text-secondary-text">\n        Start generating components by describing them.\n      </p>\n    </div>\n  );\n}`}
            />
          </div>
        </motion.div>

        {/* Right Panel: Live Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="col-span-4 flex flex-col bg-secondary-background border border-border rounded-2xl overflow-hidden relative"
        >
          <div className="h-12 border-b border-border bg-panel/50 flex items-center px-4 justify-between">
            <span className="text-sm font-medium text-primary-text flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
              </span>
              Live Preview
            </span>
            <button className="p-1.5 hover:bg-elevated-panel rounded-md text-muted-text hover:text-primary-text transition-colors">
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 p-6 flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-elevated-panel/50 via-background to-background">
             {/* Mock Preview Content */}
             <div className="p-6 bg-panel rounded-xl border border-border shadow-xl transform transition-all hover:-translate-y-1 hover:shadow-primary-accent/20">
                <h2 className="text-xl font-bold text-white mb-2">
                  Welcome to UIverse
                </h2>
                <p className="text-secondary-text text-sm">
                  Start generating components by describing them.
                </p>
                <button className="mt-4 px-4 py-2 bg-gradient-to-r from-primary-accent to-secondary-accent rounded-lg text-white text-sm font-medium">
                   Get Started
                </button>
             </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
