import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, CheckCircle2, Check } from 'lucide-react';

export default function Dashboard({ isDarkMode }: { isDarkMode?: boolean }) {
  const [isDone, setIsDone] = useState(false);
  
  const glassCard = isDarkMode 
    ? "bg-white/5 border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-md" 
    : "bg-white/70 border-white/50 shadow-[0_4px_30px_rgba(0,0,0,0.05)] backdrop-blur-md";

  const textPrimary = isDarkMode ? "text-white" : "text-slate-900";
  const textSecondary = isDarkMode ? "text-slate-400" : "text-slate-500";

  return (
    <div className="flex flex-col gap-6">
      
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`relative p-6 rounded-3xl border ${glassCard} overflow-hidden`}
      >
        {/* Subtle gradient accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -mr-10 -mt-10" />
        
        <h2 className={`text-xl font-bold mb-2 ${textPrimary}`}>
          Build REST API endpoints
        </h2>
        <p className={`text-sm mb-6 ${textSecondary}`}>
          Implement authentication and user profile routes using Node.js and Express. Add input validation.
        </p>
        
        <button 
          onClick={() => setIsDone(!isDone)}
          className={`w-full py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 relative overflow-hidden group
            ${isDone 
              ? (isDarkMode ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-emerald-100 text-emerald-700 border border-emerald-200')
              : 'bg-orange-500 text-white shadow-[0_4px_14px_rgba(249,115,22,0.4)] hover:bg-orange-600'
            }`}
        >
          {/* Ripple effect overlay on hover */}
          {!isDone && <div className="absolute inset-0 bg-white/20 scale-0 group-active:scale-100 rounded-2xl transition-transform duration-300 origin-center opacity-0 group-active:opacity-100" />}
          
          <AnimatePresence mode="wait">
            {isDone ? (
              <motion.div key="done" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2">
                <Check className="w-5 h-5" />
                Completed
              </motion.div>
            ) : (
              <motion.div key="mark" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                Mark Done
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </motion.div>

      {/* Progress Bar Section */}
      <div className="px-1">
        <div className="flex justify-between items-end mb-2">
          <span className={`text-sm font-semibold ${textPrimary}`}>Overall Progress</span>
          <span className={`text-xs font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>Day 68 / 180</span>
        </div>
        <div className={`h-3 w-full rounded-full overflow-hidden ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'}`}>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${(68/180)*100}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] rounded-full relative"
          >
            {/* Shimmer effect */}
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
          </motion.div>
        </div>
      </div>

      {/* Quick Stats Chips */}
      <div className="grid grid-cols-2 gap-4 mt-2">
        <StatChip 
          icon={<Flame className="w-5 h-5 text-orange-500" />} 
          value="14" 
          label="Day Streak" 
          isDarkMode={isDarkMode}
        />
        <StatChip 
          icon={<CheckCircle2 className="w-5 h-5 text-emerald-500" />} 
          value="68" 
          label="Total Done" 
          isDarkMode={isDarkMode}
        />
      </div>

    </div>
  );
}

function StatChip({ icon, value, label, isDarkMode }: { icon: React.ReactNode, value: string, label: string, isDarkMode?: boolean }) {
  const glassCard = isDarkMode 
    ? "bg-white/5 border-white/10 backdrop-blur-md" 
    : "bg-white/80 border-white/50 backdrop-blur-md shadow-sm";

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className={`p-4 rounded-2xl border flex items-center gap-3 ${glassCard}`}
    >
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-white/5' : 'bg-slate-100'}`}>
        {icon}
      </div>
      <div>
        <h4 className={`text-xl font-bold leading-none mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{value}</h4>
        <p className={`text-[10px] font-semibold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{label}</p>
      </div>
    </motion.div>
  );
}
