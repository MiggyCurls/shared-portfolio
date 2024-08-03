//Javascript file for calculator

function myListener(){
    window.location.href='../index.html';
}
const display = document.getElementById('screen');

function appendDigit(digit){
    display.value += digit;
}

function clearScreen(){
    display.value = "";
}

function delButt(){
    const text = display.value;
    display.value = text.substring(0, text.length-1);
}

function addDecimal(){
    const text = display.value;
    if (text.indexOf(".") == -1){
        //there is no decimal on screen, free to add one
        display.value += ".";
    }
}

function signs(){
    const text = display.value;

    if(text.indexOf("-") == -1){
        //The integer on screen is positive
        display.value = "-" + text;
    }else{
        //The integer on screen is negative
        display.value = text.slice(1,text.length);
    }
}

function operation(input){
    const text = display.value.at(-1);
   
    if(text != '+' && text != '-' && text != '/' && text != '*'){
        //operand is not at end of screen
        display.value += input;
    }
}