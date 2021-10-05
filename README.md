# BATTLE, SHIPS!

BATTLE, SHIPS! is a single page application (SPA) game that allows you too create fleets using some of the most famous naval vessels from the Second World War era.  It allows for different combinations of class and country, with a class based randomized point system to determine the winner.  

This app uses a Rails API back-end with seed data and a PostgreSQL database, along with a Javascript front-end.   

You can play the game live here: https://christopherdent.github.io/battleships-frontend/ 

## The Front End  
The front end is designed with HTML and CSS working in conjunction with Javascript, and the Rails bsaed back-end.  It uses Javascript 'fetch' requests to allow a human player to assign specific ships to their fleet, and another to create a random computer fleet out of the remaining vessels.  

## The Back End  

There are Rails models for Ship and Fleet.  A fleet `has many` ships, and a ship `belongs to` a fleet.  A fetch is made to the Rails API to show the seeded ship cards, another to assign them to the human fleet, another to randomly generate the computer fleet, and, finally, another which changes all fleets' ships arrays to empty, thereby resetting the game.  

The back-end is powered by Ruby on Rails 6.0.3.2.  

## How to Launch the Game in Your Local Environment

The game is stored in two separate repositories, one for the back-end and one for the front-end.  

Front-end:  https://github.com/christopherdent/battleships-frontend
Back-end:  https://github.com/christopherdent/battleships-backend-api

Clone both repos into the same directory and navigate to the top level of the back-end.  From there, run `bundle install` to install the required gems.  

You will also need to start a PostgreSQL database by typing `rails db:create`,   run your migrations using `rails db:migrate`, and very importantly, seed the game with `rails db:seed`.  
**The app will not function without the seed data.**  

Finally, enter `rails s` to start your local server and then open up index.html from the front-end directory.  
