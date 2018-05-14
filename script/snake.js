var ctx;
var canvas;
const DELAY = 200;

var intervalID;

function init() {

    isAlive=false;
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');
    resetAll();

    createSnake();
    locateApple();
    drawSnake();
    drawGrid();

    isAlive=true;
    intervalID = setInterval("gameCycle()", DELAY);
}

function resetAll(){
    clearInterval(intervalID);
    if(apple != undefined)   removeApple();
    if(snake != undefined)   removeSnake();
    currentDirection = "down";
    points = 0;
    document.getElementsByClassName('score')[0].innerHTML ="Score: " + points;
    snake = [];
    head = [];
    apple=null;
    appleExists = false;
    previousTail=null;
   // isAlive = true;
}

const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40;

var currentDirection = "down"//down by default as start
var snake = [];
var head = [];
var previousTail;
var sizeOfCell = 20;
var apple;
var appleExists = false;
var points = 0;
var isAlive = true;
//step=20?
//160 x 90
function gameCycle() {

    if (isAlive) {
        moveSnake();

        checkSnake();

        drawSnake();
        locateApple();
        drawGrid();
    }
    else{
        return;
    }
}

function checkSnake() {
    for(var i=1;i<snake.length;i++){
        if(snake[0][0]==snake[i][0] && snake[0][1]==snake[i][1]){
            isAlive=false;
        }
    }

    if (snake[0][0] == apple[0] && snake[0][1] == apple[1]) {
        appleExists = false;
        feedSnake();
    }
}

function removeApple(){
    ctx.fillStyle = "#000000";
    ctx.fillRect(apple[0] * sizeOfCell, apple[1] * sizeOfCell, sizeOfCell, sizeOfCell);
}

function removeSnake(){
    ctx.fillStyle = "#000000";
    snake.forEach(element => {
        ctx.fillRect(element[0] * sizeOfCell, element[1] * sizeOfCell, sizeOfCell, sizeOfCell);   
    });
}

function feedSnake() {
    var currTail = snake.pop();
    var newTail = [currTail[0], currTail[1]];
    snake.push(currTail, newTail);
    points++;
    document.getElementsByClassName('score')[0].innerHTML ="Score: " + points;
}

function moveSnake() {

    var newHead = [snake[0][0], snake[0][1]];
    snake.unshift(newHead);
    if (currentDirection == "down")//j++
    {
        snake[0][1]++;
        previousTail = snake.pop();

    }
    else if (currentDirection == "up")//j--
    {
        snake[0][1]--;
        previousTail = snake.pop();
    }
    else if (currentDirection == "left")//i--
    {
        snake[0][0]--;
        previousTail = snake.pop();
    }
    else if (currentDirection == "right")//i++
    {
        snake[0][0]++;
        previousTail = snake.pop();
    }
}


function createSnake() {
    head = [3, 3]
    tail1 = [3, 2]
    tail2 = [3, 1]

    snake[0] = head;
    snake[1] = tail1;
    snake[2] = tail2;
}

function drawSnake() {
    if(!isAlive)
        ctx.fillStyle = "#FF0000";
    if (isAlive)
        ctx.fillStyle = "#FFFFFF";
    // alert(snake[0,0])
    ctx.fillRect(snake[0][0] * sizeOfCell, snake[0][1] * sizeOfCell, sizeOfCell, sizeOfCell);

    for (var i = 1; i < snake.length; i++) {
        if (isAlive)
            ctx.fillStyle = "#999999";
        ctx.fillRect(snake[i][0] * sizeOfCell, snake[i][1] * sizeOfCell, sizeOfCell, sizeOfCell);
    }

    if (isAlive)
        ctx.fillStyle = "#000000";
    if (previousTail != undefined) ctx.fillRect(previousTail[0] * sizeOfCell, previousTail[1] * sizeOfCell, sizeOfCell, sizeOfCell)
}

function locateApple() {
    if (!appleExists) {
        var newApple = getNewAppleCoordinates();
        drawApple(newApple);
        apple = newApple;
    }
    appleExists = true;
}

function drawApple(point) {
    ctx.fillStyle = "#00FF00";
    ctx.fillRect(point[0] * sizeOfCell, point[1] * sizeOfCell, sizeOfCell, sizeOfCell);
}

function getNewAppleCoordinates() {
    var located = false;
    while (!located) {
        var xApple = randomInteger(0, 80);
        var yApple = randomInteger(0, 45);

        for (var i = 0; i < snake.length; i++) {
            if (xApple == snake[i][0] && YApple == snake[i][1]) {
                break;
            }
            located = true;
        }
    }
    return [xApple, yApple];
}


function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}

function drawGrid() {
    ctx.fillStyle = "#505050";
    for (var i = 0; i < 160; i++) {
        for (var j = 0; j < 160; j++) {
            ctx.fillRect(i * sizeOfCell, j * sizeOfCell, 1, canvas.height);
            ctx.fillRect(i * sizeOfCell, j * sizeOfCell, canvas.width, 1);
        }
    }
}



onkeydown = function (e) {

    var key = e.keyCode;

    if ((key == LEFT_KEY) && (currentDirection != "right")) {
        currentDirection = "left";
    }
    else if ((key == RIGHT_KEY) && (currentDirection != "left")) {
        currentDirection = "right";
    }
    else if ((key == DOWN_KEY) && (currentDirection != "up")) {
        currentDirection = "down";
    }
    else if ((key == UP_KEY) && (currentDirection != "down")) {
        currentDirection = "up";
    }
}