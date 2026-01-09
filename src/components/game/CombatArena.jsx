import React from 'react';

const CombatArena = ({ animating, opponent, player, feedback, showVictoryGif }) => {
  const [imageError, setImageError] = React.useState(false);

  // Determinar fondo
  let bgStyle = "bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] bg-slate-900";
  if (player?.specialBg) {
    bgStyle = `bg-center bg-no-repeat bg-cover`;
  } else if (animating === 'player-attack' && player?.id === 'pikachu') {
    bgStyle = "bg-black";
  }

  return (
    <div 
      className={`flex-1 min-h-[150px] md:min-h-0 flex items-center justify-around relative overflow-hidden group transition-colors duration-500 ${bgStyle}`}
      style={player?.specialBg ? { backgroundImage: `url(${player.specialBg})` } : {}}
    >
      {/* BACKGROUND GIF - ONLY FOR PIKACHU ATTACK */}
      {animating === 'player-attack' && player?.id === 'pikachu' && (
        <div className="absolute inset-0 z-0 opacity-60 animate-in fade-in zoom-in duration-300">
          <img 
            src="https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3NzYzYmlqdGs5ZzBmZnl6cHFtNmplMzZpMWxidTVqNmlma3hoYnY2cSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/7ISIRaCMrgFfa/giphy.gif" 
            alt="Arena BG" 
            className="w-full h-full object-contain bg-black"
          />
        </div>
      )}

      {/* VICTORY GIF OVERLAY */}
      {showVictoryGif && (
        <div className="absolute inset-0 z-50 bg-black/80 flex items-center justify-center animate-in fade-in zoom-in duration-500">
          <img 
            src="https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3OWJqaWNjMHlmNDhpdm4zb2M0d2k0bjY1aWNlamZ3ZTJla3RqbXZvZyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/35m9tkrxqgccE/giphy.gif" 
            alt="Victory" 
            className="w-full h-full object-contain"
          />
          <div className="absolute bottom-10 left-0 right-0 text-center">
            <h2 className="text-white text-4xl md:text-6xl font-black italic tracking-tighter drop-shadow-lg scale-110 animate-pulse">¡BOSS DEFEATED!</h2>
          </div>
        </div>
      )}

      <div className={`transition-all duration-[400ms] relative z-20 ${animating === 'player-attack' ? 'translate-x-12 md:translate-x-32 scale-110 md:scale-150' : animating === 'shield-hit' ? 'scale-110 brightness-200' : ''}`}>
         {player?.image ? (
            <img 
              src={animating === 'player-attack' ? (player.attackImage || player.image) : player.image} 
              alt={player.name} 
              className={`w-32 h-32 md:w-80 md:h-80 object-contain transition-transform duration-300 ${
                animating === 'player-attack' 
                  ? (player.attackFlip ? '-scale-x-100' : '') 
                  : (player.idleFlip ? '-scale-x-100' : '')
              }`}
            />
          ) : (
            <div className="text-5xl sm:text-7xl md:text-9xl">🧑‍💻</div>
          )}
          {animating === 'shield-hit' && <div className="absolute inset-0 bg-blue-500/50 rounded-full animate-ping border-2 md:border-4 border-white"></div>}
      </div>
      {feedback && (
        <div className="absolute top-8 md:top-1/4 z-40 animate-bounce">
          {feedback === 'FATALITY_IMAGE' ? (
            <img 
              src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbjNteTA2M3ZibXVmNndvOGczNng4a3d2NXJvY3oxanRwczRoMG9rYyZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/l6hdckv6ylksVXzl31/giphy.gif" 
              alt="Fatality" 
              className="w-48 md:w-96 drop-shadow-[0_0_20px_rgba(255,0,0,0.8)]"
            />
          ) : (
            <div className="bg-yellow-400 text-black px-4 md:px-12 py-1.5 md:py-4 text-sm md:text-4xl font-black italic border md:border-4 border-black skew-x-[-15deg] shadow-lg uppercase">
              {feedback}
            </div>
          )}
        </div>
      )}
      <div className={`transition-all duration-300 relative flex items-center justify-center ${animating === 'enemy-attack' ? '-translate-x-20 md:-translate-x-60 scale-125 z-10' : ''}`}>
         {opponent?.combatImage && !imageError ? (
           <img 
             src={opponent.combatImage} 
             alt={opponent.name} 
             referrerPolicy="no-referrer"
             className="w-32 h-32 md:w-64 md:h-64 object-contain -scale-x-100" 
             onError={() => setImageError(true)}
           />
         ) : (
           <div className="text-5xl sm:text-7xl md:text-9xl">{opponent?.avatar || "❓"}</div>
         )}
      </div>
    </div>
  );
};

export default CombatArena;
