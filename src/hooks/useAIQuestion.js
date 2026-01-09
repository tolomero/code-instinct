import { useState } from 'react';
import { QUESTION_MOCKS } from '../constants/gameData';

const apiKey = import.meta.env.VITE_GEMINI_KEY;

export const useAIQuestion = (targetBoss, gameMode, currentLevel, usedQuestions, setUsedQuestions) => {
  const [aiLoading, setAiLoading] = useState(false);

  const fetchQuestion = async (isBoss = false, bossStep = 0, forcedTopic = null) => {
    if (isBoss) {
      if (bossStep < 3) {
        return { ...targetBoss.prelude[bossStep], lore: `Analizando núcleo de ${targetBoss.name}...` };
      } else {
        return { ...targetBoss.fatality, lore: "¡SISTEMA CRÍTICO: EJECUTA EL CÓDIGO!" };
      }
    }

    if (gameMode === 'ia' || forcedTopic) {
      setAiLoading(true);
      try {
        const topic = forcedTopic || 
          (targetBoss.logicType === 'fizzbuzz' ? 'aritmética y lógica JS' : 
           targetBoss.logicType === 'fibonacci' ? 'algoritmos y recursividad (Fibonacci)' :
           targetBoss.logicType === 'primo' ? 'números primos y divisibilidad' :
           targetBoss.logicType === 'poligono' ? 'geometría y cálculo de áreas' :
           'manipulación de strings y arrays');
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
        setAiLoading(false);
        return { ...parsed, lore: `Sincronizando con ${targetBoss.name}...` };
      } catch (e) {
        const pool = targetBoss.logicType === 'fizzbuzz' ? QUESTION_MOCKS.fizzbuzz_minions : 
                     targetBoss.logicType === 'fibonacci' ? QUESTION_MOCKS.fibonacci_minions :
                     targetBoss.logicType === 'primo' ? QUESTION_MOCKS.primo_minions :
                     targetBoss.logicType === 'poligono' ? QUESTION_MOCKS.poligono_minions :
                     QUESTION_MOCKS.anagram_minions;
        setAiLoading(false);
        return { ...pool[Math.floor(Math.random() * pool.length)], lore: "Enlace IA perdido. Backup cargado." };
      }
    }

    const poolKey = targetBoss.logicType === 'fizzbuzz' ? 'fizzbuzz_minions' : 
                    targetBoss.logicType === 'fibonacci' ? 'fibonacci_minions' :
                    targetBoss.logicType === 'primo' ? 'primo_minions' :
                    targetBoss.logicType === 'poligono' ? 'poligono_minions' :
                    'anagram_minions';
    const pool = QUESTION_MOCKS[poolKey];
    
    let available = pool.filter(q => !usedQuestions.includes(q.text));
    if (available.length === 0) {
      setUsedQuestions([]);
      available = pool;
    }

    const q = available.sort(() => Math.random() - 0.5)[Math.floor(Math.random() * available.length)];
    setUsedQuestions(prev => [...prev, q.text]);
    return { ...q, lore: `Secuaz de ${targetBoss.name} bloqueando el acceso.` };
  };

  return { fetchQuestion, aiLoading };
};
