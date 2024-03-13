

// TODO: set up DB
// TODO: Calculate Click Through Rate



// Creates the schema for indexedDB
const upgradeStores = (event) => {
    console.log("Upgrading...")

    const db = event.target.result

    const pageViews = db.createObjectStore("pageViews", { autoIncrement: true })

    pageViews.createIndex("time", "time", { unique: false })

    const signupClicks = db.createObjectStore("signupClicks", { autoIncrement: true })

    signupClicks.createIndex("time", "time", { unique: false })

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

const getPageViews = async () => {
  const requestIDB = indexedDB.open("db", 4)

  return new Promise (function(resolve) {
    requestIDB.onsuccess = async (event) => {
      const transaction = requestIDB.result.transaction("pageViews")
      const sightingStore = transaction.objectStore("pageViews")

      sightingStore.count().onsuccess = async (event) => {

        return resolve(event.target.result)
      }
    }
  })
}

const getSignupClicks = async () => {

  const requestIDB = indexedDB.open("db", 4)

  return new Promise (function(resolve) {
    requestIDB.onsuccess = async (event) => {
      const transaction = requestIDB.result.transaction("signupClicks")
      const sightingStore = transaction.objectStore("signupClicks")

      sightingStore.count().onsuccess = async (event) => {

        return resolve(event.target.result)
      }
    }
  })
}

const getCTR = async () => {
  let pageViews = await getPageViews()
  let signupClicks = await getSignupClicks()

  return signupClicks / pageViews
}


window.onload = async function () {
  let frame = document.getElementById("test-frame")
  let signupClicksText = document.getElementById("clicks")
  let pageViewsText = document.getElementById("visits")
  let ctrText = document.getElementById("click through rate")

  pageViewsText.innerText = await getPageViews()
  signupClicksText.innerText = await getSignupClicks()
  ctrText.innerText = await getCTR()

}