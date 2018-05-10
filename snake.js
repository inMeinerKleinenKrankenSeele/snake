var ctx;
var canvas;
const DELAY = 500;


function init() {
    
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');

    //loadImages();
    
    
   // drawGrid();
    createSnake();
    locateApple();

    drawSnake();

    drawGrid();

    setInterval("gameCycle()", DELAY);
}    

const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40;

var currentDirection = "down"//down by default as start
var snake= [];
var head = [];
var previousTail;
var sizeOfCell = 20;
//step=20?

function gameCycle(){
    
    moveSnake();
    drawSnake();
    drawGrid();
}

function moveSnake(){
   
    var newHead = [snake[0][0],snake[0][1]];
    snake.unshift(newHead);
    if(currentDirection=="down")//j++
    {
        snake[0][1]++;
        previousTail = snake.pop();
     
    }
    else if(currentDirection=="up")//j--
    {
        snake[0][1]--;
        previousTail = snake.pop();
    }
    else if(currentDirection=="left")//i--
    {
        snake[0][0]--;
        previousTail = snake.pop();
    }
    else if(currentDirection=="right")//i++
    {
        snake[0][0]++;
        previousTail = snake.pop();
    }
}


function createSnake(){
    head = [3,3]
    tail1 = [3,2]
    tail2 = [3,1]

    snake[0]=head;
    snake[1]=tail1;
    snake[2]=tail2;
}

function drawSnake(){
    ctx.fillStyle="#FFFFFF"
   // alert(snake[0,0])
    ctx.fillRect(snake[0][0]*sizeOfCell,snake[0][1]*sizeOfCell,sizeOfCell,sizeOfCell)

    for(var i=1; i<snake.length;i++)
    {
        ctx.fillStyle="#999999"
        ctx.fillRect(snake[i][0]*sizeOfCell,snake[i][1]*sizeOfCell,sizeOfCell,sizeOfCell)
     //  ctx.fillRect(snake[0][i]*sizeOfCell,snake[i][0]*sizeOfCell,sizeOfCell,sizeOfCell)
    }
   
    ctx.fillStyle="#000000";
    if(previousTail != undefined) ctx.fillRect(previousTail[0]*sizeOfCell,previousTail[1]*sizeOfCell,sizeOfCell,sizeOfCell)
}

function locateApple(){

}

function drawGrid(){
    ctx.fillStyle="#505050";
    for(var i=0;i<160;i++){
        for(var j=0;j<160;j++){
            ctx.fillRect(i*sizeOfCell,j*sizeOfCell, 1,canvas.height);
            ctx.fillRect(i*sizeOfCell,j*sizeOfCell, canvas.width,1)
        }
    }
}



onkeydown = function(e) {
    
    var key = e.keyCode;
    
    if ((key == LEFT_KEY) && (currentDirection!="right")) {
        currentDirection="left";
    }
    else if ((key == RIGHT_KEY) && (currentDirection!="left")) {
        currentDirection="right";
    }
    else if ((key == DOWN_KEY) && (currentDirection!="up")) {
        currentDirection="down";
    }
    else if ((key == UP_KEY) && (currentDirection!="down")) {
        currentDirection="up";
    }
}