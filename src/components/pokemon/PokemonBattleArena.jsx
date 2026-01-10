import React, { useState, useEffect, useRef } from 'react';
import { Heart, Shield, Swords, Zap, Home, Trophy, Star, Sparkles } from 'lucide-react';
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
  onEarnBits
}) => {
  const {
    gameState,
    currentQuestion,
    enemyPokemon,
    submitAnswer,
    useSpecialAttack,
    buyHealth,
    buyDamage,
    evolutionStage,
    playerForm
  } = usePokemonGame(playerPokemon, mathMode, onGameOver, onGameWin, onEarnBits);

  const [animating, setAnimating] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [screenEffect, setScreenEffect] = useState(null);
  const [overlayGif, setOverlayGif] = useState(null);
  const prevStageRef = useRef(evolutionStage);

  // Attack Names per Stage
  const GET_ATTACK_NAMES = (stage, type = 'normal') => {
     const t = type.toUpperCase();
     if (stage === 0) return ["ATAQUE NORMAL", "ATAQUE MEDIO", "FINAL TOTAL"];
     if (stage === 1) return ["GOLPE CERTERO", "IMPACTO FUERTE", `MEGA ${t} BLAST`];
     return ["FURIA ELEMENTAL", "VÓRTICE FINAL", `APOCALIPSIS ${t}`];
  };

  const attackNames = GET_ATTACK_NAMES(evolutionStage, playerPokemon.type);

  // Watch for Evolution to play cry and GIF
  useEffect(() => {
    if (evolutionStage > prevStageRef.current) {
       const cry = GET_CRY(playerForm.name);
       if (cry) audioManager.playSFX(cry, 0.7);

       // Special Evolution GIF for Charizard
       if (playerForm.name === 'charizard' || playerForm.name === 'charizard-mega-x') {
         setOverlayGif('https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3cHhwcGM0bmc2c3Y3dm1rNmI0Mnd6dGFscDRjOHFkbzBnNTBscnRveSZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/cNlhpWYx5PGsOGXAil/giphy.gif');
         setTimeout(() => setOverlayGif(null), 3000);
       }
    }
    prevStageRef.current = evolutionStage;
  }, [evolutionStage, playerForm.name]);

  function GET_CRY(name) {
    if (name === 'charmander') return SOUNDS.CRY_CHARMANDER;
    if (name === 'charmeleon') return SOUNDS.CRY_CHARMELEON;
    if (name === 'charizard' || name === 'charizard-mega-x') return SOUNDS.CRY_CHARIZARD;
    if (name === 'pikachu') return SOUNDS.CRY_PIKACHU;
    return null;
  }

  // Visual effects on attack
  useEffect(() => {
    if (gameState.lastAction === 'correct') {
      setAnimating('player-attack-hit');
      setFeedback('¡ATAQUE!');
      
      const cry = GET_CRY(playerForm.name);
      if (cry) audioManager.playSFX(cry, 0.6);
      else audioManager.playSFX(SOUNDS.HIT, 0.4); 

      setTimeout(() => { setAnimating(null); setFeedback(null); }, 600);
    } else if (gameState.lastAction === 'wrong') {
      setAnimating('enemy-attack-hit');
      setFeedback('¡FALLASTE!');
      const type = enemyPokemon.types?.[0]?.type?.name || 'normal';
      audioManager.playSFX(TYPE_SOUNDS[type] || SOUNDS.DAMAGE, 0.6);
      setTimeout(() => { setAnimating(null); setFeedback(null); }, 1000);
    } else if (gameState.lastAction === 'boss-special') {
      setAnimating('boss-special-hit');
      setFeedback('¡ATAQUE JEFE!');
      setScreenEffect('shake-red');
      audioManager.playSFX(SOUNDS.FATALITY, 0.6);
      setTimeout(() => { setAnimating(null); setFeedback(null); setScreenEffect(null); }, 1500);
    } else if (gameState.lastAction === 'small-attack' || gameState.lastAction === 'medium-attack') {
      const isMedium = gameState.lastAction === 'medium-attack';
      setAnimating(isMedium ? 'player-md-atk' : 'player-sm-atk');
      setFeedback(attackNames[isMedium ? 1 : 0]);
      if (isMedium) setScreenEffect('flash-white');
      
      const cry = GET_CRY(playerForm.name);
      if (cry) audioManager.playSFX(cry, isMedium ? 0.8 : 0.7);
      else audioManager.playSFX(isMedium ? SOUNDS.ULTRA_COMBO : SOUNDS.HIT, 0.6);

      // Special GIFs for Charmander/Charmeleon/Charizard only on energy attacks
      if (playerForm.name === 'charizard' || playerForm.name === 'charizard-mega-x') {
        setOverlayGif('https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3dXQzOXhiaXd5bnliNmt5ZG96cmEwZXVvbmk2MWh5YW9iNnltYzI2aSZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/48cVVAf9vam9W/giphy.gif');
      } else if (playerForm.name === 'charmander' || playerForm.name === 'charmeleon') {
        setOverlayGif('https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExcmlpMXp6dTJhOG5iZjZ1NjEzOXkyaGI3M2ppNmVqNWIyZWVhZDM0eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/WJ7Tr9wi8xVe0/giphy.gif');
      }
      setTimeout(() => setOverlayGif(null), isMedium ? 2000 : 1500);

      setTimeout(() => { setAnimating(null); setFeedback(null); setScreenEffect(null); }, isMedium ? 1200 : 1000);
    } else if (gameState.lastAction === 'final-attack') {
      setAnimating('player-final-atk');
      setFeedback(attackNames[2]);
      setScreenEffect('epic-shake');

      const cry = GET_CRY(playerForm.name);
      if (cry) audioManager.playSFX(cry, 1.0);
      else audioManager.playSFX(SOUNDS.FATALITY, 0.8);

      // Final Attack GIF for the line
      if (['charmander', 'charmeleon', 'charizard', 'charizard-mega-x'].includes(playerForm.name)) {
        setOverlayGif('https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3cHhwcGM0bmc2c3Y3dm1rNmI0Mnd6dGFscDRjOHFkbzBnNTBscnRveSZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/kRgzY3qVnkEa2lIAxf/giphy.gif');
        setTimeout(() => setOverlayGif(null), 3000);
      }

      setTimeout(() => { setAnimating(null); setFeedback(null); setScreenEffect(null); }, 2000);
    } else if (gameState.lastAction === 'victory') {
      setFeedback('¡VICTORIA!');
      audioManager.playSFX(SOUNDS.VICTORY, 0.6);
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

  const handleTriggerSpecial = (level) => {
    const costs = { 1: 2, 2: 3, 3: 5 };
    if (gameState.energy < costs[level]) return;
    
    const type = playerPokemon.type || 'normal';
    audioManager.playSFX(TYPE_SOUNDS[type] || SOUNDS.HIT, 0.5);

    useSpecialAttack(level);
  };

  if (!enemyPokemon) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white z-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
        <h2 className="text-2xl font-bold animate-pulse uppercase tracking-widest">Buscando Rival...</h2>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-slate-950 font-mono relative overflow-hidden flex flex-col select-none ${screenEffect === 'shake-red' ? 'animate-shake-red' : ''} ${screenEffect === 'epic-shake' ? 'animate-epic-shake' : ''}`}>
      
      {/* Dynamic Background */}
      <div className={`absolute inset-0 bg-cover bg-center opacity-40 transition-all duration-1000 ${enemyPokemon.isBoss ? 'hue-rotate-180 brightness-50' : ''}`} style={{ backgroundImage: "url('https://wallpapers.com/images/hd/pokemon-battle-background-7u32d84715767222.jpg')" }}></div>
      <div className={`absolute inset-0 bg-white transition-opacity duration-300 pointer-events-none ${screenEffect === 'flash-white' ? 'opacity-50' : 'opacity-0'}`}></div>

      {/* Special Overlay GIF */}
      {overlayGif && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-500">
           <img src={overlayGif} className="max-w-[90%] max-h-[80%] object-contain rounded-3xl border-4 border-white/20 shadow-2xl shadow-blue-500/20" alt="Special Move" />
        </div>
      )}

      {/* Header */}
      <div className="relative z-20 flex justify-between items-start p-4 md:p-6">
        <button onClick={onBack} className="bg-slate-800/80 p-3 rounded-full hover:bg-red-600 transition-all border border-slate-600 shadow-lg group">
          <Home className="text-white group-hover:scale-110" size={24} />
        </button>

        <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-3 bg-slate-900/90 px-6 py-2 rounded-full border-2 border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.3)]">
                <Trophy size={24} className="text-yellow-400" />
                <span className="text-yellow-400 font-black text-2xl tracking-tighter">BATTLE {gameState.battlesWon + 1}/10</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="bg-slate-900/90 px-4 py-1 rounded-full border border-blue-400">
                <span className="text-blue-400 font-bold text-sm">BITS: {bits}</span>
              </div>
              <div className="bg-slate-900/90 px-4 py-1 rounded-full border border-purple-400">
                <span className="text-purple-400 font-bold text-sm">PWR: x{gameState.damageMultiplier.toFixed(1)}</span>
              </div>
            </div>
        </div>

        <div className="w-24"></div>
      </div>

      <div className="flex-1 relative flex items-end justify-around pb-24 px-4 z-10">
        <div className="relative flex flex-col items-center group">
           <div className="mb-4 bg-slate-900/95 p-3 rounded-xl border-2 border-blue-500/50 w-44 shadow-2xl transform -skew-x-12 animate-float">
              <div className="flex justify-between items-center mb-1 skew-x-12">
                <span className="text-blue-300 font-black uppercase text-[10px] italic">{playerForm.display}</span>
                <span className="text-white font-bold text-[10px]">{gameState.playerHp}/100</span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden border border-slate-700 skew-x-12">
                <div className={`h-full transition-all duration-700 ${gameState.playerHp < 30 ? 'bg-red-500 animate-pulse' : 'bg-blue-500'}`} style={{ width: `${gameState.playerHp}%` }}></div>
              </div>
           </div>

           <div className="absolute -left-20 bottom-20 flex flex-col-reverse gap-2">
             {[...Array(10)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-7 h-7 rounded-full border-2 border-black transition-all duration-300 ${i < gameState.energy ? 'bg-blue-400 shadow-[0_0_15px_#60a5fa] scale-110 z-10' : 'bg-slate-900/50 scale-90'}`}
                >
                  {i < gameState.energy && <Zap size={14} className="text-white m-1" fill="currentColor" />}
                </div>
             ))}
           </div>

           <img 
             src={playerForm.image} 
             alt={playerForm.name}
             className={`
               w-48 h-48 md:w-72 md:h-72 object-contain transition-all duration-300
               ${playerForm.shouldFlip ? '-scale-x-100' : ''}
               ${animating === 'player-attack-hit' ? 'translate-x-32 scale-110 -rotate-12' : ''}
               ${animating === 'player-sm-atk' ? 'translate-x-40 scale-125 brightness-125' : ''}
               ${animating === 'player-md-atk' ? 'translate-x-60 scale-150 brightness-150 rotate-12' : ''}
               ${animating === 'player-final-atk' ? 'translate-x-96 scale-[2.5] brightness-[2] drop-shadow-[0_0_60px_white]' : ''}
               ${animating === 'enemy-attack-hit' || animating === 'boss-special-hit' ? 'opacity-50 grayscale animate-shake' : ''}
             `}
           />
        </div>

        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-40">
           {feedback && (
             <h2 className={`
                text-6xl md:text-9xl font-black uppercase italic tracking-tighter text-center
                ${animating?.includes('final') ? 'text-white animate-final-text' : 'text-yellow-400 animate-bounce-in'}
                drop-shadow-[0_10px_0_#000]
             `}>
               {feedback}
             </h2>
           )}
        </div>

        <div className="relative flex flex-col items-center">
           <div className="mb-4 bg-slate-900/95 p-3 rounded-xl border-2 border-red-500/50 w-56 shadow-2xl transform skew-x-12 animate-float">
              <div className="flex justify-between items-center mb-1 -skew-x-12">
                <span className="text-red-400 font-black uppercase text-[11px] italic truncate w-32">{enemyPokemon.name}</span>
                <span className="text-white font-bold text-[10px]">{gameState.enemyHp}/{gameState.maxEnemyHp}</span>
              </div>
              <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden border border-slate-700 -skew-x-12">
                <div 
                   className={`h-full transition-all duration-700 ${enemyPokemon.isBoss ? 'bg-purple-600 shadow-[0_0_10px_purple]' : 'bg-red-500 shadow-[0_0_10px_red]'}`} 
                   style={{ width: `${(gameState.enemyHp / gameState.maxEnemyHp) * 100}%` }}
                ></div>
              </div>
           </div>

           <img 
             src={enemyPokemon.sprites?.front_default || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${enemyPokemon.id}.png`}
             alt={enemyPokemon.name}
             className={`
               w-56 h-56 md:w-96 md:h-96 object-contain transition-all duration-300
               ${animating === 'enemy-attack-hit' ? '-translate-x-40 scale-110 rotate-12' : ''}
               ${animating === 'boss-special-hit' ? '-translate-x-60 scale-150 brightness-150 -rotate-12' : ''}
               ${animating?.includes('player') ? 'opacity-50 grayscale animate-shake' : ''}
               ${enemyPokemon.isBoss ? 'drop-shadow-[0_0_40px_rgba(168,85,247,0.7)]' : 'drop-shadow-[0_0_20px_black]'}
             `}
           />
           {enemyPokemon.isBoss && (
             <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-gradient-to-r from-red-600 to-purple-600 px-4 py-1 rounded shadow-lg animate-pulse">
                <Star size={16} fill="white" className="text-white" />
                <span className="text-white font-black text-xs italic tracking-widest uppercase">BOSS LEGENDARY</span>
                <Star size={16} fill="white" className="text-white" />
             </div>
           )}
        </div>
      </div>

      <div className="relative z-30 bg-black/95 border-t-4 border-slate-800 p-4 md:p-8 flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3 flex flex-col gap-4 bg-slate-900/50 p-4 rounded-2xl border border-slate-700/50">
           <div className="flex flex-col gap-2">
             <h4 className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-1 flex items-center gap-2"><Sparkles size={12}/> Tienda de Combate</h4>
             <div className="grid grid-cols-2 gap-2">
                <button onClick={handleBuyHealth} className="bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white p-3 rounded-xl border border-emerald-600/50 flex flex-col items-center gap-1 transition-all group active:scale-90">
                   <Heart size={20} className="group-hover:animate-bounce" />
                   <span className="text-[10px] font-black italic">+60 HP (50b)</span>
                </button>
                <button onClick={handleBuyDamage} className="bg-orange-600/20 hover:bg-orange-600 text-orange-400 hover:text-white p-3 rounded-xl border border-orange-600/50 flex flex-col items-center gap-1 transition-all group active:scale-90">
                   <Swords size={20} className="group-hover:scale-110" />
                   <span className="text-[10px] font-black italic">PWR x1.3 (100b)</span>
                </button>
             </div>
           </div>

           <div className="flex flex-col gap-2">
             <h4 className="text-blue-500 font-bold text-xs uppercase tracking-widest mb-1 flex items-center gap-2"><Zap size={12}/> Ataques Especiales</h4>
             <div className="flex flex-col gap-2">
                <button 
                  onClick={() => handleTriggerSpecial(1)} 
                  disabled={gameState.energy < 2}
                  className={`px-4 py-3 rounded-xl font-black italic text-sm flex justify-between items-center transition-all ${gameState.energy >= 2 ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20 cursor-pointer hover:bg-blue-500 active:scale-95' : 'bg-slate-800 text-slate-600 grayscale opacity-50'}`}
                >
                  <span className="truncate">{attackNames[0]}</span>
                  <div className="flex items-center gap-1 bg-black/30 px-2 py-0.5 rounded-full ml-2 shrink-0">
                     <Zap size={12} fill="currentColor" /> <span className="text-xs">2</span>
                  </div>
                </button>
                <button 
                  onClick={() => handleTriggerSpecial(2)} 
                  disabled={gameState.energy < 3}
                  className={`px-4 py-3 rounded-xl font-black italic text-sm flex justify-between items-center transition-all ${gameState.energy >= 3 ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg cursor-pointer hover:brightness-110 active:scale-95' : 'bg-slate-800 text-slate-600 grayscale opacity-50'}`}
                >
                   <span className="truncate">{attackNames[1]}</span>
                   <div className="flex items-center gap-1 bg-black/30 px-2 py-0.5 rounded-full ml-2 shrink-0">
                     <Zap size={12} fill="currentColor" /> <span className="text-xs">3</span>
                  </div>
                </button>
                <button 
                  onClick={() => handleTriggerSpecial(3)} 
                  disabled={gameState.energy < 5}
                  className={`px-4 py-4 rounded-xl font-black italic text-md flex justify-between items-center transition-all group ${gameState.energy >= 5 ? 'bg-gradient-to-r from-yellow-500 via-red-500 to-purple-600 text-white shadow-[0_0_20px_rgba(239,68,68,0.3)] animate-pulse cursor-pointer' : 'bg-slate-800 text-slate-600 grayscale opacity-50'}`}
                >
                   <span className="group-hover:tracking-widest transition-all truncate">{attackNames[2]}</span>
                   <div className="flex items-center gap-1 bg-black/40 px-3 py-1 rounded-full border border-white/20 ml-2 shrink-0">
                     <Zap size={14} fill="currentColor" className="text-yellow-400" /> <span className="text-sm">5</span>
                  </div>
                </button>
             </div>
           </div>
        </div>

        <div className="flex-1 bg-slate-900/40 rounded-2xl p-6 border border-slate-700/50 flex flex-col items-center justify-center">
           {!currentQuestion ? (
              <div className="text-slate-700 font-bold animate-pulse text-2xl uppercase italic">Calculando Ataque...</div>
           ) : (
              <>
                 <div className="text-blue-400 font-black text-sm uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                    <span className="w-12 h-[1px] bg-blue-500/30"></span>
                    Misión Matemática
                    <span className="w-12 h-[1px] bg-blue-500/30"></span>
                 </div>
                 <h3 className="text-5xl md:text-7xl text-white font-black tracking-tight mb-8 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                   {currentQuestion.question}
                 </h3>
                 <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
                   {currentQuestion.options.map((opt, i) => (
                      <button 
                         key={i} 
                         onClick={() => submitAnswer(opt)}
                         className="bg-slate-800 border-2 border-slate-700 hover:bg-white hover:text-black hover:border-white text-white p-5 rounded-2xl font-black text-2xl md:text-3xl transition-all active:scale-95 shadow-xl"
                      >
                         {opt}
                      </button>
                   ))}
                 </div>
              </>
           )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float {
          0%, 100% { transform: translateY(0) skewX(-12deg); }
          50% { transform: translateY(-5px) skewX(-12deg); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-shake { animation: shake 0.2s ease-in-out infinite; }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        @keyframes shake-red {
          0%, 100% { transform: translate(0, 0); }
          10%, 30%, 50%, 70%, 90% { transform: translate(-10px, -10px); background-color: rgba(239, 68, 68, 0.1); }
          20%, 40%, 60%, 80% { transform: translate(10px, 10px); }
        }
        .animate-shake-red { animation: shake-red 0.5s ease-in-out 3; }
        @keyframes epic-shake {
          0% { transform: scale(1) translate(0,0); }
          10% { transform: scale(1.1) translate(-20px, 10px); }
          20% { transform: scale(1.2) translate(20px, -10px); background: white; }
          30% { transform: scale(1.1) translate(-20px, -10px); }
          100% { transform: scale(1) translate(0,0); }
        }
        .animate-epic-shake { animation: epic-shake 1.5s cubic-bezier(.36,.07,.19,.97) both; }
        @keyframes final-text {
          0% { transform: scale(0); opacity: 0; filter: blur(20px); }
          50% { transform: scale(1.5); opacity: 1; filter: blur(0); text-shadow: 0 0 50px white; }
          100% { transform: scale(1.2); }
        }
        .animate-final-text { animation: final-text 0.5s forwards; }
        .stroke-text { -webkit-text-stroke: 4px black; }
      `}} />
    </div>
  );
};

export default PokemonBattleArena;
