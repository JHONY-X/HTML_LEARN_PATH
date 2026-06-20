import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, Moon, Sun, Bell, Download, Trash2, ChevronRight } from 'lucide-react';

export default function Profile({ isDarkMode }: { isDarkMode?: boolean }) {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const handleExport = () => {
    setShowSnackbar(true);
    setTimeout(() => setShowSnackbar(false), 2000);
  };

  const textPrimary = isDarkMode ? "text-white" : "text-slate-900";
  const textSecondary = isDarkMode ? "text-slate-400" : "text-slate-500";
  const glassCard = isDarkMode 
    ? "bg-white/5 border-white/10 backdrop-blur-md hover:bg-white/10" 
    : "bg-white/70 border-white/50 backdrop-blur-md shadow-sm hover:bg-white/90";

  return (
    <div className="flex flex-col">
      {/* Profile Header */}
      <div className="flex flex-col items-center mt-2 mb-8">
        <div className="relative mb-3">
          <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-br from-blue-500 to-blue-300 shadow-md">
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-transparent bg-white">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80" 
                alt="Profile Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        <h2 className={`text-xl font-bold ${textPrimary}`}>Alex Developer</h2>
        <p className={`text-xs font-medium ${textSecondary}`}>Level 42 Architect</p>
      </div>

      <div className="space-y-4 pb-2">
        <h3 className={`text-sm font-bold uppercase tracking-widest px-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>Settings</h3>
        
        {/* Settings Tiles */}
        <div className="space-y-2">
          {/* Notification Schedule */}
          <SettingTile 
            icon={<Bell className={`w-5 h-5 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`} />} 
            label="Daily Reminder" 
            value="09:00 AM"
            glassCard={glassCard}
            textPrimary={textPrimary}
          />
          
          {/* Export Data */}
          <SettingTile 
            icon={<Download className={`w-5 h-5 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`} />} 
            label="Export Data" 
            value="CSV/JSON"
            glassCard={glassCard}
            textPrimary={textPrimary}
            onClick={handleExport}
          />

          {/* Reset Tracker */}
          <button 
            onClick={() => setShowDialog(true)}
            className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-300
              ${isDarkMode ? 'bg-red-950/20 border-red-900/50 hover:bg-red-900/30' : 'bg-red-50 border-red-200 hover:bg-red-100'}
            `}
          >
            <div className="flex items-center gap-4">
              <Trash2 className="w-5 h-5 text-red-500" />
              <span className="text-sm font-bold text-red-500">Reset Tracker</span>
            </div>
            <ChevronRight className="w-4 h-4 text-red-400 opacity-50" />
          </button>
        </div>
      </div>

      {/* Success Snackbar */}
      <AnimatePresence>
        {showSnackbar && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className={`fixed bottom-24 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full shadow-lg z-50 flex items-center gap-2
              ${isDarkMode ? 'bg-emerald-500 text-white' : 'bg-emerald-600 text-white'}`}
          >
            <Download className="w-4 h-4" />
            <span className="text-sm font-bold">Data exported successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirmation Dialog Overlay */}
      <AnimatePresence>
        {showDialog && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
              onClick={() => setShowDialog(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] max-w-sm p-6 rounded-3xl z-50 shadow-2xl
                ${isDarkMode ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-slate-200'}`}
            >
              <h3 className={`text-lg font-bold mb-2 ${textPrimary}`}>Reset Progress?</h3>
              <p className={`text-sm mb-6 ${textSecondary}`}>This action cannot be undone. All your statistics and timeline progress will be permanently deleted.</p>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowDialog(false)}
                  className={`flex-1 py-3 rounded-xl font-bold text-sm transition-colors ${isDarkMode ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}`}
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setShowDialog(false)}
                  className="flex-1 py-3 rounded-xl font-bold text-sm bg-red-500 text-white hover:bg-red-600 transition-colors shadow-[0_4px_14px_rgba(239,68,68,0.4)]"
                >
                  Yes, Reset
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}

function SettingTile({ icon, label, value, glassCard, textPrimary, onClick }: { icon: React.ReactNode, label: string, value?: string, glassCard: string, textPrimary: string, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${glassCard}`}
    >
      <div className="flex items-center gap-4">
        {icon}
        <span className={`text-sm font-semibold ${textPrimary}`}>{label}</span>
      </div>
      <div className="flex items-center gap-3">
        {value && <span className="text-xs font-medium text-slate-500">{value}</span>}
        <ChevronRight className="w-4 h-4 text-slate-400" />
      </div>
    </button>
  );
}
