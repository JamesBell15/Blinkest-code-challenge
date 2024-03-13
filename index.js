
// Your code here

// Add function on the sign up button independetly of how page is set up
// Use href="/signup"

// Innialise indexedDB to let uniquily identify users

// Of active pages display randomly the page, and make sure all api
// Requests are linked to that page

// TODO: Randomly select page for user
// TODO: Don't change page when refreshed

// TODO: link track api request to signup button
// TODO: link track api requests to view site

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// No access to the file system so add manually
const experiments = [
  "/src/experiments/a.html",
  "/src/experiments/b.html",
]

let test = localStorage.getItem("src");

console.log(test)

if (!test) {
  let tests = experiments.filter((word) => word.includes('/src/experiments/'))

  test = tests[getRandomInt(tests.length)]

  localStorage.setItem("src", test);
}

let frame = document.getElementById("test-frame")
frame.src = test
