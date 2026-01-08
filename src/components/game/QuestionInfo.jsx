import React from 'react';
import { Cpu, Loader2, ListFilter, ShoppingCart } from 'lucide-react';

const QuestionInfo = ({ question, attempts, aiLoading, onShowTopicSelector, onShowShop, isBossRound }) => {
  return (
    <div className="w-full md:w-1/3 p-4 md:p-8 border-b-2 md:border-b-0 md:border-r-2 border-red-900 bg-red-950/10 flex flex-col justify-between">
      <div>
         <div className="flex items-center justify-between mb-2 md:mb-4">
            <span className="text-red-600 font-black text-[8px] md:text-[10px] italic flex items-center gap-2 uppercase opacity-50"><Cpu size={14}/> NÚCLEO</span>
            <span className={`text-[8px] md:text-[10px] px-2 py-0.5 font-black uppercase rounded ${attempts >= 1 ? 'bg-red-600 text-white animate-pulse' : 'bg-white text-black'}`}>INTENTOS: {attempts}/2</span>
         </div>
          <div className="mb-4">
            <span className="text-[8px] md:text-[10px] text-zinc-600 font-black uppercase tracking-widest block mb-1">ENUNCIADO / RETO</span>
            <p className="text-[10px] md:text-[13px] text-zinc-500 font-medium italic leading-relaxed">{question?.lore || "Analizando protocolos de combate..."}</p>
          </div>
          <hr className="border-red-900/30 mb-4 md:mb-6"/>
          {aiLoading || !question ? (
            <div className="flex flex-col items-center justify-center p-2">
              <Loader2 className="animate-spin text-purple-500 mb-2" size={24} />
              <span className="text-[10px] text-purple-400 font-black uppercase animate-pulse">Sincronizando...</span>
            </div>
          ) : (
            <div className="space-y-2">
               <span className="text-[8px] md:text-[10px] text-red-500 font-black uppercase tracking-widest block mb-1">PREGUNTA ACTUAL</span>
               <p className="text-base md:text-2xl font-black italic uppercase text-white drop-shadow-md leading-tight tracking-tighter">{question.text}</p>
            </div>
          )}
      </div>
      <div className="flex gap-2 mt-4 md:mt-0">
        <button 
          onClick={onShowTopicSelector} 
          disabled={aiLoading || isBossRound} 
          className="flex-1 bg-purple-700 hover:bg-purple-500 p-2 md:p-3 rounded-xl flex flex-col items-center justify-center transition-all border-b-4 border-purple-900 disabled:opacity-20 uppercase italic font-black text-[8px] md:text-[10px]"
        >
          <ListFilter size={16} md:size={20}/><span className="mt-1">Tópicos IA</span>
        </button>
        <button 
          onClick={onShowShop} 
          disabled={aiLoading} 
          className="flex-1 bg-yellow-600 hover:bg-yellow-400 p-2 md:p-3 rounded-xl flex flex-col items-center justify-center transition-all border-b-4 border-yellow-900 text-black uppercase italic font-black text-[8px] md:text-[10px]"
        >
          <ShoppingCart size={16} md:size={20}/><span className="mt-1">Tienda</span>
        </button>
      </div>
    </div>
  );
};

export default QuestionInfo;
