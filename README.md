

I would use the testing framework you use.


Locally run

Taking client side seriously but this wouldn't be realistic at all unless it's all running physically at.


could do a node server

Finding an in browser testing framework might gives me a head ache
I would use Rspec but not a rails app.

ctrdashboard would be the interal dashboard for the staff to track the progress of the experiments

index is front facing sign up page, which will populate from the experiments folder

The content editors can add to the experiments folder new pages

Each page must have a signup button. Assumption that this is for just signup pages & not an abstract A/B testing system to be used for many experiments.

The header should be alterable in the experiment html file but I'm lazy.

Using IndexedDB as it's easy, and isn't cookies. Will be used to track the data recieved from the experiments.

Use sessions to manage what users see and make sure we aren't duplicating traffic.

