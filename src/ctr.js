import { EXPERIMENTS } from "./experiments.js";

// Creates the schema for indexedDB
const upgradeStores = (event) => {
    console.log("Upgrading...")

    const db = event.target.result

    const pageViews = db.createObjectStore("pageViews", { autoIncrement: true })

    pageViews.createIndex("time", "time", { unique: false })

    pageViews.createIndex("experiment", "experiment", { unique: false } )

    const signupClicks = db.createObjectStore("signupClicks", { autoIncrement: true })

    signupClicks.createIndex("time", "time", { unique: false })

    signupClicks.createIndex("experiment", "experiment", { unique: false } )

    console.log("Upgraded!")
}

const requestIDB = indexedDB.open("db", 4)

requestIDB.onupgradeneeded = (event) => {
    upgradeStores(event)
}

requestIDB.onsuccess = (event) => {
    console.log(`indexedDB opened`)
}

requestIDB.onerror = (event) => {
    console.log(`DB ERROR: ${event.target.errorCode}`)
}

const getPageViews = async (experiment) => {
  const requestIDB = indexedDB.open("db", 4)

  return new Promise (function(resolve) {

    requestIDB.onsuccess = async (event) => {
      const transaction = requestIDB.result.transaction("pageViews")
      const sightingStore = transaction.objectStore("pageViews")

      count = 0

      sightingStore.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          if (cursor.value.experiment == experiment) {
            count += 1
          }

          cursor.continue();
        } else {
          return resolve(count)
        }
      }
    }
  })
}

const getSignupClicks = async (experiment) => {

  const requestIDB = indexedDB.open("db", 4)

  return new Promise (function(resolve) {
    requestIDB.onsuccess = async (event) => {
      const transaction = requestIDB.result.transaction("signupClicks")
      const sightingStore = transaction.objectStore("signupClicks")

      count = 0

      sightingStore.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          if (cursor.value.experiment == experiment) {
            count += 1
          }

          cursor.continue();
        } else {
          return resolve(count)
        }
      }
    }
  })
}

const getCTR = async (experiment) => {
  let pageViews = await getPageViews(experiment)
  let signupClicks = await getSignupClicks(experiment)

  return signupClicks / pageViews
}

// To get data out of a IndexedDB request need to manipulate a global variable
let count

window.onload = async function () {
  let frame = document.getElementById("test-frame")
  let signupClicksText = document.getElementById("clicks")
  let pageViewsText = document.getElementById("visits")
  let ctrText = document.getElementById("click through rate")

  for (let i in EXPERIMENTS) {
    let experiment = EXPERIMENTS[i]

    let pageViews = await getPageViews(experiment)
    let signupClicks = await getSignupClicks(experiment)
    let ctr = await getCTR(experiment)

    pageViewsText.innerText += ` ${experiment}: ${pageViews}`
    signupClicksText.innerText += ` ${experiment}: ${signupClicks}`
    ctrText.innerText += ` ${experiment}: ${ctr}`
  }
}