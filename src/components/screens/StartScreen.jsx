import React from 'react';
import { Bot, Gamepad2 } from 'lucide-react';

const StartScreen = ({ onStartArcade, onStartIA, onStartPokemon, onSelectPlayer, selectedPlayer }) => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 md:p-6 font-mono border-[10px] md:border-[15px] border-blue-900 border-double text-center overflow-hidden">
      <h1 className="text-5xl sm:text-7xl md:text-9xl font-black text-white italic tracking-tighter mb-2 drop-shadow-[4px_4px_0px_#1e40af] md:drop-shadow-[8px_8px_0px_#1e40af]">CODE INSTINCT</h1>
      <div className="bg-red-600 text-white px-6 md:px-10 py-2 text-lg md:text-2xl font-black mb-6 md:mb-8 skew-x-[-15deg] uppercase">Ultimate Arcade Edition</div>
      
      {selectedPlayer && (
        <div className="mb-4 md:mb-8 flex flex-col items-center cursor-pointer group relative" onClick={onSelectPlayer}>
          <div className="absolute inset-0 bg-blue-600/20 blur-3xl rounded-full scale-150 group-hover:bg-blue-600/40 transition-colors"></div>
          <img 
            src={selectedPlayer.image} 
            alt={selectedPlayer.name} 
            className={`w-24 h-24 md:w-40 md:h-40 object-contain relative z-10 drop-shadow-[0_0_15px_rgba(37,99,235,0.5)] ${selectedPlayer.shouldFlip ? '-scale-x-100' : ''} group-hover:scale-110 transition-transform`} 
          />
          <div className="relative z-10 mt-2 px-4 py-1 bg-blue-600/20 border border-blue-500/50 rounded-full backdrop-blur-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
            <span className="text-blue-400 group-hover:text-white font-black italic uppercase text-[10px] md:text-xs">HERO: {selectedPlayer.name} (CHANGE)</span>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full max-w-sm md:max-w-none px-4 flex-wrap justify-center">
        <button 
          onClick={onStartArcade} 
          className="w-full md:w-auto px-8 md:px-12 py-6 md:py-8 bg-blue-600 border-b-8 border-blue-900 text-white text-2xl md:text-3xl font-black hover:bg-white hover:text-blue-600 transition-all rounded-xl uppercase active:scale-95"
        >
          Modo Arcade
        </button>
        <button 
          onClick={onStartIA} 
          className="w-full md:w-auto px-8 md:px-12 py-6 md:py-8 bg-purple-600 border-b-8 border-purple-900 text-white text-2xl md:text-3xl font-black hover:bg-white hover:text-purple-600 transition-all rounded-xl uppercase flex items-center gap-4 justify-center active:scale-95"
        >
          <Bot /> Modo IA
        </button>
        <button 
           onClick={onStartPokemon}
           className="w-full md:w-auto px-8 md:px-12 py-6 md:py-8 bg-green-600 border-b-8 border-green-900 text-white text-2xl md:text-3xl font-black hover:bg-white hover:text-green-600 transition-all rounded-xl uppercase flex items-center gap-4 justify-center active:scale-95"
        >
          <Gamepad2 /> POKÉ-MATH
        </button>
      </div>
    </div>
  );
};

export default StartScreen;
