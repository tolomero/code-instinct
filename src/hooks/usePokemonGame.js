import { useState, useEffect, useRef, useCallback } from 'react';

// JavaScript Question Pool
const JS_QUESTIONS = {
  0: [ // Basic
    { question: "¿Qué palabra clave define una constante?", answer: "const", options: ["var", "let", "const", "def"] },
    { question: "¿Cuál es el tipo de dato de 'true'?", answer: "boolean", options: ["string", "number", "boolean", "null"] },
    { question: "¿Cómo se escribe un comentario de una línea?", answer: "//", options: ["/* */", "//", "#", "--"] },
    { question: "¿Qué operador se usa para comparar valor y tipo?", answer: "===", options: ["==", "=", "===", "!="] },
    { question: "¿Qué hace 'console.log()'?", answer: "Muestra en consola", options: ["Crea un log", "Muestra en consola", "Guarda un archivo", "Borra todo"] },
  ],
  1: [ // Intermediate
    { question: "¿Qué método añade un elemento al final de un array?", answer: "push()", options: ["pop()", "shift()", "push()", "unshift()"] },
    { question: "¿Cuál es el resultado de 2 + '2'?", answer: "'22'", options: ["4", "'22'", "NaN", "Error"] },
    { question: "¿Qué método crea un nuevo array filtrando elementos?", answer: "filter()", options: ["map()", "forEach()", "filter()", "reduce()"] },
    { question: "¿Qué devuelve 'typeof []'?", answer: "object", options: ["array", "list", "object", "undefined"] },
    { question: "¿Cómo se define una Arrow Function?", answer: "() => {}", options: ["function()", "call()", "() => {}", "func =>"] },
    { question: "Resultado de [1,2,3].map(x => x*2)", answer: "[2,4,6]", options: ["[1,2,3]", "[2,4,6]", "[2,2,2]", "Error"] },
  ],
  2: [ // Advanced (Exercises)
    { question: "¿Qué previene 'Object.freeze()'?", answer: "Cualquier modificación", options: ["Solo borrar", "Solo añadir", "Cualquier modificación", "Cambiar el nombre"] },
    { question: "let x = 1;\n{\n  let x = 2;\n}\nconsole.log(x);", answer: "1", options: ["1", "2", "undefined", "ReferenceError"] },
    { question: "const a = [1, 2];\nconst b = a;\nb.push(3);\n¿Longitud de 'a'?", answer: "3", options: ["2", "3", "Error", "undefined"] },
    { question: "function greet() {\n  return name;\n}\nlet name = 'Ash';\n¿Resultado?", answer: "Ash", options: ["Ash", "Error", "undefined", "null"] },
    { question: "¿Qué es un 'Closure'?", answer: "Función con acceso a su scope exterior", options: ["Una función cerrada", "Un error de sintaxis", "Función con acceso a su scope exterior", "Un método de cierre de sesión"] },
    { question: "[] == ![]", answer: "true", options: ["true", "false", "undefined", "Error"] },
  ]
};

const generateJSQuestion = (difficulty = 0) => {
  const pool = JS_QUESTIONS[difficulty] || JS_QUESTIONS[0];
  const q = pool[Math.floor(Math.random() * pool.length)];
  
  return {
    ...q,
    options: [...q.options].sort(() => Math.random() - 0.5),
    damage: 25 + (difficulty * 12)
  };
};

// Math Generator Utility
const generateMathQuestion = (mode, difficulty = 1) => {
  if (!mode || !mode.id) {
    console.warn("Math Mode missing, defaulting to suma");
    mode = { id: 'suma' };
  }

  // If JS mode, call specific generator
  if (mode.id === 'javascript') {
    return generateJSQuestion(difficulty);
  }

  let num1 = 1, num2 = 1, answer = 2, operator = '+';
  // Increase range based on difficulty (e.g., evolution stage)
  const range = difficulty === 0 ? 10 : difficulty === 1 ? 20 : 50;

  try {
    switch (mode.id) {
      case 'suma':
        num1 = Math.floor(Math.random() * range) + 1;
        num2 = Math.floor(Math.random() * range) + 1;
        answer = num1 + num2;
        operator = '+';
        break;
      case 'resta':
        num1 = Math.floor(Math.random() * range) + 5;
        num2 = Math.floor(Math.random() * num1); // Ensure positive result
        answer = num1 - num2;
        operator = '-';
        break;
      case 'multiplicacion':
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        answer = num1 * num2;
        operator = '×';
        break;
      case 'division':
        num2 = Math.floor(Math.random() * 9) + 2; 
        answer = Math.floor(Math.random() * 10) + 1;
        num1 = num2 * answer; // Ensure clean division
        operator = '÷';
        break;
      default:
        // Fallback default
        break;
    }
  } catch (e) {
    console.error("Error generating math question:", e);
  }

  // Generate wrong options
  const options = new Set([answer]);
  while (options.size < 4) {
    const variance = Math.floor(Math.random() * 5) + 1;
    const sign = Math.random() > 0.5 ? 1 : -1;
    const fake = answer + (variance * sign);
    if (fake >= 0) options.add(fake);
  }

  return {
    question: `${num1} ${operator} ${num2}`,
    answer,
    options: Array.from(options).sort(() => Math.random() - 0.5),
    damage: 20 + (difficulty * 10)
  };
};

const TYPE_CHART = {
  fire: { strong: ['grass', 'ice', 'bug', 'steel'], weak: ['water', 'ground', 'rock'] },
  water: { strong: ['fire', 'ground', 'rock'], weak: ['grass', 'electric'] },
  grass: { strong: ['water', 'ground', 'rock'], weak: ['fire', 'ice', 'poison', 'flying', 'bug'] },
  electric: { strong: ['water', 'flying'], weak: ['ground'] },
  psychic: { strong: ['fighting', 'poison'], weak: ['bug', 'ghost', 'dark'] },
  ghost: { strong: ['psychic', 'ghost'], weak: ['ghost', 'dark'] },
  dragon: { strong: ['dragon'], weak: ['ice', 'dragon', 'fairy'] },
  normal: { strong: [], weak: ['fighting'] },
  flying: { strong: ['grass', 'fighting', 'bug'], weak: ['electric', 'ice', 'rock'] },
  poison: { strong: ['grass', 'fairy'], weak: ['ground', 'psychic'] },
  ground: { strong: ['fire', 'electric', 'poison', 'rock', 'steel'], weak: ['water', 'grass', 'ice'] },
  rock: { strong: ['fire', 'ice', 'flying', 'bug'], weak: ['water', 'grass', 'fighting', 'ground', 'steel'] },
  ice: { strong: ['grass', 'ground', 'flying', 'dragon'], weak: ['fire', 'fighting', 'rock', 'steel'] },
  bug: { strong: ['grass', 'psychic', 'dark'], weak: ['fire', 'flying', 'rock'] },
  steel: { strong: ['ice', 'rock', 'fairy'], weak: ['fire', 'fighting', 'ground'] },
  dark: { strong: ['psychic', 'ghost'], weak: ['fighting', 'bug', 'fairy'] },
  fairy: { strong: ['fighting', 'dragon', 'dark'], weak: ['poison', 'steel'] },
  fighting: { strong: ['normal', 'ice', 'rock', 'dark', 'steel'], weak: ['flying', 'psychic', 'fairy'] },
};

const getEffectiveness = (attackerTypes, defenderTypes) => {
  if (!attackerTypes || !defenderTypes) return 0;
  
  let bonus = 0;
  for (const aType of attackerTypes) {
    const typeInfo = TYPE_CHART[aType.type.name] || TYPE_CHART[aType];
    if (!typeInfo) continue;
    
    for (const dType of defenderTypes) {
      const defenderTypeName = dType.type?.name || dType;
      if (typeInfo.strong.includes(defenderTypeName)) {
        bonus = 20; // Bonus por ventaja
      }
    }
  }
  return bonus;
};

export const usePokemonGame = (playerPokemon, mathMode, onGameOver, onGameWin, onEarnBits, selectedCards = []) => {
  const [gameState, setGameState] = useState({
    playerHp: 100,
    enemyHp: 100,
    maxEnemyHp: 100,
    turn: 0,
    score: 0,
    energy: 0,
    battlesWon: 0,
    lastAction: null,
    damageMultiplier: 1,
    missCount: 0, // Track failures for boss specials
    bonusCups: 0,
  });

  // Calculate Card-based Passives
  const hasCard = (id) => selectedCards.includes(id);
  
  const dmgBonus = hasCard('gold-pika') ? 0.1 : 0;
  const squirtleDmgBonus = (hasCard('squirtle-card') && playerPokemon.name.toLowerCase().includes('squirtle')) ? 0.15 : 0;
  const startEnergy = hasCard('mewtwo-card') ? 3 : 0;
  const healMult = hasCard('mega-zard-card') ? 1.4 : 1;
  const bitsMult = hasCard('meowth-card') ? 1.5 : 1;
  
  // Generic passive: +2% damage per equipped card
  const globalCardBonus = selectedCards.length * 0.02;

  // Initialize energy with bonus
  useEffect(() => {
    if (startEnergy > 0) {
      setGameState(prev => ({ ...prev, energy: startEnergy }));
    }
  }, [startEnergy]);

  const [enemyPokemon, setEnemyPokemon] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  
  // BOSS POOLS
  const EPIC_BOSS_IDS = [150, 151, 384, 249, 250, 382, 383, 483, 484, 487]; // Mega/Legendary for FInal
  const MID_BOSS_IDS = [6, 9, 3, 94, 65, 130, 149]; // Megas / Gen 1 Stage 3

  // Fetch Enemy
  const fetchNewEnemy = useCallback(async () => {
    try {
      let randomId;
      const isBoss = (gameState.battlesWon + 1) === 10;
      const isMiniBoss = (gameState.battlesWon + 1) % 4 === 0 && !isBoss;

      if (isBoss) {
        randomId = EPIC_BOSS_IDS[Math.floor(Math.random() * EPIC_BOSS_IDS.length)];
      } else if (isMiniBoss) {
        randomId = MID_BOSS_IDS[Math.floor(Math.random() * MID_BOSS_IDS.length)];
      } else {
        // Higher probability of stage 2/3 for later rounds
        const maxRange = gameState.battlesWon > 5 ? 493 : 151;
        randomId = Math.floor(Math.random() * maxRange) + 1;
      }

      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      if (!res.ok) throw new Error("Failed to fetch");
      
      const data = await res.json();
      
      // Scaling Difficulty
      const difficultyMult = 1 + (gameState.battlesWon * 0.15);
      const baseHp = isBoss ? 600 : (isMiniBoss ? 250 : 80);
      const hp = Math.floor(baseHp * difficultyMult);
      
      setEnemyPokemon({
        id: data.id,
        name: data.name,
        sprites: data.sprites,
        stats: data.stats,
        types: data.types, 
        isBoss,
        isMiniBoss
      });
      
      setGameState(prev => ({
        ...prev,
        enemyHp: hp,
        maxEnemyHp: hp,
        lastAction: null,
        missCount: 0 // Reset miss count for new enemy
      }));

      generateNewQuestion();
    } catch (err) {
      console.error("Error fetching pokemon:", err);
      setEnemyPokemon({
        id: 0,
        name: "MissingNo",
        sprites: { front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/substitute.png" },
        types: [],
        isBoss: false
      });
      generateNewQuestion();
    }
  }, [gameState.battlesWon]);

  const generateNewQuestion = () => {
    const difficulty = Math.min(Math.floor(gameState.battlesWon / 3), 2);
    const q = generateMathQuestion(mathMode, difficulty);
    setCurrentQuestion(q);
  };

  const getTypeBonus = () => {
    if (!playerPokemon || !enemyPokemon) return 0;
    const playerTypes = playerPokemon.types || (playerPokemon.type ? [{type: {name: playerPokemon.type}}] : []);
    const enemyTypes = enemyPokemon.types || [];
    return getEffectiveness(playerTypes, enemyTypes);
  };

  const getEnemyBonus = () => {
    if (!playerPokemon || !enemyPokemon) return 0;
    const playerTypes = playerPokemon.types || (playerPokemon.type ? [{type: {name: playerPokemon.type}}] : []);
    const enemyTypes = enemyPokemon.types || [];
    return getEffectiveness(enemyTypes, playerTypes);
  };

  useEffect(() => {
    fetchNewEnemy();
  }, []);

  const submitAnswer = (selectedOption) => {
    if (!currentQuestion) return;

    if (selectedOption === currentQuestion.answer) {
      // Correct
      const bonus = getTypeBonus();
      const chipDamage = (20 + bonus) * (gameState.damageMultiplier + dmgBonus + squirtleDmgBonus + globalCardBonus); 
      const newEnemyHp = gameState.enemyHp - chipDamage;
      
      if (onEarnBits) onEarnBits(Math.round(25 * bitsMult)); 

      setGameState(prev => ({
        ...prev,
        enemyHp: Math.max(0, newEnemyHp),
        energy: Math.min(prev.energy + 1, 10),
        lastAction: 'correct',
        score: prev.score + 10,
        missCount: 0 // Success breaks the boss's momentum
      }));

      if (newEnemyHp <= 0) {
        handleVictory();
      } else {
        setTimeout(() => {
            setGameState(prev => ({ ...prev, lastAction: null }));
            generateNewQuestion(); 
        }, 600);
      }

    } else {
      // WRONG
      const newMissCount = gameState.missCount + 1;
      let damage;
      let action = 'wrong';

      // Boss Special Logic: if 2 misses, boss uses a big attack
      if (newMissCount >= 2 && (enemyPokemon.isBoss || enemyPokemon.isMiniBoss)) {
          damage = 40 + getEnemyBonus(); // Boss special damage
          action = 'boss-special';
      } else {
          damage = 15 + (Math.floor(gameState.battlesWon / 2) * 4) + getEnemyBonus();
      }

      const newPlayerHp = gameState.playerHp - damage;
      
      setGameState(prev => ({
        ...prev,
        playerHp: Math.max(0, newPlayerHp),
        lastAction: action,
        missCount: newMissCount
      }));

      if (newPlayerHp <= 0) {
        setTimeout(() => onGameOver(false), 1000);
      } else {
        setTimeout(() => {
            setGameState(prev => ({ ...prev, lastAction: null }));
            generateNewQuestion(); // Generate new question even on fail to keep it moving
        }, 1000);
      }
    }
  };

  // cost = 2, 3, or 5
  const useSpecialAttack = (level) => {
    const costs = { 1: 2, 2: 3, 3: 5 };
    const powers = { 1: 45, 2: 80, 3: 200 };
    const cost = costs[level];
    
    if (gameState.energy < cost) return false;

    const bonus = getTypeBonus();
    const damage = (powers[level] + bonus) * (gameState.damageMultiplier + dmgBonus + squirtleDmgBonus + globalCardBonus);
    const newEnemyHp = gameState.enemyHp - damage;

    setGameState(prev => ({
      ...prev,
      energy: prev.energy - cost,
      enemyHp: Math.max(0, newEnemyHp),
      lastAction: level === 3 ? 'final-attack' : (level === 2 ? 'medium-attack' : 'small-attack')
    }));

    if (newEnemyHp <= 0) {
      setTimeout(() => handleVictory(), 1500);
    } else {
      setTimeout(() => {
        setGameState(prev => ({ ...prev, lastAction: null }));
        generateNewQuestion();
      }, 1000);
    }

    return true;
  };

  const buyHealth = () => {
    setGameState(prev => ({ ...prev, playerHp: Math.min(100, prev.playerHp + Math.round(60 * healMult)) })); 
  };

  const buyDamage = () => {
    setGameState(prev => ({ ...prev, damageMultiplier: prev.damageMultiplier + 0.35 })); 
  };

  const evolutionStage = Math.min(Math.floor(gameState.battlesWon / 3), 2);
  
  const getPlayerForm = () => {
    if (!playerPokemon.evolutions) return playerPokemon;
    const formName = playerPokemon.evolutions[evolutionStage];
    return {
      ...playerPokemon,
      name: formName,
      display: formName.charAt(0).toUpperCase() + formName.slice(1),
      image: `https://img.pokemondb.net/sprites/home/normal/${formName}.png`
    };
  };

  const playerForm = getPlayerForm();

  const handleVictory = () => {
      const wins = gameState.battlesWon + 1;
      
      if (wins === 10) {
        // Final Bonus Cup Check - STACKING REWARDS
        let finalBonus = 0;
        const pName = playerPokemon.name.toLowerCase();
        
        selectedCards.forEach(id => {
          let isMatch = false;
          if (id === 'gold-pika' && pName.includes('pikachu')) isMatch = true;
          if (id === 'mewtwo-card' && (pName.includes('mewtwo') || pName.includes('mew'))) isMatch = true;
          if (id === 'mega-zard-card' && (pName.includes('char'))) isMatch = true;
          if (id === 'meowth-card' && (pName.includes('meowth') || pName.includes('persian'))) isMatch = true;
          if (id === 'squirtle-card' && (pName.includes('squirtle') || pName.includes('wartortle') || pName.includes('blastoise'))) isMatch = true;

          // Matched cards give +10, unmatched give +2
          finalBonus += isMatch ? 10 : 2;
        });

        setGameState(prev => ({ ...prev, battlesWon: wins, lastAction: 'victory', bonusCups: finalBonus }));
        setTimeout(() => {
           if (onGameWin) onGameWin(finalBonus);
        }, 2000);
        return;
      }

      setGameState(prev => ({
        ...prev,
        battlesWon: wins,
        playerHp: Math.min(100, prev.playerHp + 25), 
        lastAction: 'victory'
      }));

      setTimeout(() => {
         // Evolution check is now automatic via battlesWon
         fetchNewEnemy();
      }, 2000);
  };

  return {
    gameState,
    enemyPokemon,
    currentQuestion,
    submitAnswer,
    useSpecialAttack,
    buyHealth,
    buyDamage,
    evolutionStage,
    playerForm,
    typeBonus: getTypeBonus(),
    enemyTypeBonus: getEnemyBonus()
  };
};
