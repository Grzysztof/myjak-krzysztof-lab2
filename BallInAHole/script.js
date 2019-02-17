//ball variables
let ball = {
    x: 5,
    y: 5,
    w: 20,
    h: 20,
}
//device orientation variables
let device = {
    x: 0,
    y: 0,
}
//board setttings variables
let board = {
    boundry_x: 640,
    boundry_y: 480,
}
//hole variables
let hole = {
    x: 220,
    y: 220,
    w: 25,
    h: 25
}
//interval variable
let interval;
//timers
let timer;
let timeDisplay = 0;

//device orientation input and pass to deiace variables
let orientation = function(e){
    device.x = e.gamma;
    device.y = e.beta;
}
//main game loop
let update = function(){
    //get elapsed time from begining of game and substract current time to get elapsed time. Math.floor to convert from milliseconds to seconds
    let timeDisplay = Math.floor((Date.now()-timer)/1000);
    //calculate new ball position based on user device orientation
    let nextBallx = ball.x + (device.x*0.2);
    let nextBally = ball.y + (device.y*0.2);
    //check new position if still in boundries of our map and if true write new calculated x, y to ball variables.
    if(nextBallx > 0 && nextBallx < (board.boundry_x-ball.w)){
        ball.x = nextBallx;
    }
    if(nextBally > 0 && nextBally < (board.boundry_y-ball.h)){
        ball.y = nextBally;
    }
    //Check if ball collides/overlaps hole 
    if(ballOverlap_x() && ballOverlap_y()){
        //if yes stop interval and display msg
        clearInterval(interval);
        //if collision occurs display msg
        let r = confirm('Twój czas: '+timeDisplay+'s. Restart?');
        //if msg true start again
        if(r)init();
    }
    //display ball
    document.querySelector('#ball').style.top = ball.y + 'px';
    //display hole
    document.querySelector('#ball').style.left = ball.x + 'px';
    //display timer
    document.querySelector('#timer').innerHTML = timeDisplay;
}
//check if ball collides with hole on x axis
let ballOverlap_x = function(){
    if((ball.x+ball.w)>hole.x && ball.x<(hole.x+hole.w))return true;
    return false;
}
//check if ball collides with hole on y axis
let ballOverlap_y = function(){
    if((ball.y+ball.h)>hole.y && ball.y<(hole.y+hole.h))return true;
    return false;
}

//initialize all variables
let init = function(){
    //'randomize' hole position max_x = board.boundry_x - 30 min_x = 30 max_y - board.boundry_y - 30 min_y = 30
    hole.x = Math.floor(Math.random() * ((board.boundry_x - 30) -  30)) + (30);
    hole.y = Math.floor(Math.random() * ((board.boundry_y - 30) -  30)) + (30);
    //update top and left (x and y) style attributes for hole.
    document.querySelector('#hole').style.top = hole.y + 'px';
    document.querySelector('#hole').style.left = hole.x + 'px';
    //reset timer
    timer = Date.now();
    //start interval 1000/30 ~ 33/s around 30 fps
    interval = setInterval(update, 33);
}
//initialize our game as soon as window loads. 
window.onload = function(){
    init();
}
//Listen for orientation change event and pass data to orientation().
window.addEventListener("deviceorientation", orientation, true);
