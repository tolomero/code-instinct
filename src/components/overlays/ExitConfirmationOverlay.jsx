import React from 'react';
import { AlertCircle, X } from 'lucide-react';

const ExitConfirmationOverlay = ({ onBackToBosses, onBackToStart, onClose }) => {
  return (
    <div className="absolute inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-6">
      <div className="max-w-md w-full border-4 border-red-600 bg-slate-900 p-8 rounded-3xl text-center shadow-[0_0_50px_rgba(220,38,38,0.3)] relative animate-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
        >
          <X size={24}/>
        </button>
        
        <AlertCircle className="mx-auto text-red-600 mb-4 animate-pulse" size={64} />
        <h2 className="text-3xl font-black text-white mb-2 italic uppercase">¿ABANDONAR COMBATE?</h2>
        <p className="text-gray-400 mb-8 font-bold text-sm uppercase">El progreso actual de esta ronda se perderá.</p>
        
        <div className="flex flex-col gap-4">
          <button 
            onClick={onBackToBosses} 
            className="w-full py-4 bg-slate-800 hover:bg-red-600 text-white font-black text-xl rounded-xl transition-all uppercase italic border-2 border-red-600/20 hover:border-white"
          >
            Volver a Selección de Jefes
          </button>
          <button 
            onClick={onBackToStart} 
            className="w-full py-4 bg-red-600 hover:bg-white hover:text-red-600 text-white font-black text-xl rounded-xl transition-all uppercase italic border-2 border-transparent hover:border-red-600"
          >
            Ir al Menú de Inicio
          </button>
          <button 
            onClick={onClose} 
            className="mt-2 py-2 text-xs font-black text-gray-500 hover:text-white uppercase transition-colors tracking-widest"
          >
            Cancelar y seguir peleando
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExitConfirmationOverlay;
