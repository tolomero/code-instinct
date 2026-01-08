import React from 'react';
import { Sword } from 'lucide-react';

const CodeEditor = ({ value, onChange, onExecute, disabled, logicType }) => {
  const placeholder = logicType === 'anagram' 
    ? "// (str1, str2) => { return ... }" 
    : "// for(let i=1; i<=15; i++) { ... }";

  return (
    <div className="h-full flex flex-col gap-2 md:gap-4">
      <textarea 
        value={value} 
        onChange={(e) => onChange(e.target.value)} 
        disabled={disabled} 
        className="flex-1 min-h-[150px] bg-black border-2 border-red-900 p-4 md:p-6 font-mono text-sm md:text-xl text-green-400 outline-none focus:border-white transition-all resize-none shadow-inner" 
        placeholder={placeholder}
        spellCheck="false" 
      />
      <button 
        onClick={onExecute} 
        disabled={disabled || !value.trim()} 
        className="bg-red-600 py-4 md:py-6 font-black text-xl md:text-3xl italic uppercase shadow-[0_4px_0px_#991b1b] md:shadow-[0_5px_0px_#991b1b] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-3 md:gap-4"
      >
        <Sword size={24} md:size={32} /> EJECUTAR FATALITY
      </button>
    </div>
  );
};

export default CodeEditor;
