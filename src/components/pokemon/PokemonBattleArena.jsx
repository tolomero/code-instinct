import React, { useState, useEffect, useRef } from 'react';
import { Heart, Shield, Swords, Zap, Home, Trophy, Star, Sparkles, Target, Coins, Image, Volume2, VolumeX, X, Lock } from 'lucide-react';
import { usePokemonGame } from '../../hooks/usePokemonGame';
import { audioManager, SOUNDS } from '../../utils/audio';

const TYPE_SOUNDS = {
  fire: SOUNDS.HIT,
  water: SOUNDS.HIT,
  grass: SOUNDS.HIT,
  electric: SOUNDS.PIKACHU_SPECIAL,
  normal: SOUNDS.HIT,
  psychic: SOUNDS.ULTRA_COMBO,
  dragon: SOUNDS.FATALITY
};

const PokemonBattleArena = ({ 
  playerPokemon, 
  mathMode, 
  onGameOver, 
  onBack,
  onGameWin,
  bits,
  onSpendBits,
  onEarnBits,
  selectedCards = []
}) => {
  const cardDescriptions = {
    'gold-pika': 'Pikachu Dorada: +10% Daño. (+10 Copas con Pikachu)',
    'mewtwo-card': 'Mewtwo Supremo: +3 Energía Inicial. (+10 Copas con Mewtwo)',
    'mega-zard-card': 'Mega Charizard: Curaciones +40%. (+10 Copas con Charizard)',
    'meowth-card': 'Meowth Suerte: +50% Bits por respuesta. (+10 Copas con Meowth)',
    'squirtle-card': 'Squirtle Estrella: +15% Daño de Agua. (+10 Copas con Squirtle)'
  };

  const POKEDEX_CARDS = [
    { id: "gold-pika", name: "Pikachu Dorada", image: "/images/pikachu-poket-dorada.webp" },
    { id: "mewtwo-card", name: "Mewtwo Supremo", image: "/images/mewtoo.webp" },
    { id: "mega-zard-card", name: "Mega Charizard", image: "/images/megacharizard.webp" },
    { id: "meowth-card", name: "Meowth de la Suerte", image: "/images/Meowth.webp" },
    { id: "squirtle-card", name: "Squirtle Estrella de Arte", image: "/images/squirtle1.webp" },
  ];

  const [zoomedCard, setZoomedCard] = useState(null);

  const {
    gameState,
    currentQuestion,
    enemyPokemon,
    submitAnswer,
    useSpecialAttack,
    buyHealth,
    buyDamage,
    evolutionStage,
    playerForm,
    typeBonus,
    enemyTypeBonus
  } = usePokemonGame(playerPokemon, mathMode, onGameOver, onGameWin, onEarnBits, selectedCards);

  const getTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'fire': return 'bg-orange-500';
      case 'water': return 'bg-blue-500';
      case 'grass': return 'bg-emerald-500';
      case 'electric': return 'bg-yellow-400';
      case 'psychic': return 'bg-purple-500';
      case 'ghost': return 'bg-indigo-700';
      case 'dragon': return 'bg-emerald-700';
      case 'poison': return 'bg-purple-600';
      case 'ground': return 'bg-amber-700';
      case 'rock': return 'bg-stone-500';
      case 'ice': return 'bg-cyan-300';
      case 'bug': return 'bg-lime-500';
      case 'steel': return 'bg-slate-400';
      case 'dark': return 'bg-zinc-800';
      case 'fairy': return 'bg-pink-300';
      case 'fighting': return 'bg-red-700';
      case 'flying': return 'bg-sky-400';
      default: return 'bg-gray-400';
    }
  };

  const playerType = playerPokemon.type || 'normal';
  const enemyType = enemyPokemon?.types?.[0]?.type?.name || 'normal';

  const [animating, setAnimating] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [screenEffect, setScreenEffect] = useState(null);
  const [overlayGif, setOverlayGif] = useState(null);
  const [customBg, setCustomBg] = useState(null);
  const [musicMuted, setMusicMuted] = useState(audioManager.isMusicMuted);
  const prevStageRef = useRef(evolutionStage);

  const toggleMute = () => {
    const newState = audioManager.toggleMusicMute();
    setMusicMuted(newState);
  };

  const GET_ATTACK_NAMES = (stage, type = 'normal') => {
     const t = type.toUpperCase();
     if (stage === 0) return ["ATAQUE RAPIDO", "SUPER GOLPE", "PODER TOTAL"];
     if (stage === 1) return ["ATAQUE FURIA", "BOLA DE ENERGÍA", `EXPLOSIÓN ${t}`];
     return ["TORMENTA ELEMENTAL", "VÓRTICE MÁXIMO", `APOCALIPSIS ${t}`];
  };

  const attackNames = GET_ATTACK_NAMES(evolutionStage, playerForm.type);

  useEffect(() => {
    if (evolutionStage > prevStageRef.current) {
       const cry = GET_CRY(playerForm.name);
       if (cry) audioManager.playSFX(cry, 0.7);

       if (playerForm.name === 'charizard' || playerForm.name === 'charizard-mega-x') {
         setOverlayGif('https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3cHhwcGM0bmc2c3Y3dm1rNmI0Mnd6dGFscDRjOHFkbzBnNTBscnRveSZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/cNlhpWYx5PGsOGXAil/giphy.gif');
         setTimeout(() => setOverlayGif(null), 3000);
       }
    }
    prevStageRef.current = evolutionStage;
  }, [evolutionStage, playerForm.name]);

  function GET_CRY(name) {
    const cries = {
      charmander: SOUNDS.CRY_CHARMANDER,
      charmeleon: SOUNDS.CRY_CHARMELEON,
      charizard: SOUNDS.CRY_CHARIZARD,
      'charizard-mega-x': SOUNDS.CRY_CHARIZARD,
      pikachu: SOUNDS.CRY_PIKACHU,
      squirtle: SOUNDS.CRY_SQUIRTLE,
      wartortle: SOUNDS.CRY_WARTORTLE,
      blastoise: SOUNDS.CRY_BLASTOISE,
    };
    return cries[name] || null;
  }

  useEffect(() => {
    if (gameState.lastAction === 'correct') {
      setAnimating('player-attack-hit');
      setFeedback('¡GENIAL!');
      const cry = GET_CRY(playerForm.name);
      if (cry) audioManager.playSFX(cry, 0.6);
      else audioManager.playSFX(SOUNDS.HIT, 0.4); 
      setTimeout(() => { setAnimating(null); setFeedback(null); }, 600);
    } else if (gameState.lastAction === 'wrong') {
      setAnimating('enemy-attack-hit');
      setFeedback('¡OUCH!');
      const type = enemyPokemon.types?.[0]?.type?.name || 'normal';
      audioManager.playSFX(TYPE_SOUNDS[type] || SOUNDS.DAMAGE, 0.6);
      setTimeout(() => { setAnimating(null); setFeedback(null); }, 1000);
    } else if (gameState.lastAction === 'boss-special') {
      setAnimating('boss-special-hit');
      setFeedback('¡CUIDADO!');
      setScreenEffect('shake-red');
      audioManager.playSFX(SOUNDS.FATALITY, 0.6);
      setTimeout(() => { setAnimating(null); setFeedback(null); setScreenEffect(null); }, 1500);
    } else if (gameState.lastAction === 'small-attack' || gameState.lastAction === 'medium-attack') {
      const isMedium = gameState.lastAction === 'medium-attack';
      setAnimating(isMedium ? 'player-md-atk' : 'player-sm-atk');
      setFeedback('¡SÚPER!');
      if (isMedium) setScreenEffect('flash-white');
      if (playerForm.name === 'pikachu') {
        audioManager.playSFX(isMedium ? SOUNDS.PIKACHU_SPECIAL : SOUNDS.PIKACHU_RUNNING, 0.7);
      } else if (['squirtle', 'wartortle', 'blastoise'].includes(playerForm.name)) {
        const cry = GET_CRY(playerForm.name);
        audioManager.playSFX(cry, isMedium ? 0.8 : 0.7);
      } else {
        const cry = GET_CRY(playerForm.name);
        if (cry) audioManager.playSFX(cry, isMedium ? 0.8 : 0.7);
        else audioManager.playSFX(isMedium ? SOUNDS.ULTRA_COMBO : SOUNDS.HIT, 0.6);
      }

      if (playerForm.name === 'charizard' || playerForm.name === 'charizard-mega-x') {
        setOverlayGif('https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3dXQzOXhiaXd5bnliNmt5ZG96cmEwZXVvbmk2MWh5YW9iNnltYzI2aSZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/48cVVAf9vam9W/giphy.gif');
      } else if (playerForm.name === 'charmander' || playerForm.name === 'charmeleon') {
        setOverlayGif('https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExcmlpMXp6dTJhOG5iZjZ1NjEzOXkyaGI3M2ppNmVqNWIyZWVhZDM0eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/WJ7Tr9wi8xVe0/giphy.gif');
      } else if (playerForm.name === 'pikachu') {
        setOverlayGif(isMedium 
          ? 'https://media.giphy.com/media/7ISIRaCMrgFfa/giphy.gif'
          : 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHdvbGo2djAyd3ZrcDhkdmg3ZTg5b241bHk2a2swemdlbnVrbmoxNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/68kKd6gmSKYww/giphy.gif'
        );
      } else if (playerForm.name === 'squirtle') {
        setOverlayGif(isMedium
          ? '/images/2energiassquirtle.gif'
          : 'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3d29jbnpkMnN5ejB4anJoYXI1dGZsYjVjcHZ3dDZqejZ0cGcwb3R0NSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Wklt2njWsEQzS/giphy.gif'
        );
      } else if (playerForm.name === 'wartortle') {
        setOverlayGif(isMedium
          ? 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcno2eWZoa2poZXI4dzM4OXJwdHlxY3F5YXdnbjc0MTJnOWJkZWtiMiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/JMPAslYn9YTEA/giphy.gif'
          : 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcTduZWV3bDg2eHpoZjE4NXg2dTBmdjhmNm14dmxzN3Z0Z3ltZnl2NyZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/JYfQy6aDhezb65mpPU/giphy.gif'
        );
      } else if (playerForm.name === 'blastoise') {
        setOverlayGif(isMedium
          ? 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjhnMWcyc2NrZ2JqYnhhbW5yd2FrYTAxOXRrYW90cmxodWV5Ym9pZCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Q6JxEVlKBENJsU9I33/giphy.gif'
          : 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjhnMWcyc2NrZ2JqYnhhbW5yd2FrYTAxOXRrYW90cmxodWV5Ym9pZCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/tDT5nL8EXbQhW/giphy.gif'
        );
      }
      setTimeout(() => setOverlayGif(null), isMedium ? 4000 : 3500);
      setTimeout(() => { setAnimating(null); setFeedback(null); setScreenEffect(null); }, isMedium ? 3000 : 2500);
    } else if (gameState.lastAction === 'final-attack') {
      setAnimating('player-final-atk');
      setFeedback('¡ÉPICO!');
      setScreenEffect('epic-shake');
      
      if (playerForm.name === 'pikachu') {
        audioManager.playSFX(SOUNDS.PIKACHU_SPECIAL, 1.0);
      } else if (['squirtle', 'wartortle', 'blastoise'].includes(playerForm.name)) {
        const cry = GET_CRY(playerForm.name);
        audioManager.playSFX(cry, 1.0);
      } else {
        const cry = GET_CRY(playerForm.name);
        if (cry) audioManager.playSFX(cry, 1.0);
        else audioManager.playSFX(SOUNDS.FATALITY, 0.8);
      }

      if (['charmander', 'charmeleon', 'charizard', 'charizard-mega-x'].includes(playerForm.name)) {
        setOverlayGif('https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3cHhwcGM0bmc2c3Y3dm1rNmI0Mnd6dGFscDRjOHFkbzBnNTBscnRveSZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/kRgzY3qVnkEa2lIAxf/giphy.gif');
        setTimeout(() => setOverlayGif(null), 5500);
      } else if (playerForm.name === 'pikachu') {
        setOverlayGif('https://media.giphy.com/media/12r4pHjvAOv48o/giphy.gif');
        setTimeout(() => setOverlayGif(null), 5500);
      } else if (playerForm.name === 'squirtle') {
        setOverlayGif('/images/5energiassquirtle.gif');
        setTimeout(() => setOverlayGif(null), 5500);
      } else if (playerForm.name === 'wartortle') {
        setOverlayGif('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcno2eWZoa2poZXI4dzM4OXJwdHlxY3F5YXdnbjc0MTJnOWJkZWtiMiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/kdtqSW38KsXJTnxZXF/giphy.gif');
        setTimeout(() => setOverlayGif(null), 5500);
      } else if (playerForm.name === 'blastoise') {
        setOverlayGif('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjhnMWcyc2NrZ2JqYnhhbW5yd2FrYTAxOXRrYW90cmxodWV5Ym9pZCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Tj3YjGVf2DtaXP0aDB/giphy.gif');
        setTimeout(() => setOverlayGif(null), 5500);
      }
      setTimeout(() => { setAnimating(null); setFeedback(null); setScreenEffect(null); }, 4000);
    } else if (gameState.lastAction === 'victory') {
      const victoryText = gameState.bonusCups > 0 ? `¡GANASTE! +15 (+${gameState.bonusCups} BONUS CARTAS)` : '¡GANASTE! +15';
      setFeedback(victoryText);
      if (['squirtle', 'wartortle', 'blastoise'].includes(playerForm.name)) {
        const cry = GET_CRY(playerForm.name);
        audioManager.playSFX(cry, 0.8);
      } else {
        audioManager.playSFX(SOUNDS.VICTORY, 0.6);
      }
    }
  }, [gameState.lastAction, gameState.turn, attackNames, playerForm.name]);

  const handleBuyHealth = () => {
    if (bits >= 50) { onSpendBits(50); buyHealth(); audioManager.playSFX(SOUNDS.BUY, 0.6); }
    else { audioManager.playSFX(SOUNDS.ERROR, 0.4); }
  };

  const handleBuyDamage = () => {
    if (bits >= 100) { onSpendBits(100); buyDamage(); audioManager.playSFX(SOUNDS.BUY, 0.6); }
    else { audioManager.playSFX(SOUNDS.ERROR, 0.4); }
  };

  const handleBuyBackground = () => {
    if (bits >= 150) {
      onSpendBits(150);
      const bg = playerForm.name === 'pikachu'
        ? 'https://media.giphy.com/media/G2qi0ogzHYMVDfQoVb/giphy.gif'
        : '/images/fondo1.webp';
      setCustomBg(bg);
      audioManager.playSFX(SOUNDS.BUY, 0.6);
    } else {
      audioManager.playSFX(SOUNDS.ERROR, 0.4);
    }
  };

  const handleTriggerSpecial = (level) => {
    const costs = { 1: 2, 2: 3, 3: 5 };
    if (gameState.energy < costs[level]) return;
    const type = playerPokemon.type || 'normal';
    audioManager.playSFX(TYPE_SOUNDS[type] || SOUNDS.HIT, 0.5);
    useSpecialAttack(level);
  };

  if (!enemyPokemon) {
    return (
      <div className="min-h-screen bg-sky-500 flex flex-col items-center justify-center text-white z-50 p-6">
        <div className="animate-bounce mb-8">
           <img src="https://img.pokemondb.net/sprites/items/poke-ball.png" className="w-16 h-16" alt="loading" />
        </div>
        <h2 className="text-3xl font-black uppercase tracking-widest text-center drop-shadow-lg">¡BUSCANDO RIVAL!</h2>
      </div>
    );
  }

  return (
    <div className={`h-screen bg-indigo-900 font-sans relative overflow-hidden flex flex-col select-none ${screenEffect === 'shake-red' ? 'animate-shake-red' : ''} ${screenEffect === 'epic-shake' ? 'animate-epic-shake' : ''}`}>
      
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-400 to-indigo-900 opacity-60 transition-all duration-1000"></div>
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ${customBg ? 'opacity-70' : 'opacity-30 mix-blend-overlay'}`} 
        style={{ backgroundImage: `url('${customBg || 'https://wallpapers.com/images/hd/pokemon-battle-background-7u32d84715767222.jpg'}')` }}
      ></div>
      <div className={`absolute inset-0 bg-white transition-opacity duration-300 pointer-events-none ${screenEffect === 'flash-white' ? 'opacity-60' : 'opacity-0'}`}></div>

      {/* Special Overlay GIF */}
      {overlayGif && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center bg-indigo-950/80 backdrop-blur-md animate-in fade-in duration-500">
           <img src={overlayGif} className="max-w-[85%] max-h-[75%] object-contain rounded-[3rem] border-4 border-white/40 shadow-[0_0_50px_rgba(255,255,255,0.3)]" alt="Special Move" />
        </div>
      )}

      {/* HEADER DIVERTIDO - Comprimido en móvil */}
      <div className="relative z-20 flex justify-between items-center p-2 md:p-5 bg-white/10 backdrop-blur-xl border-b-2 border-white/20 shrink-0">
        <button onClick={onBack} className="bg-rose-500 p-2 md:p-2.5 rounded-xl md:rounded-2xl hover:bg-rose-400 transition-all shadow-[0_3px_0_rgb(159,18,57)] md:shadow-[0_5px_0_rgb(159,18,57)] active:shadow-none active:translate-y-[3px]">
          <Home className="text-white" size={20} md:size={24} />
        </button>

        <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 md:gap-2 bg-yellow-400 px-3 md:px-5 py-1 md:py-1.5 rounded-xl md:rounded-2xl border-2 md:border-4 border-yellow-600 shadow-md">
                <Trophy size={16} md:size={20} className="text-yellow-800" fill="currentColor" />
                <span className="text-yellow-900 font-black text-xs md:text-2xl italic tracking-tighter uppercase whitespace-nowrap">NIVEL {gameState.battlesWon + 1}</span>
            </div>
            <div className="flex gap-2 md:gap-4 mt-1">
               <div className="flex items-center gap-0.5 md:gap-1 bg-sky-500/80 px-2 md:px-3 py-0.5 md:py-1 rounded-full border border-sky-300 shadow-sm">
                  <Coins size={10} md:size={14} className="text-yellow-300" />
                  <span className="text-white font-black text-[10px] md:text-sm tracking-widest">{bits}</span>
               </div>
               <div className="flex items-center gap-0.5 md:gap-1 bg-purple-500/80 px-2 md:px-3 py-0.5 md:py-1 rounded-full border border-purple-300 shadow-sm">
                  <Star size={10} md:size={14} className="text-yellow-200" fill="currentColor" />
                  <span className="text-white font-black text-[10px] md:text-sm tracking-widest">x{gameState.damageMultiplier.toFixed(1)}</span>
                {selectedCards.includes('gold-pika') && <Zap size={10} className="text-yellow-400 animate-pulse" fill="currentColor" />}
             </div>
          </div>
        </div>

        <button onClick={toggleMute} className="bg-slate-800 p-2 md:p-2.5 rounded-xl md:rounded-2xl hover:bg-slate-700 transition-all shadow-[0_3px_0_rgb(30,41,59)] md:shadow-[0_5px_0_rgb(30,41,59)] active:shadow-none active:translate-y-[3px]">
          {musicMuted ? <VolumeX className="text-rose-400" size={20} md:size={24} /> : <Volume2 className="text-white" size={20} md:size={24} />}
        </button>
      </div>

      {/* BATTLE STAGE - Flex-1 asegura que tome el espacio sobrante */}
      <div className="flex-1 min-h-0 relative flex flex-row justify-around items-center px-1 md:px-8 py-2 md:py-4 overflow-hidden">
        
        {/* Player Container */}
        <div className="relative flex flex-col items-center group z-10 transition-transform duration-500">
           {/* EQUIPPED CARDS VIEW (Horizontal above Player HP) */}
           {selectedCards.length > 0 && (
             <div className="flex gap-2 mb-2 z-30 items-center">
               {selectedCards.map(id => {
                 const card = POKEDEX_CARDS.find(c => c.id === id);
                 if (!card) return null;
                 return (
                   <div 
                     key={id} 
                     onClick={() => setZoomedCard(card)}
                     className="w-8 h-12 md:w-16 md:h-24 rounded-lg border-2 border-yellow-400 overflow-hidden shadow-lg hover:scale-110 hover:-translate-y-1 transition-all cursor-pointer group relative bg-slate-800"
                   >
                      <img src={card.image} className="w-full h-full object-contain" />
                      
                      {/* Tooltip Quick View */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-900/95 text-white text-[8px] md:text-[10px] p-2 rounded-lg border border-yellow-500 w-24 md:w-32 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-2xl backdrop-blur-sm z-[100]">
                         <div className="font-black text-yellow-400 mb-0.5 uppercase tracking-tighter text-[9px]">MEJORA ACTIVA</div>
                         <div className="font-medium leading-tight">{cardDescriptions[id]}</div>
                      </div>
                   </div>
                 );
               })}
             </div>
           )}

           {/* HP BAR PLAYER */}
            <div className="mb-2 md:mb-4 bg-white p-1.5 md:p-3 rounded-2xl md:rounded-3xl border-2 md:border-4 border-blue-600 w-28 md:w-64 shadow-xl relative overflow-hidden group">
              {typeBonus > 0 && (
                 <div className="absolute -right-1 top-4 md:top-6 bg-yellow-400 text-yellow-900 text-[6px] md:text-[10px] font-black px-2 py-0.5 rounded-l-full animate-bounce z-10 shadow-sm border-y border-l border-yellow-600">
                    ¡VENTAJA! +20
                 </div>
              )}
              <div className="flex justify-between items-center mb-0.5 md:mb-1.5">
                <div className="flex flex-col">
                   <span className="text-blue-600 font-black uppercase text-[8px] md:text-sm italic truncate w-12 md:w-auto tracking-tight">{playerForm.display}</span>
                   <span className={`text-[6px] md:text-[10px] text-white font-black uppercase px-1.5 rounded-md self-start ${getTypeColor(playerType)}`}>{playerType}</span>
                </div>
                <span className="text-blue-800 font-black text-[8px] md:text-sm">{Math.round(gameState.playerHp)}HP</span>
              </div>
              <div className="w-full bg-slate-200 h-2 md:h-6 rounded-full overflow-hidden border border-slate-300 shadow-inner">
                <div className={`h-full transition-all duration-700 rounded-full ${gameState.playerHp < 30 ? 'bg-rose-500 animate-pulse' : 'bg-blue-500'}`} style={{ width: `${gameState.playerHp}%` }}>
                   <div className="w-full h-1/2 bg-white/30 rounded-full"></div>
                </div>
              </div>
            </div>

           {/* Energy Orbs - Ajustados para no salirse en tablets */}
           <div className="absolute -left-4 md:-left-12 lg:-left-24 bottom-6 md:bottom-20 flex flex-col-reverse gap-1 md:gap-3">
             {[...Array(10)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-3 h-3 md:w-8 md:h-8 rounded-full border border-white/20 transition-all duration-300 transform ${i < gameState.energy ? `${getTypeColor(playerType)} shadow-[0_0_15px_rgba(255,255,255,0.4)] scale-110` : 'bg-white/10'}`}
                >
                  {i < gameState.energy && <Zap size={8} className="text-white m-auto md:mt-1.5" fill="currentColor" />}
                </div>
             ))}
           </div>

           <img 
             src={playerForm.image} 
             alt={playerForm.name}
             className={`
               w-24 h-24 md:w-80 md:h-80 object-contain drop-shadow-lg
               transition-all duration-300
               ${playerForm.shouldFlip ? '-scale-x-100' : ''}
               ${animating === 'player-attack-hit' ? 'translate-x-10 md:translate-x-40 scale-125' : ''}
               ${animating === 'player-sm-atk' ? 'translate-x-12 md:translate-x-40 scale-125' : ''}
               ${animating === 'player-md-atk' ? 'translate-x-16 md:translate-x-60 scale-150' : ''}
               ${animating === 'player-final-atk' ? 'translate-x-24 md:translate-x-96 scale-[2.2]' : ''}
               ${animating === 'enemy-attack-hit' || animating === 'boss-special-hit' ? 'opacity-50 blur-[1px] animate-shake translate-y-2' : ''}
             `}
           />
        </div>

        {/* FEEDBACK OVERLAY */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-40">
           {feedback && (
             <h2 className={`
                text-xl md:text-5xl font-black uppercase italic tracking-tighter text-center
                ${animating?.includes('final') ? 'text-white animate-final-text' : 'text-yellow-400 animate-bounce-in'}
                drop-shadow-[0_2px_0_#92400e] md:drop-shadow-[0_4px_0_#92400e] text-stroke-small md:text-stroke-large
             `}>
               {feedback}
             </h2>
           )}
        </div>

        {/* Enemy Container */}
        <div className="relative flex flex-col items-center z-10 transition-transform duration-500">
           {/* HP BAR ENEMY */}
            <div className="mb-2 md:mb-4 bg-white p-1.5 md:p-3 rounded-2xl md:rounded-3xl border-2 md:border-4 border-rose-600 w-28 md:w-64 shadow-xl relative overflow-hidden group">
              {enemyTypeBonus > 0 && (
                 <div className="absolute -left-1 top-4 md:top-6 bg-rose-500 text-white text-[6px] md:text-[10px] font-black px-2 py-0.5 rounded-r-full animate-bounce z-10 shadow-sm border-y border-r border-rose-700">
                    ¡PELIGRO! +{enemyTypeBonus}
                 </div>
              )}
              <div className="flex justify-between items-center mb-0.5 md:mb-1.5">
                <div className="flex flex-col">
                   <span className="text-rose-600 font-black uppercase text-[8px] md:text-sm italic truncate w-12 md:w-auto tracking-tight">{enemyPokemon.name}</span>
                   <span className={`text-[6px] md:text-[10px] text-white font-black uppercase px-1.5 rounded-md self-start ${getTypeColor(enemyType)}`}>{enemyType}</span>
                </div>
                <span className="text-rose-800 font-black text-[8px] md:text-sm">{Math.round(gameState.enemyHp)}HP</span>
              </div>
              <div className="w-full bg-slate-200 h-2 md:h-6 rounded-full overflow-hidden border border-slate-300 shadow-inner">
                <div 
                   className={`h-full transition-all duration-700 rounded-full ${enemyPokemon.isBoss ? 'bg-purple-600 shadow-[0_0_15px_purple]' : 'bg-rose-500'}`} 
                   style={{ width: `${(gameState.enemyHp / gameState.maxEnemyHp) * 100}%` }}
                >
                   <div className="w-full h-1/2 bg-white/30 rounded-full"></div>
                </div>
              </div>
           </div>

           <img 
             src={enemyPokemon.sprites?.other?.home?.front_default || enemyPokemon.sprites?.other?.['official-artwork']?.front_default || enemyPokemon.sprites?.front_default}
             alt={enemyPokemon.name}
             className={`
               w-24 h-24 md:w-80 md:h-80 object-contain drop-shadow-lg
               transition-all duration-300
               ${animating === 'enemy-attack-hit' ? '-translate-x-10 md:-translate-x-40 scale-125' : ''}
               ${animating === 'boss-special-hit' ? '-translate-x-16 md:-translate-x-60 scale-150 brightness-125' : ''}
               ${animating?.includes('player') ? 'opacity-50 blur-[1px] animate-shake translate-y-2' : ''}
               ${enemyPokemon.isBoss ? 'drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]' : ''}
             `}
           />
        </div>
      </div>

      {/* OPERACIONES Y ACCIONES - Altura reducida en PC/Tablet para evitar solapamiento */}
      <div className="relative z-30 bg-white border-t-2 md:border-t-4 border-indigo-200 p-2 md:p-3 lg:p-4 flex flex-col md:flex-row gap-2 md:gap-4 lg:gap-6 shrink-0 shadow-[0_-5px_20px_rgba(0,0,0,0.1)]">
        
        {/* Menu de Acciones - Muy comprimido en móvil */}
        <div className="w-full md:w-1/3 flex flex-row md:flex-col gap-2 overflow-x-auto no-scrollbar">
           
           {/* TIENDA RAPIDA */}
           <div className="shrink-0 md:w-full bg-sky-50 p-2 md:p-3 rounded-xl md:rounded-3xl border md:border-2 border-sky-100">
                <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                   <button onClick={handleBuyHealth} className="bg-emerald-400 hover:bg-emerald-300 text-white px-4 py-2.5 rounded-2xl border-b-4 border-emerald-600 flex flex-col items-center transition-all active:translate-y-1 active:border-b-0">
                      <Heart size={20} fill="currentColor" />
                      <span className="text-[10px] font-black mt-1 uppercase whitespace-nowrap">+60 HP (50)</span>
                   </button>
                   <button onClick={handleBuyDamage} className="bg-orange-400 hover:bg-orange-300 text-white px-4 py-2.5 rounded-2xl border-b-4 border-orange-600 flex flex-col items-center transition-all active:translate-y-1 active:border-b-0">
                      <Swords size={20} fill="currentColor" />
                      <span className="text-[10px] font-black mt-1 uppercase whitespace-nowrap">ATK+ (100)</span>
                   </button>
                   <button onClick={handleBuyBackground} className="bg-sky-400 hover:bg-sky-300 text-white px-4 py-2.5 rounded-2xl border-b-4 border-sky-600 flex flex-col items-center transition-all active:translate-y-1 active:border-b-0">
                      <Image size={20} fill="currentColor" />
                      <span className="text-[10px] font-black mt-1 uppercase whitespace-nowrap">FONDO (150)</span>
                   </button>
                </div>
           </div>

           {/* ESPECIALES RAPIDOS */}
           <div className="shrink-0 md:w-full bg-purple-50 p-2 md:p-3 rounded-xl md:rounded-3xl border md:border-2 border-purple-100 flex gap-2 md:flex-col">
              <button onClick={() => handleTriggerSpecial(1)} disabled={gameState.energy < 2} className={`shrink-0 md:w-full py-1.5 md:py-2 px-2 md:px-4 rounded-lg md:rounded-2xl flex items-center justify-center md:justify-between border-b-2 md:border-b-4 ${gameState.energy >= 2 ? 'bg-indigo-500 text-white border-indigo-700' : 'bg-slate-200 text-slate-400 border-slate-300 opacity-50'}`}>
                 <span className="text-[8px] md:text-xs font-black truncate hidden md:block">{attackNames[0]}</span>
                 <Zap size={14} fill="currentColor" className="md:hidden text-yellow-300" />
                 <span className="text-[8px] md:text-[10px] bg-black/20 px-1 md:px-2 rounded-full ml-1">2</span>
              </button>
              <button onClick={() => handleTriggerSpecial(2)} disabled={gameState.energy < 3} className={`shrink-0 md:w-full py-1.5 md:py-2 px-2 md:px-4 rounded-lg md:rounded-2xl flex items-center justify-center md:justify-between border-b-2 md:border-b-4 ${gameState.energy >= 3 ? 'bg-purple-500 text-white border-purple-700' : 'bg-slate-200 text-slate-400 border-slate-300 opacity-50'}`}>
                 <span className="text-[8px] md:text-xs font-black truncate hidden md:block">{attackNames[1]}</span>
                 <Zap size={14} fill="currentColor" className="md:hidden text-yellow-300" />
                 <span className="text-[8px] md:text-[10px] bg-black/20 px-1 md:px-2 rounded-full ml-1">3</span>
              </button>
              <button onClick={() => handleTriggerSpecial(3)} disabled={gameState.energy < 5} className={`shrink-0 md:w-full py-1.5 md:py-2.5 px-2 md:px-4 rounded-lg md:rounded-2xl flex items-center justify-center md:justify-between border-b-2 md:border-b-4 ${gameState.energy >= 5 ? 'bg-gradient-to-r from-orange-400 to-rose-400 text-white border-red-700' : 'bg-slate-200 text-slate-400 border-slate-300 opacity-50'}`}>
                 <span className="text-[9px] md:text-sm font-black italic truncate hidden md:block">{attackNames[2]}</span>
                 <Star size={14} fill="currentColor" className="md:hidden text-yellow-200" />
                 <span className="text-[8px] md:text-[10px] bg-black/40 px-1 md:px-2 rounded-full ml-1">5</span>
              </button>
           </div>
        </div>

        {/* MATH QUESTION - Optimizado para evitar robar espacio vertical */}
        <div className="flex-1 bg-sky-50 rounded-2xl md:rounded-3xl p-2 md:p-4 lg:p-4 border-2 md:border-4 border-sky-400 flex flex-col items-center justify-center shadow-inner">
            {!currentQuestion ? (
              <div className="text-sky-400 font-bold animate-pulse text-sm md:text-2xl uppercase italic">PREPARANDO...</div>
            ) : (
              <div className="w-full flex flex-col items-center">
                <div className="text-indigo-400 font-black text-[8px] md:text-xs uppercase tracking-widest mb-1 text-center">¡RESUELVE RÁPIDO!</div>
                <h3 className={`text-xl md:text-3xl lg:text-4xl text-indigo-900 font-black mb-2 md:mb-4 lg:mb-4 drop-shadow-sm leading-tight text-center whitespace-pre-line ${currentQuestion.question.includes('{') || currentQuestion.question.includes('=>') ? 'font-mono bg-indigo-950/5 p-4 rounded-xl border border-indigo-200/50' : ''}`}>
                  {currentQuestion.question}
                </h3>
                
                <div className="grid grid-cols-2 gap-2 md:gap-4 lg:gap-4 w-full max-w-2xl lg:max-w-4xl">
                   {currentQuestion.options.map((opt, i) => (
                      <button 
                         key={i} 
                         onClick={() => submitAnswer(opt)}
                         className={`
                            py-3 md:py-4 lg:py-4 px-2 rounded-xl md:rounded-2xl lg:rounded-[1.5rem] font-black text-xl md:text-3xl lg:text-4xl
                            transition-all border-b-4 lg:border-b-[6px] text-white active:translate-y-1 active:border-b-0
                            ${i === 0 ? 'bg-rose-400 border-rose-600' : ''}
                            ${i === 1 ? 'bg-sky-400 border-sky-600' : ''}
                            ${i === 2 ? 'bg-yellow-400 border-yellow-600' : ''}
                            ${i === 3 ? 'bg-purple-400 border-purple-600' : ''}
                         `}
                      >
                         {opt}
                      </button>
                   ))}
                </div>
              </div>
            )}
        </div>
      </div>

      {/* Card Zoom Modal */}
      {zoomedCard && (
         <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 backdrop-blur-xl bg-black/80 animate-in fade-in duration-300">
            <button 
              onClick={() => setZoomedCard(null)}
              className="absolute top-6 right-6 text-white hover:text-rose-400 transition-colors p-2 bg-white/10 rounded-full z-[120]"
            >
              <X size={32} />
            </button>

            <div className="relative group max-w-sm w-full animate-in zoom-in-95 duration-500">
               <div className="absolute -inset-10 z-0 pointer-events-none">
                  {[...Array(12)].map((_, i) => (
                    <Sparkles 
                      key={i}
                      className="absolute text-yellow-400 animate-pulse"
                      size={24 + Math.random() * 24}
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`,
                        opacity: 0.6
                      }}
                    />
                  ))}
               </div>

               <div className="relative z-10 bg-slate-800 rounded-[3rem] p-6 border-8 border-yellow-400 shadow-[0_0_100px_rgba(234,179,8,0.4)] overflow-hidden">
                  <div className="aspect-[3/4] rounded-[2rem] overflow-hidden bg-slate-900 border-4 border-yellow-500/30">
                     <img src={zoomedCard.image} alt={zoomedCard.name} className="w-full h-full object-contain shadow-2xl" />
                  </div>
                  <div className="mt-6 text-center">
                      <h2 className="text-2xl md:text-3xl font-black text-yellow-400 uppercase tracking-tighter mb-2 italic drop-shadow-md">{zoomedCard.name}</h2>
                      <div className="bg-yellow-400/10 p-4 rounded-2xl border border-yellow-500/30 backdrop-blur-sm">
                        <div className="text-yellow-400 font-black text-[10px] uppercase tracking-widest mb-1.5 flex items-center justify-center gap-2">
                          <Sparkles size={12} /> MEJORA ACTIVA <Sparkles size={12} />
                        </div>
                        <p className="text-white font-medium text-xs md:text-sm leading-snug">
                          {cardDescriptions[zoomedCard.id]}
                        </p>
                      </div>
                      <button 
                        onClick={() => setZoomedCard(null)}
                        className="mt-4 w-full py-3 bg-yellow-500 text-slate-900 font-black rounded-xl border-b-4 border-yellow-700 transition-all active:border-b-0 active:translate-y-1"
                      >
                        ¡ENTENDIDO!
                      </button>
                  </div>
               </div>
            </div>
         </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap');
        
        .font-sans { font-family: 'Fredoka One', cursive, sans-serif; }

        .animate-shake { animation: shake 0.2s ease-in-out infinite; }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }

        @keyframes bounce-in {
          0% { transform: scale(0); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        .animate-bounce-in { animation: bounce-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.2); }

        .text-stroke-small { -webkit-text-stroke: 1.5px #4338ca; }
        .text-stroke-large { -webkit-text-stroke: 4px #4338ca; }
        
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

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

export default PokemonBattleArena;
