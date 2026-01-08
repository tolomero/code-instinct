import React from 'react';

const SolutionOverlay = ({ solution, onContinue }) => {
  return (
    <div className="absolute inset-0 z-50 bg-red-900/20 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-black border-4 border-red-600 p-8 max-w-lg text-center rounded-2xl animate-in zoom-in-95 duration-200">
        <h3 className="text-3xl font-black text-white mb-4 italic uppercase">COMBO FALLIDO</h3>
        <p className="text-gray-400 mb-6 font-black text-sm uppercase">La respuesta correcta era:</p>
        <div className="bg-slate-900 p-4 mb-8 border border-white/10 text-green-400 font-mono text-xl">{solution}</div>
        <button 
          onClick={onContinue} 
          className="w-full py-4 bg-white text-black font-black uppercase text-xl hover:bg-red-600 hover:text-white transition-all italic"
        >
          CONTINUAR COMBATE
        </button>
      </div>
    </div>
  );
};

export default SolutionOverlay;
