import React from 'react';
import { ArrowLeft, User } from 'lucide-react';
import { PLAYER_CHARACTERS } from '../../constants/gameData';

const CharacterSelection = ({ onBack, onSelectCharacter, selectedId, cups = 0 }) => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 md:p-6 font-mono border-[10px] md:border-[15px] border-blue-900 border-double text-center relative overflow-y-auto bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950">
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      
      <div className="absolute top-4 right-4 md:top-10 md:right-10 flex items-center gap-2 bg-yellow-500 text-black px-4 py-2 rounded-full font-black italic shadow-[0_0_15px_rgba(234,179,8,0.5)]">
        🏆 {cups} COPAS
      </div>

      <button 
        onClick={onBack} 
        className="absolute top-4 left-4 md:top-10 md:left-10 p-2 md:p-4 bg-white/10 hover:bg-white/20 rounded-full transition-colors flex items-center gap-2 text-white font-black uppercase italic z-50 text-xs md:text-base border border-white/10"
      >
        <ArrowLeft size={16} /> Volver
      </button>
      
      <div className="relative mb-8 md:mb-12">
        <h2 className="text-4xl md:text-7xl font-black text-blue-600 italic uppercase tracking-tighter drop-shadow-[0_0_15px_rgba(37,99,235,0.4)]" style={{ fontFamily: "'Orbitron', sans-serif" }}>Select Hero</h2>
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-blue-600 to-transparent mt-2"></div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full max-w-6xl pb-10">
        {PLAYER_CHARACTERS.map((char) => {
          const isLocked = char.requiredCups && cups < char.requiredCups;
          
          return (
            <div 
              key={char.id} 
              className={`group bg-slate-900 border-4 ${selectedId === char.id ? 'border-blue-500' : 'border-slate-700'} p-4 md:p-6 rounded-3xl ${isLocked ? 'opacity-70 cursor-not-allowed' : 'hover:border-blue-400 cursor-pointer'} transition-all relative overflow-hidden`} 
              onClick={() => !isLocked && onSelectCharacter(char)}
            >
              {isLocked && (
                <div className="absolute inset-0 bg-black/60 z-10 flex flex-col items-center justify-center p-4">
                  <span className="text-3xl mb-2">🔒</span>
                  <span className="text-yellow-500 font-black text-[10px] md:text-xs uppercase italic">{char.requiredCups} COPAS</span>
                </div>
              )}
              
              <div className="h-28 md:h-48 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <img 
                  src={char.image} 
                  alt={char.name} 
                  style={{ filter: isLocked ? 'contrast(0) brightness(0)' : 'none' }}
                  className={`max-h-full object-contain ${char.idleFlip ? '-scale-x-100' : ''}`}
                />
              </div>
              <h3 className="text-xl md:text-2xl font-black text-white mb-2 uppercase italic">{isLocked ? '???' : char.name}</h3>
              {selectedId === char.id && (
                <div className="absolute top-0 right-0 p-2 bg-blue-600 text-white font-black text-[10px] uppercase italic">Selected</div>
              )}
              {!isLocked && (
                <div className="py-2 px-4 bg-blue-600 text-white font-black skew-x-[-10deg] inline-block uppercase text-[10px] md:text-sm group-hover:bg-white group-hover:text-blue-600 transition-colors">Choose</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CharacterSelection;
