"use strict";

// Selecting elements
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const currente1El = document.getElementById("current--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

const newBtn = document.querySelector(".btn--new");
const rollBtn = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");
const diceEl = document.querySelector(".dice");

let currentScore, activePlayer, playing, scores;

// Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current0El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
init();

const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;

  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// Rolling dice functionality
rollBtn.addEventListener("click", function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove("hidden");

    // 3. Check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

holdBtn.addEventListener("click", function () {
  if (playing) {
    if (currentScore) {
      // 1. Add current score to active player's score
      scores[activePlayer] += currentScore;

      document.getElementById(`score--${activePlayer}`).textContent =
        scores[activePlayer];

      // 2. Check if player's score is >= 100
      if (scores[activePlayer] >= 100) {
        // Finish the game
        playing = false;
        diceEl.classList.add("hidden");

        document
          .querySelector(`.player--${activePlayer}`)
          .classList.remove("player--active");

        document
          .querySelector(`.player--${activePlayer}`)
          .classList.add("player--winner");
      } else {
        // Switch to the next player
        switchPlayer();
      }
    }
  }
});

newBtn.addEventListener("click", init);
