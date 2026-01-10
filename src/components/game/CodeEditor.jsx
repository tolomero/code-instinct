import React, { useRef, useEffect } from 'react';
import { Sword } from 'lucide-react';

const CodeEditor = ({ value, onChange, onExecute, disabled, logicType }) => {
  const textareaRef = useRef(null);
  const preRef = useRef(null);

  const placeholder = logicType === 'anagram' 
    ? "// (str1, str2) => { return ... }" 
    : "// for(let i=1; i<=15; i++) { ... }";

  const handleKeyDown = (e) => {
    if (disabled) return;
    
    const { selectionStart, selectionEnd, value: content } = e.target;

    // 1. Manejar Tabulado
    if (e.key === 'Tab') {
      e.preventDefault();
      const newValue = content.substring(0, selectionStart) + "  " + content.substring(selectionEnd);
      onChange(newValue);
      
      // Mover cursor
      setTimeout(() => {
        textareaRef.current.selectionStart = textareaRef.current.selectionEnd = selectionStart + 2;
      }, 0);
    }

    // 2. Auto-cierre de paréntesis, llaves, corchetes y comillas
    const pairs = {
      '(': ')',
      '{': '}',
      '[': ']',
      "'": "'",
      '"': '"',
      '`': '`'
    };

    if (pairs[e.key]) {
      e.preventDefault();
      const newValue = content.substring(0, selectionStart) + e.key + pairs[e.key] + content.substring(selectionEnd);
      onChange(newValue);
      
      setTimeout(() => {
        textareaRef.current.selectionStart = textareaRef.current.selectionEnd = selectionStart + 1;
      }, 0);
    }

    // 3. Auto-indentado al presionar Enter después de una llave abierta
    if (e.key === 'Enter') {
      const line = content.substring(0, selectionStart).split('\n').pop();
      const currentIndent = line.match(/^\s*/)[0];
      const nextChar = content.substring(selectionStart, selectionStart + 1);
      
      if (line.trim().endsWith('{')) {
        e.preventDefault();
        // Si ya hay una llave de cierre justo después, no añadir otra
        const closingBrace = nextChar === '}' ? '' : "\n" + currentIndent + "}";
        const newValue = content.substring(0, selectionStart) + "\n" + currentIndent + "  \n" + currentIndent + closingBrace + content.substring(selectionEnd);
        onChange(newValue);
        
        setTimeout(() => {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = selectionStart + currentIndent.length + 3;
        }, 0);
      } else if (currentIndent.length > 0) {
        e.preventDefault();
        const newValue = content.substring(0, selectionStart) + "\n" + currentIndent + content.substring(selectionEnd);
        onChange(newValue);
        
        setTimeout(() => {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = selectionStart + currentIndent.length + 1;
        }, 0);
      }
    }
  };

  const syncScroll = () => {
    if (preRef.current && textareaRef.current) {
      preRef.current.scrollTop = textareaRef.current.scrollTop;
      preRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  const highlightCode = (code) => {
    if (!code) return '';

    const bracketColors = [
      'text-yellow-400',
      'text-purple-400',
      'text-blue-400',
      'text-pink-400',
      'text-cyan-400'
    ];

    let depth = 0;
    
    // Escapar HTML básico
    let encoded = code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Regex único para TODO: Comentarios, Strings, Keywords, Números, Funciones y Brackets
    // Cada categoría es un grupo de captura (p1-p6)
    const regex = /(\/\/.*)|(["'`].*?["'`])|\b(let|const|var|if|else|for|while|return|function|of|in|try|catch|break|continue)\b|\b(\d+)\b|\b(\w+)(?=\s*\()|([{}()[\]])/g;

    const lines = encoded.split('\n');
    const highlightedLines = lines.map((line) => {
      const indentMatch = line.match(/^(\s*)/);
      const indentCount = indentMatch ? indentMatch[0].length : 0;
      
      // Aplicar resaltado en UN SOLO PASO para evitar colisiones de HTML
      let highlighted = line.replace(regex, (match, comment, string, keyword, number, func, bracket) => {
        if (comment) return `<span class="text-gray-500 italic">${comment}</span>`;
        if (string) return `<span class="text-yellow-200">${string}</span>`;
        if (keyword) return `<span class="text-purple-500 font-bold">${keyword}</span>`;
        if (number) return `<span class="text-orange-400">${number}</span>`;
        if (func) return `<span class="text-blue-400">${func}</span>`;
        if (bracket) {
          if ('{(['.includes(bracket)) {
            const color = bracketColors[depth % bracketColors.length];
            depth++;
            return `<span class="${color}">${bracket}</span>`;
          } else {
            depth = Math.max(0, depth - 1);
            const color = bracketColors[depth % bracketColors.length];
            return `<span class="${color}">${bracket}</span>`;
          }
        }
        return match;
      });

      // Añadir guías de indentación
      let guides = '';
      for (let j = 0; j < Math.floor(indentCount / 2); j++) {
        guides += `<span class="absolute h-full border-l border-white/10" style="left: ${j * 1.05}rem"></span>`;
      }

      return `<div class="relative">${guides}${highlighted || ' '}</div>`;
    });

    return highlightedLines.join('');
  };

  return (
    <div className="h-full flex flex-col gap-2 md:gap-4 relative group">
      <div className="flex-1 relative bg-black border-2 border-red-900 focus-within:border-white transition-all overflow-hidden cursor-text flex">
        {/* Números de línea */}
        <div 
          className="w-8 md:w-12 bg-black/50 border-r border-red-900/30 flex flex-col font-mono text-xs md:text-lg text-red-900/50 pt-4 md:pt-6 select-none overflow-hidden"
          style={{ height: '100%' }}
        >
          {value.split('\n').map((_, i) => (
            <div key={i} className="text-right pr-2 leading-tight md:leading-normal" style={{ height: '1.5em' }}>
              {i + 1}
            </div>
          ))}
        </div>

        <div className="flex-1 relative overflow-hidden">
          {/* Capa de Resaltado (PRE) */}
          <pre 
            ref={preRef}
            aria-hidden="true"
            className="absolute inset-0 p-4 md:p-6 pt-4 md:pt-6 font-mono text-sm md:text-xl pointer-events-none whitespace-pre overflow-auto scrollbar-hide text-green-400/80 leading-tight md:leading-normal"
            style={{ margin: 0 }}
            dangerouslySetInnerHTML={{ __html: highlightCode(value) }}
          />
          
          {/* Área de entrada (TEXTAREA) */}
          <textarea 
            ref={textareaRef}
            value={value} 
            onChange={(e) => onChange(e.target.value)} 
            onKeyDown={handleKeyDown}
            onScroll={syncScroll}
            disabled={disabled} 
            className="w-full h-full bg-transparent p-4 md:p-6 pt-4 md:pt-6 font-mono text-sm md:text-xl text-transparent caret-white outline-none transition-all resize-none relative z-10 whitespace-pre scrollbar-thin scrollbar-thumb-red-900 leading-tight md:leading-normal" 
            placeholder={placeholder}
            spellCheck="false" 
          />
        </div>
      </div>

      <button 
        onClick={onExecute} 
        disabled={disabled || !value.trim()} 
        className="bg-red-600 py-4 md:py-6 font-black text-xl md:text-3xl italic uppercase shadow-[0_4px_0px_#991b1b] md:shadow-[0_5px_0px_#991b1b] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-3 md:gap-4 group hover:bg-red-500"
      >
        <Sword className="group-hover:rotate-12 transition-transform" size={24} md:size={32} /> EJECUTAR FATALITY
      </button>

      {/* Estilos locales para el editor */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        textarea::placeholder { color: rgba(74, 222, 128, 0.3); }
      `}</style>
    </div>
  );
};

export default CodeEditor;
