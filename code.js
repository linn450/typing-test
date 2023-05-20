
// words for standard mode NATO Phonetics
document.addEventListener('DOMContentLoaded', function() {

  const standard = ['alpha', 'bravo', 'charlie', 'delta', 
  'echo', 'foxtrot', 'golf', 'hotel', 'india', 'juliett', 
  'kilo', 'lima', 'mike', 'november', 'oscar', 'papa', 
  'quebec', 'romeo', 'sierra', 'tango', 'uniform', 
  'victor', 'whiskey', 'xray', 'yankee', 'zulu'];

  const commonWordsFile = 'Words/commonWords.txt';
  const uniqueWordsFile = 'Words/uniqueWords.txt';

  // add mode for common + unqiue 
  const quoteElement = document.getElementById('quote');
  const inputElement = document.getElementById('input');
  let quoteArray = [];
  let currentIndex = 0;
  let currentDifficulty = 'easy'; // default difficulty level
  let currentText = 'standard'; // default text level

  generateQuote();

  inputElement.addEventListener('input', function() {
    const typedWord = inputElement.value.trim();
    const currentWord = quoteArray[currentIndex];


     // check if word is correct, if correct remove and move on
    if (typedWord === currentWord) {
      inputElement.classList.remove('incorrect');
      inputElement.classList.add('correct');
      currentIndex++;
      inputElement.value = '';
      quoteElement.children[currentIndex - 1].classList.add('hidden');
      if (currentIndex === quoteArray.length) {
        generateQuote();
        currentIndex = 0;
      }

     
      // highlight word to write 
      highlightCurrentWord();
    } else if (currentWord.startsWith(typedWord)) {
      inputElement.classList.remove('incorrect');
      inputElement.classList.remove('correct');
    } else {
      inputElement.classList.add('incorrect');
      inputElement.classList.remove('correct');
    }
  });


  // different texts 
  document.getElementById('standard').addEventListener('click', function() {
    currentText = 'standard';
    generateQuote();
  });
  
  document.getElementById('unique').addEventListener('click', function() {
    currentText = 'unique';
    generateQuote();
  });
  
  document.getElementById('common').addEventListener('click', function() {
    currentText = 'common';
    generateQuote();
  });
  

  // different difficulties / lengths
  document.getElementById('easyButton').addEventListener('click', function() {
    setDifficulty('easy');
  });

  document.getElementById('mediumButton').addEventListener('click', function() {
    setDifficulty('medium');
  });

  document.getElementById('hardButton').addEventListener('click', function() {
    setDifficulty('hard');
  });

  async function generateQuote() {
    quoteArray = [];
    const difficultySettings = {
      easy: { wordCount: 5 },
      medium: { wordCount: 10 },
      hard: { wordCount: 15 }
    };
    const wordCount = difficultySettings[currentDifficulty].wordCount;
    let selectedWords;

    if (currentText === 'standard') {
      selectedWords = standard;
    } else if (currentText === 'unique') {
      selectedWords = await fetchWordsFromFile('Words/uniqueWords.txt');
    } else if (currentText === 'common') {
      selectedWords = await fetchWordsFromFile('Words/commonWords.txt');
    }
  
    for (let i = 0; i < wordCount; i++) {
      const randomIndex = Math.floor(Math.random() * selectedWords.length);
      quoteArray.push(selectedWords[randomIndex]);
    }
  
    quoteElement.innerHTML = '';
    for (let i = 0; i < quoteArray.length; i++) {
      const span = document.createElement('span');
      span.textContent = quoteArray[i];
      quoteElement.appendChild(span);
      if (i < quoteArray.length - 1) {
        const space = document.createTextNode(' ');
        quoteElement.appendChild(space);
      }
    }
  
    currentIndex = 0;
    highlightCurrentWord();
  }
  
  async function fetchWordsFromFile(filename) {
    try {
      const response = await fetch(filename);
      if (!response.ok) {
        throw new Error('Failed to fetch the file');
      }
      const text = await response.text();
      const words = text.trim().split('\n');
      return words;
    } catch (error) {
      console.error('Error fetching words:', error);
      return [];
    }
  }
  

  function setDifficulty(difficulty) {
    currentDifficulty = difficulty;
    generateQuote();
  }

  function highlightCurrentWord() {
    const highlightedWord = document.querySelector('.highlighted');
    if (highlightedWord) {
      highlightedWord.classList.remove('highlighted');
    }
    quoteElement.children[currentIndex].classList.add('highlighted');
  }
});


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

  8: 'backspace', //    'backspace' key

};

const inputElement = document.getElementById('input');

// Attach keydown event listener to the input field
inputElement.addEventListener('keydown', function (event) {
  const keyCode = event.keyCode;
  const soundId = keySounds[keyCode];
  if (soundId) {
    const audio = document.getElementById(soundId);
    audio.play();
  }
});
