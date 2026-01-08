export const LORE_CHARACTERS = [
  { name: "Jago", avatar: "🧘", bio: "Purificando el código fuente.", category: "basico" },
  { 
    name: "Sabrewulf", 
    avatar: "🐺", 
    combatImage: "https://static.wikia.nocookie.net/killerinstinct/images/5/50/Sabrewulf.gif/revision/latest?cb=20190223035438&path-prefix=es",
    bio: "Despedazando arrays con garras JS.", 
    category: "basico" 
  },
  { name: "Glacius", avatar: "🧊", bio: "Congelando bugs en runtime.", category: "intermedio" },
  { name: "Fulgore", avatar: "🤖", bio: "Protocolo de combate Ultratech activo.", category: "intermedio" },
  { name: "Cinder", avatar: "🔥", bio: "Quemando scripts ineficientes.", category: "intermedio" }
];

export const QUESTION_MOCKS = {
  fizzbuzz_minions: [
    { type: 'choice', text: "¿Cuál es el resultado de 10 % 3?", options: ["1", "3", "0", "3.33"], correct: 0, damage: 45, solution: "1" },
    { type: 'choice', text: "¿Qué valor devuelve (false || true)?", options: ["false", "undefined", "true", "null"], correct: 2, damage: 45, solution: "true" },
    { type: 'choice', text: "¿Cómo se escribe un ciclo for que vaya de 1 a 10?", options: ["for(i<10)", "for(let i=1; i<=10; i++)", "loop(10)", "for i in 10"], correct: 1, damage: 50, solution: "for(let i=1; i<=10; i++)" },
    { type: 'choice', text: "¿Qué hace el operador '&&'?", options: ["Suma números", "Compara si ambos son verdaderos", "Divide valores", "Es un comentario"], correct: 1, damage: 45, solution: "AND lógico" },
    { type: 'choice', text: "¿Cuál es el resultado de 15 / 3 === 5?", options: ["true", "false", "5", "undefined"], correct: 0, damage: 40, solution: "true" },
    { type: 'choice', text: "¿Cuál es el resultado de 4 + '4'?", options: ["8", "44", "NaN", "undefined"], correct: 1, damage: 40, solution: "44" },
    { type: 'choice', text: "¿Qué retorna typeof []?", options: ["array", "object", "list", "undefined"], correct: 1, damage: 45, solution: "object" },
    { type: 'choice', text: "¿Cuál es el resultado de Boolean(0)?", options: ["true", "false", "null", "undefined"], correct: 1, damage: 40, solution: "false" },
    { type: 'choice', text: "¿Cómo se declara una función flecha?", options: ["()=>{}", "function=>{}", "func(){}", "->()"], correct: 0, damage: 50, solution: "()=>{}" },
    { type: 'choice', text: "¿Resultado de '5' == 5?", options: ["true", "false", "NaN", "error"], correct: 0, damage: 45, solution: "true" },
    { type: 'choice', text: "¿Resultado de '5' === 5?", options: ["true", "false", "NaN", "null"], correct: 1, damage: 45, solution: "false" },
    { type: 'choice', text: "¿Qué método agrega un elemento al final de un array?", options: ["push()", "add()", "append()", "insert()"], correct: 0, damage: 50, solution: "push()" },
    { type: 'choice', text: "¿Cuál es el índice inicial de un array?", options: ["0", "1", "-1", "null"], correct: 0, damage: 40, solution: "0" },
    { type: 'choice', text: "¿Resultado de Math.floor(4.9)?", options: ["4", "5", "4.9", "error"], correct: 0, damage: 45, solution: "4" },
    { type: 'choice', text: "¿Qué devuelve parseInt('10px')?", options: ["10", "NaN", "px", "undefined"], correct: 0, damage: 45, solution: "10" },

    { type: 'choice', text: "¿Qué operador se usa para concatenar strings?", options: ["+", "-", "*", "&"], correct: 0, damage: 40, solution: "+" },
    { type: 'choice', text: "¿Resultado de [] + []?", options: ["[]", "0", "''", "NaN"], correct: 2, damage: 60, solution: "''" },
    { type: 'choice', text: "¿Cómo se convierte un string a número?", options: ["Number()", "String()", "Bool()", "Parse()"], correct: 0, damage: 45, solution: "Number()" },
    { type: 'choice', text: "¿Qué devuelve typeof null?", options: ["null", "object", "undefined", "number"], correct: 1, damage: 55, solution: "object" },
    { type: 'choice', text: "¿Resultado de 2 ** 3?", options: ["6", "8", "9", "5"], correct: 1, damage: 40, solution: "8" },

    { type: 'choice', text: "¿Qué método elimina el último elemento del array?", options: ["pop()", "shift()", "slice()", "splice()"], correct: 0, damage: 45, solution: "pop()" },
    { type: 'choice', text: "¿Qué devuelve 'Hola'.length?", options: ["3", "4", "5", "error"], correct: 2, damage: 40, solution: "5" },
    { type: 'choice', text: "¿Cómo se escribe un if correctamente?", options: ["if x > 3", "if(x > 3){}", "if(x > 3)", "if > 3"], correct: 1, damage: 45, solution: "if(x > 3){}" },
    { type: 'choice', text: "¿Resultado de !!true?", options: ["true", "false", "null", "undefined"], correct: 0, damage: 40, solution: "true" },
    { type: 'choice', text: "¿Resultado de 3 < 5 && 5 < 10?", options: ["true", "false", "null", "error"], correct: 0, damage: 45, solution: "true" },

    { type: 'choice', text: "¿Cómo se comenta una línea?", options: ["//", "/* */", "<!-- -->", "#"], correct: 0, damage: 40, solution: "//" },
    { type: 'choice', text: "¿Resultado de isNaN('abc')?", options: ["true", "false", "null", "error"], correct: 0, damage: 50, solution: "true" },
    { type: 'choice', text: "¿Qué método convierte JSON a objeto?", options: ["JSON.parse()", "JSON.stringify()", "toObject()", "parseJSON()"], correct: 0, damage: 55, solution: "JSON.parse()" },
    { type: 'choice', text: "¿Qué método convierte objeto a JSON?", options: ["JSON.stringify()", "JSON.parse()", "toJSON()", "convert()"], correct: 0, damage: 55, solution: "JSON.stringify()" },
    { type: 'choice', text: "¿Resultado de typeof function(){}?", options: ["object", "function", "class", "null"], correct: 1, damage: 45, solution: "function" },

    { type: 'choice', text: "¿Qué palabra se usa para declarar constante?", options: ["let", "var", "const", "static"], correct: 2, damage: 40, solution: "const" },
    { type: 'choice', text: "¿Qué método filtra arrays?", options: ["filter()", "map()", "reduce()", "sort()"], correct: 0, damage: 45, solution: "filter()" },
    { type: 'choice', text: "¿Resultado de [1,2,3].map(x=>x*2)?", options: ["[2,4,6]", "[1,4,9]", "[3,6,9]", "error"], correct: 0, damage: 60, solution: "[2,4,6]" },
    { type: 'choice', text: "¿Qué operador es OR lógico?", options: ["&&", "||", "??", "!"], correct: 1, damage: 40, solution: "||" },
    { type: 'choice', text: "¿Resultado de !false?", options: ["true", "false", "null", "error"], correct: 0, damage: 40, solution: "true" },

    { type: 'choice', text: "¿Qué método ordena arrays?", options: ["sort()", "order()", "arrange()", "filter()"], correct: 0, damage: 45, solution: "sort()" },
    { type: 'choice', text: "¿Qué devuelve 0 == false?", options: ["true", "false", "NaN", "undefined"], correct: 0, damage: 50, solution: "true" },
    { type: 'choice', text: "¿Qué devuelve 0 === false?", options: ["true", "false", "null", "error"], correct: 1, damage: 50, solution: "false" },
    { type: 'choice', text: "¿Cómo se declara un array?", options: ["{}", "[]", "()", "<>"], correct: 1, damage: 40, solution: "[]" },
    { type: 'choice', text: "¿Qué método elimina el primer elemento?", options: ["shift()", "pop()", "slice()", "splice()"], correct: 0, damage: 45, solution: "shift()" },

    { type: 'choice', text: "¿Resultado de 'a' > 'b'?", options: ["true", "false", "null", "error"], correct: 1, damage: 55, solution: "false" },
    { type: 'choice', text: "¿Qué operador revisa igualdad estricta?", options: ["==", "===", "!=", "="], correct: 1, damage: 40, solution: "===" },
    { type: 'choice', text: "¿Qué palabra rompe un ciclo?", options: ["stop", "break", "exit", "end"], correct: 1, damage: 45, solution: "break" },
    { type: 'choice', text: "¿Resultado de 5 >= 5?", options: ["true", "false", "null", "error"], correct: 0, damage: 40, solution: "true" },
    { type: 'choice', text: "¿Cómo se crea un objeto?", options: ["let x = []", "let x = {}", "let x = ()", "let x = <>"], correct: 1, damage: 40, solution: "{}" }
  ],
  anagram_minions: [
    { type: 'choice', text: "¿Qué método convierte 'hola' en ['h','o','l','a']?", options: [".join()", ".split('')", ".slice()", ".toString()"], correct: 1, damage: 45, solution: ".split('')" },
    { type: 'choice', text: "¿Cómo ordenas ['b', 'a', 'c'] alfabéticamente?", options: [".order()", ".sort()", ".organize()", ".align()"], correct: 1, damage: 45, solution: ".sort()" },
    { type: 'choice', text: "¿Qué devuelve 'roma'.split('').reverse().join('')?", options: ["roma", "amor", "mora", "ramo"], correct: 1, damage: 50, solution: "amor" },
    { type: 'choice', text: "¿Cómo obtienes la longitud de un string?", options: [".size", ".length()", ".length", ".count"], correct: 2, damage: 40, solution: ".length" },
    { type: 'choice', text: "¿Qué hace .toLowerCase()?", options: ["Borra el texto", "Pone todo en minúsculas", "Corta el texto", "Lo traduce"], correct: 1, damage: 45, solution: "minúsculas" },
    { type: 'choice', text: "¿Qué método convierte un string en array por espacios?", options: [".split(' ')", ".join(' ')", ".slice()", ".splice()"], correct: 0, damage: 45, solution: ".split(' ')" },
  { type: 'choice', text: "¿Cómo unes ['h','o','l','a'] en 'hola'?", options: [".merge()", ".concat()", ".join('')", ".combine()"], correct: 2, damage: 45, solution: ".join('')" },
  { type: 'choice', text: "¿Qué devuelve 'perro'.includes('rr')?", options: ["true", "false", "null", "undefined"], correct: 0, damage: 40, solution: "true" },
  { type: 'choice', text: "¿Cómo obtienes el primer carácter de un string?", options: ["str[0]", "str.first()", "str.char()", "str.get(0)"], correct: 0, damage: 40, solution: "str[0]" },
  { type: 'choice', text: "¿Qué devuelve 'hola'.charAt(1)?", options: ["h", "o", "l", "a"], correct: 1, damage: 45, solution: "o" },
  { type: 'choice', text: "¿Qué método elimina espacios al inicio y fin?", options: [".cut()", ".clean()", ".trim()", ".strip()"], correct: 2, damage: 45, solution: ".trim()" },
  { type: 'choice', text: "¿Resultado de 'OSO'.toLowerCase()?", options: ["OSO", "oso", "Oso", "oSo"], correct: 1, damage: 40, solution: "oso" },
  { type: 'choice', text: "¿Cómo ordenas letras ignorando mayúsculas?", options: ["sort()", "sort((a,b)=>a.localeCompare(b))", "sortLower()", "order()"], correct: 1, damage: 55, solution: "localeCompare" },
  { type: 'choice', text: "¿Qué devuelve 'hola'.replace('h','')?", options: ["hola", "ola", "hla", "hoa"], correct: 1, damage: 45, solution: "ola" },
  { type: 'choice', text: "¿Qué método extrae parte del string?", options: [".slice()", ".cut()", ".divide()", ".extract()"], correct: 0, damage: 45, solution: ".slice()" },

  { type: 'choice', text: "¿Qué devuelve 'banana'.split('a')?", options: ["['b','n','n']", "['b','n','n','']", "['b','n','n','']","['b','an','an']"], correct: 1, damage: 60, solution: "['b','n','n','']" },
  { type: 'choice', text: "¿Cómo detectas si dos palabras son anagramas?", options: ["Comparando length", "Ordenando y comparando", "Usando includes()", "Con ==="], correct: 1, damage: 60, solution: "Ordenar y comparar" },
  { type: 'choice', text: "¿Resultado de 'abc'.repeat(2)?", options: ["abc", "abcabc", "aabbcc", "error"], correct: 1, damage: 45, solution: "abcabc" },
  { type: 'choice', text: "¿Qué método busca la posición de una letra?", options: [".search()", ".find()", ".indexOf()", ".pos()"], correct: 2, damage: 45, solution: ".indexOf()" },
  { type: 'choice', text: "¿Qué devuelve 'roma'.startsWith('r')?", options: ["true", "false", "null", "undefined"], correct: 0, damage: 40, solution: "true" },

  { type: 'choice', text: "¿Qué método convierte a mayúsculas?", options: [".toUpper()", ".upperCase()", ".toUpperCase()", ".capitalize()"], correct: 2, damage: 45, solution: ".toUpperCase()" },
  { type: 'choice', text: "¿Qué devuelve 'sol'.padStart(5,'*')?", options: ["sol**", "**sol", "*sol*", "*****"], correct: 1, damage: 55, solution: "**sol" },
  { type: 'choice', text: "¿Cómo separas cada letra de 'js'?", options: ["'js'.split()", "'js'.split('')", "'js'.cut()", "'js'.divide()"], correct: 1, damage: 40, solution: ".split('')" },
  { type: 'choice', text: "¿Resultado de 'oso'.split('').reverse().join('')?", options: ["oso", "oos", "soo", "error"], correct: 0, damage: 45, solution: "oso" },
  { type: 'choice', text: "¿Qué método reemplaza todas las coincidencias?", options: [".replace()", ".replaceAll()", ".change()", ".swap()"], correct: 1, damage: 50, solution: ".replaceAll()" },

  { type: 'choice', text: "¿Qué devuelve 'hola mundo'.split(' ').length?", options: ["1", "2", "3", "10"], correct: 1, damage: 40, solution: "2" },
  { type: 'choice', text: "¿Cómo obtienes la última letra de un string?", options: ["str[-1]", "str.last()", "str[str.length-1]", "str.end()"], correct: 2, damage: 45, solution: "str[str.length-1]" },
  { type: 'choice', text: "¿Resultado de 'abc'.slice(1,3)?", options: ["a", "bc", "ab", "c"], correct: 1, damage: 45, solution: "bc" },
  { type: 'choice', text: "¿Qué devuelve 'carro'.endsWith('o')?", options: ["true", "false", "null", "undefined"], correct: 0, damage: 40, solution: "true" },
  { type: 'choice', text: "¿Cómo eliminas una letra específica?", options: ["replace()", "remove()", "delete()", "cut()"], correct: 0, damage: 45, solution: "replace()" },

  { type: 'choice', text: "¿Qué devuelve '123'.split('')?", options: ["[1,2,3]", "['1','2','3']", "[123]", "error"], correct: 1, damage: 40, solution: "['1','2','3']" },
  { type: 'choice', text: "¿Resultado de 'roma'.localeCompare('amor')?", options: ["0", "1", "-1", "error"], correct: 1, damage: 60, solution: "1" },
  { type: 'choice', text: "¿Cómo cuentas letras repetidas?", options: ["Con objeto contador", "Con length", "Con includes", "Con sort"], correct: 0, damage: 55, solution: "Objeto contador" },
  { type: 'choice', text: "¿Qué método devuelve un array de letras ordenadas?", options: ["split().sort()", "order()", "arrange()", "align()"], correct: 0, damage: 45, solution: "split().sort()" },
  { type: 'choice', text: "¿Qué devuelve 'Aba'.toLowerCase() === 'aba'?", options: ["true", "false", "null", "error"], correct: 0, damage: 40, solution: "true" },

  { type: 'choice', text: "¿Qué método verifica contenido?", options: ["has()", "contains()", "includes()", "search()"], correct: 2, damage: 45, solution: "includes()" },
  { type: 'choice', text: "¿Resultado de 'abc'.substring(1)?", options: ["a", "bc", "ab", "c"], correct: 1, damage: 45, solution: "bc" },
  { type: 'choice', text: "¿Qué método convierte string en array?", options: ["split()", "join()", "slice()", "map()"], correct: 0, damage: 40, solution: "split()" },
  { type: 'choice', text: "¿Cómo inviertes un string?", options: ["split().reverse().join()", "reverse()", "invert()", "flip()"], correct: 0, damage: 55, solution: "split().reverse().join()" },
  { type: 'choice', text: "¿Resultado de 'aaab'.replaceAll('a','')?", options: ["b", "aaab", "bbb", ""], correct: 0, damage: 50, solution: "b" },

  { type: 'choice', text: "¿Qué devuelve 'sol'.charAt(0)?", options: ["s", "o", "l", ""], correct: 0, damage: 40, solution: "s" },
  { type: 'choice', text: "¿Cómo comparas anagramas ignorando espacios?", options: ["trim()", "replace(/ /g,'')", "split(' ')", "slice()"], correct: 1, damage: 60, solution: "replace(/ /g,'')" },
  { type: 'choice', text: "¿Resultado de 'javascript'.indexOf('script')?", options: ["4", "5", "3", "-1"], correct: 0, damage: 45, solution: "4" },
    { type: 'choice', text: "¿Qué devuelve 'abc'.padEnd(5,'x')?", options: ["xxabc", "abcxx", "abxxx", "error"], correct: 1, damage: 50, solution: "abcxx" },
    { type: 'choice', text: "¿Cómo eliminas todas las vocales?", options: ["replace(/[aeiou]/g,'')", "removeVowels()", "delete()", "slice()"], correct: 0, damage: 60, solution: "replace(/[aeiou]/g,'')" }
  ],
  fibonacci_minions: [
    { type: 'code', text: "Para calcular Fibonacci, sumamos el elemento (n-1) y el elemento (n-2). Completa la fórmula: fib[n] = fib[n-1] + ___", solution: "fib[n-2]", damage: 60, lore: "Cerebro cibernético activo." },
    { type: 'choice', text: "¿Cuál es el quinto número de la serie (empezando en 0, 1, 1...)?", options: ["2", "3", "5", "8"], correct: 1, damage: 50, solution: "3" },
    { type: 'code', text: "Si usamos un bucle, ¿qué método de array usamos para guardar el nuevo número?", solution: "push", damage: 60, lore: "Optimizando registros." },
    { type: 'choice', text: "¿Cuál es el valor de fib(0) y fib(1)?", options: ["0 y 1", "1 y 1", "0 y 0", "1 y 2"], correct: 0, damage: 50, solution: "0 y 1" },
    { type: 'code', text: "Para obtener el penúltimo elemento de un array 'res': res[res.length - ___]", solution: "2", damage: 60, lore: "Acceso a memoria." }
  ]
};

export const BOSS_CHARACTERS = [
  { 
    id: "aria",
    name: "SABREWULF", 
    avatar: "🐺", 
    selectionImage: "https://static.wikia.nocookie.net/killerinstinct/images/1/1b/Killer_Instinct_-_Sabrewulf.png/revision/latest?cb=20190223040600&path-prefix=es",
    combatImage: "https://static.wikia.nocookie.net/killerinstinct/images/5/50/Sabrewulf.gif/revision/latest?cb=20190223035438&path-prefix=es",
    bio: "Hombre Lobo. Objetivo: FizzBuzz con garras.", 
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
    selectionImage: "https://static.wikia.nocookie.net/killerinstinct/images/7/7e/Killer_Instinct_-_Spinal.png/revision/latest?cb=20190223033611&path-prefix=es",
    combatImage: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjczbTNxcm0zYXA0ZDd1eTFyNGM0aGJ2anY4a21tbWtwOGdocG1mNiZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/2HLgioDpWoK7m/giphy.gif",
    bio: "Guerrero Maldito. Reto: Anagramas.", 
    isFinal: true,
    logicType: "anagram",
    prelude: [
      { type: 'choice', text: "¿Qué método convierte un string en un array de caracteres?", options: [".join('')", ".split('')", ".slice()", ".reverse()"], correct: 1, damage: 50, solution: ".split('')" },
      { type: 'choice', text: "¿Cómo ordenarías alfabéticamente los elementos de un array?", options: [".order()", ".sort()", ".organize()", ".align()"], correct: 1, damage: 50, solution: ".sort()" },
      { type: 'choice', text: "Dos palabras son anagramas si al ordenarlas...", options: ["Son diferentes", "Tienen distinta longitud", "Son exactamente iguales", "Suman cero"], correct: 2, damage: 50, solution: "Iguales" }
    ],
    fatality: { type: 'code', text: "¡FATALITY! Función que reciba (str1, str2) y retorne true si son anagramas (mismas letras, distinto orden).", solution: "anagram", damage: 300 }
  },
  { 
    id: "fulgore",
    name: "FULGORE", 
    avatar: "🤖",
    selectionImage: "https://static.wikia.nocookie.net/killerinstinct/images/0/09/Killer_Instinct_-_Fulgore.png/revision/latest?cb=20190223041607&path-prefix=es",
    combatImage: "https://static.wikia.nocookie.net/killerinstinct/images/b/b2/Fulgore.gif/revision/latest?cb=20190223041708&path-prefix=es",
    bio: "Cyborg de Combate. Reto: Fibonacci.", 
    isFinal: true,
    logicType: "fibonacci",
    prelude: [
      { type: 'choice', text: "¿Qué número sigue en la serie: 0, 1, 1, 2, 3, 5, 8?", options: ["11", "13", "15", "21"], correct: 1, damage: 55, solution: "13" },
      { type: 'choice', text: "Fibonacci(n) es la suma de Fibonacci(n-1) y...", options: ["n-2", "Fibonacci(n-2)", "Fibonacci(n+1)", "2"], correct: 1, damage: 55, solution: "Fibonacci(n-2)" },
      { type: 'choice', text: "¿Cuál es la complejidad ideal para generar Fibonacci?", options: ["O(1)", "O(n)", "O(n^2)", "O(log n)"], correct: 1, damage: 60, solution: "O(n)" }
    ],
    fatality: { type: 'code', text: "¡FATALITY! SUCESIÓN DE FIBONACCI: Imprime los 50 primeros números de la serie empezando en 0 y 1.", solution: "fibonacci", damage: 300 }
  }
];
