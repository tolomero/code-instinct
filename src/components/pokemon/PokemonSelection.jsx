import React, { useState } from 'react';
import { ArrowLeft, Sparkles, BookOpen, Trophy, Lock, Unlock, Volume2, VolumeX, X } from 'lucide-react';
import { audioManager, SOUNDS } from '../../utils/audio';

const POKEMON_ROSTER = [
  { id: 1, name: "bulbasaur", type: "grass", display: "Bulbasaur", evolutions: ["bulbasaur", "ivysaur", "venusaur"], locked: true, cost: 10 },
  { id: 4, name: "charmander", type: "fire", display: "Charmander", evolutions: ["charmander", "charmeleon", "charizard"], shouldFlip: true, locked: true, cost: 10 },
  { id: 7, name: "squirtle", type: "water", display: "Squirtle", evolutions: ["squirtle", "wartortle", "blastoise"], shouldFlip: true },
  { id: 150, name: "mewtwo", type: "psychic", display: "Mewtwo", evolutions: ["mewtwo", "mewtwo-mega-y", "mewtwo-mega-x"], locked: true, cost: 30 },
  { id: 384, name: "rayquaza", type: "dragon", display: "Rayquaza", evolutions: ["rayquaza", "rayquaza", "rayquaza-mega"], locked: true, cost: 20, isLegendary: true },
  { id: 249, name: "lugia", type: "psychic", display: "Lugia", locked: true, cost: 20, isLegendary: true },
  { id: 6, name: "charizard-mega-x", type: "fire", display: "Mega Charizard X", isMega: true, locked: true, cost: 30 },
  { id: 9, name: "blastoise-mega", type: "water", display: "Mega Blastoise", isMega: true, locked: true, cost: 30 },
  { id: 94, name: "gengar-mega", type: "ghost", display: "Mega Gengar", isMega: true, locked: true, cost: 30 },
  { id: 151, name: "mew", type: "psychic", display: "Mew", isLegendary: true, locked: true, cost: 20 },
  { id: 25, name: "pikachu", type: "electric", display: "Pikachu" },
  { id: 52, name: "meowth", type: "normal", display: "Meowth", evolutions: ["meowth", "persian", "persian"], locked: true, cost: 100 },
];

const POKEDEX_CARDS = [
  { id: "gold-pika", name: "Pikachu Dorada", image: "/images/pikachu-poket-dorada.webp", cost: 5, description: "Si usas a Pikachu: +10 Copas. Pasiva: +10% de Daño y +2% Global." },
  { id: "mewtwo-card", name: "Mewtwo Supremo", image: "/images/mewtoo.webp", cost: 30, description: "Si usas a Mewtwo/Mew: +10 Copas. Pasiva: +3 Energía y +2% Global." },
  { id: "mega-zard-card", name: "Mega Charizard", image: "/images/megacharizard.webp", cost: 30, description: "Si usas a Charmander: +10 Copas. Pasiva: Curas +40% y +2% Global." },
  { id: "meowth-card", name: "Meowth de la Suerte", image: "/images/Meowth.webp", cost: 100, description: "Si usas a Meowth: +10 Copas. Pasiva: +50% Bits y +2% Global." },
  { id: "squirtle-card", name: "Squirtle Estrella de Arte", image: "/images/squirtle1.webp", cost: 10, description: "Si usas a Squirtle: +10 Copas. Pasiva: +15% Daño Agua y +2% Global." },
];

const PokemonSelection = ({ onSelect, onBack, cups = 0, unlockedPokemonIds = [], unlockedCardIds = [], selectedCards = [], onSelectCards, onUnlockPokemon, onBuyCard }) => {
  const [activeTab, setActiveTab] = useState('pokemon');
  const [hovered, setHovered] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [musicMuted, setMusicMuted] = useState(audioManager.isMusicMuted);

  const toggleMute = () => {
    const newState = audioManager.toggleMusicMute();
    setMusicMuted(newState);
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'fire': return 'bg-rose-500 border-rose-700 shadow-rose-500/20';
      case 'water': return 'bg-sky-500 border-sky-700 shadow-sky-500/20';
      case 'grass': return 'bg-emerald-500 border-emerald-700 shadow-emerald-500/20';
      case 'electric': return 'bg-yellow-400 border-yellow-600 shadow-yellow-500/20';
      case 'psychic': return 'bg-purple-500 border-purple-700 shadow-purple-500/20';
      case 'ghost': return 'bg-indigo-700 border-indigo-900 shadow-indigo-700/20';
      case 'dragon': return 'bg-cyan-600 border-cyan-800 shadow-cyan-600/20';
      default: return 'bg-slate-500 border-slate-700 shadow-slate-500/20';
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
    if (poke.name === 'squirtle') audioManager.playSFX(SOUNDS.CRY_SQUIRTLE, 0.6);
    
    onSelect(poke);
  };

  const toggleEquipCard = (cardId) => {
    if (selectedCards.includes(cardId)) {
      onSelectCards(selectedCards.filter(id => id !== cardId));
    } else {
      if (selectedCards.length >= 3) {
        audioManager.playSFX(SOUNDS.ERROR || SOUNDS.COMBO_BREAKER, 0.4);
        return;
      }
      onSelectCards([...selectedCards, cardId]);
    }
    audioManager.playSFX(SOUNDS.HIT, 0.3);
  };

  const handleBuyCard = (card) => {
    if (unlockedCardIds.includes(card.id)) {
      toggleEquipCard(card.id);
      return;
    }
    if (cups >= card.cost) {
      onBuyCard(card.id, card.cost);
      audioManager.playSFX(SOUNDS.BUY || SOUNDS.HIT, 0.6);
    } else {
      audioManager.playSFX(SOUNDS.ERROR || SOUNDS.COMBO_BREAKER, 0.4);
    }
  };

  return (
    <div className="min-h-screen bg-indigo-900 flex flex-col items-center p-4 md:p-8 font-sans select-none relative overflow-y-auto">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-400 to-indigo-900 opacity-60"></div>
      <div className="absolute inset-0 bg-[url('https://wallpapers.com/images/hd/pokemon-battle-background-7u32d84715767222.jpg')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
      
      {/* Header */}
      <div className="w-full max-w-7xl flex flex-col md:flex-row justify-between items-center gap-6 mb-12 relative z-20">
        <div className="flex gap-4 items-center">
          <button 
            onClick={onBack}
            className="bg-rose-500 p-3 rounded-2xl hover:bg-rose-400 transition-all border-b-4 border-rose-700 active:translate-y-1 active:border-b-0 shadow-lg"
          >
            <ArrowLeft className="text-white" size={24} />
          </button>

          <div className="flex bg-white/10 backdrop-blur-md p-1.5 rounded-[2rem] border-2 border-white/20 shadow-2xl">
            <button 
                onClick={() => setActiveTab('pokemon')}
                className={`flex items-center gap-2 px-8 py-3 rounded-full font-black text-sm md:text-base transition-all ${activeTab === 'pokemon' ? 'bg-yellow-400 text-yellow-900 shadow-xl scale-105' : 'text-white/60 hover:text-white'}`}
            >
                <Sparkles size={18} /> POKÉMON
            </button>
            <button 
                onClick={() => setActiveTab('pokedex')}
                className={`flex items-center gap-2 px-8 py-3 rounded-full font-black text-sm md:text-base transition-all ${activeTab === 'pokedex' ? 'bg-sky-400 text-white shadow-xl scale-105' : 'text-white/60 hover:text-white'}`}
            >
                <BookOpen size={18} /> POKÉDEX
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
           <button onClick={toggleMute} className="bg-white/10 p-3 rounded-2xl hover:bg-white/20 transition-all border-b-4 border-white/5 shadow-lg active:translate-y-1 active:border-b-0">
              {musicMuted ? <VolumeX size={24} className="text-rose-400" /> : <Volume2 size={24} className="text-white" />}
           </button>

           <div className="flex items-center gap-3 bg-yellow-400 px-6 py-2.5 rounded-2xl border-b-4 border-yellow-600 shadow-xl">
              <Trophy size={24} className="text-yellow-900" fill="currentColor" />
              <span className="text-yellow-900 font-black text-2xl italic tracking-tighter uppercase">{cups} COPAS</span>
           </div>
        </div>
      </div>

      <div className="relative z-10 bg-white/5 backdrop-blur-md px-8 py-3 rounded-[2rem] border border-white/10 text-yellow-300 font-bold text-xs md:text-base mb-8 max-w-4xl text-center leading-relaxed">
         {activeTab === 'pokemon' ? (
           <>Selecciona un Pokémon para combatir. Gana niveles para conseguir <span className="text-rose-500">Copas</span > y desbloquear nuevos compañeros.</>
         ) : (
           <>Colecciona cartas legendarias con tus copas. ¡Equipa hasta <span className="text-rose-500">3 cartas</span> para obtener poderosas mejoras pasivas!</>
         )}
      </div>

      <h1 className="text-4xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-white to-yellow-500 italic tracking-tighter pr-16 mb-12 relative z-10 drop-shadow-[0_4px_0_rgba(0,0,0,0.5)] uppercase text-center">
        {activeTab === 'pokemon' ? 'EQUIPO DE COMBATE' : 'COLECCIÓN ESTRELLA'}
      </h1>

      {activeTab === 'pokemon' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 max-w-7xl w-full relative z-10 pb-40">
          {POKEMON_ROSTER.map((poke) => {
            const isUnlocked = !poke.locked || unlockedPokemonIds.includes(poke.id);
            const canUnlock = !isUnlocked && cups >= poke.cost;

            return (
              <div 
                  key={poke.name}
                  className={`
                  relative group cursor-pointer transition-all duration-300
                  ${hovered === poke.name ? 'z-20' : 'scale-100'}
                  ${!isUnlocked && !canUnlock ? 'opacity-40 grayscale contrast-150' : 'opacity-100'}
                  `}
                  onMouseEnter={() => setHovered(poke.name)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => handleSelectPokemon(poke)}
              >
                  {/* Card Background */}
                  <div className={`
                    absolute inset-0 rounded-[2.5rem] transition-all duration-300 border-b-[8px]
                    ${getTypeColor(poke.type)}
                    ${hovered === poke.name && isUnlocked ? 'shadow-[0_0_40px_rgba(255,255,255,0.3)] brightness-110 scale-105 -translate-y-2' : ''}
                  `}></div>

                  {/* Content */}
                  <div className="relative h-48 md:h-64 flex flex-col items-center justify-center p-4">
                    <img 
                        src={`https://img.pokemondb.net/sprites/home/normal/${poke.name}.png`} 
                        alt={poke.display}
                        className={`
                        w-28 h-28 md:w-44 md:h-44 object-contain filter drop-shadow-[0_12px_6px_rgba(0,0,0,0.5)]
                        transition-all duration-500
                        ${poke.shouldFlip ? '-scale-x-100' : ''}
                        ${hovered === poke.name ? 'scale-115 -translate-y-3' : ''}
                        `}
                    />
                    
                    <div className="mt-4 w-full">
                        <h3 className="text-white font-black text-center text-lg md:text-xl uppercase italic tracking-tighter drop-shadow-md truncate">
                          {isUnlocked ? poke.display : "???"}
                        </h3>
                        
                        {!isUnlocked && (
                           <div className="flex justify-center mt-3">
                              <div className={`
                                flex items-center gap-2 px-6 py-2 rounded-full font-black text-xs md:text-sm border-2 shadow-xl
                                ${canUnlock ? 'bg-yellow-400 border-yellow-200 text-yellow-950 animate-bounce' : 'bg-slate-800 border-slate-600 text-white/40'}
                              `}>
                                 {canUnlock ? <Unlock size={14} /> : <Lock size={14} />}
                                 {poke.cost} 🏆
                              </div>
                           </div>
                        )}
                        
                        {poke.isMega && isUnlocked && (
                           <div className="flex justify-center mt-1">
                              <span className="text-[10px] font-black bg-white/20 px-3 py-1 rounded-full text-white backdrop-blur-sm border border-white/20 uppercase tracking-widest">MEGA</span>
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
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl w-full relative z-10 pb-40 px-4">
           {POKEDEX_CARDS.map((card) => {
              const isUnlocked = unlockedCardIds.includes(card.id);
              const canUnlock = !isUnlocked && cups >= card.cost;
              const isEquipped = selectedCards.includes(card.id);

              return (
                <div 
                  key={card.id}
                  onClick={() => isUnlocked && setSelectedCard(card)}
                  className={`
                    relative group bg-white/5 backdrop-blur-md rounded-[3rem] p-4 transition-all duration-500 border-4 shadow-2xl
                    ${isUnlocked ? 'border-yellow-400 hover:scale-105 active:scale-95 cursor-pointer shadow-[0_0_50px_rgba(234,179,8,0.2)]' : 'border-white/10 opacity-70 grayscale'}
                  `}
                >
                   {/* Card Frame */}
                   <div className="relative aspect-[3/4] rounded-[2.2rem] overflow-hidden bg-slate-950 border-2 border-white/10 shadow-inner">
                      <img 
                        src={card.image} 
                        alt={card.name}
                        className={`w-full h-full object-contain transition-all duration-700 p-4 ${isUnlocked ? 'scale-100' : 'scale-110 blur-[4px] opacity-20'}`}
                      />
                      
                      {!isUnlocked && (
                         <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                            <Lock size={64} className="text-white/20 mb-6 drop-shadow-xl" />
                            <h4 className="text-white/40 font-black text-xl md:text-2xl uppercase italic tracking-tighter mb-8 drop-shadow-md">BLOQUEADA</h4>
                            
                            <button 
                              onClick={(e) => { e.stopPropagation(); handleBuyCard(card); }}
                              className={`
                                w-full py-4 rounded-2xl font-black text-xl transition-all flex items-center justify-center gap-3 border-b-4
                                ${canUnlock 
                                  ? 'bg-yellow-400 border-yellow-600 text-yellow-950 shadow-xl animate-pulse hover:brightness-110' 
                                  : 'bg-white/5 border-white/10 text-white/30 cursor-not-allowed opacity-50'}
                              `}
                            >
                               {canUnlock ? <Unlock size={24} /> : <Lock size={24} />}
                               {card.cost} COPAS
                            </button>
                         </div>
                      )}

                      {isUnlocked && (
                         <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 p-2.5 rounded-full shadow-2xl border-2 border-white animate-bounce">
                            <Sparkles size={20} fill="currentColor" />
                         </div>
                      )}
                   </div>

                   <div className="mt-8 text-center px-4">
                      <h3 className={`text-2xl md:text-3xl font-black uppercase italic tracking-tighter mb-2 drop-shadow-sm ${isUnlocked ? 'text-white' : 'text-white/30'}`}>
                        {isUnlocked ? card.name : "??? ??? ???"}
                      </h3>
                      {isUnlocked && (
                        <>
                          <div className="bg-black/20 backdrop-blur-sm p-3 rounded-2xl text-white/80 font-bold text-xs leading-snug uppercase min-h-[50px] flex items-center justify-center border border-white/5">
                            {card.description}
                          </div>
                          <button 
                            onClick={(e) => { e.stopPropagation(); toggleEquipCard(card.id); }}
                            className={`
                              mt-6 w-full py-3.5 rounded-2xl font-black text-sm uppercase italic tracking-widest border-b-4 transition-all
                              ${isEquipped 
                                ? 'bg-rose-500 border-rose-800 text-white hover:brightness-110' 
                                : 'bg-sky-500 border-sky-800 text-white hover:bg-sky-400 active:translate-y-1 active:border-b-0'}
                            `}
                          >
                            {isEquipped ? '🔥 QUITAR' : '⭐ EQUIPAR'}
                          </button>
                        </>
                      )}
                   </div>
                </div>
              );
           })}
        </div>
      )}

      {/* EQUIPMENT BAR */}
      {selectedCards.length > 0 && (
         <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] bg-white/10 backdrop-blur-2xl p-3 md:p-4 px-6 md:px-10 rounded-[3rem] border-2 border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center gap-4 md:gap-8 animate-in slide-in-from-bottom-10 duration-700">
            <div className="flex flex-col">
               <span className="text-[10px] md:text-xs font-black text-yellow-400 uppercase tracking-widest leading-none mb-1.5 drop-shadow-md">EQUIPO ACTUAL</span>
               <span className="text-white text-sm md:text-base font-black italic tracking-tighter">{selectedCards.length}/3 CARTAS</span>
            </div>
            <div className="h-10 w-[2px] bg-white/20 rounded-full"></div>
            <div className="flex items-center gap-3">
               {selectedCards.map(id => {
                  const card = POKEDEX_CARDS.find(c => c.id === id);
                  return (
                     <div key={id} className="relative w-14 h-20 md:w-16 md:h-24 rounded-2xl overflow-hidden border-2 border-white/40 shadow-2xl group transition-transform hover:scale-110 hover:-translate-y-2">
                        <img src={card.image} className="w-full h-full object-cover" />
                        <button 
                           onClick={() => toggleEquipCard(id)}
                           className="absolute inset-0 bg-rose-500/90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                        >
                           <X size={24} className="text-white" strokeWidth={4} />
                        </button>
                     </div>
                  );
               })}
               {[...Array(3 - selectedCards.length)].map((_, i) => (
                  <div key={i} className="w-14 h-20 md:w-16 md:h-24 rounded-2xl border-2 border-dashed border-white/10 bg-white/5 flex items-center justify-center">
                     <Lock size={16} className="text-white/20" />
                  </div>
               ))}
            </div>
         </div>
      )}

      {/* Card Zoom Modal */}
      {selectedCard && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-2xl bg-black/90 animate-in fade-in duration-500">
            <button 
              onClick={() => setSelectedCard(null)}
              className="absolute top-8 right-8 text-white hover:text-rose-400 transition-colors p-3 bg-white/10 rounded-2xl shadow-2xl active:scale-95"
            >
              <X size={40} strokeWidth={3} />
            </button>

            <div className="relative group max-w-sm w-full animate-in zoom-in-95 duration-500">
               <div className="absolute -inset-16 z-0 pointer-events-none">
                  {[...Array(15)].map((_, i) => (
                    <Sparkles 
                      key={i}
                      className="absolute text-yellow-400 animate-pulse"
                      size={24 + Math.random() * 32}
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`,
                        opacity: 0.6
                      }}
                    />
                  ))}
               </div>

               <div className="relative z-10 bg-indigo-950/80 rounded-[4rem] p-8 border-8 border-yellow-400 shadow-[0_0_120px_rgba(234,179,8,0.5)] overflow-hidden">
                  <div className="aspect-[3/4] rounded-[3rem] overflow-hidden bg-slate-950 border-4 border-yellow-500/30 p-4">
                     <img src={selectedCard.image} alt={selectedCard.name} className="w-full h-full object-contain filter drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)]" />
                  </div>
                  <div className="mt-10 text-center">
                      <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-white to-yellow-500 uppercase tracking-tighter mb-3 italic drop-shadow-lg">{selectedCard.name}</h2>
                      <div className="bg-white/5 p-5 rounded-3xl border border-white/10 text-white/80 font-bold text-sm md:text-base leading-relaxed uppercase tracking-wide">
                        {selectedCard.description}
                      </div>
                  </div>
               </div>
            </div>
         </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap');
        .font-sans { font-family: 'Fredoka One', cursive, sans-serif; }
        
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}} />
    </div>
  );
};

export default PokemonSelection;
