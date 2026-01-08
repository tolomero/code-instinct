import React from 'react';

const CombatArena = ({ animating, opponent, feedback }) => {
  const [imageError, setImageError] = React.useState(false);

  return (
    <div className="flex-1 min-h-[150px] md:min-h-0 flex items-center justify-around relative bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] overflow-hidden">
      <div className={`transition-all duration-300 relative ${animating === 'player-attack' ? 'translate-x-20 md:translate-x-60 scale-125 z-10' : animating === 'shield-hit' ? 'scale-110 brightness-200' : ''}`}>
         <img 
           src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGNmMDg2dzhtcWptaWp1eXY5MmtyeXNqM3E3YzN5amI1b3phb2cxZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/SUEXjIV3brSQrMInVX/giphy.gif" 
           alt="Developer" 
           className="w-32 h-32 md:w-64 md:h-64 object-contain -scale-x-100"
         />
         {animating === 'shield-hit' && <div className="absolute inset-0 bg-blue-500/50 rounded-full animate-ping border-2 md:border-4 border-white"></div>}
      </div>
      {feedback && <div className="absolute top-1/4 bg-yellow-400 text-black px-4 md:px-12 py-2 md:py-4 text-xl md:text-4xl font-black italic animate-bounce z-40 border-2 md:border-4 border-black skew-x-[-15deg]">{feedback}</div>}
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
