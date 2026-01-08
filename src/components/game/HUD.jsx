import React from 'react';

const HUD = ({ bits, playerHp, opponent, currentLevel, enemyHp, comboCount }) => {
  const maxEnemyHp = currentLevel === 2 ? 250 : 100;
  
  return (
    <div className="p-2 md:p-4 bg-black/90 border-b-4 border-blue-600 grid grid-cols-2 md:grid-cols-3 items-center gap-2">
      {/* Jugador Stats */}
      <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
        <div className="bg-slate-900 p-1 md:p-2 rounded-lg border border-white/10 min-w-[60px] md:min-w-[80px] text-center">
           <span className="text-[8px] md:text-[10px] text-gray-500 font-black block tracking-widest leading-none">BITS</span>
           <span className="text-yellow-400 font-black text-sm md:text-xl leading-none">{bits}</span>
        </div>
        <div className="w-full md:w-48 h-4 md:h-8 bg-gray-900 border md:border-2 border-white rounded overflow-hidden relative">
          <div className="h-full bg-green-500 transition-all duration-500" style={{width: `${playerHp}%`}}></div>
          <span className="absolute inset-0 flex items-center justify-center text-[7px] md:text-[10px] font-black text-white drop-shadow-sm">HP: {playerHp}%</span>
        </div>
      </div>

      {/* Rival Info */}
      <div className="col-span-2 md:col-span-1 order-last md:order-none text-center border-t border-white/10 md:border-none pt-2 md:pt-0">
        <h2 className="text-xl md:text-3xl font-black italic text-red-500 uppercase tracking-tighter leading-none inline-block md:block mr-2 md:mr-0" style={{ fontFamily: "'Orbitron', sans-serif" }}>{opponent?.name}</h2>
        <span className="text-[8px] md:text-[10px] text-gray-500 font-black uppercase tracking-widest">RONDA {currentLevel + 1}/3</span>
      </div>

      {/* Rival Stats */}
      <div className="flex flex-col-reverse md:flex-row gap-2 items-end md:items-center justify-self-end">
        <div className="w-full md:w-48 h-4 md:h-8 bg-gray-900 border md:border-2 border-white rounded overflow-hidden relative text-right">
          <div className="h-full bg-red-600 transition-all duration-500 ml-auto" style={{width: `${(enemyHp / maxEnemyHp) * 100}%`}}></div>
          <span className="absolute inset-0 flex items-center justify-center text-[7px] md:text-[10px] font-black text-white drop-shadow-sm">RIVAL: {enemyHp} HP</span>
        </div>
        <div className="bg-slate-900 p-1 md:p-2 rounded-lg border border-white/10 min-w-[60px] md:min-w-[80px] text-center">
           <span className="text-[8px] md:text-[10px] text-gray-500 font-black block tracking-widest leading-none">COMBO</span>
           <span className="text-blue-400 font-black text-sm md:text-xl leading-none">{comboCount}x</span>
        </div>
      </div>
    </div>
  );
};

export default HUD;
