
# How to use

Spin up local server to serve files `python3 py_server.py 8000`

- Navigate to `http://localhost:8000/ctrdashboard.html`
Very important that this is your first page. Otherwise the site will not function.
To recover clear your local storage and return to ctrdashboard.

- Next navigate to `http://localhost:8000/`
You will be assigned a random page from the experiments folder.
To pretend to be a new user, clear the localstorage. Do not clear IndexedDB else you'll have to return to the top.

- Return to `ctrdashboard` to view the stats.

- To add more experiments, add them to the `experiments` directory within the `src` directory.
Also add the relative path in `/src/experiments.js`. Many experiments can be ran simultaneously as long as they are in the experiments list.


# Thoughts

## Client Side:
Entirely written in javascript to be run within the browser.
This comes with the issues such as persistent storage, to address this I used IndexedDB to simulate a NoSQL style database. Local storage to simulate user storage.

A major consequence is this could not be deployed, and would only work in a setting where the sites were being shown in person, where someone could reset the site between users.

To solve this the site would be hosted on a framework such as Rails or Node, and have the api requests sent to the server.

## API speculation:
The site only stores the time of an event occuring and which is the currently served experiment. The client side is trusted to not generate duplicate requests. A solution would be to collect more information on the user and store that server side to verify requests. This is a privacy and security concern, which the current implementation side steps.

## Service Workers: What Not to Do!

I spent too much time trying to implement a service worker to manage the routes and api requests. This turned out to be an inefficient solution as the service worker has no knowledge of the DOM. It also becomes especially fiddly with IndexedDB.

Using iframes to deliver dynamic content, does the trick. But one issue of extended use is that an experiment gets cached and doesn't update when the site is reloaded. Which might cause issues with content editors.

## Things to do better:

Make sure to use a proper web framework (Rails/Node).
Create a testing suite to crush bugs and smooth development.
Following that Test Driven Development! Though TDD might be overboard for a small project like this, it still should be done.

https://github.com/JamesBell15/Blinkest-code-challenge


