class Game {

  selectShips = () => {
   setTimeout(function(){ alert("Select Your Five Ships!"); }, 1000);
  }

  getShips = () => {
  fetch("http://localhost:3000/ships")
    .then(function(response) {
      return response.json();    //why do i HAVE to return it?  Game fails if I don't, but why?
    })
    .then(json => {
      json.forEach(ship => console.log(ship.name));
      json.forEach(ship => this.buildShipCard(ship))
    })
    .catch(function(error) {
      console.log(error.message);
    });
  }

   buildShipCard = (ship) => {
     let shipCard = new ShipCard   ///think about making the methods in the shipCard class static methods.  you don't need instances of them, it's just a wasted line.  but for now do what woks.
     shipCard.build(ship)
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
            this.removeAddButtons()
            this.assignCompFleet()
            // this.battleButton()
          } else {
          }
        })
        .catch(function(error) {
          console.log(error.message);
        });
      }


  moveShipCard = (ship) => {
    let shipCard = new ShipCard   ///think about making the methods in the shipCard class static methods.  you don't need instances of them, it's just a wasted line.  but for now do what woks.
    shipCard.move(ship)
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
   let shipCard = new ShipCard
   shipCard.battle()
}

  fight = (event) => {
  fetch('http://localhost:3000/battles')
    .then(function(response) {
      return response.json();
    })
    .then(json => {
      alert(json.message)
    });
    
    let shipCard = new ShipCard
    shipCard.playAgain()
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
