import React from 'react';
import { Bot, Gamepad2, Sparkles } from 'lucide-react';

const StartScreen = ({ onStartArcade, onStartIA, onStartPokemon, onSelectPlayer, selectedPlayer }) => {
  return (
    <div className="min-h-screen bg-indigo-900 flex flex-col items-center justify-center p-4 md:p-6 font-sans text-center overflow-hidden relative select-none">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-400 to-indigo-900 opacity-60"></div>
      <div className="absolute inset-0 bg-[url('https://wallpapers.com/images/hd/pokemon-battle-background-7u32d84715767222.jpg')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
      
      {/* Title Section */}
      <div className="relative mb-8 md:mb-12">
        <h1 className="text-6xl sm:text-8xl md:text-[10rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-blue-300 italic tracking-tighter drop-shadow-[0_10px_0_rgba(30,58,138,1)] leading-none">
          CODE INSTINCT
        </h1>
        <div className="bg-rose-500 text-white px-8 md:px-12 py-2 text-lg md:text-2xl font-black mt-4 skew-x-[-15deg] uppercase border-b-4 border-rose-800 inline-block shadow-2xl">
          Ultimate Arcade Edition
        </div>
      </div>
      
      {/* Hero Selection Preview */}
      {selectedPlayer && (
        <div className="mb-8 md:mb-12 flex flex-col items-center cursor-pointer group relative" onClick={onSelectPlayer}>
          <div className="absolute inset-0 bg-yellow-400/20 blur-3xl rounded-full scale-150 group-hover:bg-yellow-400/40 transition-colors animate-pulse"></div>
          <div className="relative z-10 p-4 md:p-6 bg-white/5 backdrop-blur-md rounded-[3rem] border-2 border-white/20 shadow-2xl group-hover:scale-105 transition-all group-hover:border-yellow-400/50">
            <img 
              src={selectedPlayer.image} 
              alt={selectedPlayer.name} 
              className={`w-28 h-28 md:w-44 md:h-44 object-contain filter drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] ${selectedPlayer.shouldFlip ? '-scale-x-100' : ''}`} 
            />
            <div className="mt-4 flex items-center justify-center gap-2 text-yellow-400 font-black italic uppercase text-xs md:text-sm tracking-widest">
              <Sparkles size={16} /> HERO: {selectedPlayer.name} (CLICK PARA CAMBIAR)
            </div>
          </div>
        </div>
      )}

      {/* Game Modes Grid */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-10 w-full max-w-7xl px-4 flex-wrap justify-center relative z-10">
        {/* MODO ARCADE */}
        <div className="flex flex-col gap-4 w-full md:w-80 group">
          <button 
            onClick={onStartArcade} 
            className="w-full px-8 py-8 bg-sky-500 border-b-[10px] border-sky-800 text-white text-3xl md:text-4xl font-black hover:bg-sky-400 transition-all rounded-[2.5rem] uppercase active:translate-y-2 active:border-b-0 shadow-2xl flex flex-col items-center"
          >
            MODO ARCADE
            <span className="text-xs md:text-sm font-bold text-sky-100 opacity-60 mt-1">NIVELES CLÁSICOS</span>
          </button>
          <p className="text-sky-300 font-black text-xs md:text-sm uppercase tracking-wider px-4">Lógica de programación extrema</p>
        </div>

        {/* MODO IA */}
        <div className="flex flex-col gap-4 w-full md:w-80 group">
          <button 
            onClick={onStartIA} 
            className="w-full px-8 py-8 bg-purple-500 border-b-[10px] border-purple-800 text-white text-3xl md:text-4xl font-black hover:bg-purple-400 transition-all rounded-[2.5rem] uppercase flex flex-col items-center justify-center active:translate-y-2 active:border-b-0 shadow-2xl"
          >
            <div className="flex items-center gap-3">
              <Bot size={32} /> MODO IA
            </div>
            <span className="text-xs md:text-sm font-bold text-purple-100 opacity-60 mt-1">RETO DINÁMICO</span>
          </button>
          <p className="text-purple-300 font-black text-xs md:text-sm uppercase tracking-wider px-4">Combates generados por inteligencia artificial</p>
        </div>

        {/* POKÉ-MATH */}
        <div className="flex flex-col gap-4 w-full md:w-80 group">
          <button 
             onClick={onStartPokemon}
             className="w-full px-8 py-8 bg-emerald-500 border-b-[10px] border-emerald-800 text-white text-3xl md:text-4xl font-black hover:bg-emerald-400 transition-all rounded-[2.5rem] uppercase flex flex-col items-center justify-center active:translate-y-2 active:border-b-0 shadow-2xl"
          >
             <div className="flex items-center gap-3">
              <Gamepad2 size={32} /> POKÉ-MATH
            </div>
            <span className="text-xs md:text-sm font-bold text-emerald-100 opacity-60 mt-1">AVENTURA MATEMÁTICA</span>
          </button>
          <p className="text-emerald-300 font-black text-xs md:text-sm uppercase tracking-wider px-4">Desbloquea Pokémon y cartas legendarias</p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap');
        .font-sans { font-family: 'Fredoka One', cursive, sans-serif; }
      `}} />
    </div>
  );
};

export default StartScreen;
