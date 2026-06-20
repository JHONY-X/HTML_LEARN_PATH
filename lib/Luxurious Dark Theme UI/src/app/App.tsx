import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Calendar, BarChart2, User, Moon, Sun, Settings } from 'lucide-react';
import Dashboard from './components/Dashboard';
import Timeline from './components/Timeline';
import Statistics from './components/Statistics';
import Profile from './components/Profile';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(true);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Dashboard />;
      case 'timeline':
        return <Timeline />;
      case 'statistics':
        return <Statistics />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={`flex justify-center items-center min-h-screen ${isDarkMode ? 'bg-black' : 'bg-zinc-100'} font-sans overflow-hidden transition-colors duration-500`} style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Mobile App Container */}
      <div className={`w-full max-w-[430px] h-[100dvh] md:h-[932px] ${isDarkMode ? 'bg-[#0b1121]' : 'bg-zinc-50'} relative flex flex-col md:rounded-[40px] md:border-[8px] ${isDarkMode ? 'border-zinc-900' : 'border-zinc-300'} overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-colors duration-500`}>
        
        {/* Top App Bar */}
        <div className={`flex justify-between items-center px-6 pt-12 pb-4 ${isDarkMode ? 'bg-gradient-to-r from-[#1E3A8A]/90 to-[#3B82F6]/90' : 'bg-gradient-to-r from-blue-600/90 to-blue-400/90'} z-20 backdrop-blur-md absolute top-0 w-full shadow-lg`}>
          <div className="w-8" /> {/* Spacer for centering */}
          <h1 className="text-lg font-bold tracking-wide text-white">
            {activeTab === 'home' && 'Today'}
            {activeTab === 'timeline' && 'Timeline'}
            {activeTab === 'statistics' && 'Insights'}
            {activeTab === 'profile' && 'Profile'}
          </h1>
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm active:scale-95 transition-transform"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-white" /> : <Moon className="w-4 h-4 text-white" />}
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden pt-28 pb-24 px-6 scrollbar-hide">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="min-h-full"
            >
              {React.cloneElement(renderContent() as React.ReactElement, { isDarkMode })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Navigation */}
        <div className={`absolute bottom-0 w-full ${isDarkMode ? 'bg-[#0f172a]/90 border-white/10' : 'bg-white/90 border-zinc-200'} backdrop-blur-xl border-t pb-8 pt-4 px-6 z-20 transition-colors duration-500`}>
          <div className="flex justify-between items-center">
            <NavItem icon={<Home />} label="Home" isActive={activeTab === 'home'} onClick={() => setActiveTab('home')} isDarkMode={isDarkMode} />
            <NavItem icon={<Calendar />} label="Timeline" isActive={activeTab === 'timeline'} onClick={() => setActiveTab('timeline')} isDarkMode={isDarkMode} />
            <NavItem icon={<BarChart2 />} label="Stats" isActive={activeTab === 'statistics'} onClick={() => setActiveTab('statistics')} isDarkMode={isDarkMode} />
            <NavItem icon={<User />} label="Profile" isActive={activeTab === 'profile'} onClick={() => setActiveTab('profile')} isDarkMode={isDarkMode} />
          </div>
        </div>
        
        {/* Ambient Background Elements */}
        {isDarkMode && (
          <>
            <div className="absolute top-[10%] -left-[20%] w-[300px] h-[300px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[20%] -right-[20%] w-[300px] h-[300px] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />
          </>
        )}
      </div>
    </div>
  );
}

function NavItem({ icon, label, isActive, onClick, isDarkMode }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void, isDarkMode: boolean }) {
  const activeColor = isDarkMode ? 'text-blue-400' : 'text-blue-600';
  const inactiveColor = isDarkMode ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600';

  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-1 w-16 transition-all duration-300 ${isActive ? activeColor : inactiveColor}`}
    >
      <div className={`relative ${isActive && isDarkMode ? 'drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]' : ''}`}>
        {React.cloneElement(icon as React.ReactElement, { className: 'w-6 h-6' })}
      </div>
      <span className="text-[10px] font-medium tracking-wide">{label}</span>
      {isActive && (
        <motion.div 
          layoutId="navIndicator"
          className={`absolute -bottom-3 w-1 h-1 rounded-full ${isDarkMode ? 'bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,1)]' : 'bg-blue-600'}`}
        />
      )}
    </button>
  );
}
