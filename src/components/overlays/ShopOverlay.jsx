import React from 'react';
import { ShoppingCart, Heart, ShieldAlert } from 'lucide-react';

const ShopOverlay = ({ bits, playerHp, hasShield, onBuyRepair, onBuyShield, onClose, canProceed }) => {
  return (
    <div className="absolute inset-0 z-50 bg-black/95 flex items-center justify-center p-6">
      <div className="max-w-xl w-full border-4 border-yellow-500 bg-slate-900 p-8 rounded-2xl text-center shadow-[0_0_60px_rgba(234,179,8,0.4)]">
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
        </div>
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
