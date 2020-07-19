const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/users`
const POKEMONS_URL = `${BASE_URL}/ships`
const main = document.getElementById("main")

// var person = prompt("Please enter your name", "Harry Potter");
  // if (person == null || person == "") {
  //   txt = "User cancelled the prompt.";
  // } else {
  //
  //   txt = "Hello " + person + "! How are you today?";
  // }

function getShips(){
  return fetch("http://localhost:3000/ships")
    .then(function(response) {
      return response.json();
    })
    .then(json => {
      json.forEach(ship => console.log(ship.name));
      json.forEach(ship => buildShipCard(ship))
    });
}
function buildShipCard(ship) {
  const card = document.createElement('DIV')
    card.setAttribute("class", "card")
    card.setAttribute("data-id", ship.id)
    const para = document.createElement('P')
    const para2 = document.createElement('P')
    const btn = document.createElement("BUTTON")
    btn.setAttribute('data-id', ship.id)
    // const ul = document.createElement("UL")
    // const li = document.createElement("LI")
    // const li2 = document.createElement("LI")
    // const li3 = document.createElement("LI")
    let img = document.createElement("img");
      img.src = ship.image
      para.innerText = ship.name
      para2.innerText = `${ship.country} / ${ship.kind}`
      // li2.innerText = ship.kind
      // li3.innerText = ship.image
      img.width = "150";
      img.height = "150";
      para.innerText = ship.name
      btn.innerText = "Add to Fleet"
    // btn.addEventListener("click", createPokemon)
    document.getElementById('main').appendChild(card)
      card.appendChild(img)
      card.appendChild(para)
      card.appendChild(para2)
      card.appendChild(btn)
        // ship.rainer.pokemons.forEach(pokemon => renderPokemon(pokemon))
        // ul.appendChild(li)
        // ul.appendChild(li2)

}
getShips()
// function renderShip(ship){
//   const ul = document.querySelector(`div[data-id="${pokemon.trainer_id}"]`)
//   const li = document.createElement("LI")
//   const btn = document.createElement("button")
//
//   li.innerText = `${pokemon.nickname} (${pokemon.species})`
//   btn.setAttribute("class", "release")
//   btn.innerText = "Release"
//   btn.addEventListener("click", deletePokemon)
//   btn.setAttribute("data-pokemon-id", pokemon.id)
//   li.appendChild(btn)
//   ul.appendChild(li)
//
// }

//next you need a function to build a fleet card

// getShips()
