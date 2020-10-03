class Game {

  // constructor()

  // run = () => {
  //   // this.resetFleet()  //resets everything
  //   this.getShips() //fetches ship cards & sets up chain of click events
  //   this.selectShips()  // message to user to select their ships
  // }
  //



  selectShips = () => {
   setTimeout(function(){ alert("Select Your Five Ships!"); }, 1000);
  }

  getShips = () => {
  fetch("http://localhost:3000/ships")
    .then(function(response) {
      return response.json();
    })
    .then(json => {
      json.forEach(ship => console.log(ship.name));
      json.forEach(ship => newGame.buildShipCard(ship))
    })
    .catch(function(error) {  //this stopped working after OO implementation...
      console.log(error.message);
    });
  }

   buildShipCard = (ship) => {
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
        btn.addEventListener("click", newGame.moveShipCard)
        btn.addEventListener("click", newGame.assignFleet)
      document.getElementById('main').appendChild(card)
        card.appendChild(img)
        card.appendChild(para)
        card.appendChild(para2)
        card.appendChild(btn)
  }

  assignFleet = (event) => {
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
            newGame.removeAddButtons()
            newGame.assignCompFleet()
            // newGame.battleButton()
          } else {
          }
        });
        // .catch(function(error) {
        //   console.log(error.message);
        // });
      }


  moveShipCard = (event) => {
    event.preventDefault()
    const div = event.target.parentElement
    div.remove()
    const parent = document.getElementById("right")
    parent.appendChild(div)
    div.classList.remove('card')
     div.classList.add("cardsmall")
     // let para = getElementsByClassName("p")//
    let btn = div.getElementsByClassName('addBtn')[0]
    div.removeChild(btn)

    let txt = div.innerText

  }

   assignCompFleet = () => {  ///this method assigns a fleet to id 2 via fetch
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
         response.json();

       })
       .then(function(json){

         console.log(json)
         newGame.battleButton()
         newGame.moveCompFleet()
       })
       .catch(function(error) {
         console.log(error.message);
       });

       };

      moveCompFleet = () => {   ///this function renders fleet 2
          const a = document.querySelectorAll("div.card")
          const arr = []
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

                })

                arr.forEach(async function(ship) {

                 for (let div of a) {
                   if (ship.id == div.dataset['id']) {

                     console.log("it!")
                     div.remove()  //if the ships from that fleet match the dataset ids of the cards on the right, get rid of them.
                     const parent = document.getElementById("right")  //getting ready to render the cards in a fleet
                     parent.appendChild(div)  // append that div to the right side
                     div.classList.remove('card')  //get rid of the old class
                      div.classList.add("cardsmall")  //add the new

                  } else {
                    console.log("not it!")
                   }
                 }
               })

             });
            }


 battleButton = () => {
  let button = document.createElement("button")
  let div = document.createElement("div")
  let p = document.createElement("p")
  button.id = "battlebutton"
  button.classList.add("btn", "btn-danger", "btn-block")
  button.innerText = "BATTLE"
  document.getElementById('right').appendChild(div)
  div.appendChild(p)
  setTimeout(function(){ div.appendChild(button); }, 1000);
  button.addEventListener("click", newGame.fight)
}

  fight = (event) => {
  fetch('http://localhost:3000/battles')
    .then(function(response) {
      return response.json();
    })
    .then(json => {
      alert(json.message)
    });
    let btn = document.createElement("BUTTON")
    btn.id = 'again'
    btn.innerText = "Play Again?"
    let nav = document.getElementById('navbar')
    // nav.appendChild(btn)
    setTimeout(function(){ nav.appendChild(btn); }, 2500);
    btn.addEventListener("click", this.reload)
  }

 removeAddButtons = () => {
  let btns = document.getElementsByClassName('addBtn')
  let btnArray = Array.from(btns)
  btnArray.forEach(btn => btn.remove());
}

 reload = () => {
  window.location.reload();
  return false;
}

 resetFleet = () => {
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





}
