import React from 'react';
import { Bot } from 'lucide-react';

const StartScreen = ({ onStartArcade, onStartIA }) => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 md:p-6 font-mono border-[10px] md:border-[15px] border-blue-900 border-double text-center overflow-hidden">
      <h1 className="text-5xl sm:text-7xl md:text-9xl font-black text-white italic tracking-tighter mb-2 drop-shadow-[4px_4px_0px_#1e40af] md:drop-shadow-[8px_8px_0px_#1e40af]">CODE INSTINCT</h1>
      <div className="bg-red-600 text-white px-6 md:px-10 py-2 text-lg md:text-2xl font-black mb-12 md:mb-16 skew-x-[-15deg] uppercase">Ultimate Arcade Edition</div>
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full max-w-sm md:max-w-none px-4">
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
      </div>
    </div>
  );
};

export default StartScreen;
