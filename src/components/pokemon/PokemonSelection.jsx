import React, { useState, useEffect } from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { audioManager, SOUNDS } from '../../utils/audio';

const POKEMON_ROSTER = [
  { id: 1, name: "bulbasaur", type: "grass", display: "Bulbasaur", evolutions: ["bulbasaur", "ivysaur", "venusaur"] },
  { id: 4, name: "charmander", type: "fire", display: "Charmander", evolutions: ["charmander", "charmeleon", "charizard"], shouldFlip: true, locked: true, cost: 10 },
  { id: 7, name: "squirtle", type: "water", display: "Squirtle", evolutions: ["squirtle", "wartortle", "blastoise"] },
  { id: 150, name: "mewtwo", type: "psychic", display: "Mewtwo", evolutions: ["mewtwo", "mewtwo-mega-y", "mewtwo-mega-x"], locked: true, cost: 30 },
  { id: 384, name: "rayquaza", type: "dragon", display: "Rayquaza", evolutions: ["rayquaza", "rayquaza", "rayquaza-mega"] },
  { id: 249, name: "lugia", type: "psychic", display: "Lugia" },
  { id: 6, name: "charizard-mega-x", type: "fire", display: "Mega Charizard X", isMega: true, shouldFlip: true },
  { id: 9, name: "blastoise-mega", type: "water", display: "Mega Blastoise", isMega: true },
  { id: 94, name: "gengar-mega", type: "ghost", display: "Mega Gengar", isMega: true },
  { id: 151, name: "mew", type: "psychic", display: "Mew", isLegendary: true, locked: true, cost: 20 },
  { id: 25, name: "pikachu", type: "electric", display: "Pikachu" },
];

const PokemonSelection = ({ onSelect, onBack, cups = 0 }) => {
  const [hovered, setHovered] = useState(null);

  const getTypeColor = (type) => {
    switch (type) {
      case 'fire': return 'bg-red-500 shadow-red-500/50';
      case 'water': return 'bg-blue-500 shadow-blue-500/50';
      case 'grass': return 'bg-green-500 shadow-green-500/50';
      case 'dark': return 'bg-slate-700 shadow-slate-700/50';
      case 'psychic': return 'bg-purple-500 shadow-purple-500/50';
      case 'ghost': return 'bg-indigo-700 shadow-indigo-700/50';
      case 'dragon': return 'bg-emerald-600 shadow-emerald-600/50';
      default: return 'bg-gray-500 shadow-gray-500/50';
    }
  };

  const handleSelect = (poke) => {
    if (poke.locked && cups < poke.cost) return; // Cannot select
    
    if (poke.name === 'charmander') audioManager.playSFX(SOUNDS.CRY_CHARMANDER, 0.6);
    if (poke.name === 'pikachu') audioManager.playSFX(SOUNDS.CRY_PIKACHU, 0.6);
    
    onSelect(poke);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/hexellence.png')] opacity-10"></div>
      
      <button 
        onClick={onBack}
        className="absolute top-4 left-4 z-20 bg-slate-800 p-2 rounded-full hover:bg-slate-700 transition-colors border border-slate-600"
      >
        <ArrowLeft className="text-white" />
      </button>

      <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-yellow-500/20 px-4 py-2 rounded-full border border-yellow-500/50">
        <span className="text-yellow-400 font-black">🏆 {cups} COPAS</span>
      </div>

      <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 italic tracking-tighter mb-8 mt-4 md:mt-0 relative z-10 drop-shadow-sm">
        ELIGE TU COMPAÑERO
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-5xl w-full relative z-10 pb-10">
        {POKEMON_ROSTER.map((poke) => {
          const isLocked = poke.locked && cups < poke.cost;
          const canUnlock = poke.locked && cups >= poke.cost;

          return (
            <div 
                key={poke.name}
                className={`
                relative group cursor-pointer transition-all duration-300 transform
                ${hovered === poke.name ? 'scale-110 z-20' : 'scale-100 hover:scale-105'}
                ${isLocked ? 'grayscale opacity-70' : ''}
                `}
                onMouseEnter={() => setHovered(poke.name)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => handleSelect(poke)}
            >
                {/* Card Background */}
                <div className={`
                absolute inset-0 rounded-2xl opacity-80 transition-all duration-300 border-4 border-white/10
                ${getTypeColor(poke.type)}
                ${hovered === poke.name && !isLocked ? 'opacity-100 shadow-[0_0_30px_rgba(255,255,255,0.3)] animate-pulse' : ''}
                `}></div>

                {/* Content */}
                <div className="relative h-40 md:h-56 flex flex-col items-center justify-center p-4">
                <img 
                    src={`https://img.pokemondb.net/sprites/home/normal/${poke.name}.png`} 
                    alt={poke.display}
                    className={`
                    w-24 h-24 md:w-36 md:h-36 object-contain filter drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]
                    transition-all duration-300
                    ${poke.shouldFlip ? '-scale-x-100' : ''}
                    ${hovered === poke.name && !isLocked ? 'scale-125 -translate-y-2' : ''}
                    `}
                    onError={(e) => {
                    e.target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png`;
                    }}
                />
                
                <div className="mt-4 text-center">
                    <h3 className="text-white font-black text-lg md:text-2xl italic tracking-wide uppercase drop-shadow-md">
                    {isLocked ? "???" : poke.display}
                    </h3>
                    {isLocked && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-2xl backdrop-blur-sm">
                            <div className="bg-red-600 text-white px-3 py-1 rounded font-bold text-sm transform -rotate-12 border-2 border-white">
                                🔒 {poke.cost} 🏆
                            </div>
                        </div>
                    )}
                    {canUnlock && (
                         <div className="absolute inset-0 flex items-center justify-center bg-green-900/40 rounded-2xl backdrop-blur-sm animate-pulse">
                            <div className="bg-green-500 text-white px-3 py-1 rounded font-bold text-sm animate-bounce">
                                🔓 DESBLOQUEAR
                            </div>
                        </div>
                    )}
                    
                    {poke.isMega && !isLocked && (
                    <span className="inline-flex items-center gap-1 text-[10px] md:text-xs font-bold bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-0.5 rounded-full mt-1">
                        <Sparkles size={10} /> MEGA
                    </span>
                    )}
                    {poke.isLegendary && !isLocked && (
                    <span className="inline-flex items-center gap-1 text-[10px] md:text-xs font-bold bg-gradient-to-r from-yellow-400 to-amber-600 text-white px-2 py-0.5 rounded-full mt-1">
                        🌟 LEGENDARIO
                    </span>
                    )}
                </div>
                </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PokemonSelection;
