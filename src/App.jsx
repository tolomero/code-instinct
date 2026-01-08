import React, { useState, useEffect } from 'react';
import.meta.env.VITE_GEMINI_KEY
import { 
  Terminal, Play, Zap, Skull, ShieldAlert, Heart, Trophy, 
  RefreshCcw, Sparkles, BrainCircuit, Bot, Flame, 
  Coins, ShoppingCart, Info, Search, Code2, BookOpen, AlertCircle, Sword, Cpu, ListFilter, Loader2, Eye, ChevronRight, Home, ArrowLeft, X
} from 'lucide-react';

const apiKey = import.meta.env.VITE_GEMINI_KEY;

const LORE_CHARACTERS = [
  { name: "Jago", avatar: "🧘", bio: "Purificando el código fuente.", category: "basico" },
  { name: "Sabrewulf", avatar: "🐺", bio: "Despedazando arrays con garras JS.", category: "basico" },
  { name: "Glacius", avatar: "🧊", bio: "Congelando bugs en runtime.", category: "intermedio" },
  { name: "Fulgore", avatar: "🤖", bio: "Protocolo de combate Ultratech activo.", category: "intermedio" },
  { name: "Cinder", avatar: "🔥", bio: "Quemando scripts ineficientes.", category: "intermedio" }
];

const QUESTION_MOCKS = {
  fizzbuzz_minions: [
    { type: 'choice', text: "¿Cuál es el resultado de 10 % 3?", options: ["1", "3", "0", "3.33"], correct: 0, damage: 45, solution: "1" },
    { type: 'choice', text: "¿Qué valor devuelve (false || true)?", options: ["false", "undefined", "true", "null"], correct: 2, damage: 45, solution: "true" },
    { type: 'choice', text: "¿Cómo se escribe un ciclo for que vaya de 1 a 10?", options: ["for(i<10)", "for(let i=1; i<=10; i++)", "loop(10)", "for i in 10"], correct: 1, damage: 50, solution: "for(let i=1; i<=10; i++)" },
    { type: 'choice', text: "¿Qué hace el operador '&&'?", options: ["Suma números", "Compara si ambos son verdaderos", "Divide valores", "Es un comentario"], correct: 1, damage: 45, solution: "AND lógico" },
    { type: 'choice', text: "¿Cuál es el resultado de 15 / 3 === 5?", options: ["true", "false", "5", "undefined"], correct: 0, damage: 40, solution: "true" }
  ],
  anagram_minions: [
    { type: 'choice', text: "¿Qué método convierte 'hola' en ['h','o','l','a']?", options: [".join()", ".split('')", ".slice()", ".toString()"], correct: 1, damage: 45, solution: ".split('')" },
    { type: 'choice', text: "¿Cómo ordenas ['b', 'a', 'c'] alfabéticamente?", options: [".order()", ".sort()", ".organize()", ".align()"], correct: 1, damage: 45, solution: ".sort()" },
    { type: 'choice', text: "¿Qué devuelve 'roma'.split('').reverse().join('')?", options: ["roma", "amor", "mora", "ramo"], correct: 1, damage: 50, solution: "amor" },
    { type: 'choice', text: "¿Cómo obtienes la longitud de un string?", options: [".size", ".length()", ".length", ".count"], correct: 2, damage: 40, solution: ".length" },
    { type: 'choice', text: "¿Qué hace .toLowerCase()?", options: ["Borra el texto", "Pone todo en minúsculas", "Corta el texto", "Lo traduce"], correct: 1, damage: 45, solution: "minúsculas" }
  ]
};

const BOSS_CHARACTERS = [
  { 
    id: "aria",
    name: "ARIA", 
    avatar: "🧬", 
    bio: "IA Suprema. Objetivo: FizzBuzz.", 
    isFinal: true,
    logicType: "fizzbuzz",
    prelude: [
      { type: 'choice', text: "¿Qué operador calcula el residuo de una división?", options: ["/", "*", "%", "**"], correct: 2, damage: 50, solution: "%" },
      { type: 'choice', text: "¿Cómo verificas si un número es múltiplo de 3 Y 5?", options: ["num % 15 === 0", "num % 3 === 0", "num % 5 === 0", "num / 15 === 0"], correct: 0, damage: 50, solution: "num % 15 === 0" },
      { type: 'choice', text: "Si i = 15, ¿cuál es el resultado de i % 3?", options: ["5", "0", "3", "1"], correct: 1, damage: 50, solution: "0" }
    ],
    fatality: { type: 'code', text: "¡FATALITY! Escribe FizzBuzz (1 al 15). Si es múltiplo de 3 'Fizz', de 5 'Buzz', de ambos 'FizzBuzz'.", solution: "fizzbuzz", damage: 300 }
  },
  { 
    id: "spinal",
    name: "SPINAL", 
    avatar: "💀", 
    bio: "Guerrero Maldito. Reto: Anagramas.", 
    isFinal: true,
    logicType: "anagram",
    prelude: [
      { type: 'choice', text: "¿Qué método convierte un string en un array de caracteres?", options: [".join('')", ".split('')", ".slice()", ".reverse()"], correct: 1, damage: 50, solution: ".split('')" },
      { type: 'choice', text: "¿Cómo ordenarías alfabéticamente los elementos de un array?", options: [".order()", ".sort()", ".align()", ".organize()"], correct: 1, damage: 50, solution: ".sort()" },
      { type: 'choice', text: "Dos palabras son anagramas si al ordenarlas...", options: ["Son diferentes", "Tienen distinta longitud", "Son exactamente iguales", "Suman cero"], correct: 2, damage: 50, solution: "Iguales" }
    ],
    fatality: { type: 'code', text: "¡FATALITY! Función que reciba (str1, str2) y retorne true si son anagramas (mismas letras, distinto orden).", solution: "anagram", damage: 300 }
  }
];

export default function App() {
  const [gameState, setGameState] = useState('start'); 
  const [gameMode, setGameMode] = useState('arcade'); 
  const [currentLevel, setCurrentLevel] = useState(0);
  const [opponent, setOpponent] = useState(null);
  const [targetBoss, setTargetBoss] = useState(null); 
  const [question, setQuestion] = useState(null);
  const [playerHp, setPlayerHp] = useState(100);
  const [enemyHp, setEnemyHp] = useState(100);
  const [bits, setBits] = useState(0);
  const [comboCount, setComboCount] = useState(0);
  const [inputCode, setInputCode] = useState("");
  const [feedback, setFeedback] = useState("");
  const [animating, setAnimating] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [showTopicSelector, setShowTopicSelector] = useState(false);
  const [bossStep, setBossStep] = useState(0);
  const [hasShield, setHasShield] = useState(false);
  const [usedQuestions, setUsedQuestions] = useState([]);
  const [showHomeConfirm, setShowHomeConfirm] = useState(false);

  const resetGame = (targetState = 'start') => {
    setGameState(targetState);
    setCurrentLevel(0);
    setOpponent(null);
    setTargetBoss(null);
    setQuestion(null);
    setPlayerHp(100);
    setEnemyHp(100);
    setBits(0);
    setComboCount(0);
    setUsedQuestions([]);
    setIsShopOpen(false);
    setShowTopicSelector(false);
    setShowSolution(false);
    setShowHomeConfirm(false);
    setInputCode("");
    setBossStep(0);
  };

  const fetchQuestion = async (isBoss = false, forcedTopic = null) => {
    setAttempts(0);
    setShowSolution(false);
    setInputCode("");
    
    if (isBoss) {
      if (bossStep < 3) {
        setQuestion({ ...targetBoss.prelude[bossStep], lore: `Analizando núcleo de ${targetBoss.name}...` });
        return;
      } else {
        setQuestion({ ...targetBoss.fatality, lore: "¡SISTEMA CRÍTICO: EJECUTA EL CÓDIGO!" });
        return;
      }
    }

    if (gameMode === 'ia' || forcedTopic) {
      setAiLoading(true);
      try {
        const topic = forcedTopic || (targetBoss.logicType === 'fizzbuzz' ? 'aritmética y lógica JS' : 'manipulación de strings y arrays');
        const levelText = currentLevel === 0 ? 'principiante' : 'intermedio';
        const prompt = `Genera una pregunta técnica de JS nivel ${levelText} sobre ${topic}. Evita preguntas repetidas. Responde solo JSON: { "text": "...", "options": ["...", "..."], "correct": 0, "type": "choice", "damage": 50, "solution": "..." }`;
        
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        
        const data = await response.json();
        const jsonStr = data.candidates[0].content.parts[0].text.replace(/```json|```/g, "").trim();
        const parsed = JSON.parse(jsonStr);
        setQuestion({ ...parsed, lore: `Sincronizando con ${targetBoss.name}...` });
      } catch (e) {
        const pool = targetBoss.logicType === 'fizzbuzz' ? QUESTION_MOCKS.fizzbuzz_minions : QUESTION_MOCKS.anagram_minions;
        setQuestion({ ...pool[Math.floor(Math.random() * pool.length)], lore: "Enlace IA perdido. Backup cargado." });
      } finally {
        setAiLoading(false);
      }
      return;
    }

    const poolKey = targetBoss.logicType === 'fizzbuzz' ? 'fizzbuzz_minions' : 'anagram_minions';
    const pool = QUESTION_MOCKS[poolKey];
    
    let available = pool.filter(q => !usedQuestions.includes(q.text));
    if (available.length === 0) {
      setUsedQuestions([]);
      available = pool;
    }

    const q = available[Math.floor(Math.random() * available.length)];
    setUsedQuestions(prev => [...prev, q.text]);
    setQuestion({ ...q, lore: `Secuaz de ${targetBoss.name} bloqueando el acceso.` });
  };

  const startFight = (level, mode, boss = null) => {
    const selectedBoss = boss || targetBoss;
    setGameMode(mode);
    setCurrentLevel(level);
    setTargetBoss(selectedBoss);
    setEnemyHp(level === 2 ? 250 : 100);
    setBossStep(0);
    setPlayerHp(level === 0 ? 100 : playerHp); 
    setHasShield(false);
    
    let char;
    if (level === 2) {
      char = selectedBoss;
    } else {
      const cat = level === 0 ? 'basico' : 'intermedio';
      const filtered = LORE_CHARACTERS.filter(c => c.category === cat);
      char = filtered[Math.floor(Math.random() * filtered.length)];
    }
    
    setOpponent(char);
    setGameState('playing');
  };

  useEffect(() => {
    if (gameState === 'playing' && opponent && !question) {
      fetchQuestion(currentLevel === 2);
    }
  }, [opponent, gameState]);

  const handleAttack = (isCorrect) => {
    if (animating || showSolution || !question) return;

    if (isCorrect) {
      const damage = question.type === 'code' ? 300 : (question.damage || 40);
      setAnimating('player-attack');
      setEnemyHp(prev => Math.max(0, prev - damage));
      setComboCount(prev => prev + 1);
      setBits(prev => prev + 50);
      setFeedback(question.type === 'code' ? "¡SUPREME FATALITY!" : "¡ULTRA COMBO!");
      
      if (currentLevel === 2) {
        setBossStep(prev => prev + 1);
      }

      setTimeout(() => {
        setAnimating(null);
        if (enemyHp > damage) {
            fetchQuestion(currentLevel === 2);
        }
      }, 1000);
    } else {
      if (hasShield) {
        setHasShield(false);
        setFeedback("¡ESCUDO ACTIVADO!");
        setAnimating('shield-hit');
        setTimeout(() => setAnimating(null), 800);
        return;
      }

      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setAnimating('enemy-attack');
      setPlayerHp(prev => Math.max(0, prev - 20));
      setComboCount(0);
      setFeedback("¡COMBO BREAKER!");

      if (newAttempts >= 2) setShowSolution(true);
      setTimeout(() => setAnimating(null), 1000);
    }
  };

  const validateManual = () => {
    if (!question) return;
    const clean = inputCode.toLowerCase().replace(/\s/g, "");
    
    if (targetBoss.logicType === 'fizzbuzz') {
      const isFizzBuzz = clean.includes("for") && clean.includes("%3") && clean.includes("%5");
      handleAttack(isFizzBuzz);
    } else if (targetBoss.logicType === 'anagram') {
      const isAnagram = (clean.includes("split") && clean.includes("sort") && clean.includes("join")) || clean.includes("length");
      handleAttack(isAnagram);
    }
  };

  useEffect(() => {
    if (enemyHp <= 0 && gameState === 'playing') {
      setTimeout(() => {
        if (currentLevel < 2) {
            setIsShopOpen(true);
            setQuestion(null); 
        }
        else {
          setGameState('won');
          setTimeout(() => resetGame(), 5000);
        }
      }, 1000);
    }
    if (playerHp <= 0) setGameState('lost');
  }, [enemyHp, playerHp]);

  // Vistas principales
  if (gameState === 'start') {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 md:p-6 font-mono border-[10px] md:border-[15px] border-blue-900 border-double text-center overflow-hidden">
        <h1 className="text-5xl sm:text-7xl md:text-9xl font-black text-white italic tracking-tighter mb-2 drop-shadow-[4px_4px_0px_#1e40af] md:drop-shadow-[8px_8px_0px_#1e40af]">CODE INSTINCT</h1>
        <div className="bg-red-600 text-white px-6 md:px-10 py-2 text-lg md:text-2xl font-black mb-12 md:mb-16 skew-x-[-15deg] uppercase">Ultimate Arcade Edition</div>
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full max-w-sm md:max-w-none px-4">
          <button onClick={() => { setGameMode('arcade'); setGameState('boss-selection'); }} className="w-full md:w-auto px-8 md:px-12 py-6 md:py-8 bg-blue-600 border-b-8 border-blue-900 text-white text-2xl md:text-3xl font-black hover:bg-white hover:text-blue-600 transition-all rounded-xl uppercase active:scale-95">Modo Arcade</button>
          <button onClick={() => { setGameMode('ia'); setGameState('boss-selection'); }} className="w-full md:w-auto px-8 md:px-12 py-6 md:py-8 bg-purple-600 border-b-8 border-purple-900 text-white text-2xl md:text-3xl font-black hover:bg-white hover:text-purple-600 transition-all rounded-xl uppercase flex items-center gap-4 justify-center active:scale-95"><Bot /> Modo IA</button>
        </div>
      </div>
    );
  }

  if (gameState === 'boss-selection') {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 md:p-6 font-mono border-[10px] md:border-[15px] border-red-900 border-double text-center relative overflow-y-auto">
        <button onClick={() => resetGame('start')} className="absolute top-4 left-4 md:top-10 md:left-10 p-2 md:p-4 bg-white/10 hover:bg-white/20 rounded-full transition-colors flex items-center gap-2 text-white font-black uppercase italic z-50 text-xs md:text-base">
          <ArrowLeft size={16} /> Volver
        </button>
        <h2 className="text-4xl md:text-7xl font-black text-red-600 italic mt-12 md:mt-0 mb-8 md:mb-12 uppercase tracking-tighter">Choose Your Boss</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          {BOSS_CHARACTERS.map((boss) => (
            <div key={boss.id} className="group bg-slate-900 border-4 border-slate-700 p-4 md:p-8 rounded-3xl hover:border-red-600 transition-all cursor-pointer relative overflow-hidden" onClick={() => startFight(0, gameMode, boss)}>
              <div className="text-6xl md:text-8xl mb-4 group-hover:scale-110 transition-transform">{boss.avatar}</div>
              <h3 className="text-2xl md:text-4xl font-black text-white mb-2 uppercase italic">{boss.name}</h3>
              <p className="text-gray-500 text-[10px] md:text-xs font-bold uppercase mb-4 md:mb-6">{boss.bio}</p>
              <div className="py-2 px-4 bg-red-600 text-white font-black skew-x-[-10deg] inline-block uppercase text-[10px] md:text-sm group-hover:bg-white group-hover:text-red-600 transition-colors">Select Combatant</div>
              <div className="absolute top-0 right-0 p-2 md:p-4 opacity-10 text-white"><Skull size={40} className="md:w-20 md:h-20" /></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (gameState === 'won' || gameState === 'lost') {
    return (
      <div className={`min-h-screen ${gameState === 'won' ? 'bg-emerald-950 overflow-hidden' : 'bg-red-950'} flex flex-col items-center justify-center p-10 font-mono text-white text-center relative`}>
        {gameState === 'won' && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(50)].map((_, i) => (
              <div key={i} className="absolute text-yellow-400 text-2xl animate-ping opacity-0" style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}>{Math.random() > 0.5 ? '0' : '1'}</div>
            ))}
            <div className="absolute inset-0 flex items-center justify-center opacity-30">
               <Trophy size={400} className="animate-pulse" />
            </div>
          </div>
        )}
        
        {gameState === 'won' ? <Trophy size={150} className="mb-8 text-yellow-400 animate-bounce relative z-10" /> : <Skull size={150} className="mb-8 text-red-500 animate-pulse relative z-10" />}
        
        <h1 className="text-6xl md:text-8xl font-black mb-10 tracking-tighter italic relative z-10 uppercase">
          {gameState === 'won' ? '¡VICTORIA SUPREMA!' : 'HUMILLACIÓN'}
        </h1>
        
        <p className="text-gray-400 mb-8 font-black uppercase tracking-widest relative z-10">
          {gameState === 'won' ? 'Has purificado el código de Ultratech' : 'Tu código ha sido corrompido'}
        </p>

        <button onClick={() => resetGame('start')} className="px-12 py-6 border-4 border-white text-2xl md:text-3xl font-black rounded-2xl hover:bg-white hover:text-black transition-all uppercase italic relative z-10">
          {gameState === 'won' ? 'Menú Principal' : 'Reintentar'}
        </button>
        
        {gameState === 'won' && (
           <p className="mt-8 text-xs text-emerald-400 animate-pulse font-black uppercase">Redirigiendo al mainframe en 5 segundos...</p>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white font-mono flex flex-col overflow-hidden select-none relative">
      
      {/* BOTÓN SALIR / HOME */}
      <button 
        onClick={() => setShowHomeConfirm(true)}
        className="absolute top-2 left-2 md:top-20 md:left-4 z-[60] p-1.5 md:p-3 bg-red-600/20 hover:bg-red-600 rounded-full transition-all border border-red-600/50 group shadow-lg"
        title="Opciones de salida"
      >
        <Home className="group-hover:scale-110 transition-transform" size={16} md:size={24} />
      </button>

      {/* MODAL DE CONFIRMACIÓN DE SALIDA (HOME) */}
      {showHomeConfirm && (
        <div className="absolute inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-6">
          <div className="max-w-md w-full border-4 border-red-600 bg-slate-900 p-8 rounded-3xl text-center shadow-[0_0_50px_rgba(220,38,38,0.3)] relative animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setShowHomeConfirm(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
            >
              <X size={24}/>
            </button>
            
            <AlertCircle className="mx-auto text-red-600 mb-4 animate-pulse" size={64} />
            <h2 className="text-3xl font-black text-white mb-2 italic uppercase">¿ABANDONAR COMBATE?</h2>
            <p className="text-gray-400 mb-8 font-bold text-sm uppercase">El progreso actual de esta ronda se perderá.</p>
            
            <div className="flex flex-col gap-4">
              <button 
                onClick={() => resetGame('boss-selection')} 
                className="w-full py-4 bg-slate-800 hover:bg-red-600 text-white font-black text-xl rounded-xl transition-all uppercase italic border-2 border-red-600/20 hover:border-white"
              >
                Volver a Selección de Jefes
              </button>
              <button 
                onClick={() => resetGame('start')} 
                className="w-full py-4 bg-red-600 hover:bg-white hover:text-red-600 text-white font-black text-xl rounded-xl transition-all uppercase italic border-2 border-transparent hover:border-red-600"
              >
                Ir al Menú de Inicio
              </button>
              <button 
                onClick={() => setShowHomeConfirm(false)} 
                className="mt-2 py-2 text-xs font-black text-gray-500 hover:text-white uppercase transition-colors tracking-widest"
              >
                Cancelar y seguir peleando
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SHOP OVERLAY */}
      {isShopOpen && (
        <div className="absolute inset-0 z-50 bg-black/95 flex items-center justify-center p-6">
          <div className="max-w-xl w-full border-4 border-yellow-500 bg-slate-900 p-8 rounded-2xl text-center shadow-[0_0_60px_rgba(234,179,8,0.4)]">
            <h2 className="text-4xl font-black text-yellow-500 mb-2 italic uppercase flex items-center justify-center gap-3"><ShoppingCart /> Ultratech Shop</h2>
            <p className="text-green-400 font-black mb-8 text-2xl tracking-widest uppercase">BITS: {bits}</p>
            <div className="grid grid-cols-1 gap-4 mb-8">
              <button onClick={() => { if(bits >= 100) { setBits(b => b-100); setPlayerHp(100); }}} disabled={bits < 100 || playerHp === 100} className="p-4 border-2 border-white/20 rounded-xl flex justify-between items-center disabled:opacity-20 hover:bg-white/5 transition-all">
                <div className="flex items-center gap-4 text-left">
                  <div className="bg-red-600 p-2 rounded"><Heart size={20}/></div>
                  <div>
                    <div className="font-black text-sm uppercase">Kit de Reparación</div>
                    <div className="text-[10px] text-gray-500 font-bold uppercase">Restaura HP al 100%</div>
                  </div>
                </div>
                <span className="bg-yellow-500 text-black px-4 py-2 rounded font-black text-sm">100 BITS</span>
              </button>
              <button onClick={() => { if(bits >= 150) { setBits(b => b-150); setHasShield(true); }}} disabled={bits < 150 || hasShield} className="p-4 border-2 border-white/20 rounded-xl flex justify-between items-center disabled:opacity-20 hover:bg-white/5 transition-all">
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
            <button onClick={() => { if(question) setIsShopOpen(false); else { setIsShopOpen(false); startFight(currentLevel + 1, gameMode); } }} className="w-full py-6 bg-white text-black font-black text-2xl uppercase hover:bg-yellow-500 transition-colors italic">SIGUIENTE RONDA</button>
          </div>
        </div>
      )}

      {/* TOPIC SELECTOR IA */}
      {showTopicSelector && (
        <div className="absolute inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="bg-slate-900 border-4 border-purple-500 p-8 max-w-lg rounded-2xl w-full">
            <h3 className="text-3xl font-black mb-8 italic text-purple-400 flex items-center gap-3"><Bot /> CAMBIAR TÓPICO</h3>
            <div className="grid gap-3">
              {["Math & Aritmética", "Manipulación de Objetos", "Arrays & Strings", "Lógica Condicional", "Variables & Tipos"].map(topic => (
                <button key={topic} onClick={() => { setShowTopicSelector(false); fetchQuestion(false, topic); }} className="w-full py-4 bg-slate-800 border-2 border-purple-500 hover:bg-purple-500 hover:text-black font-black transition-all uppercase italic">{topic}</button>
              ))}
              <button onClick={() => setShowTopicSelector(false)} className="mt-4 text-xs underline text-gray-500 uppercase font-black hover:text-white">Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {/* HUD */}
      {/* HUD RESPONSIVO */}
      <div className="p-2 md:p-4 bg-black/90 border-b-4 border-blue-600 grid grid-cols-2 md:grid-cols-3 items-center gap-2">
        {/* Jugador Stats */}
        <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
          <div className="bg-slate-900 p-1 md:p-2 rounded-lg border border-white/10 min-w-[60px] md:min-w-[80px] text-center">
             <span className="text-[8px] md:text-[10px] text-gray-500 font-black block tracking-widest leading-none">BITS</span>
             <span className="text-yellow-400 font-black text-sm md:text-xl leading-none">{bits}</span>
          </div>
          <div className="w-full md:w-48 h-4 md:h-8 bg-gray-900 border md:border-2 border-white rounded overflow-hidden relative">
            <div className="h-full bg-green-500 transition-all duration-500" style={{width: `${playerHp}%`}}></div>
            <span className="absolute inset-0 flex items-center justify-center text-[7px] md:text-[10px] font-black text-white drop-shadow-sm">HP: {playerHp}%</span>
          </div>
        </div>

        {/* Rival Info (Oculto en móvil pequeño al centro, se muestra en grid) */}
        <div className="col-span-2 md:col-span-1 order-last md:order-none text-center border-t border-white/10 md:border-none pt-2 md:pt-0">
          <h2 className="text-xl md:text-3xl font-black italic text-red-500 uppercase tracking-tighter leading-none inline-block md:block mr-2 md:mr-0">{opponent?.name}</h2>
          <span className="text-[8px] md:text-[10px] text-gray-500 font-black uppercase tracking-widest">RONDA {currentLevel + 1}/3</span>
        </div>

        {/* Rival Stats */}
        <div className="flex flex-col-reverse md:flex-row gap-2 items-end md:items-center justify-self-end">
          <div className="w-full md:w-48 h-4 md:h-8 bg-gray-900 border md:border-2 border-white rounded overflow-hidden relative text-right">
            <div className="h-full bg-red-600 transition-all duration-500 ml-auto" style={{width: `${(enemyHp / (currentLevel === 2 ? 250 : 100)) * 100}%`}}></div>
            <span className="absolute inset-0 flex items-center justify-center text-[7px] md:text-[10px] font-black text-white drop-shadow-sm">RIVAL: {enemyHp} HP</span>
          </div>
          <div className="bg-slate-900 p-1 md:p-2 rounded-lg border border-white/10 min-w-[60px] md:min-w-[80px] text-center">
             <span className="text-[8px] md:text-[10px] text-gray-500 font-black block tracking-widest leading-none">COMBO</span>
             <span className="text-blue-400 font-black text-sm md:text-xl leading-none">{comboCount}x</span>
          </div>
        </div>
      </div>

      {/* COMBAT ARENA */}
      <div className="flex-1 min-h-[150px] md:min-h-0 flex items-center justify-around relative bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] overflow-hidden">
        <div className={`transition-all duration-300 text-5xl sm:text-7xl md:text-9xl relative ${animating === 'player-attack' ? 'translate-x-20 md:translate-x-60 scale-125 z-10' : animating === 'shield-hit' ? 'scale-110 brightness-200' : ''}`}>
           🧑‍💻
           {animating === 'shield-hit' && <div className="absolute inset-0 bg-blue-500/50 rounded-full animate-ping border-2 md:border-4 border-white"></div>}
        </div>
        {feedback && <div className="absolute top-1/4 bg-yellow-400 text-black px-4 md:px-12 py-2 md:py-4 text-xl md:text-4xl font-black italic animate-bounce z-40 border-2 md:border-4 border-black skew-x-[-15deg]">{feedback}</div>}
        <div className={`transition-all duration-300 text-5xl sm:text-7xl md:text-9xl relative ${animating === 'enemy-attack' ? '-translate-x-20 md:-translate-x-60 scale-125 z-10' : ''}`}>
           {opponent?.avatar || "❓"}
        </div>
      </div>

      {/* CONTROL AREA */}
      {/* CONTROL AREA RESPONSIVO */}
      <div className="h-auto md:h-[40%] bg-black flex flex-col md:flex-row border-t-4 border-red-900 overflow-y-auto md:overflow-hidden">
        <div className="w-full md:w-1/3 p-4 md:p-8 border-b-2 md:border-b-0 md:border-r-2 border-red-900 bg-red-950/10 flex flex-col justify-between">
          <div>
             <div className="flex items-center justify-between mb-2 md:mb-4">
                <span className="text-red-600 font-black text-[8px] md:text-[10px] italic flex items-center gap-2 uppercase opacity-50"><Cpu size={14}/> NÚCLEO</span>
                <span className={`text-[8px] md:text-[10px] px-2 py-0.5 font-black uppercase rounded ${attempts >= 1 ? 'bg-red-600 text-white animate-pulse' : 'bg-white text-black'}`}>INTENTOS: {attempts}/2</span>
             </div>
             <p className="text-[9px] md:text-[11px] text-gray-500 font-bold italic mb-2 md:mb-3 uppercase tracking-tight">{question?.lore}</p>
             <hr className="border-red-900/30 mb-4 md:mb-6"/>
             {aiLoading || !question ? (
               <div className="flex flex-col items-center justify-center p-2">
                 <Loader2 className="animate-spin text-purple-500 mb-2" size={24} md:size={32} />
                 <span className="text-[10px] text-purple-400 font-black uppercase animate-pulse">Analizando...</span>
               </div>
             ) : (
               <p className="text-base md:text-xl font-black italic uppercase text-white drop-shadow-md leading-tight">{question.text}</p>
             )}
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <button onClick={() => setShowTopicSelector(true)} disabled={aiLoading || currentLevel === 2} className="flex-1 bg-purple-700 hover:bg-purple-500 p-2 md:p-3 rounded-xl flex flex-col items-center justify-center transition-all border-b-4 border-purple-900 disabled:opacity-20 uppercase italic font-black text-[8px] md:text-[10px]">
              <ListFilter size={16} md:size={20}/><span className="mt-1">Tópicos IA</span>
            </button>
            <button onClick={() => setIsShopOpen(true)} disabled={aiLoading} className="flex-1 bg-yellow-600 hover:bg-yellow-400 p-2 md:p-3 rounded-xl flex flex-col items-center justify-center transition-all border-b-4 border-yellow-900 text-black uppercase italic font-black text-[8px] md:text-[10px]">
              <ShoppingCart size={16} md:size={20}/><span className="mt-1">Tienda</span>
            </button>
          </div>
        </div>

        <div className="w-full md:w-2/3 p-4 md:p-8 bg-black/40 min-h-[300px] md:min-h-0">
          {!question || aiLoading ? (
            <div className="h-full flex items-center justify-center text-gray-700 font-black italic animate-pulse tracking-widest text-xs md:text-base">SINCRONIZANDO COMBATE...</div>
          ) : question.type === 'choice' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4 h-full">
               {question.options.map((opt, i) => (
                 <button key={i} onClick={() => handleAttack(i === question.correct)} disabled={!!animating || showSolution} className="bg-slate-900 border-2 border-red-600 p-3 md:p-4 text-sm md:text-xl font-black text-left hover:bg-white hover:text-black transition-all flex items-center gap-3 md:gap-4 group overflow-hidden">
                    <span className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded font-mono bg-red-600 text-white group-hover:bg-black text-xs md:text-base uppercase">{i+1}</span>
                    <span className="uppercase italic truncate text-xs md:text-base">{opt}</span>
                 </button>
               ))}
            </div>
          ) : (
            <div className="h-full flex flex-col gap-2 md:gap-4">
              <textarea value={inputCode} onChange={(e) => setInputCode(e.target.value)} disabled={!!animating} className="flex-1 min-h-[150px] bg-black border-2 border-red-900 p-4 md:p-6 font-mono text-sm md:text-xl text-green-400 outline-none focus:border-white transition-all resize-none shadow-inner" placeholder={targetBoss.logicType === 'anagram' ? "// (str1, str2) => { return ... }" : "// for(let i=1; i<=15; i++) { ... }"} spellCheck="false" />
              <button onClick={validateManual} disabled={!!animating || !inputCode.trim()} className="bg-red-600 py-4 md:py-6 font-black text-xl md:text-3xl italic uppercase shadow-[0_4px_0px_#991b1b] md:shadow-[0_5px_0px_#991b1b] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-3 md:gap-4"><Sword size={24} md:size={32} /> EJECUTAR FATALITY</button>
            </div>
          )}
        </div>
      </div>
      {showSolution && (
        <div className="absolute inset-0 z-50 bg-red-900/20 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-black border-4 border-red-600 p-8 max-w-lg text-center rounded-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-3xl font-black text-white mb-4 italic uppercase">COMBO FALLIDO</h3>
            <p className="text-gray-400 mb-6 font-black text-sm uppercase">La respuesta correcta era:</p>
            <div className="bg-slate-900 p-4 mb-8 border border-white/10 text-green-400 font-mono text-xl">{question.solution}</div>
            <button onClick={() => { setShowSolution(false); fetchQuestion(currentLevel === 2); }} className="w-full py-4 bg-white text-black font-black uppercase text-xl hover:bg-red-600 hover:text-white transition-all italic">CONTINUAR COMBATE</button>
          </div>
        </div>
      )}
    </div>
  );
}