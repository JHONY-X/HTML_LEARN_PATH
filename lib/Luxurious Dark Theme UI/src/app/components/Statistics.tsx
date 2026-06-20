import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie, Sector } from 'recharts';

const progressData = [
  { name: 'Week 1', days: 5 },
  { name: 'Week 2', days: 12 },
  { name: 'Week 3', days: 18 },
  { name: 'Week 4', days: 25 },
  { name: 'Week 5', days: 32 },
  { name: 'Week 6', days: 38 },
  { name: 'Week 7', days: 45 },
  { name: 'Week 8', days: 52 },
  { name: 'Week 9', days: 60 },
  { name: 'Week 10', days: 68 },
];

const streakData = [
  { name: 'Mon', hours: 4 },
  { name: 'Tue', hours: 6 },
  { name: 'Wed', hours: 2 },
  { name: 'Thu', hours: 5 },
  { name: 'Fri', hours: 7 },
  { name: 'Sat', hours: 1 },
  { name: 'Sun', hours: 3 },
];

const categoryData = [
  { name: 'Frontend', value: 45, color: '#3B82F6' },
  { name: 'Backend', value: 30, color: '#F97316' },
  { name: 'DevOps', value: 15, color: '#10B981' },
  { name: 'UI/UX', value: 10, color: '#8B5CF6' },
];

export default function Statistics({ isDarkMode }: { isDarkMode?: boolean }) {
  const [activeTab, setActiveTab] = useState('progress');

  const textPrimary = isDarkMode ? "text-white" : "text-slate-900";
  const glassCard = isDarkMode 
    ? "bg-white/5 border-white/10 backdrop-blur-md" 
    : "bg-white/70 border-white/50 backdrop-blur-md shadow-sm";

  const renderChart = () => {
    switch (activeTab) {
      case 'progress':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-64 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={progressData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorDays" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke={isDarkMode ? '#475569' : '#94a3b8'} fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke={isDarkMode ? '#475569' : '#94a3b8'} fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: isDarkMode ? '#1e293b' : '#ffffff', border: 'none', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  itemStyle={{ color: '#3B82F6', fontWeight: 'bold' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="days" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorDays)" 
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        );
      case 'streak':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-64 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={streakData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke={isDarkMode ? '#475569' : '#94a3b8'} fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke={isDarkMode ? '#475569' : '#94a3b8'} fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: isDarkMode ? '#334155' : '#f1f5f9' }}
                  contentStyle={{ backgroundColor: isDarkMode ? '#1e293b' : '#ffffff', border: 'none', borderRadius: '8px' }}
                />
                <Bar dataKey="hours" radius={[4, 4, 0, 0]} animationDuration={1000}>
                  {streakData.map((entry, index) => {
                    const color = entry.hours >= 5 ? '#10B981' : entry.hours >= 3 ? '#F59E0B' : '#EF4444';
                    return <Cell key={`cell-${index}`} fill={color} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        );
      case 'categories':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-64 w-full mt-4 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  animationDuration={1000}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: isDarkMode ? '#1e293b' : '#ffffff', border: 'none', borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Custom Legend inside absolute div if needed, or rely on tooltip */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none mt-2">
              <span className={`block text-xs font-semibold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Total</span>
              <span className={`block text-xl font-bold ${textPrimary}`}>100%</span>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      
      {/* Custom Tab Bar */}
      <div className={`flex p-1 rounded-full ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'}`}>
        {['progress', 'streak', 'categories'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 text-xs font-semibold capitalize rounded-full transition-all duration-300 relative z-10 ${
              activeTab === tab 
                ? (isDarkMode ? 'text-white' : 'text-blue-700') 
                : (isDarkMode ? 'text-slate-400' : 'text-slate-500')
            }`}
          >
            {activeTab === tab && (
              <motion.div
                layoutId="statsTabIndicator"
                className={`absolute inset-0 rounded-full -z-10 shadow-sm ${isDarkMode ? 'bg-slate-700' : 'bg-white'}`}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            {tab}
          </button>
        ))}
      </div>

      {/* Chart Container */}
      <div className={`p-4 rounded-3xl border ${glassCard}`}>
        <h3 className={`text-lg font-bold capitalize ${textPrimary}`}>{activeTab} Chart</h3>
        <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          {activeTab === 'progress' && 'Cumulative learning days over time.'}
          {activeTab === 'streak' && 'Weekly study hours and streak length.'}
          {activeTab === 'categories' && 'Distribution of skills focused on.'}
        </p>
        
        {renderChart()}

        {/* Legend for Categories */}
        {activeTab === 'categories' && (
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {categoryData.map(cat => (
              <div key={cat.name} className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                <span className={`text-[10px] font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{cat.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
