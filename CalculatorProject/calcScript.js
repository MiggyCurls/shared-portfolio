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

function calculate(){
    display.value = eval(display.value);
}

function addDecimal(){
    const text = display.value;
    let canBeAdded = true;
    
    //Between operands you can only have one decimal
    for(let i = 0; i < text.length; i++){
        //Boolean flips every time it finds operand or decimal
        if(text.charAt(i) == '.'){
            canBeAdded = false;
        }
        if(text.charAt(i) == '+' || text.charAt(i) == '/' || text.charAt(i) == '*' || text.charAt(i) == '-'){
            canBeAdded = true;
        }
    }
    if(canBeAdded){
        display.value += '.';
    }

}

function addParenthesis(){
    const text = display.value;
    let leftP = 0;

    for(let i = 0; i < text.length; i++){
        if(text.charAt(i) == '('){
            leftP++;
        }else if(text.charAt(i) == ')'){
            leftP--;
        }
    }
    const str = text.slice(text.length-1, text.length);
    //Check to see if last character is a number and apply/don't apply correct parenthesis
    if(leftP == 0 && (text.at(-1) != ')' && str.search(/^[0-9]+$/) == -1)){
        display.value += '(';
    }else if (leftP != 0 && (text.at(-1) != '(' && str.search(/^[0-9]+$/) != -1)){
        display.value += ')';
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

    if(input == '-' && text == '('){
        //A minus operation can be interpreted as a negative value
        display.value += input;
    }else if(text != '+' && text != '-' && text != '/' && text != '*' && text != '('){
        //operand is not at end of screen
        display.value += input;
    }
}