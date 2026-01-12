import React from 'react';
import { audioManager, SOUNDS } from '../../utils/audio';
import { Plus, Minus, X, Divide, ArrowLeft, Code2 } from 'lucide-react';

const MathModeSelection = ({ onSelectMode, onBack }) => {
  const modes = [
    { id: 'suma', icon: <Plus size={48} />, label: "SUMA", color: "bg-rose-400", border: "border-rose-600" },
    { id: 'resta', icon: <Minus size={48} />, label: "RESTA", color: "bg-sky-400", border: "border-sky-600" },
    { id: 'multiplicacion', icon: <X size={48} />, label: "MULTIPLICACIÓN", color: "bg-yellow-400", border: "border-yellow-600" },
    { id: 'division', icon: <Divide size={48} />, label: "DIVISIÓN", color: "bg-purple-400", border: "border-purple-600" },
    { id: 'javascript', icon: <Code2 size={48} />, label: "JAVASCRIPT", color: "bg-indigo-500", border: "border-indigo-700" },
  ];

  return (
    <div className="min-h-screen bg-indigo-900 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans select-none">
       {/* Background */}
       <div className="absolute inset-0 bg-gradient-to-b from-sky-400 to-indigo-900 opacity-60"></div>
       <div className="absolute inset-0 bg-[url('https://wallpapers.com/images/hd/pokemon-battle-background-7u32d84715767222.jpg')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>

       <button 
        onClick={onBack}
        className="absolute top-6 left-6 z-20 bg-rose-500 p-3 rounded-2xl hover:bg-rose-400 transition-all border-b-4 border-rose-700 active:translate-y-1 active:border-b-0 shadow-lg"
      >
        <ArrowLeft className="text-white" size={24} />
      </button>

      <div className="relative z-10 text-center mb-12">
        <h1 className="text-4xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-white to-yellow-500 italic tracking-tighter drop-shadow-[0_4px_0_rgba(0,0,0,0.5)] uppercase">
          ELIGE TU DESAFÍO
        </h1>
        <div className="bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 text-white/70 font-bold text-sm mt-4 uppercase tracking-[0.2em]">
          Selecciona tu desafío matemático o de lógica para la aventura
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl w-full relative z-10">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => onSelectMode(mode.id)}
            className={`
              relative group overflow-hidden rounded-[2.5rem] p-8 md:p-12
              ${mode.color} border-b-[8px] md:border-b-[12px] ${mode.border}
              transition-all duration-200 active:translate-y-2 active:border-b-0 hover:brightness-110 shadow-2xl
            `}
          >
            <div className="absolute -top-4 -right-4 p-4 opacity-10 transform rotate-12 scale-[3] group-hover:scale-[3.5] transition-transform duration-500">
              {mode.icon}
            </div>
            
            <div className="relative z-10 flex flex-col items-center gap-4">
              <div className="bg-white/30 p-6 rounded-3xl backdrop-blur-sm group-hover:bg-white/40 transition-colors shadow-inner">
                {mode.icon}
              </div>
              <span className="text-3xl md:text-5xl font-black text-white italic tracking-tighter drop-shadow-[0_2px_0_rgba(0,0,0,0.3)]">
                {mode.label}
              </span>
            </div>
          </button>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap');
        .font-sans { font-family: 'Fredoka One', cursive, sans-serif; }
      `}} />
    </div>
  );
};

export default MathModeSelection;
