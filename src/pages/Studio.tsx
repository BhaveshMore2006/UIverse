import { useState } from 'react';
import { motion } from 'framer-motion';
import { ImagePlus, Code2, Send, Wand2, Play, Maximize2, Loader2 } from 'lucide-react';
import { cn } from '@/utils/cn';
import Editor from '@monaco-editor/react';

export default function Studio() {
  const [prompt, setPrompt] = useState('');
  const [activeTab, setActiveTab] = useState<'prompt' | 'code' | 'image'>('prompt');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const defaultCode = `export default function GeneratedComponent() {
  return (
    <div className="p-8 bg-panel/80 backdrop-blur-md rounded-xl border border-border shadow-glow hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-shadow">
      <h2 className="text-xl font-bold text-white mb-2 tracking-wide">
        Welcome to UIverse
      </h2>
      <p className="text-secondary-text text-sm mb-6 leading-relaxed">
        Start generating components by describing them.
      </p>
      <button className="px-5 py-2.5 bg-gradient-to-r from-primary-accent to-secondary-accent rounded-lg text-white text-sm font-medium hover:scale-105 transition-all shadow-glow">
        Get Started
      </button>
    </div>
  );
}`;

  const [code, setCode] = useState(defaultCode);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const formData = new FormData();
      formData.append('mode', activeTab);
      
      if (activeTab === 'prompt') {
        formData.append('prompt', prompt || 'A nice section');
      } else if (activeTab === 'code') {
        formData.append('code', code);
      }

      const res = await fetch('http://localhost:4000/api/generate', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.ok && data.code) {
        setCode(data.code);
      } else {
        console.error('Generation failed:', data);
        alert(data.error?.message || 'Generation failed');
      }
    } catch (err: any) {
      console.error('Network error:', err);
      alert('Failed to connect to the backend server. Please make sure your backend is running on port 4000 without any errors.');
    } finally {
      setIsGenerating(false);
    }
  };

  const generatePreviewHtml = (sourceCode: string) => {
    let transformedCode = sourceCode.replace(/import.*?['"];?/g, '');
    transformedCode = transformedCode.replace(/export\s+default\s+function\s+(\w+)/, 'const App = function $1');
    if (!transformedCode.includes('const App =')) {
      transformedCode = transformedCode.replace(/export\s+default\s+/, 'const App = ');
    }

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
        <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
        <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  background: '#030014',
                  'secondary-background': '#0A0118',
                  panel: 'rgba(20, 10, 40, 0.4)',
                  'elevated-panel': 'rgba(30, 20, 60, 0.6)',
                  border: 'rgba(139, 92, 246, 0.15)',
                  'primary-text': '#F8F8FF',
                  'secondary-text': '#A390E4',
                  'muted-text': '#6B5C8D',
                  'primary-accent': '#8B5CF6',
                  'secondary-accent': '#06B6D4',
                  'optional-highlight': '#D946EF',
                  success: '#10B981',
                  warning: '#F59E0B',
                  error: '#EF4444',
                },
                boxShadow: {
                  'subtle': '0 4px 20px -2px rgba(139, 92, 246, 0.1)',
                  'float': '0 8px 30px -4px rgba(6, 182, 212, 0.2), 0 0 15px rgba(139, 92, 246, 0.3)',
                  'glow': '0 0 20px rgba(139, 92, 246, 0.4), inset 0 0 10px rgba(139, 92, 246, 0.2)',
                },
                backgroundImage: {
                  'stars-pattern': 'radial-gradient(1px 1px at 20px 30px, #ffffff, rgba(0,0,0,0)), radial-gradient(1px 1px at 40px 70px, #ffffff, rgba(0,0,0,0)), radial-gradient(1px 1px at 50px 160px, #ffffff, rgba(0,0,0,0)), radial-gradient(1px 1px at 90px 40px, #ffffff, rgba(0,0,0,0)), radial-gradient(1px 1px at 130px 80px, #ffffff, rgba(0,0,0,0)), radial-gradient(1.5px 1.5px at 160px 120px, #ffffff, rgba(0,0,0,0))'
                }
              }
            }
          }
        </script>
        <style>
          body { 
            margin: 0; 
            min-height: 100vh; 
            background-color: transparent; 
          }
          #root { width: 100%; min-height: 100vh; display: flex; justify-content: center; align-items: center; padding: 24px; box-sizing: border-box; }
        </style>
        <script>
          window.addEventListener('error', function(e) {
            document.getElementById('root').innerHTML = '<div style="color: #EF4444; font-family: monospace; padding: 20px; background: rgba(239, 68, 68, 0.1); border-radius: 8px; border: 1px solid rgba(239, 68, 68, 0.3); max-width: 100%; overflow: auto;">' + e.message + '</div>';
          });
        </script>
      </head>
      <body>
        <div id="root"></div>
        <script type="text/babel">
          ${transformedCode}
          const root = ReactDOM.createRoot(document.getElementById('root'));
          root.render(<App />);
        </script>
      </body>
      </html>
    `;
  };

  return (
    <div className="flex-1 flex flex-col h-full relative z-10 p-6 gap-6 bg-transparent">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight drop-shadow-[0_0_8px_rgba(139,92,246,0.3)]">Studio</h1>
          <p className="text-sm text-secondary-text mt-1">Design and generate your interfaces</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-panel/50 backdrop-blur-md border border-border/50 rounded-lg text-sm font-medium text-white hover:bg-elevated-panel/70 transition-colors flex items-center gap-2 shadow-subtle hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:border-success/50">
            <Play className="w-4 h-4 text-success" />
            Preview
          </button>
          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className="px-4 py-2 bg-gradient-to-r from-primary-accent to-secondary-accent text-white rounded-lg text-sm font-medium hover:scale-105 transition-all shadow-glow flex items-center gap-2 border border-white/10 disabled:opacity-70 disabled:hover:scale-100"
          >
            {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
            {isGenerating ? 'Generating...' : 'Generate UI'}
          </button>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
        
        {/* Left Panel: Inputs */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-3 flex flex-col bg-panel/60 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(139,92,246,0.05)]"
        >
          <div className="flex items-center border-b border-border/50 p-2 gap-2 bg-secondary-background/50">
            {[
              { id: 'prompt', label: 'Prompt', icon: Send },
              { id: 'code', label: 'Code', icon: Code2 },
              { id: 'image', label: 'Wireframe', icon: ImagePlus },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-300",
                  activeTab === tab.id 
                    ? "bg-primary-accent/20 text-white shadow-[inset_0_0_10px_rgba(139,92,246,0.2)] border border-primary-accent/30" 
                    : "text-muted-text hover:text-white hover:bg-elevated-panel/50"
                )}
              >
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex-1 p-5 flex flex-col relative">
            {activeTab === 'prompt' && (
              <div className="flex-1 flex flex-col">
                <label className="text-sm font-medium text-white mb-3">Describe your component</label>
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. A futuristic pricing card..."
                  className="flex-1 bg-secondary-background/50 border border-border/50 rounded-xl p-4 text-sm text-white resize-none focus:outline-none focus:border-secondary-accent/50 focus:ring-1 focus:ring-secondary-accent/50 transition-all placeholder:text-muted-text shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]"
                />
              </div>
            )}
            {activeTab === 'code' && (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-border/50 rounded-xl bg-secondary-background/30 hover:border-primary-accent/40 transition-colors">
                <Code2 className="w-8 h-8 text-secondary-text mb-3" />
                <h3 className="text-sm font-medium text-white mb-1">Upload React/JSX Code</h3>
                <p className="text-xs text-muted-text mb-5">Provide existing code as a starting point</p>
                <button className="px-5 py-2 bg-panel border border-border/50 rounded-lg text-xs font-medium text-white hover:bg-elevated-panel transition-colors shadow-subtle hover:shadow-glow hover:border-primary-accent/50">
                  Browse Files
                </button>
              </div>
            )}
            {activeTab === 'image' && (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-border/50 rounded-xl bg-secondary-background/30 hover:border-secondary-accent/40 transition-colors cursor-pointer group">
                <div className="w-14 h-14 rounded-full bg-panel/50 backdrop-blur-md border border-border/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-subtle group-hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                  <ImagePlus className="w-6 h-6 text-secondary-accent" />
                </div>
                <h3 className="text-sm font-medium text-white mb-1">Upload Wireframe</h3>
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
          className="col-span-5 flex flex-col bg-panel/60 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(139,92,246,0.05)]"
        >
          <div className="h-12 border-b border-border/50 bg-secondary-background/50 flex items-center px-4 justify-between">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-secondary-accent" />
              <span className="text-sm font-medium text-white">Component.tsx</span>
            </div>
            <div className="flex items-center gap-2">
               <div className="w-3 h-3 rounded-full bg-error shadow-[0_0_8px_#EF4444]" />
               <div className="w-3 h-3 rounded-full bg-warning shadow-[0_0_8px_#F59E0B]" />
               <div className="w-3 h-3 rounded-full bg-success shadow-[0_0_8px_#10B981]" />
            </div>
          </div>
          <div className="flex-1 p-2 bg-[#0A0118]/80">
            <Editor
              height="100%"
              path="component.tsx"
              defaultLanguage="typescript"
              theme="vs-dark"
              beforeMount={(monaco) => {
                monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
                  noSemanticValidation: true,
                  noSyntaxValidation: true,
                });
              }}
              options={{
                minimap: { enabled: false },
                fontSize: 13,
                fontFamily: 'JetBrains Mono, monospace',
                padding: { top: 16 },
                scrollBeyondLastLine: false,
                smoothScrolling: true,
              }}
              value={code}
              onChange={(value) => setCode(value || '')}
            />
          </div>
        </motion.div>

        {/* Right Panel: Live Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="col-span-4 flex flex-col bg-panel/60 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden relative shadow-[0_0_30px_rgba(6,182,212,0.05)]"
        >
          <div className="h-12 border-b border-border/50 bg-secondary-background/50 flex items-center px-4 justify-between">
            <span className="text-sm font-medium text-white flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success shadow-[0_0_8px_#10B981]"></span>
              </span>
              Live Preview
            </span>
            <button className="p-1.5 hover:bg-elevated-panel/50 rounded-md text-secondary-text hover:text-white transition-colors">
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 p-0 flex items-center justify-center bg-transparent relative overflow-hidden">
             <iframe 
               srcDoc={generatePreviewHtml(code)}
               className="w-full h-full border-0 absolute inset-0 mix-blend-normal"
               title="Live Preview"
               sandbox="allow-scripts"
             />
          </div>
        </motion.div>

      </div>
    </div>
  );
}
