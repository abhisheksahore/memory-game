document.addEventListener('DOMContentLoaded', function() {
  const audio = document.querySelector('audio');
  const gameContainer = document.getElementById("game");
  const reset_btn = document.getElementById("reset");
  const new_div_inner = document.getElementsByClassName('new-div-inner');
  // const score_text = document.getElementsByClassName('score-text');
  const best_score = document.getElementById('best-score');
  const upper = document.getElementById('upper');
  const quit_btn = document.querySelector('.quit-btn');
  const over = document.querySelector('.over');
  const ok_btn = document.querySelector('.ok-btn');
  const over_container = document.querySelector('.over-container');
  const your_score = document.querySelector('#your-score');
  const start = document.querySelector('.start');
  const COLORS = [
    "card-1",
    "card-2",
    "card-3",
    "card-4",
    "card-5",
    "card-6",
    "card-7",
    "card-8",
    "card-9",
    "card-10",
    "card-11",
    "card-12",
    "card-1",
    "card-2",
    "card-3",
    "card-4",
    "card-5",
    "card-6",
    "card-7",
    "card-8",
    "card-9",
    "card-10",
    "card-11",
    "card-12",
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
      const newDivInner = document.createElement("div");
      const front = document.createElement("div");
      const back = document.createElement("div");

      
      newDiv.classList.add('new-div');
      newDivInner.classList.add('new-div-inner');
      // give it a class attribute for the value we are looping over
      front.classList.add(color);
      front.classList.add('front');
      front.classList.add('card');
      front.id = `id_${counter_id}`;
      counter_id++;
      // front.classList.add('invisible');
      
      
      newDiv.addEventListener('click', handleCardClick);
      
      // giving back class to back div element.
      back.classList.add('back');
      back.classList.add('card');
      
      // append the div 
      newDivInner.appendChild(front);
      newDivInner.appendChild(back);
      newDiv.append(newDivInner);
      gameContainer.append(newDiv);
    }
    
    
  }
  
  let first = 0;
  let first_el = 0;
  let second = 0;
  let second_el = 0;
  let score = 0;
  let token = true;
  let target = 0;
  let counter = 0;
  
  
  
  
  /*************************************************************************************************
   *          handleCardClick() handles the click on the card and checks if the card is            *
   *          invisible, and if it is then it make it visible and then check if both the           *
   *          cards are same or not.   This                                                        *
   ************************************************************************************************/
  
  function handleCardClick(e) {
    console.log(e.target.dataset.status !== 'pending');
    console.log(e.target.dataset.status !== 'done');
    target = e.target.parentElement.querySelector('.front');
    // console.log(e.target);
    // console.log(target);
    
    if (token === true && target.dataset.status !== 'pending' && target.dataset.status !== 'done') {
      if (!target.parentElement.classList.contains("visible")){
        target.parentElement.classList.add('visible');
        score++;
        score_text.innerText = score;
        if (first) {
          second = target.className;
          second_el = target;
          second_el.setAttribute('data-status', 'pending');
          // console.log(second_el.dataset.status);
        } else {
          first = target.className;
          console.log(first)
          first_el = target;
          first_el.setAttribute('data-status', 'pending');
          // console.log(first_el.dataset.status);
        }
        
        if (second) {
          if (first === second) {
            // console.log(true);
            
            
            first_el.dataset.status = 'done';
            second_el.dataset.status = 'done';
            console.log(first_el);
            console.log(second_el);
            first = 0;
            second = 0;
            counter++;
            if (counter === 1) {
              // over.innerText = `game over!`
              your_score.innerText = score;
              over_container.classList.remove('hidden');
              
              if (localStorage.length !== 0) {
                if (score < parseInt(localStorage.getItem('best_score'))) {
                  localStorage.setItem('best_score', score.toString());
                }
                best_score.innerHTML = localStorage.getItem('best_score');
              } else {
                best_score.innerHTML = score;
                localStorage.setItem('best_score', score.toString());
                
              }
            }
          } else {
            token = false;
            console.log(first_el);
            console.log(second_el);
            setTimeout(function () {   
              
              first_el.parentElement.classList.remove('visible');
              second_el.parentElement.classList.remove('visible');
              first_el.removeAttribute('data-status')
              second_el.removeAttribute('data-status')
              console.log(first_el);
              console.log(second_el);
              token = true;
              first = 0;
              second = 0; 
            }, 700)
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
    const score_container = document.createElement('div');
    const score_title = document.createElement('div');
    const score_text = document.createElement('div');
    score_container.classList.add('score');
  score_title.classList.add('score-title');
  score_title.innerText = 'Score';
  score_text.classList.add('score-text');
  score_text.innerText = 0;
  score_container.append(score_title);
  score_container.append(score_text);
  gameContainer.insertBefore(score_container, gameContainer.childNodes[12]);
  
  if (localStorage.length !== 0) {
    
    best_score.innerHTML = localStorage.getItem('best_score');
  }
  
  const reset_game = () => {
    
    audio.play();
    //  Make every card invisible and remove data-status attribute 
    console.log(new_div_inner);
    for (let i = 0; i < new_div_inner.length; i++) {
      if (new_div_inner[i].classList.contains('visible')) {
        new_div_inner[i].classList.remove('visible');
      }
      new_div_inner[i].querySelector('.front').removeAttribute('data-status');
    }
    
    
    // Resetting variables.
    
    first = 0;
    first_id = 0;
    second = 0; 
    second_id = 0;
    score = 0;
    token = true;
    counter = 0;
    score_text.innerText = score;
  }


  
  ok_btn.addEventListener('click', function() {
    over_container.classList.add('hidden');
    reset_game();
  });
  
  reset_btn.addEventListener('click', function() {
    reset_game();
  })
  
  quit_btn.addEventListener('click', function() {
    over_container.classList.add('hidden');
    reset_game();

  })

  start.addEventListener('click', function() {
    audio.play();
  })
  
})