function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const addResourcesToCache = async (resources) => {
  const cache = await caches.open("v1")
  await cache.addAll(resources)
}

const localResources = [
  "/",
  "/index.html",
  "/index.js",
  "/ctrdashboard.html",
  "/src/styles.css",
  "/src/ctr.js",
  "/src/analytics-api.js",
  "/src/experiments/a.html",
  "/src/experiments/b.html",
  "/images/hero_image.jpg",
]

self.addEventListener("install", (event) => {
  event.waitUntil(
    addResourcesToCache(localResources),
  )

  // INDEXEDDB

  // Creates the schema for indexedDB
  const upgradeStores = (event) => {
      console.log("Upgrading...")

      const db = event.target.result

      // Used to store the current test site to be shown to user
      const userData = db.createObjectStore("userInfo", { keyPath: "userTest" })

      // SCHEMA
      userData.createIndex("testId", "testId", { unique: false })

      userData.transaction.oncomplete = (event) => {
        // Store values in the newly created objectStore.
        const userDataOS = db.transaction("userInfo", "readwrite").objectStore("userInfo");

        let tests = localResources.filter((word) => word.includes('/src/experiments/'))

        userDataOS.add({
          userTest: "src",
          testId: tests[getRandomInt(tests.length)]
        })
      }
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



})

const putInCache = async (request, response) => {
  const cache = await caches.open("v1")
  await cache.put(request, response)
}

const cacheFirst = async ({ request, fallbackUrl }) => {
  // First try to get the resource from the cache
  const responseFromCache = await caches.match(request)
  if (responseFromCache) {
    return responseFromCache
  }

  // Next try to get the resource from the network
  try {
    const responseFromNetwork = await fetch(request)
    // response may be used only once
    // we need to save clone to put one copy in cache
    // and serve second one
    putInCache(request, responseFromNetwork.clone())
    return responseFromNetwork
  } catch (error) {
    const fallbackResponse = await caches.match(fallbackUrl)
    if (fallbackResponse) {
      return fallbackResponse
    }
    // when even the fallback response is not available,
    // there is nothing we can do, but we must always
    // return a Response object
    return new Response("Network error happened", {
      status: 408,
      headers: { "Content-Type": "text/plain" },
    })
  }
}

self.addEventListener("fetch", (event) => {
  event.respondWith(
    cacheFirst({
      request: event.request,
      preloadResponsePromise: event.preloadResponse,
      fallbackUrl: "/index.html",
    }),
  )
})

