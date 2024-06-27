let canvas = document.getElementById('canvas');
let ctx = canvas.getContext("2d");
let interval;

let BALL ={x : 50, y: canvas.height - 50, radius : 10 ,dx : -2,dy : -2};
let PADDLE = {x: 90, y : 290, width: 100, height : 10, left: false, right :false, dx: -5};
let BRICK = {row: 2, column: 8, width:50, height : 40, padding: 5, margin_left: 10, margin_top: 20, color: "yellow"};
let bricks = [];
for(let i = 0; i < BRICK.column ; i++){
    bricks[i] = [];
    for(let j = 0; j < BRICK.row; j++){
        bricks[i][j] = {x :0 , y : 0,status: 1};
    }
}


function ball(){
    ctx.beginPath();
    ctx.arc(BALL.x , BALL.y - BALL.radius, 10, 0 , Math.PI * 2, false);
    ctx.fillStyle = 'green';
    ctx.fill();
    ctx.closePath();
}
function paddle(){
    ctx.beginPath();
    ctx.rect(PADDLE.x,PADDLE.y,PADDLE.width,PADDLE.height);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}
function drawBrick(){
    for(let i = 0; i < BRICK.column; i++){
        for(let j = 0; j < BRICK.row; j++){
            const bricksX = i * (BRICK.width + BRICK.padding) + BRICK.margin_left;
            const bricksY= j * (BRICK.height + BRICK.padding) + BRICK.margin_top; 
            bricks[i][j].x = bricksX;
            bricks[i][j].y = bricksY;
            if(bricks[i][j].status == 1){
                ctx.beginPath();
                ctx.rect(bricksX, bricksY, BRICK.width, BRICK.height);
                ctx.fillStyle ="yellow";
                ctx.fill();
                ctx.closePath();
            }
           
        }
    }
}
document.addEventListener("keyup", handleKeyUp);
function handleKeyUp(e){
    if(e.key == "ArrowLeft"){
        PADDLE.left = false;
    }
    if(e.key == "ArrowRight"){
        PADDLE.right = false;
    }
   
}
document.addEventListener('keydown', handleKeyDown);
function handleKeyDown(e){
    if(e.key == "ArrowLeft"){
        PADDLE.left = true;
    }
    if(e.key == "ArrowRight"){
        PADDLE.right = true;
    }
}
function collisionDetection(){
    if(BALL.x    < 0  + BALL.radius || BALL.x + BALL.radius > canvas.width ){
        BALL.dx = -BALL.dx;
    }
    if(BALL.y < 0  ){
        BALL.dy = -BALL.dy;
    }
    if(BALL.y> canvas.height){
        clearInterval(interval);
    }
    
    if(PADDLE.y   < BALL.y && PADDLE.x < BALL.x && BALL.x < PADDLE.x + PADDLE.width ){
        BALL.dy = - BALL.dy
    }

    for(let i = 0; i < BRICK.column; i++){
        for(let j = 0; j < BRICK.row; j++){
            const c = bricks[i][j];
            if(BALL.x > c.x && BALL.x < c.x + BRICK.width  && BALL.y > c.y  && BALL.y < c.y  + BRICK.height  && c.status == 1){
                c.status = 0;
                BALL.dy = -BALL.dy; 
                
            }
        }
    }
    
}
function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ball();
    paddle();
    drawBrick();
    collisionDetection();
    BALL.x += BALL.dx;
    BALL.y += BALL.dy;
    if(PADDLE.left){
        PADDLE.x += +PADDLE.dx;
    }
    if(PADDLE.right){
        PADDLE.x += -PADDLE.dx;
    }
    
}
function startGame(){
    interval = setInterval(draw,5);
}

startGame()
