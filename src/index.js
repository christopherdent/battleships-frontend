const endPoint = "http://localhost:3000/ships"

function getShips(){
  return fetch(endPoint)
    .then(function(response) {
      return response.json();
    })
    .then(json => {
      json.forEach(ship => console.log(ship.name));
      json.forEach(ship => buildShipCard(ship))
    });
    greyShipCard()
  }

function buildShipCard(ship) {
  const card = document.createElement('DIV')
    card.setAttribute("class", "card")
    card.setAttribute("data-id", ship.id)
    const para = document.createElement('P')
    const para2 = document.createElement('P')
    const btn = document.createElement("BUTTON")
    btn.setAttribute('data-id', ship.id)
    btn.setAttribute('class', 'addBtn' )

    let img = document.createElement("img");
      img.src = ship.image
      para.innerText = ship.name
      para2.innerText = `${ship.country} / ${ship.kind}`

      img.width = "150";
      img.height = "150";
      para.innerText = ship.name
      btn.innerText = "Add to Fleet"
      btn.addEventListener("click", greyShipCard)

    document.getElementById('main').appendChild(card)
      card.appendChild(img)
      card.appendChild(para)
      card.appendChild(para2)
      card.appendChild(btn)
}

function greyShipCard(event){
    event.preventDefault()
      // let divs = Array.from(document.querySelectorAll('[data-id]'));
      // let btns = Array.from(document.getElementsByClassName("addBtn"))
      //You'll have to add logic here to physically move the boat into a Fleet object as soon as it disappers from "Avail ships"

      const configObj = {
          method: "POST",
          headers: {"Conent-Type": "application/json"},
          
          body: JSON.stringify({ ship_id: event.target.dataset.id })
        }

      fetch("http://localhost:3000/fleets", configObj)
        .then(response => response.json())
        .then(fleet => console.log(fleet));

      console.log(event)
        event.target.parentElement.remove()
  }


// function postShips(event){
//   event.preventDefault()
//
//   const configObj = {
//       method: "POST",
//       headers: {"Conent-Type": "application/json"},
//       body: JSON.stringify({ ship_id: event.target.dataset.id })
//     }
//
//   fetch("http://localhost:3000/ships", configObj)
//     .then(response => response.json())
//     .then(ship => console.log(ship);
//   }


// function selectShips(){
//   setTimeout(function(){ alert("Select Your Ships!"); }, 2500);
// }

document.addEventListener('DOMContentLoaded', function() {
getShips()
// addToFleet()


//you'll need a method that resets the boards once loaded .
})
