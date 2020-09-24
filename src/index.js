const endPoint = "http://localhost:3000/ships"

function selectShips(){
 setTimeout(function(){ alert("Select Your Five Ships!"); }, 1000);
}

function getShips(){
  return fetch(endPoint)
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
      btn.setAttribute('class', 'addBtn' )

      let img = document.createElement("img");
        img.src = ship.image
        para.innerText = ship.name
        para2.innerText = `${ship.country} / ${ship.kind}`
        para.id = "text"

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
            battleButton()
          } else {
          }
        })
      }


function moveShipCard(event){
    event.preventDefault()
    const div = event.target.parentElement
    div.remove()  //removes from avail ships - will leaving them there fix my future issue with fleet 2?
    const parent = document.getElementById("right")


    parent.appendChild(div)
    div.classList.remove('card')
     div.classList.add("cardsmall")

     // let para = getElementsByClassName("p")//
    let btn = div.getElementsByClassName('addBtn')[0]
    div.removeChild(btn)

    let txt = div.innerText

  }

   function assignCompFleet() {
     const configObj = {
           method: 'POST',
           headers: {
             "Content-Type": "application/json",
             "Accept": "application/json"
           },
           body: JSON.stringify({
             id: 2
           })
          }
       fetch('http://localhost:3000/fleets/', configObj)
       .then(function(response) {
         // moveCompFleet()  ///def not the right spot for this but for some reason this method doesnt get past the next line // json is not in proper format
         response.json();

       })
       .then(function(json){

         console.log(json)
         moveCompFleet()
       })
       .catch(function(error) {
         console.log(error.message);
       });

       };

      function moveCompFleet() {
          a = document.querySelectorAll("div.card")
          arr = []
           fetch('http://localhost:3000/fleets')
            .then(function(response) {
              return response.json();
            })
            .then(json => {
              json.forEach(fleet => fleet.id == 2 ? console.log(fleet.ships) : console.log('wrong fleet'));
              json.forEach(async function(fleet) {
                if (fleet.id == 2) {
                  fleet.ships.forEach(ship => arr.push(ship))
                 }
                 // debugger // i can access arr from here.  supposedly.
                })
                // debugger //uh and here too now, supposedly

                arr.forEach(async function(ship) {

                 for (div of a) {
                   if (ship.id == div.dataset['id']) {

                     console.log("it!")  ///this and below should fire when the json id equals the div id.  Refresh on iterators.
                     div.remove()
                     const parent = document.getElementById("right")
                     parent.appendChild(div)
                     div.classList.remove('card')
                      div.classList.add("cardsmall")
                     // div.innerText.style.fontsize = "xx-large";
                     let btn = div.getElementsByClassName('addBtn')[0]
                     div.removeChild(btn)
                  } else {
                    console.log("not it!")
                   }
                 }
               })
              })
            }



function battleButton() {
  let button = document.createElement("button")
  let div = document.createElement("div")
  let p = document.createElement("p")
  button.id = "battlebutton"
  button.classList.add("btn", "btn-danger", "btn-block")
  button.innerText = "BATTLE"
  document.getElementById('right').appendChild(div)

  removeAddButtons()

  div.appendChild(p)

  setTimeout(function(){ div.appendChild(button); }, 1000);

  button.addEventListener("click", fight)


}

function fight(event){
  fetch('http://localhost:3000/battles')
    .then(function(response) {
      return response.json();
    })
    .then(json => {
      alert(json.message)
    });
  }

function removeAddButtons() {
  btns = document.getElementsByClassName('addBtn')
  btnArray = Array.from(btns)
  btnArray.forEach(btn => btn.remove());
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
      console.log(json)
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
