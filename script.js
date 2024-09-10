document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll('.card');

    function handleCardClick(event) {
        const targetSelector = event.currentTarget.getAttribute('data-target');
        const targetSection = document.querySelector(targetSelector);

         const isVisible = targetSection.style.display === 'block';

        document.querySelectorAll('.hidden-section').forEach(section => {
            section.style.display = 'none';
        });

        if (!isVisible) {
            targetSection.style.display = 'block';
        } else {
            targetSection.style.display = 'none';
        }
    }

    cards.forEach(card => {
        card.addEventListener('click', handleCardClick);
    });
});

// memory game
const cards = document.querySelectorAll('.memory-card');

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