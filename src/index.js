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
    moveShipCard()
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
      btn.addEventListener("click", moveShipCard)
      btn.addEventListener("click", assignFleet)
    document.getElementById('main').appendChild(card)
      card.appendChild(img)
      card.appendChild(para)
      card.appendChild(para2)
      card.appendChild(btn)
}

function moveShipCard(event){
    event.preventDefault()
    const div = event.target.parentElement
    div.remove()  //removes from avail ships
    const parent = document.getElementById("right")
    parent.appendChild(div)
    let btn = div.getElementsByClassName('addBtn')[0]
    div.removeChild(btn)
  }


  function assignCompFleet() {
  let configObj = {
      method: 'PATCH',
      body: JSON.stringify({ fleet_id: 2 }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    };
    for (let i = 0; i < 5; i++) {
      fetch(`http://localhost:3000/ships/${Math.floor(Math.random() * 34) + 1 }`, configObj)   //here you are changing that particular ships fleet id - but it is not working.  it is assigning 1 instead of 2.
        .then(function(response) {
          return response.json();
        })
        .then(function(json) {
          console.log(json)

          // const div = event.target.parentElement  <-- HOW DO I SELECT THE DIV WITH THIS JSON ID? const div =
           a = document.querySelectorAll("div.card")
           for (div of a) {
             if (json["id"] == div.dataset['id']) {
               console.log(div)
               console.log("it!")  ///add code here to make the card move when the data id matches the json id
               div.remove()
               const parent = document.getElementById("right")
               parent.appendChild(div)
             } else {
               console.log("not it!")
             }
           }
        });
      };
    };


    function assignFleet(event) {
      event.preventDefault()
        let configObj = {
          method: "PATCH",
          headers:  {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({fleet_id: 1})
        };
  fetch(`http://localhost:3000/ships/${event.target.dataset.id}`, configObj)   //here you are changing that particular ships fleet id.
    .then(response => response.json())
    .then(json => {
      if (json.message) {
        alert(json.message)
        assignCompFleet()
        battle()
      } else {
      }
    })
  }

function battle() {
  let button = document.createElement("button")
  let div = document.createElement("div")
  let p = document.createElement("p")
  // div.id = "battlebutton"
  button.id = "battlebutton"
  button.classList.add("btn", "btn-danger", "btn-block")
  button.innerText = "BATTLE"
  document.getElementById('right').appendChild(div)
  div.appendChild(p)
  div.appendChild(button)
}

 function selectShips(){
  setTimeout(function(){ alert("Select Your Five Ships!"); }, 1000);
}



function resetFleet() {
  let configObj = {
      method: "PATCH",  //patch
      headers:  {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({fleet_id: null})
    };
    fetch("http://localhost:3000/fleets", configObj)
    .then(function(response) {
      return response.json();
    })
    .then(function(json){
      // Use this data inside of `json` to do DOM manipulation
    })
    .catch(function(error) {
      console.log(error.message);
 });
    }



document.addEventListener('DOMContentLoaded', function() {
  resetFleet()  //resets everything
  getShips() //fetches ship cards & sets up chain of click events
  selectShips()  // message to user to select their ships
})
