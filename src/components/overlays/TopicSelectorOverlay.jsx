import React from 'react';
import { Bot } from 'lucide-react';

const TOPICS = ["Math & Aritmética", "Manipulación de Objetos", "Arrays & Strings", "Lógica Condicional", "Variables & Tipos"];

const TopicSelectorOverlay = ({ onSelectTopic, onClose }) => {
  return (
    <div className="absolute inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
      <div className="bg-slate-900 border-4 border-purple-500 p-8 max-w-lg rounded-2xl w-full">
        <h3 className="text-3xl font-black mb-8 italic text-purple-400 flex items-center gap-3"><Bot /> CAMBIAR TÓPICO</h3>
        <div className="grid gap-3">
          {TOPICS.map(topic => (
            <button 
              key={topic} 
              onClick={() => onSelectTopic(topic)} 
              className="w-full py-4 bg-slate-800 border-2 border-purple-500 hover:bg-purple-500 hover:text-black font-black transition-all uppercase italic"
            >
              {topic}
            </button>
          ))}
          <button 
            onClick={onClose} 
            className="mt-4 text-xs underline text-gray-500 uppercase font-black hover:text-white"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopicSelectorOverlay;
