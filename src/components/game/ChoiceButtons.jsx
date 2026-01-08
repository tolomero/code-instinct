import React from 'react';

const ChoiceButtons = ({ options, onSelect, disabled, showSolution }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4 h-full">
       {options.map((opt, i) => (
         <button 
           key={i} 
           onClick={() => onSelect(i)} 
           disabled={disabled || showSolution} 
           className="bg-slate-900 border-2 border-red-600 p-3 md:p-4 text-sm md:text-xl font-black text-left hover:bg-white hover:text-black transition-all flex items-center gap-3 md:gap-4 group overflow-hidden"
         >
            <span className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded font-mono bg-red-600 text-white group-hover:bg-black text-xs md:text-base uppercase">{i+1}</span>
            <span className="uppercase italic truncate text-xs md:text-base">{opt}</span>
         </button>
       ))}
    </div>
  );
};

export default ChoiceButtons;
