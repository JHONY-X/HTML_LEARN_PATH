import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Edit2, Trash2, GripVertical } from 'lucide-react';

interface TimelineItem {
  id: string;
  type: 'header' | 'day';
  title: string;
  day?: number;
  desc?: string;
  completed?: boolean;
  isToday?: boolean;
}

const generate180Days = (): TimelineItem[] => {
  const timeline: TimelineItem[] = [];
  let currentDay = 1;
  const totalDays = 180;
  const weeks = Math.ceil(totalDays / 7);

  for (let week = 1; week <= weeks; week++) {
    if (currentDay > totalDays) break;

    let weekTitle = "Full-Stack Practice";
    if (week <= 4) weekTitle = "Frontend Foundations";
    else if (week <= 8) weekTitle = "React & State Management";
    else if (week <= 12) weekTitle = "Backend API & Node.js";
    else if (week <= 16) weekTitle = "Databases & Prisma";
    else if (week <= 20) weekTitle = "DevOps & Deployment";
    else if (week <= 26) weekTitle = "Final Portfolio & Interviews";

    timeline.push({ id: `w${week}`, type: 'header', title: `Week ${week} – ${weekTitle}` });

    for (let d = 1; d <= 7; d++) {
      if (currentDay > totalDays) break;
      
      const isCompleted = currentDay < 68; // Mock 67 days done
      const isToday = currentDay === 68;
      
      let taskTitle = `Topic module ${currentDay}`;
      let desc = 'Complete the readings, coding exercises, and submit your daily code to GitHub.';

      if (isToday) {
        taskTitle = "Build REST API endpoints";
        desc = "Implement authentication and user profile routes using Node.js and Express.";
      } else if (currentDay === 67) {
        taskTitle = "Database Schema Design";
        desc = "Create ERD and implement PostgreSQL tables via Prisma.";
      } else if (currentDay === 66) {
        taskTitle = "Server Setup";
        desc = "Initialize Express app with middleware, error handling, and logger.";
      }

      timeline.push({
        id: `d${currentDay}`,
        type: 'day',
        day: currentDay,
        title: taskTitle,
        desc: desc,
        completed: isCompleted,
        isToday: isToday
      });
      currentDay++;
    }
  }
  return timeline;
};

export default function Timeline({ isDarkMode }: { isDarkMode?: boolean }) {
  const [items, setItems] = useState<TimelineItem[]>([]);
  const todayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate items only once on mount
    const generated = generate180Days();
    setItems(generated);
  }, []);

  useEffect(() => {
    // Scroll to today's task after rendering
    if (items.length > 0 && todayRef.current) {
      // Small timeout ensures the DOM has fully laid out the list
      setTimeout(() => {
        todayRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  }, [items]);

  const toggleDay = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  return (
    <div className="flex flex-col space-y-3 pb-8">
      {items.map((item) => {
        if (item.type === 'header') {
          return (
            <div key={item.id} className="sticky top-0 z-10 py-2 pt-4 backdrop-blur-md -mx-2 px-2">
              <h3 className={`text-sm font-bold uppercase tracking-widest ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                {item.title}
              </h3>
            </div>
          );
        }

        return (
          <div key={item.id} ref={item.isToday ? todayRef : null}>
            <DayCard 
              item={item} 
              isDarkMode={isDarkMode} 
              onToggle={() => toggleDay(item.id)} 
            />
          </div>
        );
      })}
    </div>
  );
}

function DayCard({ item, isDarkMode, onToggle }: { item: TimelineItem, isDarkMode?: boolean, onToggle: () => void }) {
  const [dragX, setDragX] = useState(0);
  
  const glassCard = isDarkMode 
    ? "bg-[#111827]/80 border-white/10 backdrop-blur-md" 
    : "bg-white/90 border-slate-200 backdrop-blur-md shadow-sm";
    
  const textPrimary = isDarkMode ? "text-white" : "text-slate-900";
  const textSecondary = isDarkMode ? "text-slate-400" : "text-slate-500";

  return (
    <div className="relative rounded-2xl overflow-hidden">
      {/* Background Actions */}
      <div className="absolute inset-0 flex justify-between items-center px-4 rounded-2xl bg-slate-800">
        <div className="flex items-center text-blue-400 font-medium text-sm gap-2">
          <Edit2 className="w-4 h-4" /> Edit
        </div>
        <div className="flex items-center text-red-400 font-medium text-sm gap-2">
          Delete <Trash2 className="w-4 h-4" />
        </div>
      </div>

      {/* Draggable Card */}
      <motion.div
        drag="x"
        dragConstraints={{ left: -80, right: 80 }}
        onDrag={(e, info) => setDragX(info.offset.x)}
        onDragEnd={(e, info) => {
          if (info.offset.x > 50) {
            // trigger edit
          } else if (info.offset.x < -50) {
            // trigger delete
          }
        }}
        animate={{ x: 0 }}
        className={`relative p-4 rounded-2xl border flex items-center gap-4 ${glassCard} z-10 transition-colors duration-300 ${item.completed ? (isDarkMode ? 'bg-emerald-950/20 border-emerald-900/50' : 'bg-emerald-50/50 border-emerald-100') : ''} ${item.isToday && !item.completed ? (isDarkMode ? 'ring-2 ring-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'ring-2 ring-blue-400 shadow-lg') : ''}`}
      >
        <div className="absolute left-1 top-1/2 -translate-y-1/2 opacity-20 text-slate-500">
          <GripVertical className="w-4 h-4" />
        </div>

        {/* Day Badge */}
        <div className={`flex-shrink-0 w-12 h-12 rounded-full flex flex-col items-center justify-center transition-all duration-300 shadow-lg ml-2
          ${item.completed 
            ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 text-white' 
            : 'bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] text-white'
          }`}
        >
          <span className="text-[10px] font-semibold uppercase tracking-wider opacity-80 leading-none mb-0.5">Day</span>
          <span className="text-lg font-bold leading-none">{item.day}</span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 pr-2">
          <h4 className={`text-sm font-bold truncate mb-0.5 ${item.completed ? (isDarkMode ? 'text-emerald-400' : 'text-emerald-700') : textPrimary}`}>
            {item.title}
          </h4>
          <p className={`text-xs line-clamp-2 leading-snug ${textSecondary}`}>
            {item.desc}
          </p>
        </div>

        {/* Animated Checkbox */}
        <button 
          onClick={onToggle}
          className={`flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300
            ${item.completed 
              ? 'bg-emerald-500 border-emerald-500' 
              : isDarkMode ? 'border-slate-600 hover:border-slate-400' : 'border-slate-300 hover:border-slate-400'
            }`}
        >
          <AnimatePresence>
            {item.completed && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Check className="w-4 h-4 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </motion.div>
    </div>
  );
}
