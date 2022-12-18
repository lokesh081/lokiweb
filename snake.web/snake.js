const canvasWidth = 25;
const canvasHeight = 25;
const BlockSize = 25;
var snakex = 5*BlockSize;
var snakey = 5*BlockSize;
var snakeBody = [];
var gameOver = false;
var board,context;
var foodx,foody;
var velocityX = 0;
var velocityY = 0;
var score = 0;

window.onload = function(){

    
    addFood();
    document.addEventListener('keyup',direction);
    if(!gameOver){
        console.log('demo');
        setInterval(startGame,1000/5);
    }

}

function startGame(){

    if(!gameOver){
        drawBoard();
        drawFood();
        drawSnake();
        updateScore();
    }else{
        drawGameOver();
        document.addEventListener('keyup',restartGame);
    }
}

function drawBoard(){

    board = document.getElementById("board");
    context = board.getContext("2d");

    board.width = canvasWidth*BlockSize;
    board.height = canvasHeight*BlockSize;

    context.fillStyle = "black";
    context.fillRect(0,0,board.width,board.height);

}

function drawFood(){
    context.fillStyle = 'red';
    context.fillRect(foodx,foody,BlockSize,BlockSize);
}

function addFood(){
    foodx = Math.round(Math.random()*canvasWidth)*BlockSize;
    foody = Math.round(Math.random()*canvasHeight)*BlockSize;
}

function drawSnake(){

    for(var i = snakeBody.length-1; i > 0; i--){
        snakeBody[i] = snakeBody[i-1];
    }

    if(snakeBody.length){
        snakeBody[0] = [snakex,snakey];
    }

    //draw body

    snakex += velocityX*BlockSize;
    snakey += velocityY*BlockSize;
    context.fillStyle = '#83A403';
    context.fillRect(snakex,snakey,BlockSize,BlockSize);

    for(var i = 0; i<snakeBody.length; i++){
        context.fillRect(snakeBody[i][0],snakeBody[i][1],BlockSize,BlockSize);
    }
    checkCollision();
}

function direction(e){
    if(e.code == "ArrowUp" && velocityY != 1){
        velocityY = -1;
        velocityX = 0;
    }
    else if(e.code == "ArrowDown" && velocityY != -1 ){
        velocityX = 0;
        velocityY = 1;
    }
    else if(e.code == "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }
    else if(e.code == "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
}

function checkCollision(){

    //food collision
    if(snakex == foodx && snakey == foody){
        score += 1 ;
        addFood();
        snakeBody.push([foodx,foody]);
    }

    //out of bound
    if(snakex < 0 || snakey < 0 || snakex > canvasWidth*BlockSize || snakey > canvasHeight*BlockSize){
        gameOver = true;
        console.log(gameOver);
    }

    //snake body collision
    console.log(snakeBody);
    console.log([snakex,snakey]);
    for(var i=2; i < snakeBody.length ; i++){
        if(snakex == snakeBody[i][0] && snakey == snakeBody[i][1]){
            gameOver = true;
            return;
        }
    }
}

function drawGameOver(){
    var gameOverText = [[312.5,300.5],[],]
    board = document.getElementById("board");
    context = board.getContext("2d");
    context.fillStyle = "black";
    context.fillRect(0,0,board.height,board.width);

    context.fillStyle = "#83A403";
    context.font = '48px serif';
    context.fillText("GAME OVER", 175, 312.5);
}

function updateScore(){
    document.getElementById("score").innerHTML = score;
}
function restartGame(e){
    gameOver = false;
    snakex = 5*BlockSize;
    snakey = 5*BlockSize;
    snakeBody = [];
    score = 0;
    document.removeEventListener('keyup',restartGame);
}