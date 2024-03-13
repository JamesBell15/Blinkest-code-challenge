/**
 * Tracks a pageview to our "imaginary api" - in this demo just the browser console. ;)
 * Send as params whatever you might seem valuable to send.
 * The URL is probably a good start though.
 */
export const trackPageview = async (params) => {
  console.log(`--> Tracking Pageview: ${params}`);

  let pageView = localStorage.getItem("page-view");

  if (!pageView) {
    let time = Date.now()

    localStorage.setItem("page-view", time);

    apiEndPoint({type: "page-view", time: time})
  }
};

/**
 * Tracks an event to our "imaginary api" - in this demo just the browser console. ;)
 * Send as params whatever you might seem valuable to send.
 * The URL and an event name are probably a good start though.
 */
export const trackEvent = async (params) => {
  console.log(`--> Tracking Event: ${params}`);

  let signupClick = localStorage.getItem("signup-click");

  if (!signupClick) {
    let time = Date.now()

    localStorage.setItem("signup-click", time);

    apiEndPoint({type: "signup-click", time: time})
  }
};

const apiEndPoint = async (params) => {
  let data = {}

  if (params["type"] == "page-view") {
    data = { time: params["time"] }

    const requestIDB = indexedDB.open("db", 4)

    requestIDB.onsuccess = async (event) => {
      const transaction = requestIDB.result.transaction(["pageViews"], "readwrite")
      const sightingStore = transaction.objectStore("pageViews")

      sightingStore.add(data).onsuccess = async (event) => {
        console.log("page view added")
      }
    }
  }

  if (params["type"] == "signup-click") {
    data = { time: params["time"] }

    const requestIDB = indexedDB.open("db", 4)

    requestIDB.onsuccess = async (event) => {
      const transaction = requestIDB.result.transaction(["signupClicks"], "readwrite")
      const sightingStore = transaction.objectStore("signupClicks")

      sightingStore.add(data).onsuccess = async (event) => {
        console.log("sign up click added")
      }
    }

  }
}

window.onload = async function () {

  trackPageview()

  let link = document.getElementById("signup");

  link.onclick = function signupClick() {
    trackEvent()
  }
}
