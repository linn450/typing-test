document.addEventListener('DOMContentLoaded', function() {
  const wordTypes = {
    standard: [
      'alpha', 'bravo', 'charlie', 'delta', 'echo', 'foxtrot', 'golf', 'hotel', 
      'india', 'juliett', 'kilo', 'lima', 'mike', 'november', 'oscar', 'papa', 
      'quebec', 'romeo', 'sierra', 'tango', 'uniform', 'victor', 'whiskey', 
      'xray', 'yankee', 'zulu'
    ],
    common: [
      'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i', 'it', 'for', 
      'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at', 'this', 'but', 'his', 
      'by', 'from', 'they'
    ],
    unique: [
      'apple', 'banana', 'carrot', 'dragon', 'elephant', 'flamingo', 'giraffe', 
      'hedgehog', 'iguana', 'jaguar', 'koala', 'lemon', 'mango', 'nutmeg', 
      'orange', 'papaya', 'quokka', 'raspberry', 'strawberry', 'tomato', 'uakari', 
      'vanilla', 'watermelon', 'xylophone', 'yak', 'zebra'
    ]
  };

  const quoteElement = document.getElementById('quote');
  const inputElement = document.getElementById('input');
  let quoteArray = [];
  let currentIndex = 0;
  let currentDifficulty = 'easy'; // default difficulty level
  let currentWordType = 'standard'; // default word type

  generateQuote();

  inputElement.addEventListener('input', function() {
    const typedWord = inputElement.value.trim();
    const currentWord = quoteArray[currentIndex];

    if (typedWord === currentWord) {
      inputElement.classList.remove('incorrect');
      inputElement.classList.add('correct');
      quoteElement.children[currentIndex].classList.add('hidden');
      currentIndex++;
      inputElement.value = '';
      if (currentIndex === quoteArray.length) {
        generateQuote();
        currentIndex = 0;
      }
      highlightCurrentWord();
    } else if (currentWord.startsWith(typedWord)) {
      inputElement.classList.remove('incorrect');
      inputElement.classList.remove('correct');
    } else {
      inputElement.classList.add('incorrect');
      inputElement.classList.remove('correct');
    }
  });

  document.getElementById('standard').addEventListener('click', function() {
    setWordType('standard');
  });

  document.getElementById('common').addEventListener('click', function() {
    setWordType('common');
  });

  document.getElementById('unique').addEventListener('click', function() {
    setWordType('unique');
  });

  document.getElementById('easyButton').addEventListener('click', function() {
    setDifficulty('easy');
  });

  document.getElementById('mediumButton').addEventListener('click', function() {
    setDifficulty('medium');
  });

  document.getElementById('hardButton').addEventListener('click', function() {
    setDifficulty('hard');
  });

  function setWordType(wordType) {
    currentWordType = wordType;
    generateQuote();
  }

  function setDifficulty(difficulty) {
    currentDifficulty = difficulty;
    generateQuote();
  }

  function generateQuote() {
    quoteArray = [];
    const difficultySettings = {
      easy: { wordCount: 5 },
      medium: { wordCount: 10 },
      hard: { wordCount: 15 }
    };
    const wordCount = difficultySettings[currentDifficulty].wordCount;

    for (let i = 0; i < wordCount; i++) {
      const randomIndex = Math.floor(Math.random() * wordTypes[currentWordType].length);
      quoteArray.push(wordTypes[currentWordType][randomIndex]);
    }

    quoteElement.innerHTML = '';
    quoteArray.forEach((word, index) => {
      const span = document.createElement('span');
      span.textContent = word;
      quoteElement.appendChild(span);
      if (index !== quoteArray.length - 1) {
        const space = document.createTextNode(' ');
        quoteElement.appendChild(space);
      }
    });

    const quoteSpans = quoteElement.querySelectorAll('span');
    quoteSpans.forEach((span, index) => {
      if (index !== 0) {
        span.classList.add('hidden');
      }
    });

    currentIndex = 0;
    highlightCurrentWord();
  }

  function highlightCurrentWord() {
    const quoteSpans = quoteElement.querySelectorAll('span');
    quoteSpans.forEach((span, index) => {
      if (index === currentIndex) {
        span.classList.add('current');
      } else {
        span.classList.remove('current');
      }
    });
  }


// keyboard sounds 
const keySounds = {

  65: 'a', //    'a' key
  66: 'b', //    'b' key
  67: 'c', //    'c' key
  68: 'd', //    'd' key
  69: 'e', //    'e' key
  70: 'f', //    'f' key
  71: 'g', //    'g' key
  72: 'h', //    'h' key
  73: 'i', //    'i' key
  74: 'j', //    'j' key
  75: 'k', //    'k' key
  76: 'l', //    'l' key
  77: 'm', //    'm' key
  78: 'n', //    'n' key
  79: 'o', //    'o' key
  80: 'p', //    'p' key
  81: 'q', //    'q' key
  82: 'r', //    'r' key
  83: 's', //    's' key
  84: 't', //    't' key
  85: 'u', //    'u' key
  86: 'v', //    'v' key
  87: 'w', //    'w' key
  88: 'x', //    'x' key
  89: 'y', //    'y' key
  90: 'z', //    'z' key

  8: 'backspace', 
};

inputElement.addEventListener('keydown', function(event) {
  const keyCode = event.keyCode;
  const soundId = keySounds[keyCode];
  if (soundId) {
    const audio = document.getElementById(soundId);
    if (audio) {
      audio.play();
    }
  }
});
});