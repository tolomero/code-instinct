import React from 'react';
import { Trophy, Skull } from 'lucide-react';

const OutcomeScreen = ({ gameState, onReset }) => {
  const isWon = gameState === 'won';

  return (
    <div className={`min-h-screen ${isWon ? 'bg-black' : 'bg-red-950'} flex flex-col items-center justify-center p-10 font-mono text-white text-center relative overflow-hidden`}>
      {isWon && (
        <div className="absolute inset-0 z-0">
          <img 
            src="https://media.giphy.com/media/35m9tkrxqgccE/giphy.gif" 
            alt="Victory Background" 
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60"></div>
        </div>
      )}
      
      {isWon && (
        <div className="absolute inset-0 pointer-events-none z-10 opacity-30">
          {[...Array(50)].map((_, i) => (
            <div key={i} className="absolute text-yellow-400 text-2xl animate-ping opacity-0" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}>{Math.random() > 0.5 ? '0' : '1'}</div>
          ))}
        </div>
      )}
      
      <div className="relative z-20 flex flex-col items-center">
        {isWon ? <Trophy size={150} className="mb-8 text-yellow-400 animate-bounce drop-shadow-[0_0_15px_rgba(234,179,8,0.8)]" /> : <Skull size={150} className="mb-8 text-red-500 animate-pulse" />}
        
        <h1 className="text-6xl md:text-8xl font-black mb-10 tracking-tighter italic uppercase drop-shadow-[0_0_20px_rgba(0,0,0,1)]">
          {isWon ? '¡VICTORIA SUPREMA!' : 'HUMILLACIÓN'}
        </h1>
        
        <p className="text-gray-200 mb-8 font-black uppercase tracking-widest drop-shadow-md">
          {isWon ? 'Has purificado el código de Ultratech' : 'Tu código ha sido corrompido'}
        </p>

        <button onClick={onReset} className="px-12 py-6 border-4 border-white text-2xl md:text-3xl font-black rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-white hover:text-black transition-all uppercase italic shadow-2xl">
          {isWon ? 'Menú Principal' : 'Reintentar'}
        </button>
        
        {isWon && (
           <p className="mt-8 text-xs text-yellow-400 animate-pulse font-black uppercase tracking-[0.2em]">Sincronía completada. Volviendo al mainframe...</p>
        )}
      </div>
    </div>
  );
};

export default OutcomeScreen;
