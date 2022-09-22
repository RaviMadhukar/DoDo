// Game Constants And Variables

let inputDirection = { x: 0, y: 0 };
const foodSound = new Audio('sound/eating.mp3');
const gameOverSound = new Audio('sound/ohno.mp3');
const moveSound = new Audio('sound/move.mp3');
const gameSound = new Audio('sound/gamemusic.mp3');
let speed = 3;
let score = 0;
let a = 2;
let b = 16;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
]

// initial position of food in board
food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b - a) * Math.random()) };

// Game Function

function main(ctime) {
    window.requestAnimationFrame(main);
    //console.log(ctime);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

//snake when collide
function isCollide(snake) {
    //if snake pump into itself
    for(let i = 1; i< snakeArr.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true; 
        }
    }    
        //if snake collide on wall
        if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
             return true;
        }
}

function gameEngine() {
    // Part 1: Update the snake array & food
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        gameSound.pause();
        inputDirection = { x: 0, y: 0 } //after gameover again strat the game
        alert("Game Over.. Press any key to play again...");
        snakeArr = [{ x: 13, y: 15 }];
        //gameSound.play();
        score = 0;
    }

    //If snake have eaten the food, increment the score and regenerate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score +=1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
            hiscoreBox.innerHTML = "High Score :" + hiscore;

        }
        scoreBox.innerHTML = "Score:" + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDirection.x, y: snakeArr[0].y + inputDirection.y });
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    // move the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDirection.x;
    snakeArr[0].y += inputDirection.y;

    // Part 2: Display the snake and food

    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index == 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement)
    });

    //Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement)

}


// Main Logic starts here
gameSound.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval=0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "High Score :" + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDirection = { x: 0, y: 1 } //strat the game
    moveSound.play();

    // Control using KeyBoard
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDirection.x = 0;
            inputDirection.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDirection.x = 0;
            inputDirection.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDirection.x = -1;
            inputDirection.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDirection.x = 1;
            inputDirection.y = 0;
            break;
        default:
            break;
    }
});

// mobile users
function controler(e){
    console.log("hello",e);
    inputDirection = { x: 0, y: 1 } //strat the game
    moveSound.play();

    // Control using KeyBoard
    switch (e) {
        case "38":
            console.log("ArrowUp");
            inputDirection.x = 0;
            inputDirection.y = -1;
            break;

        case "40":
            console.log("ArrowDown");
            inputDirection.x = 0;
            inputDirection.y = 1;
            break;

        case "37":
            console.log("ArrowLeft");
            inputDirection.x = -1;
            inputDirection.y = 0;
            break;

        case "39":
            console.log("ArrowRight");
            inputDirection.x = 1;
            inputDirection.y = 0;
            break;
        default:
            break;
    }
 }