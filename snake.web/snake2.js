var blockSize = 25;
var rows = 25;
var cols = 25;
var board,context;
var gameOver = false;
var score = 0;


var snakex = blockSize*10;
var snakey = blockSize*10;
var snakeBody = [];
var velocityX = 0;
var velocityY = 0;

var foodx ;
var foody ;


console.log(Math.floor(Math.random() * cols));

window.onload = function(){

    board = document.getElementById("board");
    board.height = blockSize * rows;
    board.width  = blockSize * cols;

    context = board.getContext("2d");
    document.addEventListener("keyup",changeDirection);
    placeFood();
    
    setInterval(update , 1000/10);
   
}

function update(){

    //logic

     if(snakex < 0 || snakey < 0 || snakex > board.width || snakey > board.height){
        gameOver = true;
    }

    if(snakeBody.length > 3){checkCollision(snakeBody,snakex,snakey);}

    if(gameOver){

        var gameOverText = [[312.5,300.5],[],]

        context.fillStyle = "black";
        context.fillRect(0,0,board.height,board.width);

        context.fillStyle = "green";
        context.font = '48px serif';
        context.fillText("GAME OVER", 175, 312.5);
        return;
    }

    context.fillStyle = "black";
    context.fillRect(0,0,board.height,board.width);
    
   
    context.fillStyle = "red";
    context.fillRect(foodx,foody,blockSize,blockSize);
    if(snakex == foodx && snakey == foody){
        snakeBody.push([foodx,foody]);
        score += 1 ;
        document.getElementById("score").innerHTML = score;
        placeFood();
    }


    
    for(let i = snakeBody.length-1 ; i > 0 ; i--){
        snakeBody[i] = snakeBody[i-1]
    }
    if(snakeBody.length){
        //check for collision
        snakeBody[0] = [snakex,snakey];
   }

    context.fillStyle = "green";
    snakex += velocityX * blockSize;
    snakey += velocityY * blockSize;
    context.fillRect(snakex,snakey,blockSize,blockSize);

    for(let  i = 0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0],snakeBody[i][1],blockSize,blockSize);
    }
      

}

function placeFood(){
    foodx = Math.floor(Math.random() * cols) * blockSize;
    foody = Math.floor(Math.random() * rows) * blockSize;
}

function changeDirection(e){
    if(e.code == "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
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

function checkCollision(array,x,y){
    
   for(var i=2; i < array.length ; i++){
        if(x == array[i][0] && y == array[i][0]){
            gameOver = true;
            console.log(array);
            console.log(x);
            console.log();
            return;
        }
    }

}


