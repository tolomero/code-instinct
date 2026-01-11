import React, { useState, useEffect } from 'react';
import { Home } from 'lucide-react';

// Constants
import { LORE_CHARACTERS, QUESTION_MOCKS, BOSS_CHARACTERS, PLAYER_CHARACTERS } from './constants/gameData';

// Screens
import StartScreen from './components/screens/StartScreen';
import BossSelection from './components/screens/BossSelection';
import CharacterSelection from './components/screens/CharacterSelection';
import OutcomeScreen from './components/screens/OutcomeScreen';
import PokemonSelection from './components/pokemon/PokemonSelection';

// Game Components
import MathModeSelection from './components/pokemon/MathModeSelection';
import PokemonBattleArena from './components/pokemon/PokemonBattleArena';
import HUD from './components/game/HUD';
import CombatArena from './components/game/CombatArena';
import QuestionInfo from './components/game/QuestionInfo';
import ChoiceButtons from './components/game/ChoiceButtons';
import CodeEditor from './components/game/CodeEditor';


// Hooks
import { useAIQuestion } from './hooks/useAIQuestion';

// Utils
import { audioManager, SOUNDS } from './utils/audio';

// Overlays
import ShopOverlay from './components/overlays/ShopOverlay';
import TopicSelectorOverlay from './components/overlays/TopicSelectorOverlay';
import ExitConfirmationOverlay from './components/overlays/ExitConfirmationOverlay';
import SolutionOverlay from './components/overlays/SolutionOverlay';
export default function App() {
  const [gameState, setGameState] = useState('start'); 
  const [selectedPlayer, setSelectedPlayer] = useState(PLAYER_CHARACTERS[1]); // Naruto por defecto (index 1)
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
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [showTopicSelector, setShowTopicSelector] = useState(false);
  const [bossStep, setBossStep] = useState(0);
  const [hasShield, setHasShield] = useState(false);
  const [usedQuestions, setUsedQuestions] = useState([]);
  const [showHomeConfirm, setShowHomeConfirm] = useState(false);
  const [boughtHint, setBoughtHint] = useState(false);
  const [defeatedBosses, setDefeatedBosses] = useState(() => JSON.parse(localStorage.getItem('defeatedBosses') || '[]'));
  const [showVictoryGif, setShowVictoryGif] = useState(false);
  const [unlockedPokemonIds, setUnlockedPokemonIds] = useState(() => JSON.parse(localStorage.getItem('unlockedPokemonIds') || '[7, 25]'));
  const [unlockedCardIds, setUnlockedCardIds] = useState(() => JSON.parse(localStorage.getItem('unlockedCardIds') || '[]'));
  const [cups, setCups] = useState(() => parseInt(localStorage.getItem('cups') || '0'));

  // Sync with Local Storage
  useEffect(() => {
    localStorage.setItem('cups', cups);
  }, [cups]);

  useEffect(() => {
    localStorage.setItem('defeatedBosses', JSON.stringify(defeatedBosses));
  }, [defeatedBosses]);

  useEffect(() => {
    localStorage.setItem('unlockedPokemonIds', JSON.stringify(unlockedPokemonIds));
  }, [unlockedPokemonIds]);

  useEffect(() => {
    localStorage.setItem('unlockedCardIds', JSON.stringify(unlockedCardIds));
  }, [unlockedCardIds]);

  const { fetchQuestion: getNextQuestion, aiLoading } = useAIQuestion(targetBoss, gameMode, currentLevel, usedQuestions, setUsedQuestions);

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
    setBoughtHint(false);
    setShowHomeConfirm(false);
    setShowVictoryGif(false);
    setInputCode("");
    setBossStep(0);
  };

  const fetchQuestion = async (isBoss = false, stage = null, forcedTopic = null) => {
    setAttempts(0);
    setShowSolution(false);
    setInputCode("");
    
    const currentStep = stage !== null ? stage : bossStep;
    const nextQ = await getNextQuestion(isBoss, currentStep, forcedTopic);
    setQuestion(nextQ);

    // Cambiar visual del oponente en ronda de jefe
    if (isBoss) {
      if (currentStep < 3) {
        const cat = currentStep === 2 ? 'intermedio' : 'basico';
        const filtered = LORE_CHARACTERS.filter(c => c.category === cat);
        const minion = filtered[Math.floor(Math.random() * filtered.length)];
        const rank = currentStep === 2 ? 'COMANDANTE' : 'GUARDIÁN';
        setOpponent({ ...minion, name: `${rank} DE ${targetBoss.name}` });
      } else {
        setOpponent(targetBoss);
      }
    }
  };

  const startFight = (level, mode, boss = null) => {
    const selectedBoss = boss || targetBoss;
    setGameMode(mode);
    setCurrentLevel(level);
    setTargetBoss(selectedBoss);
    setEnemyHp(level === 2 ? 300 : 100);
    setBossStep(0);
    setPlayerHp(level === 0 ? 100 : playerHp); 
    setHasShield(false);
    setBoughtHint(false);
    
    let char;
    if (level === 2) {
      // Empezar con un esbirro visual
      const filtered = LORE_CHARACTERS.filter(c => c.category === 'basico');
      const minion = filtered[Math.floor(Math.random() * filtered.length)];
      char = { ...minion, name: `GUARDIÁN DE ${selectedBoss.name}` };
    } else {
      const cat = level === 0 ? 'basico' : 'intermedio';
      const filtered = LORE_CHARACTERS.filter(c => c.category === cat);
      char = filtered[Math.floor(Math.random() * filtered.length)];
    }
    
    setOpponent(char);
    setGameState('playing');
  };

  useEffect(() => {
    if (gameState === 'start') {
      const playLobbyMusic = () => {
        audioManager.playMusic(SOUNDS.LOBBY_1, false, () => {
          audioManager.playMusic(SOUNDS.LOBBY_2, true, null, 0.05);
        }, 0.05);
      };
      playLobbyMusic();
    } else if (gameState === 'boss-selection') {
      audioManager.playMusic(SOUNDS.BOSS_SELECTION, true, null, 0.05);
    } else if (gameState === 'won') {
      audioManager.stopMusic();
      audioManager.playSFX(SOUNDS.VICTORY, 0.3);
    } else if (gameMode === 'pokemon' && ['pokemon-selection', 'math-selection', 'playing'].includes(gameState)) {
      audioManager.playMusic(SOUNDS.POKEMON_BGM, true, null, 0.05, 2000);
    }
  }, [gameState, gameMode]);

  useEffect(() => {
    // Evitar lógica de juego normal si estamos en modo Pokemon
    if (gameMode === 'pokemon') return;

    if (gameState === 'playing' && opponent && !question) {
      if (!question) {
        audioManager.playSFX(SOUNDS.READY_FIGHT, 0.4);
        
        // Iniciar secuencia de música de batalla con volumen MUY bajo y fade in
        setTimeout(() => {
          audioManager.playMusic(SOUNDS.LOBBY_1, false, () => {
            audioManager.playMusic(SOUNDS.LOBBY_2, true, null, 0.03, 5000);
          }, 0.03, 4000);
        }, 1500); 
      }
      fetchQuestion(currentLevel === 2);
    }
  }, [opponent, gameState, gameMode]);

  const handleAttack = (isCorrect) => {
    if (animating || showSolution || !question) return;

    if (isCorrect) {
      const damage = question.type === 'code' ? 300 : (question.damage || 40);
      const potentialHp = enemyHp - damage;
      // Si es un jefe y no es el paso de la Fatality, dejarlo mínimo en 1 HP
      const finalHp = (currentLevel === 2 && bossStep < 3) ? Math.max(1, potentialHp) : Math.max(0, potentialHp);

      setAnimating('player-attack');
      setEnemyHp(finalHp);
      setComboCount(prev => prev + 1);
      setBits(prev => prev + 50);
      setFeedback(question.type === 'code' ? "FATALITY_IMAGE" : "¡ULTRA COMBO!");
      
      if (question.type === 'code') {
        audioManager.playSFX(SOUNDS.ULTRA_COMBO, 0.6);
        audioManager.playSFX(SOUNDS.FATALITY, 0.8, 500);
      } else {
        // Sonido base o sonido especial para el Developer
        if (selectedPlayer?.id === 'dev') {
          audioManager.playSFX(SOUNDS.DEV_ATTACK, 0.5);
        } else if (selectedPlayer?.id === 'pikachu') {
          audioManager.playSFX(SOUNDS.PIKACHU_SPECIAL, 0.5);
        } else if (selectedPlayer?.id === 'tralalero') {
          audioManager.playSFX(SOUNDS.TRALALERO_ATTACK, 0.8, 0, 6000);
        } else {
          audioManager.playSFX(SOUNDS.HIT, 0.4);
        }

        if (comboCount === 2) { 
          audioManager.playSFX(SOUNDS.FIGHTING_COMBO, 0.5, 500);
        }
        if (comboCount === 4) {
          audioManager.playSFX(SOUNDS.FIGHTING_COMBO_FIVE_HITS, 0.5, 500);
        }
      }

      let nextStep = bossStep;
      if (currentLevel === 2) {
        nextStep = bossStep + 1;
        setBossStep(nextStep);
      }

      const attackDuration = selectedPlayer?.id === 'tralalero' ? 6000 : 1000;
      setTimeout(() => {
        setAnimating(null);
        if (finalHp > 0) {
            fetchQuestion(currentLevel === 2, nextStep);
        }
      }, attackDuration);
    } else {
      if (hasShield) {
        setHasShield(false);
        setFeedback("¡ESCUDO ACTIVADO!");
        setAnimating('shield-hit');
        audioManager.playSFX(SOUNDS.DAMAGE, 0.4);
        setTimeout(() => setAnimating(null), 800);
        return;
      }

      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setAnimating('enemy-attack');
      setPlayerHp(prev => Math.max(0, prev - 20));
      setComboCount(0);
      setFeedback(selectedPlayer?.id === 'tralalero' ? "TRALALERO_FAIL" : "¡COMBO BREAKER!");
      audioManager.playSFX(SOUNDS.DAMAGE, 0.4);
      audioManager.playSFX(SOUNDS.COMBO_BREAKER, 0.5);

      if (newAttempts >= 2) setShowSolution(true);
      setTimeout(() => setAnimating(null), 1000);
    }
  };

  const validateManual = () => {
    if (!question) return;
    const clean = inputCode.toLowerCase().replace(/\s/g, "");
    
    // Si es un esbirro con pregunta tipo código
    if (currentLevel < 2 && question.type === 'code') {
      const isCorrect = clean.includes(question.solution.toLowerCase().replace(/\s/g, ""));
      handleAttack(isCorrect);
      return;
    }

    if (targetBoss.logicType === 'fizzbuzz') {
      const isFizzBuzz = clean.includes("for") && clean.includes("%3") && clean.includes("%5");
      handleAttack(isFizzBuzz);
    } else if (targetBoss.logicType === 'anagram') {
      const isAnagram = (clean.includes("split") && clean.includes("sort") && clean.includes("join")) || clean.includes("length");
      handleAttack(isAnagram);
    } else if (targetBoss.logicType === 'fibonacci') {
      const isFib = (clean.includes("for") || clean.includes("while")) && clean.includes("+") && (clean.includes("50") || clean.includes("length"));
      handleAttack(isFib);
    } else if (targetBoss.logicType === 'primo') {
      const isPrimo = clean.includes("for") && clean.includes("%") && clean.includes("if") && (clean.includes("100") || clean.includes("<="));
      handleAttack(isPrimo);
    } else if (targetBoss.logicType === 'poligono') {
      const isPoly = clean.includes("function") && (clean.includes("triangulo") || clean.includes("cuadrado") || clean.includes("rectangulo")) && clean.includes("*");
      handleAttack(isPoly);
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
          // Si es jefe, dar 10 copas y marcar como derrotado
          if (currentLevel === 2) {
            setCups(prev => prev + 10);
            setDefeatedBosses(prev => [...new Set([...prev, opponent.id])]);
            setShowVictoryGif(true);
          }
          setGameState('won');
          setTimeout(() => {
            setShowVictoryGif(false);
            resetGame();
          }, 6000);
        }
      }, 1000);
    }
    if (playerHp <= 0) setGameState('lost');
  }, [enemyHp, playerHp]);

  // Vistas principales
  if (gameState === 'start') {
    return (
      <StartScreen 
        onStartArcade={() => { setGameMode('arcade'); setGameState('boss-selection'); }}
        onStartIA={() => { setGameMode('ia'); setGameState('boss-selection'); }}
        onStartPokemon={() => { setGameMode('pokemon'); setGameState('pokemon-selection'); }}
        onSelectPlayer={() => setGameState('character-selection')}
        selectedPlayer={selectedPlayer}
      />
    );
  }

  if (gameState === 'pokemon-selection') {
    return (
      <PokemonSelection 
        onBack={() => setGameState('start')}
        cups={cups}
        unlockedPokemonIds={unlockedPokemonIds}
        unlockedCardIds={unlockedCardIds}
        onUnlockPokemon={(id, cost) => {
          setCups(c => c - cost);
          setUnlockedPokemonIds(prev => [...new Set([...prev, id])]);
        }}
        onBuyCard={(id, cost) => {
          setCups(c => c - cost);
          setUnlockedCardIds(prev => [...new Set([...prev, id])]);
        }}
        onSelect={(poke) => {
          setSelectedPlayer({ ...poke, image: `https://img.pokemondb.net/sprites/home/normal/${poke.name}.png` });
          setGameState('math-selection'); 
        }}
      />
    );
  }

  if (gameState === 'math-selection') {
    return (
      <MathModeSelection 
        onBack={() => setGameState('pokemon-selection')}
        onSelectMode={(mode) => {
          setTargetBoss({ id: mode, name: mode.toUpperCase() }); 
          startFight(0, 'pokemon', { id: mode, name: mode.toUpperCase() });
        }}
      />
    );
  }

  if (gameState === 'character-selection') {
    return (
      <CharacterSelection 
        onBack={() => setGameState('start')}
        selectedId={selectedPlayer?.id}
        onSelectCharacter={(char) => { setSelectedPlayer(char); setGameState('start'); }}
        cups={cups}
      />
    );
  }

  if (gameState === 'boss-selection') {
    return (
      <BossSelection 
        gameMode={gameMode}
        onBack={() => resetGame('start')}
        onSelectBoss={(boss) => startFight(0, gameMode, boss)}
        defeatedBosses={defeatedBosses}
        cups={cups}
      />
    );
  }

  if (gameState === 'won' || gameState === 'lost') {
    return <OutcomeScreen gameState={gameState} onReset={() => resetGame('start')} isBoss={currentLevel === 2} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white font-mono flex flex-col overflow-hidden select-none relative">
      
      {/* MODO POKEMON */}
      {gameMode === 'pokemon' && targetBoss ? (
        <PokemonBattleArena 
           playerPokemon={selectedPlayer}
           mathMode={targetBoss} 
           bits={bits}
           onEarnBits={(amount) => setBits(b => b + amount)}
           onSpendBits={(amount) => setBits(b => Math.max(0, b - amount))}
           onGameOver={(won) => {
             setGameState(won ? 'won' : 'lost');
           }}
           onGameWin={() => {
             // Victory against Boss 15 CUPS
             setCups(c => c + 15);
             setGameState('won');
             setShowVictoryGif(true);
             setTimeout(() => setShowVictoryGif(false), 6000);
           }}
           onBack={() => resetGame('start')}
        />
      ) : (
        /* MODO NORMAL (ARCADE / IA) */
        <>
            {/* BOTÓN SALIR / HOME */}
            <button 
                onClick={() => setShowHomeConfirm(true)}
                className="absolute top-2 left-2 md:top-20 md:left-4 z-[60] p-1.5 md:p-3 bg-red-600/20 hover:bg-red-600 rounded-full transition-all border border-red-600/50 group shadow-lg"
                title="Opciones de salida"
            >
                <Home className="group-hover:scale-110 transition-transform" size={16} />
            </button>

            {/* MODAL DE CONFIRMACIÓN DE SALIDA (HOME) */}
      {showHomeConfirm && (
        <ExitConfirmationOverlay 
          onBackToBosses={() => resetGame('boss-selection')}
          onBackToStart={() => resetGame('start')}
          onClose={() => setShowHomeConfirm(false)}
        />
      )}

      {/* SHOP OVERLAY */}
      {isShopOpen && (
        <ShopOverlay 
          bits={bits}
          playerHp={playerHp}
          hasShield={hasShield}
          onBuyRepair={() => { if(bits >= 100) { setBits(b => b-100); setPlayerHp(100); }}}
          onBuyShield={() => { if(bits >= 150) { setBits(b => b-150); setHasShield(true); }}}
          onBuyHint={() => { if(bits >= 250) { setBits(b => b-250); setBoughtHint(true); }}}
          hintBought={boughtHint}
          currentHint={targetBoss?.partialFatalityHint}
          onClose={() => { if(question) setIsShopOpen(false); else { setIsShopOpen(false); startFight(currentLevel + 1, gameMode); } }}
          canProceed={!question}
        />
      )}

      {/* TOPIC SELECTOR IA */}
      {showTopicSelector && (
        <TopicSelectorOverlay 
          onSelectTopic={(topic) => { setShowTopicSelector(false); fetchQuestion(false, topic); }}
          onClose={() => setShowTopicSelector(false)}
        />
      )}

      {/* HUD RESPONSIVO */}
      <HUD 
        bits={bits}
        playerHp={playerHp}
        opponent={opponent}
        currentLevel={currentLevel}
        enemyHp={enemyHp}
        comboCount={comboCount}
      />

      {/* COMBAT ARENA */}
      <CombatArena 
        animating={animating}
        opponent={opponent}
        player={selectedPlayer}
        feedback={feedback}
        showVictoryGif={showVictoryGif}
        bossStep={bossStep}
        currentLevel={currentLevel}
      />

      {/* CONTROL AREA RESPONSIVO */}
      <div className="h-auto md:h-[40%] bg-black flex flex-col md:flex-row border-t-4 border-red-900 overflow-y-auto md:overflow-hidden">
        <QuestionInfo 
          question={question}
          attempts={attempts}
          aiLoading={aiLoading}
          onShowTopicSelector={() => setShowTopicSelector(true)}
          onShowShop={() => setIsShopOpen(true)}
          isBossRound={currentLevel === 2}
        />

        <div className="w-full md:w-2/3 p-4 md:p-8 bg-black/40 min-h-[300px] md:min-h-0">
          {!question || aiLoading ? (
            <div className="h-full flex items-center justify-center text-gray-700 font-black italic animate-pulse tracking-widest text-xs md:text-base">SINCRONIZANDO COMBATE...</div>
          ) : question.type === 'choice' ? (
            <ChoiceButtons 
              options={question.options}
              onSelect={(i) => handleAttack(i === question.correct)}
              disabled={!!animating}
              showSolution={showSolution}
            />
          ) : (
            <CodeEditor 
              value={inputCode}
              onChange={setInputCode}
              onExecute={validateManual}
              disabled={!!animating}
              logicType={targetBoss?.logicType}
            />
          )}
        </div>
      </div>

      {showSolution && (
        <SolutionOverlay 
          solution={question?.solution}
          onContinue={() => { setShowSolution(false); fetchQuestion(currentLevel === 2); }}
        />
      )}
      </>
      )}
    </div>
  );
}