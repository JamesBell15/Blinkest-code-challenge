/**
  If user has not visited makes api request and stores time stamp of request
*/
export const trackPageview = async (params) => {
  let pageView = localStorage.getItem("page-view");

  if (!pageView) {
    let time = Date.now()

    localStorage.setItem("page-view", time);

    apiEndPoint({type: "page-view", time: time})
  }
};

/**
  If user has not clicked make api request and stores time stamp of request
*/
export const trackEvent = async (params) => {
  let signupClick = localStorage.getItem("signup-click");

  if (!signupClick) {
    let time = Date.now()

    localStorage.setItem("signup-click", time);

    apiEndPoint({type: "signup-click", time: time})
  }
};

/**
  pretends to receive api resquest, instead stores in IndexedDB
*/
const apiEndPoint = async (params) => {
  let data = {}

  if (params["type"] == "page-view") {
    data = { time: params["time"], experiment: localStorage.getItem("src") }

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
    data = { time: params["time"], experiment: localStorage.getItem("src") }

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

/**
  sets up page to be track users actions
*/
window.onload = async function () {
  trackPageview()

  let link = document.getElementById("signup");

  link.onclick = function signupClick() {
    trackEvent()
  }
}
