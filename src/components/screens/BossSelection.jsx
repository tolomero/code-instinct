import React from 'react';
import { ArrowLeft, Skull, Trophy, CheckCircle2 } from 'lucide-react';
import { BOSS_CHARACTERS } from '../../constants/gameData';

const BossCard = ({ boss, onSelect, isDefeated }) => {
  const [imageError, setImageError] = React.useState(false);

  return (
    <div 
      className={`
        group relative bg-white/5 backdrop-blur-md border-4 rounded-[2.5rem] p-8 md:p-12 transition-all duration-300
        ${isDefeated ? 'border-emerald-500/50 opacity-60' : 'border-rose-400/30 hover:border-rose-400 hover:bg-white/10 cursor-pointer'}
        shadow-2xl overflow-hidden
      `}
      onClick={() => onSelect(boss)}
    >
      {isDefeated && (
        <div className="absolute top-4 right-4 z-40 bg-emerald-500 text-white p-2 rounded-full shadow-lg border-2 border-emerald-300 animate-in zoom-in duration-500">
           <CheckCircle2 size={32} />
        </div>
      )}
      
      <div className="h-40 md:h-56 flex items-center justify-center mb-8 relative group-hover:scale-110 transition-transform duration-500">
        <div className={`absolute inset-0 bg-rose-500/20 blur-3xl rounded-full scale-110 opacity-0 group-hover:opacity-100 transition-opacity`}></div>
        {boss.selectionImage && !imageError ? (
          <img 
            src={boss.selectionImage} 
            alt={boss.name} 
            referrerPolicy="no-referrer"
            className="max-h-full object-contain -scale-x-100 drop-shadow-[0_15px_15px_rgba(0,0,0,0.6)]"
            onError={() => setImageError(true)}
          />
        ) : (
          <span className="text-8xl md:text-9xl filter drop-shadow-2xl">{boss.avatar}</span>
        )}
      </div>

      <div className="relative z-10 text-center">
        <h3 className="text-3xl md:text-5xl font-black text-white mb-2 uppercase italic tracking-tighter drop-shadow-lg">{boss.name}</h3>
        <p className="text-rose-300/60 text-xs md:text-sm font-bold uppercase tracking-widest mb-8 h-8 md:h-12 flex items-center justify-center line-clamp-2">{boss.bio}</p>
        
        <div className={`
          py-3 px-8 rounded-xl font-black italic uppercase tracking-widest transition-all border-b-4
          ${isDefeated 
            ? 'bg-emerald-500 border-emerald-800 text-white' 
            : 'bg-rose-500 border-rose-800 text-white hover:bg-rose-400 group-hover:scale-105 active:translate-y-1 active:border-b-0'}
        `}>
          {isDefeated ? 'COMPLETADO' : 'RETAR JEFE'}
        </div>
      </div>

      <div className="absolute -bottom-10 -right-10 opacity-5 text-white transform rotate-12 group-hover:rotate-0 transition-transform duration-700">
        <Skull size={180} />
      </div>
    </div>
  );
};

const BossSelection = ({ gameMode, onBack, onSelectBoss, defeatedBosses = [], cups = 0 }) => {
  return (
    <div className="min-h-screen bg-rose-950 flex flex-col items-center p-4 md:p-12 font-sans select-none relative overflow-y-auto">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-rose-600/20 to-rose-950 opacity-100"></div>
      <div className="absolute inset-0 bg-[url('https://wallpapers.com/images/hd/pokemon-battle-background-7u32d84715767222.jpg')] bg-cover bg-center opacity-10 mix-blend-overlay grayscale"></div>
      
      {/* Header */}
      <div className="w-full max-w-7xl flex justify-between items-center mb-12 relative z-20">
        <button 
          onClick={onBack}
          className="bg-white/10 p-3 rounded-2xl hover:bg-white/20 transition-all border-b-4 border-white/5 active:translate-y-1 active:border-b-0 shadow-lg"
        >
          <ArrowLeft className="text-white" size={24} />
        </button>

        <div className="flex items-center gap-3 bg-yellow-400 px-6 py-2.5 rounded-2xl border-b-4 border-yellow-600 shadow-xl">
          <Trophy size={24} className="text-yellow-900" fill="currentColor" />
          <span className="text-yellow-900 font-black text-2xl italic tracking-tighter uppercase">{cups} COPAS</span>
        </div>
      </div>

      <div className="relative z-10 text-center mb-12">
        <h1 className="text-4xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-white to-rose-500 italic tracking-tighter drop-shadow-[0_4px_0_rgba(0,0,0,0.5)] uppercase">
          SELECCIONA TU RIVAL
        </h1>
        <div className="bg-white/10 backdrop-blur-md px-8 py-3 rounded-full border border-white/10 text-white/70 font-bold text-sm md:text-base mt-4 uppercase tracking-[0.2em]">
          Enfréntate a los villanos más poderosos de la red
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl relative z-10 pb-20">
        {BOSS_CHARACTERS.map((boss) => (
          <BossCard key={boss.id} boss={boss} onSelect={onSelectBoss} isDefeated={defeatedBosses.includes(boss.id)} />
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap');
        .font-sans { font-family: 'Fredoka One', cursive, sans-serif; }
      `}} />
    </div>
  );
};

export default BossSelection;
