import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home, Brain, Heart, MessageSquare, Mic, BookOpen } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import Memory from './pages/Memory';
import Emotions from './pages/Emotions';
import Discord from './pages/Discord';
import Media from './pages/Media';
import Journal from './pages/Journal';

export default function App() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/memory', label: 'Memory', icon: Brain },
    { path: '/emotions', label: 'Emotions', icon: Heart },
    { path: '/discord', label: 'Discord', icon: MessageSquare },
    { path: '/media', label: 'Media', icon: Mic },
    { path: '/journal', label: 'Journal', icon: BookOpen },
  ];

  return (
    <div className="flex flex-col md:flex-row h-screen bg-ash-bg text-ash-text">
      {/* Desktop Sidebar — hidden on mobile */}
      <aside className="hidden md:flex w-64 bg-ash-surface border-r border-ash-border flex-col overflow-y-auto shrink-0">
        {/* Logo */}
        <div className="p-6 border-b border-ash-border flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-ash-bee to-ash-darius flex items-center justify-center">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-ash-text tracking-wide">ASHVALE</h1>
            <p className="text-xs text-ash-muted -mt-0.5">Hub</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-ash-accent/20 text-ash-accent border border-ash-accent/30'
                    : 'text-ash-muted hover:bg-ash-card hover:text-ash-text'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-ash-border">
          <div className="flex items-center gap-2">
            <span className="text-ash-darius text-sm font-semibold">Darius</span>
            <span className="text-ash-muted text-sm">&</span>
            <span className="text-ash-bee text-sm font-semibold">Bee</span>
          </div>
          <p className="text-xs text-ash-muted mt-1">Ashvale</p>
        </div>
      </aside>

      {/* Mobile Header — visible only on mobile */}
      <header className="md:hidden flex items-center justify-between px-4 py-3 bg-ash-surface border-b border-ash-border shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-ash-bee to-ash-darius flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <span className="text-lg font-bold text-ash-text tracking-wide">ASHVALE</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-ash-darius text-xs font-semibold">D</span>
          <span className="text-ash-muted text-xs">&</span>
          <span className="text-ash-bee text-xs font-semibold">B</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/memory" element={<Memory />} />
          <Route path="/emotions" element={<Emotions />} />
          <Route path="/discord" element={<Discord />} />
          <Route path="/media" element={<Media />} />
          <Route path="/journal" element={<Journal />} />
        </Routes>
      </main>

      {/* Mobile Bottom Nav — visible only on mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-ash-surface border-t border-ash-border flex items-center justify-around py-1.5 px-0.5 z-50">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-0.5 px-1 py-1 rounded-lg transition-colors min-w-0 ${
                isActive
                  ? 'text-ash-accent'
                  : 'text-ash-muted'
              }`}
            >
              <Icon className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
              <span className="text-[9px] sm:text-[10px] font-medium truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
