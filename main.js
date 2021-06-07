"use strict";

const assert = require("assert");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let board = [];
let solution = "abcd";
let letters = ["a", "b", "c", "d", "e", "f", "g", "h"];

const printBoard = () => {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
};

const generateSolution = () => {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
};

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const generateHint = (guess) => {
  // take the current guess and give a hint related to it
  // your code here
  // if solution is abcd and guess is efac what would hint be
  // would return 0-2
  // first loop checking equality
  // looping for each point using includes

  let solutionArray = solution.split("");
  let guessArray = guess.split("");
  let correctLetterLocations = 0;
  for (let i = 0; i < solutionArray.length; i++) {
    if (solutionArray[i] === guessArray[i]) {
      correctLetterLocations++;
      solutionArray[i] = null;
    }
  }

  let correctLetters = 0;
  for (let i = 0; i < solutionArray.length; i++) {
    // almost done i think i fixed the if statement 1st for loop should be good
    if (solutionArray.indexOf(guessArray[i]) !== -1) {
      correctLetters++;
      solutionArray[i] = null;
    } else {
      continue;
    }
  }
  let hint =
    correctLetterLocations.toString() + " " + correctLetters.toString();
  return hint;
};

const mastermind = (guess) => {
  // Comment this out to generate a random solution
  // your code here
  generateHint(guess);
  if (guess === solution) {
    return "You guessed it!";
  } else if (board.length === 10) {
    return "You ran out of turns! The solution was " + solution;
  } else {
    return "Guess again.";
  }
};

const getPrompt = () => {
  rl.question("guess: abcd", (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
};

// Tests

if (typeof describe === "function") {
  solution = "abcd";
  describe("#mastermind()", () => {
    it("should register a guess and generate hints", () => {
      mastermind("aabb");
      assert.equal(board.length, 1);
    });
    it("should be able to detect a win", () => {
      assert.equal(mastermind(solution), "You guessed it!");
    });
  });

  describe("#generateHint()", () => {
    it("should generate hints", () => {
      assert.equal(generateHint("abdc"), "2-2");
    });
    it("should generate hints if solution has duplicates", () => {
      assert.equal(generateHint("aabb"), "1-1");
    });
  });
} else {
  generateSolution();
  getPrompt();
}
