//Krzystof Myjak 2019 r.
//get canvas element
let c = document.querySelector(".editor-canvas");
//create context variable for give canvas
let ctx = c.getContext("2d");

let pixelBuffer;
let pixelOrigin;

const imageUpload = document.querySelector("#imageUpload");
const saveButton = document.querySelector(".save");

let controls = {
    red: document.querySelector("#redInput"),
    green: document.querySelector("#greenInput"),
    blue: document.querySelector("#blueInput"),
    transparency: document.querySelector("#transInput"),
    contrast: document.querySelector("#contrastInput"),
    brightness: document.querySelector("#brightInput"),
    color: document.querySelector("#paint_color")
}
//mouse x, y
let mouse = {
    x: 0,
    y: 0
}
//Image functions

imageUpload.addEventListener('submit', (e) => {
    e.preventDefault();
    let image = document.createElement("img");
    image.crossOrigin = "Anonymous";
    if (e.target[0].value === '') {
        image.src = 'https://preview.redd.it/bptzx7ur4uj11.jpg?width=960&crop=smart&auto=webp&s=d506a8f60ef41916578633bbb3e2d95ef7196fb7';
    } else {
        image.src = './' + document.querySelector("#image").files[0].name;
    }

    image.onload = () => {
        ctx.drawImage(image, 0, 0, 600, 400);
        pixelBuffer = ctx.getImageData(0, 0, c.width, c.height);
        pixelOrigin = ctx.getImageData(0, 0, c.width, c.height);
        filter();
    }
});

//Inputs
controls.transparency.oninput = function(){
    document.querySelector('label[for="transControl"]').innerHTML = this.value;
    filter();
}

controls.contrast.oninput = function(){
    document.querySelector('label[for="contrastControl"]').innerHTML = this.value;
    filter();
}

controls.brightness.oninput = function(){
    document.querySelector('label[for="brightControl"]').innerHTML = this.value;
    filter();
}
//save button input
saveButton.addEventListener('click', () => {
    saveButton.setAttribute('download', 'image.png');
    saveButton.setAttribute('href', c.toDataURL("image/png").replace("image/png", "image/octet-stream"));
});

//Image processing
let filter = function(){
    let c = (parseFloat(controls.contrast.value) || 0) + 1;//contrast
    let f = (259.0 * (c + 255.0)) / (255.0 * (259.0 - c));

    for (let i = 0; i < pixelBuffer.data.length; i += 4) {
        //Red
        pixelBuffer.data[i] = calcColor(f * (((pixelOrigin.data[i] * parseInput(controls.red.value)) + 255 * parseInput(controls.brightness.value)) - 128.0) + 128.0);
        //green
        pixelBuffer.data[i+1] = calcColor(f * (((pixelOrigin.data[i+1] * parseInput(controls.blue.value)) + 255 * parseInput(controls.brightness.value)) - 128.0) + 128.0);
        //blue
        pixelBuffer.data[i+2] = calcColor(f * (((pixelOrigin.data[i+2] * parseInput(controls.green.value)) + 255 * parseInput(controls.brightness.value)) - 128.0) + 128.0);
        //transparency
        pixelBuffer.data[i + 3] = pixelOrigin.data[i + 3] * parseInput(controls.transparency.value);
        
    }

    ctx.putImageData(pixelBuffer, 0, 0);
}
//Drawing on image
document.addEventListener('mousemove', (e) => {
    if (e.buttons !== 1) return;
        ctx.beginPath();
        ctx.lineCap = 'round';
        ctx.lineWidth = 2;
        ctx.strokeStyle = controls.color.value;
        ctx.moveTo(mouse.x, mouse.y);
        mouseAction(e);
        ctx.lineTo(getMousePos(c, e).x, getMousePos(c, e).y);
        ctx.stroke();
});


//misc supporting functions
let mouseAction = function(e){
    mouse.x = getMousePos(c, e).x;
    mouse.y = getMousePos(c, e).y;
}
//mouse data relative to canvas element
let getMousePos = function(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}


let parseInput = function(val){
    return val / 100;
}
let calcColor = function(value) {
    if (value < 0) {
        value = 0;
    } else if (value > 255) {
        value = 255;
    }
    return value;
}
document.addEventListener('mouseenter',e => mouseAction(e));
document.addEventListener('mousedown', e => mouseAction(e));