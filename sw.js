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


self.addEventListener("fetch", async (event) => {

  const req = event.request

  const url = new URL(req.url);

  url.pathname = '/src/experiments/b.html'

  console.log(url)

  return Response.redirect(url)

  // Enable Passthrough to allow direct access to control and test routes.
  // if (url.pathname.startsWith("/src/experiments/")) { return fetch(req) }

  // if (url.pathname == '/'){
  //   // Determine which group this requester is in.
  //   const cookie = req.headers.get("cookie");

  //   if (cookie && cookie.includes(`test-src=/src/experiments/`)) {
  //     url.pathname = cookie.replace('test-src=','');
  //   } else {
  //     console.log('cookie set')

  //     // If there is no cookie, this is a new client. Choose a group and set the cookie.
  //     let tests = localResources.filter((word) => word.includes('/src/experiments/'))

  //     url.pathname = tests[getRandomInt(tests.length)]

  //     console.log(url)
  //     // Reconstruct response to avoid immutability
  //     let res = await fetch(url);
  //     res = new Response(res.body, res);
  //     // Set cookie to enable persistent A/B sessions.
  //     res.headers.append("Set-Cookie", `test-src=${url.pathname};  path=/`);

  //     console.log(res)
  //     return res;
  //   }
  // }

  // return fetch(url);










  // const url = new URL(event.request.url)

  // console.log(`1: ${url.pathname}`)


  // if (url.pathname == '/'){
  //   url.pathname = '/src/experiments/b.html'

  //   event.respondWith(
  //   cacheFirst({
  //     request: url,
  //     preloadResponsePromise: event.preloadResponse,
  //     fallbackUrl: "/index.html",
  //   }),
  // )

  // }

  //   indexedDB.open("db", 4).onsuccess = async (event) => {
  //     event.target.result.transaction("userInfo")
  //       .objectStore("userInfo")
  //       .get("src").onsuccess = async (event) => {
  //         console.log(`${event.target.result.testId}`);

  //         url.pathname = event.target.result.testId

  //         console.log(`3: ${url.pathname}`)

  //         event.respondWith(url)
  //       };
  //     }



  // }


  // console.log(`2: ${url.pathname}`)

  // event.respondWith(caches.match(url))


  // event.respondWith(
  //   cacheFirst({
  //     request: url,
  //     preloadResponsePromise: event.preloadResponse,
  //     fallbackUrl: "/index.html",
  //   }),
  // )
})


 // INDEXEDDB

  // Creates the schema for indexedDB
  // const upgradeStores = (event) => {
  //     console.log("Upgrading...")

  //     const db = event.target.result

  //     // Used to store the current test site to be shown to user
  //     const userData = db.createObjectStore("userInfo", { keyPath: "userTest" })

  //     // SCHEMA
  //     userData.createIndex("testId", "testId", { unique: false })

  //     userData.transaction.oncomplete = (event) => {
  //       // Store values in the newly created objectStore.
  //       const userDataOS = db.transaction("userInfo", "readwrite").objectStore("userInfo");

  //       let tests = localResources.filter((word) => word.includes('/src/experiments/'))

  //       userDataOS.add({
  //         userTest: "src",
  //         testId: tests[getRandomInt(tests.length)]
  //       })
  //     }
  //     console.log("Upgraded!")
  // }

  // const requestIDB = indexedDB.open("db", 4)

  // requestIDB.onupgradeneeded = (event) => {
  //     upgradeStores(event)
  // }

  // requestIDB.onsuccess = (event) => {
  //     console.log(`indexedDB opened`)
  // }

  // requestIDB.onerror = (event) => {
  //     console.log(`DB ERROR: ${event.target.errorCode}`)
  // }

