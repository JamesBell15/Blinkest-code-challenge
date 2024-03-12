import { trackPageview, trackEvent } from "./src/analytics-api.js"

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



// SERVICE WORKER

const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
      })
      if (registration.installing) {
        console.log("Service worker installing")
      } else if (registration.waiting) {
        console.log("Service worker installed")
      } else if (registration.active) {
        console.log("Service worker active")
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`)
    }
  }
}


registerServiceWorker()
