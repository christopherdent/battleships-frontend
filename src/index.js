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
      btn.addEventListener("click", assignFleet)
    document.getElementById('main').appendChild(card)
      card.appendChild(img)
      card.appendChild(para)
      card.appendChild(para2)
      card.appendChild(btn)
}

function greyShipCard(event){
    event.preventDefault()
    event.target.parentElement.remove()
  }

function assignFleet(event) {
  event.preventDefault()

        let data = {
          "fleet_id": 1
        };

      let configObj = {
          method: "PATCH",  //patch
          headers:  {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({fleet_id: 1})
        };

  fetch(`http://localhost:3000/ships/${event.target.dataset.id}`, configObj)
    .then(response => response.json())
    .then(json => {
      if (json.message) {
        alert(json.message)
      } else {

      }
    })
  }

// function selectShips(){
//   setTimeout(function(){ alert("Select Your Ships!"); }, 2500);
// }
// document.addEventListener('DOMContentLoaded', resetFleet)
// /// trying to build a way that the fleet clears its ships on a reload..... tough one....
// function resetFleet(event) {
//
// }



function resetFleet() {
  let configObj = {
      method: "PATCH",  //patch
      headers:  {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({fleet_id: 0})
    };
    fetch("http://localhost:3000/fleets", configObj)
    .then(function(response) {
      return response.json();
    })
      .then(json => console.log(json));
    }

document.addEventListener('DOMContentLoaded', function() {

  getShips()

})
