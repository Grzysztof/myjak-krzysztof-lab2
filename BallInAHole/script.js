let ball = {
    x: 5,
    y: 5,
    w: 20,
    h: 20,
    selector: document.querySelector('#ball')
}
let device = {
    x: 0,
    y: 0,
}
let board = {
    boundry_x: 640,
    boundry_y: 480,
}
let hole = {
    x: 220,
    y: 220,
    w: 25,
    h: 25
}

let time;

let orientation = function(e){
    device.x = e.gamma;
    device.y = (90 + e.alpha);
}

let update = function(){
    let nextBallx = ball.x + (device.x*0.2);
    let nextBally = ball.y + (device.y*0.2);
    //ball -> board boundaries collision
    if(nextBallx > 0 && nextBallx < (board.boundry_x-ball.w)){
        ball.x = nextBallx;
    }
    if(nextBally > 0 && nextBally < (board.boundry_y-ball.h)){
        ball.y = nextBally;
    }
    //ball -> hole collision
    if(ballOverlap_x() && ballOverlap_y()){
        console.error("hit");
        clearInterval(time);
    }
    document.querySelector('#ball').style.top = ball.y + 'px';
    document.querySelector('#ball').style.left = ball.x + 'px';
    console.log('ball.x '+ ball.x, 'ball.y '+ ball.y, 'over_X: '+ballOverlap_x(), 'over_Y: '+ballOverlap_y());
}
let ballOverlap_x = function(){
    if((ball.x+ball.w)>hole.x && ball.x<(hole.x+hole.w))return true;
    return false;
    }
    
let ballOverlap_y = function(){
    if((ball.y+ball.h)>hole.y && ball.y<(hole.y+hole.h))return true;
    return false;
}


let init = function(){
    hole.x = Math.floor(Math.random() * ((board.boundry_x - 30) -  30)) + (30);
    hole.y = Math.floor(Math.random() * ((board.boundry_y - 30) -  30)) + (30);

    document.querySelector('#hole').style.top = hole.y + 'px';
    document.querySelector('#hole').style.left = hole.x + 'px';

    time = setInterval(update, 33);
}
let keyPress = function(e){
    if(e.key == "ArrowLeft")ball.x -=2;
    if(e.key == "ArrowRight")ball.x +=2;
    if(e.key == "ArrowUp")ball.y -=2;
    if(e.key == "ArrowDown")ball.y +=2;
}

init();

window.addEventListener("deviceorientation", orientation, true);
window.addEventListener("keydown", (e)=>keyPress(e));

