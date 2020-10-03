// game = new Game
// game.run()

console.log('app is loaded')

const newGame = new Game()
newGame.resetFleet()
newGame.selectShips()
newGame.getShips()

// document.addEventListener('DOMContentLoaded', function() {
//   resetFleet()  //resets everything
//   getShips() //fetches ship cards & sets up chain of click events
//   selectShips()  // message to user to select their ships
// })
