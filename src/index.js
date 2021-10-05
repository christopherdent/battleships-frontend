/*
INSTRUCTIONS

Since the thermometer can be used multiple times on the same page with different data, each should have it's own set of data storage and functions to use. Create a thermometer JavaScript object that stores the name, goal, and amount raised and has methods that can individually do the following:

1. Initialize the thermometer widget.
2. Clicking the "Give Now!" button should perform a mock AJAX call to get data.
3. Update the amount raised with new data, visually update the progress bar, and produce some type of success message within the widget.

Feel free to add any other interactions that you think would make for a pleasant giving experience for the end user.

There are no restrictions on style or presentation.

jQuery has been included.
*/

/* YOUR JS GOES HERE */




$(document).ready(function(){
    "use strict";
    

     
      
      let $amount;
      let $spinner = $('#spinner');
      let $pb = $('[role="progressbar"]');
      let $tally = $('#tally');
      let $img = $('.card-img-top');
      const $button = $('#btn');
      const $reset = $('#reset');
      const $cardTitle = $('.card-title');

      getWidget() 
     
      ////getWidget populates the initial card with backend data 
      function getWidget(){
        fetch("https://boiling-reef-70961.herokuapp.com/campaigns")
        .then(r => r.json())
        .then(json => {
            json.forEach(campaign => console.log(json[0].name))
            json.forEach(campaign => {
                $amount = json[0].amount;   ////this is where amount gets defined, the variable it starts with is nothing!
                $pb.css('width', json[0].amount)
                $cardTitle.text(json[0].name)
                $tally.text(`$ ${json[0].amount}`)
                console.log(json[0].image_url)
                $img.attr("src",json[0].image_url);
                console.log(json[0].name)
               
               
            })
         
        })
        $spinner.attr("hidden", true) 
      }
      

///below function 1)sends a patch request to DB to modify the 'amount' attribute 2)updates the widget/card with the new data 
      $button.on('click', function(e){
        e.preventDefault();
        console.log('ok')

        let configObj = {
            method: "PATCH",
            headers:  {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({'amount': $amount += 1})
          };

        fetch('https://boiling-reef-70961.herokuapp.com/campaigns/1', configObj)  ///this patch fetch that increments the amount 
        
        .then(r => r.json())
        .then(json => {
          console.log(json)
          updateWidget()
        })
        .catch(function(error) {
            console.log(error);
          });
       
      function updateWidget(){
        fetch('https://boiling-reef-70961.herokuapp.com/campaigns/1')    //this is a get fetch that updates the widget based on new backend data 
        .then(r => r.json()) 
        .then(json => {
            console.log(json.amount)  
            

            $pb.css('width', json.amount + '%')
            
            $tally.text(`$ ${json.amount}`)
          })
          .catch(function(error) {
            console.log(error);
          });
        }              
      })
 
        $reset.on('click', function(e){
          e.preventDefault();
          resetCounter()        
        })

        function resetCounter() {
         
          let configObj = {
            method: "PATCH",
            headers:  {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            
            body: JSON.stringify({amount: 0})
          };
    
        fetch('https://boiling-reef-70961.herokuapp.com/campaigns/1', configObj)  ///this patch fetch resets the amount 
        
        .then(r => r.json())
        .then(json => {
          console.log(json)
          $amount = json.amount; 
          $pb.css('width', '0')
          $tally.text('$0')
        })
        .catch(function(error) {
            console.log(error);
          });
        }
    
        


    });

       
  