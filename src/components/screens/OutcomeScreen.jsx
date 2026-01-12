import React from 'react';
import { Trophy, Skull, Home, RefreshCw } from 'lucide-react';

const OutcomeScreen = ({ gameState, onReset }) => {
  const isWon = gameState === 'won';

  return (
    <div className={`min-h-screen ${isWon ? 'bg-indigo-900' : 'bg-rose-950'} flex flex-col items-center justify-center p-6 md:p-10 font-sans text-white text-center relative overflow-hidden select-none`}>
      {/* Background Effects */}
      <div className={`absolute inset-0 bg-gradient-to-b ${isWon ? 'from-sky-400 to-indigo-900' : 'from-rose-600 to-rose-950'} opacity-60`}></div>
      
      {isWon && (
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay">
           <img 
            src="https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3cHhwcGM0bmc2c3Y3dm1rNmI0Mnd6dGFscDRjOHFkbzBnNTBscnRveSZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/35m9tkrxqgccE/giphy.gif" 
            alt="Victory Background" 
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="relative z-20 flex flex-col items-center max-w-4xl w-full">
        <div className={`p-8 md:p-12 rounded-[4rem] bg-white/10 backdrop-blur-xl border-4 ${isWon ? 'border-yellow-400 shadow-[0_0_80px_rgba(234,179,8,0.4)]' : 'border-rose-400 shadow-[0_0_80px_rgba(225,29,72,0.4)]'} mb-12`}>
           {isWon ? (
             <Trophy size={120} className="text-yellow-400 animate-bounce drop-shadow-[0_0_20px_rgba(234,179,8,0.8)]" fill="currentColor" />
           ) : (
             <Skull size={120} className="text-rose-500 animate-pulse drop-shadow-[0_0_20px_rgba(225,29,72,0.8)]" fill="currentColor" />
           )}
        </div>
        
        <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter italic uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/60 drop-shadow-[0_4px_0_rgba(0,0,0,0.5)]">
          {isWon ? '¡VICTORIA TOTAL!' : '¡DERROTADO!'}
        </h1>
        
        <p className="text-xl md:text-2xl mb-12 font-bold uppercase tracking-widest text-white/80 drop-shadow-md">
          {isWon ? 'Has dominado el código y las matemáticas' : '¡Vuelve a intentarlo para mejorar!'}
        </p>

        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md">
          <button 
            onClick={onReset} 
            className={`
              flex-1 px-8 py-5 md:py-6 rounded-2xl flex items-center justify-center gap-4 text-xl md:text-2xl font-black transition-all border-b-8 uppercase italic active:translate-y-2 active:border-b-0
              ${isWon 
                ? 'bg-yellow-400 border-yellow-700 text-yellow-950 hover:bg-yellow-300' 
                : 'bg-rose-500 border-rose-800 text-white hover:bg-rose-400'}
            `}
          >
            {isWon ? <Home size={28} /> : <RefreshCw size={28} />}
            {isWon ? 'INICIO' : 'REINTENTAR'}
          </button>
        </div>
        
        {isWon && (
           <div className="mt-12 py-3 px-8 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              <p className="text-xs md:text-sm text-yellow-300 animate-pulse font-black uppercase tracking-[0.3em]">
                Sincronía perfecta. Bonus de copas aplicado.
              </p>
           </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap');
        .font-sans { font-family: 'Fredoka One', cursive, sans-serif; }
      `}} />
    </div>
  );
};

export default OutcomeScreen;
