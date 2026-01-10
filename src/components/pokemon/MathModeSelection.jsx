import React, { useEffect } from 'react';
import { audioManager, SOUNDS } from '../../utils/audio';
import { Plus, Minus, X, Divide, ArrowLeft } from 'lucide-react';

const MathModeSelection = ({ onSelectMode, onBack }) => {
  const modes = [
    { id: 'suma', icon: <Plus size={48} />, label: "SUMA", color: "bg-green-600", border: "border-green-800" },
    { id: 'resta', icon: <Minus size={48} />, label: "RESTA", color: "bg-red-600", border: "border-red-800" },
    { id: 'multiplicacion', icon: <X size={48} />, label: "MULTIPLICACIÓN", color: "bg-blue-600", border: "border-blue-800" },
    { id: 'division', icon: <Divide size={48} />, label: "DIVISIÓN", color: "bg-purple-600", border: "border-purple-800" },
  ];

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 relative overflow-hidden font-mono">
       <button 
        onClick={onBack}
        className="absolute top-4 left-4 z-20 bg-slate-800 p-2 rounded-full hover:bg-slate-700 transition-colors border border-slate-600"
      >
        <ArrowLeft className="text-white" />
      </button>

      <h1 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter mb-12 drop-shadow-[4px_4px_0px_#000]">
        ELIGE TU DESAFÍO
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl w-full">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => onSelectMode(mode.id)}
            className={`
              relative group overflow-hidden rounded-2xl p-8 
              ${mode.color} border-b-8 ${mode.border}
              transition-all duration-200 active:scale-95 hover:brightness-110
            `}
          >
            <div className="absolute top-0 right-0 p-4 opacity-20 transform rotate-12 scale-150 group-hover:scale-125 transition-transform duration-500">
              {mode.icon}
            </div>
            
            <div className="relative z-10 flex flex-col items-center gap-4">
              <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm group-hover:bg-white/30 transition-colors">
                {mode.icon}
              </div>
              <span className="text-2xl md:text-4xl font-black text-white italic tracking-widest drop-shadow-md">
                {mode.label}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MathModeSelection;
