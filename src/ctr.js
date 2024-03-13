

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