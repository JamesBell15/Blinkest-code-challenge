import { trackPageview, trackEvent } from "./analytics-api.js";

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

let frame = document.getElementById("test-frame")

const change = function change() {


  if (frame.src == './experiments/a.html'){
    frame.src = './experiments/b.html'
  } else {
    frame.src = './experiments/a.html'
  }
}



let innerDoc = frame.contentDocument || frame.contentWindow.document;
console.log(innerDoc)
let button = innerDoc.getElementById("button")
console.log(button)
// button.onclick = change



console.log(frame)
