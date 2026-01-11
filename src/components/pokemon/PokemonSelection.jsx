import React, { useState } from 'react';
import { ArrowLeft, Sparkles, BookOpen, Trophy, Lock, Unlock } from 'lucide-react';
import { audioManager, SOUNDS } from '../../utils/audio';

const POKEMON_ROSTER = [
  { id: 1, name: "bulbasaur", type: "grass", display: "Bulbasaur", evolutions: ["bulbasaur", "ivysaur", "venusaur"], locked: true, cost: 10 },
  { id: 4, name: "charmander", type: "fire", display: "Charmander", evolutions: ["charmander", "charmeleon", "charizard"], shouldFlip: true, locked: true, cost: 10 },
  { id: 7, name: "squirtle", type: "water", display: "Squirtle", evolutions: ["squirtle", "wartortle", "blastoise"] },
  { id: 150, name: "mewtwo", type: "psychic", display: "Mewtwo", evolutions: ["mewtwo", "mewtwo-mega-y", "mewtwo-mega-x"], locked: true, cost: 30 },
  { id: 384, name: "rayquaza", type: "dragon", display: "Rayquaza", evolutions: ["rayquaza", "rayquaza", "rayquaza-mega"], locked: true, cost: 20, isLegendary: true },
  { id: 249, name: "lugia", type: "psychic", display: "Lugia", locked: true, cost: 20, isLegendary: true },
  { id: 6, name: "charizard-mega-x", type: "fire", display: "Mega Charizard X", isMega: true, locked: true, cost: 30 },
  { id: 9, name: "blastoise-mega", type: "water", display: "Mega Blastoise", isMega: true, locked: true, cost: 30 },
  { id: 94, name: "gengar-mega", type: "ghost", display: "Mega Gengar", isMega: true, locked: true, cost: 30 },
  { id: 151, name: "mew", type: "psychic", display: "Mew", isLegendary: true, locked: true, cost: 20 },
  { id: 25, name: "pikachu", type: "electric", display: "Pikachu" },
];

const POKEDEX_CARDS = [
  { id: "gold-pika", name: "Pikachu Dorada", image: "/images/pikachu-poket-dorada.webp", cost: 5 },
  { id: "mewtwo-card", name: "Mewtwo Supremo", image: "/images/mewtoo.webp", cost: 5 },
  { id: "mega-zard-card", name: "Mega Charizard", image: "/images/megacharizard.webp", cost: 5 },
];

const PokemonSelection = ({ onSelect, onBack, cups = 0, unlockedPokemonIds = [], unlockedCardIds = [], onUnlockPokemon, onBuyCard }) => {
  const [activeTab, setActiveTab] = useState('pokemon');
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

  const handleSelectPokemon = (poke) => {
    const isLocked = poke.locked && !unlockedPokemonIds.includes(poke.id);
    if (isLocked) {
      if (cups >= poke.cost) {
        onUnlockPokemon(poke.id, poke.cost);
        audioManager.playSFX(SOUNDS.BUY || SOUNDS.HIT, 0.6);
      } else {
        audioManager.playSFX(SOUNDS.ERROR || SOUNDS.COMBO_BREAKER, 0.4);
      }
      return;
    }
    
    if (poke.name === 'charmander') audioManager.playSFX(SOUNDS.CRY_CHARMANDER, 0.6);
    if (poke.name === 'pikachu') audioManager.playSFX(SOUNDS.CRY_PIKACHU, 0.6);
    
    onSelect(poke);
  };

  const handleBuyCard = (card) => {
    if (unlockedCardIds.includes(card.id)) return;
    if (cups >= card.cost) {
      onBuyCard(card.id, card.cost);
      audioManager.playSFX(SOUNDS.BUY || SOUNDS.HIT, 0.6);
    } else {
      audioManager.playSFX(SOUNDS.ERROR || SOUNDS.COMBO_BREAKER, 0.4);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center p-4 relative overflow-hidden font-['Fredoka_One']">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/hexellence.png')] opacity-10"></div>
      
      {/* Header */}
      <div className="w-full max-w-5xl flex justify-between items-center mb-8 relative z-20">
        <button 
          onClick={onBack}
          className="bg-slate-800 p-3 rounded-2xl hover:bg-slate-700 transition-all border-b-4 border-slate-950 active:border-b-0 active:translate-y-1"
        >
          <ArrowLeft className="text-white" />
        </button>

        <div className="flex bg-slate-800/80 p-1.5 rounded-2xl border-2 border-slate-700 shadow-xl">
           <button 
              onClick={() => setActiveTab('pokemon')}
              className={`flex items-center gap-2 px-6 py-2 rounded-xl font-bold transition-all ${activeTab === 'pokemon' ? 'bg-yellow-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
           >
              <Sparkles size={18} /> POKÉMON
           </button>
           <button 
              onClick={() => setActiveTab('pokedex')}
              className={`flex items-center gap-2 px-6 py-2 rounded-xl font-bold transition-all ${activeTab === 'pokedex' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
           >
              <BookOpen size={18} /> POKÉDEX
           </button>
        </div>

        <div className="flex items-center gap-2 bg-yellow-500 px-4 py-2 rounded-2xl border-b-4 border-yellow-700 shadow-lg">
          <Trophy size={20} className="text-white fill-white" />
          <span className="text-white font-black text-xl">{cups}</span>
        </div>
      </div>

      <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-white to-yellow-500 italic tracking-tighter mb-10 relative z-10 drop-shadow-[0_4px_0_rgba(0,0,0,0.5)]">
        {activeTab === 'pokemon' ? 'EQUIPO DE COMBATE' : 'COLECCIÓN LEGENDARIA'}
      </h1>

      {activeTab === 'pokemon' ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl w-full relative z-10 pb-20">
          {POKEMON_ROSTER.map((poke) => {
            const isUnlocked = !poke.locked || unlockedPokemonIds.includes(poke.id);
            const canUnlock = !isUnlocked && cups >= poke.cost;

            return (
              <div 
                  key={poke.name}
                  className={`
                  relative group cursor-pointer transition-all duration-300
                  ${hovered === poke.name ? 'scale-105 z-20' : 'scale-100'}
                  ${!isUnlocked && !canUnlock ? 'grayscale opacity-60' : ''}
                  `}
                  onMouseEnter={() => setHovered(poke.name)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => handleSelectPokemon(poke)}
              >
                  {/* Card Background */}
                  <div className={`
                    absolute inset-0 rounded-3xl transition-all duration-300 border-b-8 border-black/30
                    ${getTypeColor(poke.type)}
                    ${hovered === poke.name && isUnlocked ? 'shadow-[0_0_30px_rgba(255,255,255,0.4)] brightness-110' : ''}
                  `}></div>

                  {/* Content */}
                  <div className="relative h-48 md:h-64 flex flex-col items-center justify-center p-4">
                    <img 
                        src={`https://img.pokemondb.net/sprites/home/normal/${poke.name}.png`} 
                        alt={poke.display}
                        className={`
                        w-28 h-28 md:w-44 md:h-44 object-contain filter drop-shadow-[0_8px_4px_rgba(0,0,0,0.4)]
                        transition-all duration-500
                        ${poke.shouldFlip ? '-scale-x-100' : ''}
                        ${hovered === poke.name ? 'scale-110 -translate-y-2' : ''}
                        `}
                    />
                    
                    <div className="mt-4 w-full">
                        <h3 className="text-white font-black text-center text-lg md:text-xl uppercase drop-shadow-md truncate">
                          {isUnlocked ? poke.display : "???"}
                        </h3>
                        
                        {!isUnlocked && (
                           <div className="flex justify-center mt-2">
                              <div className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full font-black text-sm border-2 ${canUnlock ? 'bg-green-500 border-green-200 animate-bounce' : 'bg-slate-700 border-slate-500'}`}>
                                 {canUnlock ? <Unlock size={14} /> : <Lock size={14} />}
                                 {poke.cost} 🏆
                              </div>
                           </div>
                        )}
                        
                        {poke.isMega && isUnlocked && (
                           <div className="flex justify-center mt-1">
                              <span className="text-[10px] font-black bg-white/20 px-2 py-0.5 rounded-full text-white backdrop-blur-sm border border-white/30">MEGA</span>
                           </div>
                        )}
                    </div>
                  </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* POKEDEX TAB */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full relative z-10 pb-20 px-4">
           {POKEDEX_CARDS.map((card) => {
              const isUnlocked = unlockedCardIds.includes(card.id);
              const canUnlock = !isUnlocked && cups >= card.cost;

              return (
                <div 
                  key={card.id}
                  className={`relative group bg-slate-800 rounded-[2.5rem] p-4 transition-all duration-500 border-4 ${isUnlocked ? 'border-yellow-400 shadow-[0_0_40px_rgba(234,179,8,0.3)]' : 'border-slate-700'}`}
                >
                   {/* Card Frame */}
                   <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden bg-slate-900 border-2 border-slate-700">
                      <img 
                        src={card.image} 
                        alt={card.name}
                        className={`w-full h-full object-cover transition-all duration-700 ${isUnlocked ? 'scale-100' : 'scale-110 blur-xl opacity-30 grayscale'}`}
                      />
                      
                      {!isUnlocked && (
                         <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                            <Lock size={64} className="text-slate-600 mb-4" />
                            <h4 className="text-slate-400 font-black text-xl uppercase mb-6 tracking-widest">CARTA BLOQUEADA</h4>
                            
                            <button 
                              onClick={() => handleBuyCard(card)}
                              className={`
                                w-full py-4 rounded-2xl font-black text-xl transition-all flex items-center justify-center gap-3
                                ${canUnlock 
                                  ? 'bg-gradient-to-r from-yellow-400 to-amber-600 text-white shadow-lg animate-pulse hover:scale-105 active:scale-95' 
                                  : 'bg-slate-700 text-slate-500 cursor-not-allowed'}
                              `}
                            >
                               {canUnlock ? <Unlock size={24} /> : <Lock size={24} />}
                               {card.cost} COPAS
                            </button>
                         </div>
                      )}

                      {isUnlocked && (
                         <div className="absolute top-4 right-4 bg-yellow-400 text-slate-900 p-2 rounded-full shadow-lg border-2 border-white">
                            <Sparkles size={20} className="animate-spin-slow" />
                         </div>
                      )}
                   </div>

                   <div className="mt-6 text-center">
                      <h3 className={`text-2xl font-black uppercase tracking-tighter ${isUnlocked ? 'text-yellow-400' : 'text-slate-600'}`}>
                        {isUnlocked ? card.name : "??? ??? ???"}
                      </h3>
                      {isUnlocked && (
                        <div className="text-yellow-500/60 font-black text-xs mt-1 tracking-[0.3em]">EDICIÓN LIMITADA</div>
                      )}
                   </div>
                </div>
              );
           })}
        </div>
      )}

      {/* Footer Navigation Tip */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20 text-white/60 font-bold text-sm">
         {activeTab === 'pokemon' ? 'Pulsa sobre un Pokémon para seleccionarlo o desbloquearlo' : '¡Colecciona todas las cartas legendarias con tus copas!'}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}} />
    </div>
  );
};

export default PokemonSelection;
