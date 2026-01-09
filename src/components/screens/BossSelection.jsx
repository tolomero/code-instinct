import React from 'react';
import { ArrowLeft, Skull } from 'lucide-react';
import { BOSS_CHARACTERS } from '../../constants/gameData';

const BossCard = ({ boss, onSelect, isDefeated }) => {
  const [imageError, setImageError] = React.useState(false);

  return (
    <div 
      className="group bg-slate-900 border-4 border-slate-700 p-4 md:p-8 rounded-3xl hover:border-red-600 transition-all cursor-pointer relative overflow-hidden" 
      onClick={() => onSelect(boss)}
    >
      {isDefeated && (
        <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center bg-black/40">
           <img 
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdmNlNWJocWc5dW9xZHoxYW5mZWdtNWU4anE0NGJ0N3c4Mng0NWdrbCZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/wiw60TiSXTpel4qoav/giphy.gif" 
            alt="Defeated" 
            className="w-full h-full object-contain scale-150"
           />
        </div>
      )}
      <div className="h-24 md:h-32 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        {boss.selectionImage && !imageError ? (
          <img 
            src={boss.selectionImage} 
            alt={boss.name} 
            referrerPolicy="no-referrer"
            className="max-h-full object-contain -scale-x-100"
            onError={() => setImageError(true)}
          />
        ) : (
          <span className="text-6xl md:text-8xl">{boss.avatar}</span>
        )}
      </div>
      <h3 className="text-2xl md:text-4xl font-black text-white mb-2 uppercase italic">{boss.name}</h3>
      <p className="text-gray-500 text-[10px] md:text-xs font-bold uppercase mb-4 md:mb-6">{boss.bio}</p>
      <div className="py-2 px-4 bg-red-600 text-white font-black skew-x-[-10deg] inline-block uppercase text-[10px] md:text-sm group-hover:bg-white group-hover:text-red-600 transition-colors">Select Combatant</div>
      <div className="absolute top-0 right-0 p-2 md:p-4 opacity-10 text-white"><Skull size={40} className="md:w-20 md:h-20" /></div>
    </div>
  );
};

const BossSelection = ({ gameMode, onBack, onSelectBoss, defeatedBosses = [], cups = 0 }) => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 md:p-6 font-mono border-[10px] md:border-[15px] border-red-900 border-double text-center relative overflow-y-auto">
      <div className="absolute top-4 right-4 md:top-10 md:right-10 flex items-center gap-2 bg-yellow-500 text-black px-4 py-2 rounded-full font-black italic">
        🏆 {cups} COPAS
      </div>
      <button 
        onClick={onBack} 
        className="absolute top-4 left-4 md:top-10 md:left-10 p-2 md:p-4 bg-white/10 hover:bg-white/20 rounded-full transition-colors flex items-center gap-2 text-white font-black uppercase italic z-50 text-xs md:text-base"
      >
        <ArrowLeft size={16} /> Volver
      </button>
      <h2 className="text-4xl md:text-7xl font-black text-red-600 italic mt-12 md:mt-12 mb-8 md:mb-12 uppercase tracking-tighter" style={{ fontFamily: "'Orbitron', sans-serif" }}>Choose Your Boss</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl pb-12">
        {BOSS_CHARACTERS.map((boss) => (
          <BossCard key={boss.id} boss={boss} onSelect={onSelectBoss} isDefeated={defeatedBosses.includes(boss.id)} />
        ))}
      </div>
    </div>
  );
};

export default BossSelection;
