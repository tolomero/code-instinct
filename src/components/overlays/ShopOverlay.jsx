import React from 'react';
import { ShoppingCart, Heart, ShieldAlert } from 'lucide-react';

const ShopOverlay = ({ bits, playerHp, hasShield, onBuyRepair, onBuyShield, onBuyHint, hintBought, currentHint, onClose, canProceed }) => {
  const [copied, setCopied] = React.useState(false);

  const copyHint = () => {
    navigator.clipboard.writeText(currentHint);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/95 flex items-center justify-center p-6">
      <div className="max-w-xl w-full border-4 border-yellow-500 bg-slate-900 p-8 rounded-2xl text-center shadow-[0_0_60px_rgba(234,179,8,0.4)] max-h-[90vh] overflow-y-auto">
        <h2 className="text-4xl font-black text-yellow-500 mb-2 italic uppercase flex items-center justify-center gap-3"><ShoppingCart /> Ultratech Shop</h2>
        <p className="text-green-400 font-black mb-8 text-2xl tracking-widest uppercase">BITS: {bits}</p>
        
        <div className="grid grid-cols-1 gap-4 mb-8">
          <button 
            onClick={onBuyRepair} 
            disabled={bits < 100 || playerHp === 100} 
            className="p-4 border-2 border-white/20 rounded-xl flex justify-between items-center disabled:opacity-20 hover:bg-white/5 transition-all"
          >
            <div className="flex items-center gap-4 text-left">
              <div className="bg-red-600 p-2 rounded"><Heart size={20}/></div>
              <div>
                <div className="font-black text-sm uppercase">Kit de Reparación</div>
                <div className="text-[10px] text-gray-500 font-bold uppercase">Restaura HP al 100%</div>
              </div>
            </div>
            <span className="bg-yellow-500 text-black px-4 py-2 rounded font-black text-sm">100 BITS</span>
          </button>
          
          <button 
            onClick={onBuyShield} 
            disabled={bits < 150 || hasShield} 
            className="p-4 border-2 border-white/20 rounded-xl flex justify-between items-center disabled:opacity-20 hover:bg-white/5 transition-all"
          >
            <div className="flex items-center gap-4 text-left">
              <div className="bg-blue-600 p-2 rounded"><ShieldAlert size={20}/></div>
              <div>
                <div className="font-black text-sm uppercase">Escudo Antivirus</div>
                <div className="text-[10px] text-gray-500 font-bold uppercase">Anula el próximo fallo</div>
              </div>
            </div>
            <span className="bg-yellow-500 text-black px-4 py-2 rounded font-black text-sm">150 BITS</span>
          </button>

          <button 
            onClick={onBuyHint} 
            disabled={bits < 250 || hintBought || !currentHint} 
            className="p-4 border-2 border-white/20 rounded-xl flex justify-between items-center disabled:opacity-20 hover:bg-white/5 transition-all"
          >
            <div className="flex items-center gap-4 text-left">
              <div className="bg-purple-600 p-2 rounded">🧠</div>
              <div>
                <div className="font-black text-sm uppercase">Respuesta Fatality</div>
                <div className="text-[10px] text-gray-500 font-bold uppercase">Pista parcial y lógica</div>
              </div>
            </div>
            <span className="bg-yellow-500 text-black px-4 py-2 rounded font-black text-sm">250 BITS</span>
          </button>
        </div>

        {hintBought && currentHint && (
          <div className="mb-8 p-4 bg-purple-900/30 border-2 border-purple-500 rounded-xl text-left animate-in fade-in slide-in-from-bottom-4 duration-300">
             <div className="text-purple-400 font-black text-xs uppercase mb-2">Pista de Fatality Desbloqueada:</div>
             <pre className="text-white text-xs font-mono bg-black/50 p-3 rounded whitespace-pre-wrap select-all mb-4">
               {currentHint}
             </pre>
             <button 
              onClick={copyHint}
              className={`w-full py-2 ${copied ? 'bg-green-600' : 'bg-purple-600'} text-white font-black text-xs uppercase rounded transition-colors`}
             >
               {copied ? '¡COPIADO!' : 'COPIAR CÓDIGO'}
             </button>
          </div>
        )}

        <button 
          onClick={onClose} 
          className="w-full py-6 bg-white text-black font-black text-2xl uppercase hover:bg-yellow-500 transition-colors italic"
        >
          {canProceed ? 'SIGUIENTE RONDA' : 'VOLVER AL COMBATE'}
        </button>
      </div>
    </div>
  );
};

export default ShopOverlay;
