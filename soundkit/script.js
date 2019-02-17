
//Krzysztof Myjak 2019 r.
document.addEventListener("keypress",  (e)=>play(e.key));

let ch_array = [new Array(), new Array(),new Array(),new Array()];

let ch_enable = [false,false,false,false];

let recording = {
    channel : null,
    record: false,
};
let rec_limit = 5000;

function play(s){
    try{
        let sound = document.querySelector('#'+s);
        sound.currentTime = 0;
        sound.play();
        if(recording.record){
            record(recording.channel, s)
        }
    }catch{console.info("Brak dzwieku dla: "+ s)};
}

function record(channel, s){
    if(channel.length < 1){
       channel[0] = [new Date().getTime(), s]; 
    }else{
        let elapsedTime = new Date().getTime()-channel[0][0]; 
        channel.push([elapsedTime,s]);
        if(elapsedTime > rec_limit){
            stopRecording(channel);
        }
    }
}
function enable(ch){
    if(ch_enable[ch]){
        ch_enable[ch] = false;
    }else{
        ch_enable[ch] = true;
    }
}

function startRecording(channel){
    channel.length = 0;
    recording.channel = channel;
    recording.record = true;
    
}

function stopRecording(channel,){
    channel[0][0] = 0;
    recording.channel = channel;
    recording.record = false;
}
function playRecording(channel){
    channel.forEach(element => {
       setTimeout(()=>play(element[1]), element[0]); 
    });
}
function playAll(){
    for(let i = 0; i< ch_enable.length; i++){
        if(ch_enable[i])playRecording(ch_array[i]);
    }
}