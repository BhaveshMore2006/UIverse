import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Wand2, Settings, Code, Zap, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { useEffect, useState } from 'react';

const navItems = [
  { name: 'Studio', path: '/studio', icon: Wand2 },
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export default function DashboardLayout() {
  const location = useLocation();
  const [userName, setUserName] = useState('Developer');

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('uiverse_user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user && user.name) {
          setUserName(user.name);
        }
      }
    } catch (error) {
      console.error('Failed to parse user from localStorage:', error);
    }
  }, []);

  return (
    <div className="flex h-screen w-full bg-transparent overflow-hidden text-primary-text">
      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', damping: 20 }}
        className="w-64 border-r border-border/50 bg-secondary-background/80 backdrop-blur-xl flex flex-col relative z-20"
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary-accent to-secondary-accent flex items-center justify-center shadow-glow">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">UIverse</span>
        </div>

        <nav className="flex-1 px-4 space-y-1.5 mt-2 relative">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 relative group overflow-hidden",
                  isActive 
                    ? "bg-primary-accent/10 text-white border border-primary-accent/30 shadow-[inset_0_0_15px_rgba(139,92,246,0.1)]" 
                    : "text-secondary-text hover:bg-elevated-panel/50 hover:text-white"
                )}
              >
                <Icon className={cn("w-4 h-4 relative z-10 transition-colors", isActive ? "text-secondary-accent" : "group-hover:text-primary-accent")} />
                <span className="font-medium text-sm relative z-10">{item.name}</span>
                {isActive && (
                   <motion.div layoutId="nav-indicator" className="absolute left-0 w-1 h-6 bg-gradient-to-b from-primary-accent to-secondary-accent rounded-r-full top-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border/50 mt-auto">
          <div className="flex items-center gap-3 px-3 py-3 bg-panel/50 backdrop-blur-md rounded-lg border border-border/50 hover:bg-elevated-panel/80 transition-all cursor-pointer shadow-subtle hover:shadow-glow group">
            <div className="w-8 h-8 rounded-md bg-secondary-background border border-border/50 flex items-center justify-center group-hover:border-primary-accent/50 transition-colors">
              <User className="w-4 h-4 text-secondary-accent" />
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-medium text-white group-hover:text-primary-accent transition-colors truncate">
                {userName}
              </span>
              <span className="text-xs text-muted-text">Cosmic Plan</span>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-transparent">
        {/* Subtle background glow */}
        <div className="absolute top-[-10%] left-1/4 w-[600px] h-[600px] bg-primary-accent/15 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-1/4 w-[600px] h-[600px] bg-secondary-accent/15 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
        
        <Outlet />
      </main>
    </div>
  );
}
