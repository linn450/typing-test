

const typingSound = document.getElementById('typing-sound');
const textElement = document.querySelector('.typing-text');

textElement.addEventListener('keydown', () => {
  typingSound.play();
});

// generate words
document.addEventListener('DOMContentLoaded', function() {
    const words = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew', 'kiwi', 'lemon', 'mango', 'nectarine', 'orange', 'pear', 'quince', 'raspberry', 'strawberry', 'tangerine', 'watermelon'];
    const quoteElement = document.getElementById('quote');
    const inputElement = document.getElementById('input');
    let quoteArray = [];
    let currentIndex = 0;
  
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
        } else {
          highlightCurrentWord();
        }
      } else if (currentWord.startsWith(typedWord)) {
        inputElement.classList.remove('incorrect');
        inputElement.classList.remove('correct');
      } else {
        inputElement.classList.add('incorrect');
        inputElement.classList.remove('correct');
      }
    });
  
    // randomize words
    function generateQuote() {
      quoteArray = [];
      for (let i = 0; i < 10; i++) {
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
      highlightCurrentWord();
    }
  
    function highlightCurrentWord() {
      const currentWord = quoteArray[currentIndex];
      quoteElement.children[currentIndex].classList.add('highlighted');
    }
  });
  