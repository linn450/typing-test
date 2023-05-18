document.addEventListener('DOMContentLoaded', function() {
  const words = ['alpha', 'bravo', 'charlie', 
  'delta', 'echo', 'foxtrot', 'golf', 'hotel', 
  'india', 'juliett', 'kilo', 'lima', 'mike', 
  'november', 'oscar', 'papa', 'quebec', 
  'romeo', 'sierra', 'tango', 'uniform', 
  'victor', 'whiskey', 'xray', 'yankee' , 'zulu'];

  const quoteElement = document.getElementById('quote');
  const inputElement = document.getElementById('input');
  let quoteArray = [];
  let currentIndex = 0;
  let currentDifficulty = 'easy'; // Default difficulty level

  generateQuote();

  inputElement.addEventListener('input', function() {
    const typedWord = inputElement.value.trim();
    const currentWord = quoteArray[currentIndex];

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
      highlightCurrentWord();
    } else if (currentWord.startsWith(typedWord)) {
      inputElement.classList.remove('incorrect');
      inputElement.classList.remove('correct');
    } else {
      inputElement.classList.add('incorrect');
      inputElement.classList.remove('correct');
    }
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
      const randomIndex = Math.floor(Math.random() * words.length);
      quoteArray.push(words[randomIndex]);
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

  function highlightCurrentWord() {
    const highlightedWord = document.querySelector('.highlighted');
    if (highlightedWord) {
      highlightedWord.classList.remove('highlighted');
    }
    quoteElement.children[currentIndex].classList.add('highlighted');
  }
});
