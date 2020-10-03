class ShipCard {
//i think most of these should be 'static'

 build = (ship) => {
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


 move = (ship) => {
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

  battle = () => {
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

  playAgain = () => {
    let btn = document.createElement("BUTTON")
    btn.id = 'again'
    btn.innerText = "Play Again?"
    let nav = document.getElementById('navbar')
    setTimeout(function(){ nav.appendChild(btn); }, 2500);
    btn.addEventListener("click", newGame.reload)
  }



}
