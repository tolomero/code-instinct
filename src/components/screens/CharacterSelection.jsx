import React from 'react';
import { ArrowLeft, User, Trophy, Lock } from 'lucide-react';
import { PLAYER_CHARACTERS } from '../../constants/gameData';

const CharacterSelection = ({ onBack, onSelectCharacter, selectedId, cups = 0 }) => {
  return (
    <div className="min-h-screen bg-indigo-900 flex flex-col items-center p-4 md:p-12 font-sans select-none relative overflow-y-auto">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-400 to-indigo-900 opacity-60"></div>
      <div className="absolute inset-0 bg-[url('https://wallpapers.com/images/hd/pokemon-battle-background-7u32d84715767222.jpg')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
      
      {/* Header */}
      <div className="w-full max-w-6xl flex justify-between items-center mb-12 relative z-20">
        <button 
          onClick={onBack}
          className="bg-rose-500 p-3 rounded-2xl hover:bg-rose-400 transition-all border-b-4 border-rose-700 active:translate-y-1 active:border-b-0 shadow-lg"
        >
          <ArrowLeft className="text-white" size={24} />
        </button>

        <div className="flex items-center gap-3 bg-yellow-400 px-6 py-2.5 rounded-2xl border-b-4 border-yellow-600 shadow-xl">
          <Trophy size={24} className="text-yellow-900" fill="currentColor" />
          <span className="text-yellow-900 font-black text-2xl italic tracking-tighter uppercase">{cups} COPAS</span>
        </div>
      </div>

      <div className="relative z-10 text-center mb-12">
        <h1 className="text-4xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-white to-yellow-500 italic tracking-tighter drop-shadow-[0_4px_0_rgba(0,0,0,0.5)] uppercase">
          ELIGE TU HÉROE
        </h1>
        <div className="bg-white/10 backdrop-blur-md px-8 py-3 rounded-full border border-white/10 text-white/80 font-bold text-sm md:text-base mt-4 uppercase tracking-[0.2em]">
          Personajes únicos con habilidades especiales
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 w-full max-w-7xl relative z-10 pb-20">
        {PLAYER_CHARACTERS.map((char) => {
          const isLocked = char.requiredCups && cups < char.requiredCups;
          const isSelected = selectedId === char.id;
          
          return (
            <div 
              key={char.id} 
              className={`
                group relative bg-white/5 backdrop-blur-sm border-4 rounded-[2.5rem] p-6 transition-all duration-300
                ${isSelected ? 'border-yellow-400 bg-white/10 shadow-[0_0_40px_rgba(234,179,8,0.3)] scale-105' : 'border-white/10 hover:border-white/30 hover:bg-white/10'}
                ${isLocked ? 'grayscale opacity-60 cursor-not-allowed' : 'cursor-pointer'}
              `}
              onClick={() => !isLocked && onSelectCharacter(char)}
            >
              {isLocked && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-indigo-950/60 rounded-[2.2rem]">
                  <Lock size={48} className="text-white/40 mb-4" />
                  <div className="bg-yellow-400 text-yellow-950 px-4 py-1.5 rounded-full font-black text-[10px] md:text-xs uppercase italic tracking-widest shadow-lg">
                    {char.requiredCups} COPAS
                  </div>
                </div>
              )}
              
              <div className="aspect-square flex items-center justify-center mb-6 relative">
                 <div className={`absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                 <img 
                    src={char.image} 
                    alt={char.name} 
                    className={`h-full object-contain drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-110 ${char.idleFlip ? '-scale-x-100' : ''}`}
                 />
              </div>

              <div className="text-center">
                <h3 className="text-xl md:text-2xl font-black text-white mb-4 uppercase italic tracking-tighter drop-shadow-md">
                   {isLocked ? '???' : char.name}
                </h3>
                
                {isSelected ? (
                   <div className="bg-yellow-400 text-yellow-950 py-2 px-6 rounded-xl font-black text-sm md:text-base uppercase italic shadow-lg">
                      SELECCIONADO
                   </div>
                ) : !isLocked && (
                   <div className="bg-sky-500 text-white py-2 px-6 rounded-xl font-black text-sm md:text-base uppercase italic border-b-4 border-sky-700 active:translate-y-1 active:border-b-0 transition-all hover:bg-sky-400">
                      ELEGIR
                   </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap');
        .font-sans { font-family: 'Fredoka One', cursive, sans-serif; }
      `}} />
    </div>
  );
};

export default CharacterSelection;
