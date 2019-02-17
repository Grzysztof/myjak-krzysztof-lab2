
//Krzysztof Myjak 2019 r.
//Listen to keypress and pass event (e) to play() function
document.addEventListener("keypress",  (e)=>play(e.key));
//channel array contains all usable channels
let ch_array = [new Array(), new Array(),new Array(),new Array()];
//array with channel enable variables used in playAll() function
let ch_enable = [false,false,false,false];
//recording object
let recording = {
    channel : null,
    record: false,
};
//recording duration limit - 5 seconds
let rec_limit = 5000;

//play function checks if s ( event.key ) corresponds to implemented sound and plays it if possible. 
//If recording flag is set to true it also passes key key data and channel to record() function

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
//Recording function gets channel and sound (s). 
function record(channel, s){
    //First checks if recording is already taking place by checking length of ch_array.
    if(channel.length < 1){
    //If its empty ( length < 1) starts new recording pushing first sound and timecode to array.
        channel[0] = [new Date().getTime(), s]; 
    }else{    
    //If recording is in progress (length > 1) function calculates elapsed time from previous entry in array and pushes new sound and elapsed time to ch_array;
        let elapsedTime = new Date().getTime()-channel[0][0]; 
        channel.push([elapsedTime,s]);
        //checking if elapsed time doesnt exceeds recording time limit.
        if(elapsedTime > rec_limit){
        //if recording time exceeds limit function stops recording on channel
            stopRecording(channel);
        }
    }
}
//handling toggle switches as normal buttons.
function enable(ch){
    if(ch_enable[ch]){
        ch_enable[ch] = false;
    }else{
        ch_enable[ch] = true;
    }
}
function startRecording(channel){
    //clear channel of any previous data
    channel.length = 0;
    //set channel flag on given channel
    recording.channel = channel;
    //set recording flag to true to start recording
    recording.record = true;
    
}
//stopping recording
function stopRecording(channel){
    channel[0][0] = 0;
    recording.channel = channel;
    recording.record = false;
}
//playing recording works by playing note then waiting saved elapsed time befor playing next note.
function playRecording(channel){
    channel.forEach(element => {
       setTimeout(()=>play(element[1]), element[0]); 
    });
}
//playAll function checks ch_enable array to see which channels are enabled and iterates ch_array on enabled channels.
function playAll(){
    for(let i = 0; i< ch_enable.length; i++){
        if(ch_enable[i])playRecording(ch_array[i]);
    }
}