class ShipCard {
//i think most of these should be 'static'

 static build = (ship) => {
    let img = document.createElement("img");
    const card = document.createElement('DIV')
    const para = document.createElement('P')
    const para2 = document.createElement('P')
    const btn = document.createElement("BUTTON")

      card.setAttribute("class", "card")
      card.setAttribute("data-id", ship.id)
      btn.setAttribute('data-id', ship.id)
      btn.setAttribute('class', 'addBtn' )

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


 static move = (ship) => {
  const div = event.target.parentElement
  const parent = document.getElementById("right")
  let txt = div.innerText
  let btn = div.getElementsByClassName('addBtn')[0]
  div.remove()
  parent.appendChild(div)
  div.classList.remove('card')
  div.classList.add("cardsmall")
  div.classList.add("human")
  div.removeChild(btn)

}

  static battle = () => {
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

  static removeAddButtons = () => {
   const btns = document.getElementsByClassName('addBtn')
   let btnArray = Array.from(btns)
   btnArray.forEach(btn => btn.remove());
 }



 static moveCompFleet = () => {   ///this function renders fleet 2
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
                div.classList.add("computer")
             } else {
               console.log("not it!")
              }
            }
          })
        });
       }

       static fight = () => {


         let human = Array.from(document.querySelectorAll("div.human"))
         let computer = document.querySelectorAll('div.computer')

       fetch('http://localhost:3000/battles')
         .then(function(response) {
           return response.json();
         })
         .then(json => {
           // setTimeout(function(){ alert(json.message)); }, 5000); //setting a timeout here makes game fail.
           // alert(json.message)
           let msg = json.message
           // setTimeout(this.winner(msg), 4000);
           this.winner(msg)
           if (json.message.includes("Computer")) {
             human.forEach(card => card.id = "fade-out");
           } else {
             computer.forEach(card => card.id = "fade-out");
           }

          });
         newGame.playAgain()
       }

       static winner = (msg) => {
           setTimeout(function(){ alert(msg); }, 4000);

       }

}
