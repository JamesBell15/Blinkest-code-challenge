import { EXPERIMENTS } from "./src/experiments.js";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// Randomly assigns a page to the user and stores page
let test = localStorage.getItem("src");

if (!test) {
  let tests = EXPERIMENTS.filter((word) => word.includes('/src/experiments/'))

  test = tests[getRandomInt(tests.length)]

  localStorage.setItem("src", test);
}

let frame = document.getElementById("test-frame")
frame.src = test
