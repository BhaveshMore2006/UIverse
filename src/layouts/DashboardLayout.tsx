import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Wand2, Settings, Code, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

const navItems = [
  { name: 'Studio', path: '/studio', icon: Wand2 },
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export default function DashboardLayout() {
  const location = useLocation();

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden text-primary-text">
      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', damping: 20 }}
        className="w-64 border-r border-border bg-secondary-background flex flex-col relative z-10"
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary-accent to-secondary-accent flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.5)]">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-wide">UIverse</span>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4 relative">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative",
                  isActive 
                    ? "bg-elevated-panel text-white shadow-sm border border-border" 
                    : "text-secondary-text hover:bg-panel hover:text-primary-text"
                )}
              >
                <Icon className={cn("w-5 h-5 relative z-10", isActive ? "text-primary-accent" : "")} />
                <span className="font-medium relative z-10">{item.name}</span>
                {isActive && (
                  <motion.div 
                    layoutId="active-nav"
                    className="absolute inset-0 bg-elevated-panel border border-border rounded-xl"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {isActive && (
                   <div className="absolute left-0 w-1 h-8 bg-primary-accent rounded-r-full top-1/2 -translate-y-1/2" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border mt-auto">
          <div className="flex items-center gap-3 px-4 py-3 bg-panel rounded-xl border border-border hover:bg-elevated-panel transition-colors cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-elevated-panel flex items-center justify-center">
              <Code className="w-4 h-4 text-secondary-accent" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-primary-text">Developer</span>
              <span className="text-xs text-muted-text">Free Plan</span>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-background">
        {/* Subtle background glow */}
        <div className="absolute top-[-10%] left-1/4 w-[500px] h-[500px] bg-primary-accent/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-1/4 w-[500px] h-[500px] bg-secondary-accent/10 rounded-full blur-[120px] pointer-events-none" />
        
        <Outlet />
      </main>
    </div>
  );
}
