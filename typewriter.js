"use-strict"

let audio = document.querySelectorAll("audio");
const typekey1 = document.getElementById("typekey1");
const typekey2 = document.getElementById("typekey2");
const typespace = document.getElementById("typespace");
const typelast = document.getElementById("typelast");
const typereturn = document.getElementById("typereturn");

const startWrite = document.getElementById("startWrite");

let text = document.getElementById("typewriter").innerHTML;
let iterator = 1;
let timer;

start();

function start() {
    console.log("start");

    startWrite.addEventListener('click', function() {
        startWrite.disabled = true;
        timer = setTimeout(type, 500);
    });

    const unmute = document.getElementById("unmuteSound");
    unmute.addEventListener('click', unmuteSound);

    const mute = document.getElementById("muteSound");
    mute.addEventListener('click', muteSound);
}

function type() {
    console.log("type");

    if (text[iterator-1] === '<') {
        timer = setTimeout(type, 2500);
        typelast.play();
        iterator = iterator + 4;
    }else {
        timer = setTimeout(type, 500);
        document.getElementById("typewriter").innerHTML = text.substr(0, iterator);
        if (text[iterator-1] === ' ') {
            typespace.play();
        }else if ((iterator-1) % 2 != 0){
            typekey1.play();
        }else {
            typekey2.play();
        }
        iterator++;
    }

    if(iterator > text.length) {
        clearTimeout(timer);
        typereturn.play();
        iterator = 0;
        startWrite.disabled = false;
    }
}

function unmuteSound() {
    console.log("unmuteSound");
    [].forEach.call(audio, function(audio) {
        audio.muted = false;
    });
}

function muteSound() {
    console.log("muteSound");
    [].forEach.call(audio, function(audio) {
        audio.muted = true;
    });
}
