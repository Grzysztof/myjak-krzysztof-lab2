//krzystof Myjak 2019r.
class Note{
    constructor(title, color, pinned, text){
        this.id = Date.now();
        this.title = title;
        this.color = color;
        this.pinned = pinned;
        this.text = text;
    }
}
class Storage{
    constructor(){}
    appKey = "notepad_project"
    saveNote(notes){
        localStorage.setItem(this.appKey,JSON.stringify(notes));
        //console.log(JSON.stringify(notes));
    }
    getNotes(){
        return JSON.parse(localStorage.getItem(this.appKey));
    }
        
}

let ls = new Storage();
let notes = new Array();
let pin = false;
let retriveNotes = function(){
    notes = [];
    let data = ls.getNotes();
    if(data != null)notes = data;
}

let buttonSave = function(){
    n = new Note(document.querySelector('#title').value, document.querySelector('#note-color').value, pin, document.querySelector('#note').value);
    notes.push(n);
    ls.saveNote(notes);
    retriveNotes();
    displayList();
}

let displayList = function(){
    document.querySelector('#note-list-pin').innerHTML='';
    document.querySelector('#note-list-disp').innerHTML='';
    notes.forEach(n => {
        item = document.createElement('li');
        item.style.background = n.color;
        item.innerHTML = n.title;
        item.onclick = function(){selectNote(n)}
        if(n.pinned){
            document.querySelector('#note-list-pin').appendChild(item);
        }else{
            document.querySelector('#note-list-disp').appendChild(item);
        }
            
    });
}
let selectNote = function(n) {
    document.querySelector('#title').value = n.title;
    document.querySelector('#note-color').value = n.color;
    document.querySelector('#pin').checked = n.pinned;
    document.querySelector('#note').value = n.text;
    pin = n.pinned;
}
let pinCheck = function(){
    if(pin){
        pin = false;
    }else{
        pin = true;
    }
    console.log(pin);
}

window.onload = function(){
    retriveNotes();
    displayList();
}