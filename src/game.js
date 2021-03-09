class Game {

  selectShips = () => {
    document.addEventListener('DOMContentLoaded', function() {
   setTimeout(function(){ alert("Select Your Five Ships!"); }, 1500);
   })
  }



  getShips = () => {
  fetch("https://safe-gorge-11585.herokuapp.com/ships")
  .then(function(response) {
    return response.json();
  })
  .then(json => {
    json.forEach(ship => console.log(ship.name));
    let arr = []
    json.forEach(ship => arr.push(ship))
    arr.sort((a, b) => a.name.localeCompare(b.name))
    arr.forEach(ship => ShipCard.build(ship))
  })
  // .catch(function(error) {
  //   console.log(error.message);
  // });
}

  assignFleet = (event) => {

      let configObj = {
        method: "PATCH",
        headers:  {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({fleet_id: 1})
      };
      event.preventDefault()
      fetch(`https://safe-gorge-11585.herokuapp.com/ships/${event.target.dataset.id}`, configObj)
        .then(response => response.json())
        .then(json => {
          if (json.message) {
            alert(json.message)
            ShipCard.removeAddButtons()
            this.assignCompFleet()

          } else {
          }
        })
        .catch(function(error) {
          console.log(error.message);
        });
      }

  moveShipCard = (ship) => {
    ShipCard.move(ship)
  }


   assignCompFleet = () => {  ///this method assigns a fleet to id 2 via fetch
     const configObj = {

           method: 'PATCH',
           headers: {
             "Content-Type": "application/json",
             "Accept": "application/json"
           },
           body: JSON.stringify({
             id: 2
           })
          }
       fetch('https://safe-gorge-11585.herokuapp.com/compfleets/', configObj)
       .then(function(response) {
         response.json();
       })
       .then(function(json){
         ShipCard.battle()
         ShipCard.moveCompFleet()
       })
       .catch(function(error) {
         console.log(error.message);
       });

       };

      playAgain = () => {
        let btn = document.createElement("BUTTON")
        let nav = document.getElementById('navbar')
        btn.id = 'again'
        btn.innerText = "Would You Like To Play Again?"
        setTimeout(function(){ nav.appendChild(btn); }, 7000);
        btn.addEventListener("click", newGame.reload)
      }

  fight = (event) => {
    ShipCard.fight()
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
    fetch("https://safe-gorge-11585.herokuapp.com/fleets", configObj)
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



   winner = (msg) => {
      setTimeout(function(){ alert(msg); }, 4000);
  }


}
