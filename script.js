const playBoard = document.querySelector(".play-board");
const scoreElement= document.querySelector(".score");
const highScoreElement= document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");
let gameOver = false;
let foodX , foodY;
let snakeX = 5 , snakeY = 10;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let setIntervalId;
let score = 0

let highScore = localStorage.getItem("high-score") || 0;

const changeFoodPosition = () => {
    // Passing a random 0 - 30 value as food Position
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;

}

const handleGameOver = () => {
   // Clearing the timer and reloading the page on game over
   clearInterval(setIntervalId)
   alert("Game Over! Press Ok to replay");
   location.reload();
}

const changeDirection = (e) => {
 if(e.key === "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
 }else if(e.key === "ArrowDown" && velocityY != -1 ){
    velocityX = 0;
    velocityY = 1;
 }else if(e.key === "ArrowLeft" && velocityX != 1){
    velocityX = -1;
    velocityY = 0;
 }else if(e.key === "ArrowRight" && velocityX != -1){
    velocityX = 1;
    velocityY = 0;
 }

}

controls.forEach(key => {
   key.addEventListener("click", () => changeDirection({ key: key.dataset.key}));
});


const initGame = () => {
if(gameOver) return handleGameOver();
let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX} "></div>`;

// checking if snake hit food
if(snakeX === foodX && snakeY === foodY){
   changeFoodPosition();
   snakeBody.push([foodX, foodY]);
   score++;

   highScore = score >= highScore ? score : highScore;
   localStorage.setItem("high-score",highScore)
 scoreElement.innerText = `Score : ${score}`;
highScoreElement.innerText = `High Score : ${highScore}`;
}

for (let i = snakeBody.length - 1 ; i > 0; i--) {
   // shifting forward values of elements in snake body by one

   snakeBody[i] = snakeBody[i - 1];
   
}


// setting first element of snake ody to current snake position
snakeBody[0] = [snakeX, snakeY]; 

// Updating snake's head position based on current velocy

snakeX += velocityX;
snakeY += velocityY;

// checking if snake's head is out of wall , if so setting gameOver to true
if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30){
   gameOver = true;
   
}

for (let i = 0; i < snakeBody.length; i++) {
   // Adding a div for each part of snake's body
   htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]} "></div>`;
   // Checking if the snake head hit body, if so set gameOver to true
   if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
      gameOver = true;
   }
}


playBoard.innerHTML = htmlMarkup;
}
changeFoodPosition();
setIntervalId = setInterval(initGame, 125);
document.addEventListener("keydown", changeDirection);