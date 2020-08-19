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
  //  if (shit how do i tell javascript that the fleet has 5 already?  another fetch?) this method needs to happen only if there are less than 5 ships.  What about "unless a fleet card exists?" {
    event.target.parentElement.remove()
  }
//}

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





// // because of patch request i need to give ship id

// function selectShips(){
//   setTimeout(function(){ alert("Select Your Ships!"); }, 2500);
// }

document.addEventListener('DOMContentLoaded', function() {
getShips()
// addToFleet()


//you'll need a method that resets the boards once loaded .
})
