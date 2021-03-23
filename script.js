const gameContainer = document.getElementById("game");
const reset_btn = document.getElementById("reset");
const cards = document.getElementsByClassName('card');



const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  let counter_id = 0;
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    newDiv.classList.add('card');
    newDiv.id = `id_${counter_id}`;
    counter_id++;
    newDiv.classList.add('invisible');
    newDiv.addEventListener('click', handleCardClick);
    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let first = 0;
let first_el = 0;
let second = 0;
let second_el = 0;
let score = 0;
let token = true;


function handleCardClick(e) {
  /*you can use event.target to see which element was clicked*/
  console.log(e.target.dataset.status !== 'pending');
  console.log(e.target.dataset.status !== 'done');

  if (token === true && e.target.dataset.status !== 'pending' && e.target.dataset.status !== 'done') {
    if (e.target.classList.contains("invisible")){
      e.target.classList.remove('invisible');
      
      if (first) {
        second = e.target.className;
        second_el = e.target;
        second_el.setAttribute('data-status', 'pending');
        // console.log(second_el.dataset.status);
      } else {
        first = e.target.className;
        first_el = e.target;
        first_el.setAttribute('data-status', 'pending');
        // console.log(first_el.dataset.status);
      }
      
      if (second) {
        if (first === second) {
          score++;  
          console.log(score);      
          first_el.dataset.status = 'done';
          second_el.dataset.status = 'done';
          console.log(first_el);
          console.log(second_el);
          first = 0;
          second = 0;
        } else {
          token = false;
          console.log(first_el);
          console.log(second_el);
          setTimeout(function () {   
            
            document.getElementById(first_el.id).classList.add('invisible');
            document.getElementById(second_el.id).classList.add('invisible');
            first_el.removeAttribute('data-status')
            second_el.removeAttribute('data-status')
            console.log(first_el);
            console.log(second_el);
            token = true;
            first = 0;
            second = 0; 
          }, 500)
        }
      }
    } 
    // else {
    //   e.target.classList.add('invisible');
    //   first = 0;
    //   second = 0;
    //   console.log('first is ', first)
    //   console.log('second is', second)
    // }
  }

}

// when the DOM loads
createDivsForColors(shuffledColors);

const reset_game = () => {
  for (let i = 0; i < cards.length; i++) {
    if (!cards[i].classList.contains('invisible')) {
      cards[i].classList.add('invisible');
    }
    cards[i].removeAttribute('data-status');
  }
  
  
  first = 0;
  first_id = 0;
  second = 0; 
  second_id = 0;
  score = 0;
  token = true;
}


reset_btn.addEventListener('click', function() {
  reset_game();
})

