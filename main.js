//ELEMENTS
//Buttons:
const startButton = document.querySelector('.start');
const easyMod = document.querySelector('.hardness-easy');
const normalMod = document.querySelector('.hardness-normal');
const hardMod = document.querySelector('.hardness-hard');
//Statistics:
const score = document.querySelector('.score-value');
const timer = document.querySelector('.timer-value');

const scoreMemory = document.querySelector(`.score-line`)
const lastScore = document.querySelector(`.last-score`)
const winScore = document.querySelector(`.win-message-score`)
const winMessage = document.querySelector(`.win-message`)

//Variables:
const lineUnhiddenTime = document.querySelector('.unhidden-time');
const scorePerHit = document.querySelector('.hit-score');
const hitNumber = document.querySelector('.number-hit');
const missNumber = document.querySelector('.number-miss');
//Games:
const gophers = document.querySelectorAll('.gopher');
const gamePlace = document.querySelector('.block-game');
const cursor = document.querySelector('.cursor');
//Color:
const h1 = document.querySelector('.h1');
const startText = document.querySelector('.start-text');
const h3 = document.querySelectorAll('.h3');
const mod = document.querySelector('.mod');




//VARIABLES
let unhiddenTime = 1500;
let timerValue = 15;
let scoreValue = 0;
let lastGopher;
let timerFlag = false;
let oneBangScore = 2;
let miss = 0;
let hit = 0;
const colorRed = `#c20c0c`;
const colorBlue = `#2e70ff`;
const colorGreen = `#0cc227`;



//ACTIONS
//Mods:
easyMod.addEventListener('click', useEasyMod);
normalMod.addEventListener('click', useNormalMod);
hardMod.addEventListener('click', useHardMod);

//Game:
startButton.addEventListener('click', () => {
            startGame();
});
gophers.forEach(gopher => gopher.addEventListener('click', bang));

//Cursor:
gamePlace.addEventListener('mousemove', (e) => {
      cursor.style.top = (e.pageY - 22)+'px';
      cursor.style.left = (e.pageX - 7)+'px';
      
      gamePlace.addEventListener('mousedown', () => {
            cursor.style.backgroundImage = `url(img/hammerPNGbang5050.png)`;
      })
      gamePlace.addEventListener('mouseup', () => {
            cursor.style.backgroundImage = `url(img/hammerPNG5050.png)`;
      })
})
gamePlace.addEventListener('mouseover', (e) => {
      cursor.style.visibility = 'visible';
})
gamePlace.addEventListener('mouseout', (e) => {
      cursor.style.visibility = 'hidden';
})
// gamePlace.addEventListener('click', () => {
//       if(!this.classList.contains('up')){
//             missNumber.textContent = `Miss = ${++miss}!`
//       }
// })



//FUNCTIONS
//Mods:
function useEasyMod() {
      unhiddenTime = 1500;
      lineUnhiddenTime.textContent = `Unhidden time = ${unhiddenTime / 1000} seconds!`;

      timerValue = 20;
      timer.textContent = timerValue;

      oneBangScore = 1;
      scorePerHit.textContent = `Score per hit = ${oneBangScore} points!`;

      h1.style.color = colorGreen;
      startText.style.color = colorGreen;
      h3.forEach(e => {
            e.style.color = colorGreen;
      })
      score.style.color = colorGreen;
      timer.style.color = colorGreen;
      gamePlace.style.border = `10px solid ${colorGreen}`;
      mod.style.color = colorGreen;
      mod.textContent = `easy`;
}
function useNormalMod() {
      unhiddenTime = 1000;
      lineUnhiddenTime.textContent = `Unhidden time = ${unhiddenTime / 1000} seconds!`;

      timerValue = 15;
      timer.textContent = timerValue;

      oneBangScore = 2;
      scorePerHit.textContent = `Score per hit = ${oneBangScore} points!`;

      h1.style.color = colorBlue;
      startText.style.color = colorBlue;
      h3.forEach(e => {
            e.style.color = colorBlue;
      })
      score.style.color = colorBlue;
      timer.style.color = colorBlue;
      gamePlace.style.border = `10px solid ${colorBlue}`;
      mod.style.color = colorBlue;
      mod.textContent = `normal`;
}
function useHardMod() {
      unhiddenTime = 600;
      lineUnhiddenTime.textContent = `Unhidden time = ${unhiddenTime / 1000} seconds!`;

      timerValue = 10;
      timer.textContent = timerValue;

      oneBangScore = 3;
      scorePerHit.textContent = `Score per hit = ${oneBangScore} points!`;

      h1.style.color = colorRed;
      startText.style.color = colorRed;
      h3.forEach(e => {
            e.style.color = colorRed;
      })
      score.style.color = colorRed;
      timer.style.color = colorRed;
      gamePlace.style.border = `10px solid ${colorRed}`;
      mod.style.color = colorRed;
      mod.textContent = `hard`;
}

function showScore(score) {
      console.log(score)
      localStorage.setItem('score', score)
      winScore.textContent = score
      winMessage.classList.remove('hidden')
}
document.body.addEventListener('click', (e) => {
      if(e.path[0].attributes[0].nodeValue === "win-message-button") {
            winMessage.classList.add('hidden')
            lastScore.textContent = localStorage.getItem('score')
      }
})





//Game:
function randomHoles(gophers) {
      const index = Math.floor(Math.random() * gophers.length);
      const gopher = gophers[index];
      if(gopher === lastGopher){
            return randomHoles(gophers);
      }
      lastGopher = gopher;
      return gopher;
}

function gopherUp() {
      const gopher = randomHoles(gophers);
      gopher.classList.add('up');
      setTimeout(() => {
            gopher.classList.remove('up');
            if(!timerFlag){gopherUp()};
      }, unhiddenTime);
}

function timerRun() {
      let lastTime = timer.textContent;
      let lastTimeNumber = Number(lastTime);
      
      let myTimer = setInterval(() => {
            lastTimeNumber--;
            timer.textContent = lastTimeNumber;

            if(lastTimeNumber === 0) {
                  clearInterval(myTimer);
                  timerFlag = true;
                  setTimeout(() => {
                        showScore(score.textContent)
                  }, 600);
                  
            }
      }, 1000);
}

function startGame() {
      score.textContent = 0;
      hitNumber.textContent = 0;
      timerFlag = false;
      gopherUp();
      timerRun();
}

//Score:
function bang(e) {

      if(this.classList.contains('up')){
            this.classList.remove('up');
            this.classList.add('catch');
            score.textContent = Number(score.textContent) + oneBangScore;
            cursor.style.backgroundImage = `url(img/hammerPNGbangHit5050.png)`;
            setTimeout(() => {
                  cursor.style.backgroundImage = `url(img/hammerPNG5050.png)`;
            }, 90)
            setTimeout(() => {
                  this.classList.remove('catch');
            }, 350);
            hitNumber.textContent = `Hit = ${++hit}!`
      }
}



