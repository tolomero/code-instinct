import React from 'react';
import { Trophy, Skull } from 'lucide-react';

const OutcomeScreen = ({ gameState, onReset }) => {
  const isWon = gameState === 'won';

  return (
    <div className={`min-h-screen ${isWon ? 'bg-emerald-950 overflow-hidden' : 'bg-red-950'} flex flex-col items-center justify-center p-10 font-mono text-white text-center relative`}>
      {isWon && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div key={i} className="absolute text-yellow-400 text-2xl animate-ping opacity-0" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}>{Math.random() > 0.5 ? '0' : '1'}</div>
          ))}
          <div className="absolute inset-0 flex items-center justify-center opacity-30">
             <Trophy size={400} className="animate-pulse" />
          </div>
        </div>
      )}
      
      {isWon ? <Trophy size={150} className="mb-8 text-yellow-400 animate-bounce relative z-10" /> : <Skull size={150} className="mb-8 text-red-500 animate-pulse relative z-10" />}
      
      <h1 className="text-6xl md:text-8xl font-black mb-10 tracking-tighter italic relative z-10 uppercase">
        {isWon ? '¡VICTORIA SUPREMA!' : 'HUMILLACIÓN'}
      </h1>
      
      <p className="text-gray-400 mb-8 font-black uppercase tracking-widest relative z-10">
        {isWon ? 'Has purificado el código de Ultratech' : 'Tu código ha sido corrompido'}
      </p>

      <button onClick={onReset} className="px-12 py-6 border-4 border-white text-2xl md:text-3xl font-black rounded-2xl hover:bg-white hover:text-black transition-all uppercase italic relative z-10">
        {isWon ? 'Menú Principal' : 'Reintentar'}
      </button>
      
      {isWon && (
         <p className="mt-8 text-xs text-emerald-400 animate-pulse font-black uppercase">Redirigiendo al mainframe en 5 segundos...</p>
      )}
    </div>
  );
};

export default OutcomeScreen;
