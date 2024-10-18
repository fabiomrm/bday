// Global variables
const cards = document.querySelectorAll('.memory-card');
let isGameCompleted = false;

function checkDateAndScroll(section) {
  const currentDate = new Date();
  const targetDate = new Date('2024-10-20');
  
  // Check if the current date matches the target date
  if (currentDate.toDateString() === targetDate.toDateString()) {
    scrollToSection(section);
  } else {
    alert('Sua safaaada! Essa semana não é a do seu aniversário');
  }
}

// Random images on load
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.image-grid');
  const images = Array.from(container.querySelectorAll('.image-wrapper'));
  
  // Shuffle the images array
  const shuffledImages = shuffleArray(images);
  
  // Clear the container
  container.innerHTML = '';
  
  // Append shuffled images
  shuffledImages.forEach(image => {
      container.appendChild(image);
  });
});

function shuffleArray(array) {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle
  while (currentIndex !== 0) {

      // Pick a remaining element
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // Swap it with the current element
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

// Scroll to section
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
  }

   // Start the countdown when scrolling to the "congratulations" section after clicking "clique aqui"
   if (sectionId === 'congratulations') {
    startCountdown();
}
}

// Section GAMES
document.addEventListener('DOMContentLoaded', () => {
  const typingEffect = document.querySelector('.typing-effect');
  const answerArea = document.querySelector('.answer-area');
  
  // Get the computed style of the typing effect to determine animation duration
  const animationDuration = window.getComputedStyle(typingEffect).animationDuration;

  // Convert the duration to milliseconds (CSS durations are in seconds)
  const durationInMs = parseFloat(animationDuration) * 1000;

  // Add a delay to the appearance of the answer area
  setTimeout(() => {
    answerArea.classList.add('show');
  }, durationInMs);
});

document.addEventListener('DOMContentLoaded', () => {
  const image = document.querySelector('.pop-out-image img');
  const container = document.getElementById('congratulations');

  function setRandomPosition() {
    // Get the container's dimensions
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    // Generate random positions within the container's boundaries
    const randomTop = Math.random() * (containerHeight - image.offsetHeight);
    const randomLeft = Math.random() * (containerWidth - image.offsetWidth);

    // Apply the random positions
    image.style.top = `${randomTop}px`;
    image.style.left = `${randomLeft}px`;
  }

  // Set an initial random position on page load
  setRandomPosition();

  // Update the position every 1 seconds
  setInterval(() => {
    setRandomPosition();
  }, 1000);
});

// SPIN
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('.spin-image');
  
  // Function to set the position of an image
  function setPosition(image, top, left) {
    image.style.top = `${top}%`;
    image.style.left = `${left}%`;
  }

  // Example: Setting positions for multiple images
  setPosition(images[0], 20, 30); // First image at 20% from top and 30% from left
  setPosition(images[1], 50, 60); // Second image at 50% from top and 60% from left
  
  // Add more positions as needed
});

function startCountdown() {
  const countdownElement = document.querySelector('.countdown');
  const typingEffectElement = document.querySelector('#toBeDisplayedOne');
  const typingEffectElementTthree = document.querySelector("#toBeDisplayedThree");
  const typingEffectElementTwo = document.querySelector("#toBeDisplayedTwo");
  const congratsElement = document.querySelector('#congrats');
  const initialCountdown = 10; // Starting number for the countdown

  let countdown = initialCountdown;
  const intervalId = setInterval(() => {
    countdownElement.textContent = countdown;
    countdown--;

    if (countdown < 0) {
      clearInterval(intervalId);
      countdownElement.classList.add('hidden'); // Hide the countdown
      typingEffectElement.classList.remove('hidden'); // Show the typing effect text
      typingEffectElementTwo.classList.remove('hidden');
      typingEffectElementTthree.classList.remove('hidden');
      congratsElement.classList.add('hidden');
    }
  }, 1000); // Update every second
}

// MEMORY GAME
document.addEventListener('DOMContentLoaded', () => {
  let hasFlippedCard = false;
  let lockBoard = false;
  let firstCard, secondCard;

  function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
      // first click
      hasFlippedCard = true;
      firstCard = this;
      return;
    }

    // second click
    secondCard = this;
    checkForMatch();
  }

  function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCards() : unflipCards();
  }

  function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
  }

  function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      resetBoard();
    }, 1500);
  }

  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }

  (function shuffle() {
    cards.forEach(card => {
      let randomPos = Math.floor(Math.random() * 12);
      card.style.order = randomPos;
    });
  })();

  cards.forEach(card => card.addEventListener('click', flipCard));
});


// Timer for the memory game
const counterBox = document.createElement('div');
counterBox.className = 'counter-box';
counterBox.innerHTML = `<div id="counter">0:00</div>`;
document.querySelector('#games-container').appendChild(counterBox);

let startTime, timerInterval;

function startTimer() {
  startTime = new Date();
  timerInterval = setInterval(() => {
    const elapsedTime = new Date() - startTime;
    const seconds = Math.floor(elapsedTime / 1000);
    const minutes = Math.floor(seconds / 60);
    document.getElementById('counter').textContent = `${minutes}:${seconds % 60 < 10 ? '0' : ''}${seconds % 60}`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function showCompletionMessage() {
  const completionMessage = document.getElementById('completion-message');
  completionMessage.style.display = 'block';
  completionMessage.querySelector('.message').textContent = `Anote quanto tempo você levou: ${document.getElementById('counter').textContent}`;
}



// Add this logic to detect game completion
function checkGameCompletion() {
  // Replace this with your actual game completion check
  const isGameCompleted = Array.from(cards).every(card => card.classList.contains('flip'));
  if (isGameCompleted) {
    stopTimer();
    showCompletionMessage();
  }
}

setInterval(checkGameCompletion, 1000); // Adjust as needed


/* TYPING GAME */
document.addEventListener('DOMContentLoaded', () => {
  const textToTypeElement = document.getElementById('text-to-type');
  const userInputElement = document.getElementById('user-input');
  const timerElement = document.getElementById('timer');
  const wordsPerMinuteElement = document.getElementById('words-per-minute');
  const nextTextButton = document.getElementById('next-text');

  const texts = [
      "vamos vamos vamos vaaaamos vamos vamos, vamos vamos vamos vaaaaaamos vamos vamos!!!",
      "To com fome to com fooooooome, to com fome to com fooooooooome!",
      "Casa suja, chão sujo. Chão sujo, casa suja.",
      "Falador passa mal rapaz, falador passa mal.",
      "Bagre branco, branco bagre.",
      "Não confunda ornitorrinco com otorrinolaringologista, ornitorrinco com ornitologista, ornitologista com otorrinolaringologista, porque ornitorrinco é ornitorrinco, ornitologista é ornitologista, e otorrinolaringologista é otorrinolaringologista."
  ];

  let startTime;
  let timerInterval;
  let isTypingStarted = false;

  function getRandomText() {
      const randomIndex = Math.floor(Math.random() * texts.length);
      return texts[randomIndex];
  }

  function startTimer() {
      if (!isTypingStarted) {
          startTime = new Date();
          timerInterval = setInterval(updateTimer, 1000);
          isTypingStarted = true;
      }
  }

  function updateTimer() {
      const elapsedTime = (new Date() - startTime) / 1000;
      const minutes = Math.floor(elapsedTime / 60);
      const seconds = Math.floor(elapsedTime % 60);
      timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  function stopTimer() {
      clearInterval(timerInterval);
      isTypingStarted = false;
      calculateTypingSpeed();
  }

  function calculateTypingSpeed() {
      const elapsedTime = (new Date() - startTime) / 1000; // in seconds
      const minutes = elapsedTime / 60;
      const words = userInputElement.value.trim().split(/\s+/).length;
      const wpm = Math.round(words / minutes);
      wordsPerMinuteElement.textContent = wpm;
  }

  function initGame() {
      const randomText = getRandomText();
      textToTypeElement.textContent = randomText;
      userInputElement.value = ''; // Clear the input field
      userInputElement.style.borderColor = '#9b59b6'; // Reset the border color
      timerElement.textContent = '0:00'; // Reset the timer display
      wordsPerMinuteElement.textContent = '0'; // Reset the WPM display
  }

  userInputElement.addEventListener('input', () => {
      startTimer();
      const typedText = userInputElement.value;
      const originalText = textToTypeElement.textContent;
      if (typedText === originalText) {
          userInputElement.style.borderColor = 'green'; // Change border to green
          stopTimer();
      }
  });

  nextTextButton.addEventListener('click', initGame);

  // Initialize the game on page load
  initGame();
});


document.addEventListener('DOMContentLoaded', () => {
  const images = ['amy', 'maggie', 'nala', 'pretinha'];
  const animalNames = ['amy', 'maggie', 'nala', 'pretinha']; // Replace with actual animal names
  let score = 0;
  let attempts = 10;
  let currentAnimal;

  const animalNameElement = document.getElementById('animal-name');
  const scoreElement = document.getElementById('score');
  const attemptsElement = document.getElementById('attempts');
  const gameContainer = document.getElementById('game-container');

  function startGame() {
    if (attempts <= 0) {
      alert('Game Over! Final Score: ' + score);
      return;
    }

    // Hide all images initially
    document.querySelectorAll('.animal-image').forEach(img => img.style.display = 'none');

    // Randomly pick an animal and display its image
    currentAnimal = images[Math.floor(Math.random() * images.length)];
    animalNameElement.textContent = `Clique em ${animalNames[images.indexOf(currentAnimal)]}!`;

    // Display images randomly in different positions
    images.forEach(animal => {
      const img = document.getElementById(animal);
      img.style.top = `${Math.random() * (gameContainer.offsetHeight - 100)}px`;
      img.style.left = `${Math.random() * (gameContainer.offsetWidth - 100)}px`;
      img.style.display = 'block';
    });

    // Set a timeout to hide the images after 1 second
    setTimeout(() => {
      document.querySelectorAll('.animal-image').forEach(img => img.style.display = 'none');
    }, 2500);

    // Set a timeout for the next round
    setTimeout(startGame, 2500);
  }

  function handleClick(event) {
    if (event.target.classList.contains('animal-image')) {
      if (event.target.id === currentAnimal) {
        score++;
      } else {
        score--;
      }
      scoreElement.textContent = score;
      attempts--;
      attemptsElement.textContent = attempts;
    }
  }

  gameContainer.addEventListener('click', handleClick);
  startGame();
});



// CONTROL GAMES SHOW
// Get the current date in BRT time
function getCurrentDateBRT() {
  const currentDateUTC = new Date();
  const currentDateBRT = new Date(currentDateUTC.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
  return currentDateBRT;
}

// Set the start date (replace with the actual start date you want, e.g., "2024-09-23")
const startDate = new Date('2024-09-23T00:00:00');
const currentDateBRT = getCurrentDateBRT();
const timeDiff = currentDateBRT - startDate;
const daysPassed = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

// List of game sections (in order of appearance)
const gameSections = ['memory-game', 'typing-speed-game', 'animal-click-game', 'color-pattern-game'];

// Hide all sections initially
document.querySelectorAll('.game-section').forEach(section => {
  section.style.display = 'none';
});

// Show the correct section based on how many days have passed
if (daysPassed >= 0 && daysPassed < gameSections.length) {
  const sectionToShow = document.getElementById(gameSections[daysPassed]);
  sectionToShow.style.display = 'block';
} 



/* COLOR PATTERN */
const colorButtons = {
  red: document.getElementById('red'),
  blue: document.getElementById('blue'),
  green: document.getElementById('green'),
  yellow: document.getElementById('yellow')
};

let colorSequence = [];
let userSequence = [];
let level = 1;
const levelDisplay = document.getElementById('level-number');
const messageArea = document.getElementById('message-area');

function generateRandomColor() {
  const colors = ['red', 'blue', 'green', 'yellow'];
  return colors[Math.floor(Math.random() * colors.length)];
}

function showSequence() {
  userSequence = [];
  let index = 0;

  const interval = setInterval(() => {
      if (index < colorSequence.length) {
          const color = colorSequence[index];
          colorButtons[color].classList.add('flash');
          
          setTimeout(() => {
              colorButtons[color].classList.remove('flash');
          }, 500);  // Flash for half a second

          index++;
      } else {
          clearInterval(interval);
      }
  }, 1000);  // Wait 1 second between each color flash
}

function startNewLevel() {
  colorSequence.push(generateRandomColor());
  levelDisplay.textContent = level;
  showSequence();
}

function handleUserInput(color) {
  userSequence.push(color);
  const currentIndex = userSequence.length - 1;

  if (userSequence[currentIndex] !== colorSequence[currentIndex]) {
      messageArea.textContent = "Game Over! You reached Level " + level;
      messageArea.classList.add('game-over');  // Add the red color class for game over message
      resetGame();
      return;
  }

  if (userSequence.length === colorSequence.length) {
      messageArea.textContent = "Correct! Moving to Level " + (level + 1);
      messageArea.classList.remove('game-over');  // Remove red color for correct message
      level++;
      setTimeout(startNewLevel, 1000);
  }
}

function resetGame() {
  colorSequence = [];
  userSequence = [];
  level = 1;
}

document.getElementById('start-game').addEventListener('click', function() {
  messageArea.textContent = '';
  messageArea.classList.remove('game-over');  // Reset the message color
  resetGame();
  startNewLevel();
});

Object.keys(colorButtons).forEach(color => {
  colorButtons[color].addEventListener('click', function() {
      if (colorSequence.length) {
          handleUserInput(color);
      }
  });
});
