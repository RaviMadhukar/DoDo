// Game Constants And Variables

let direction ={x:0, y: 0};
const foodSound = new Audio('sound/eating.mp3');
const gameOverSound = new Audio('sound/ohno.mp3');
const moveSound = new Audio('sound/move.mp3');
const gameSound = new Audio('sound/gamemusic.mp3');
let speed = 2;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y:15}
]

food = {x: 6, y:7};

// Game Function

function main(ctime){
    window.requestAnimationFrame(main);
    //console.log(ctime);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function gameEngine(){
    // Part 1: Update the snake array & food

    // Part 2: Display the snake and food

    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart =e.x;
        if(index == 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement)
    });

    //Display the food
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart =food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement)
    
}


// Main Logic starts here

window.requestAnimationFrame(main);
window.addEventListener('keydown',e =>{
    inputDirection = {x: 0, y:1} //strat the game
    moveSound.play();

    // Control using KeyBoard
    switch (e.key){
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
})