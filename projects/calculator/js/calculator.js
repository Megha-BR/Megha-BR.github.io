let runningTotal = 0;
let buffer = "0";
let previousOperater = null;
const screen = document.querySelector(".screen");

function buttonClick(value) {
    if(isNaN(value)) {
        //Symbol
        handleSymbol(value);
    }
    else {
        //Number
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol) {
    if(symbol === 'C') {
        }
    switch(symbol) {
        case 'C' :
            buffer = "0";
            runningTotal = 0;
            break;
        case '=' : 
            if(runningTotal === 0) {
                return;
            }
            flushOperation(parseInt(buffer));
            buffer = runningTotal;
            runningTotal = 0;
            previousOperater = null;
            break;
        case '←' :
            if(buffer.length === 1) {
                buffer = '0';
            }
            else {
                buffer = buffer.substring(0, buffer.length -1);
            }
            break;
        case '+' : 
        case '−' :
        case '×' :
        case '÷' :
            handleMath(symbol);
            break;
    
    }
}

function handleMath(symbol) {
    if(buffer === '0') {
        //do nothing
        return;
    }

    const intBuffer = parseInt(buffer);
    if(runningTotal === 0) {
        runningTotal = intBuffer;
    }
    else {
        flushOperation(intBuffer);
    }
    previousOperater = symbol;
    buffer = '0';
}

function flushOperation(intBuffer) {
   if(previousOperater === '+') {
        runningTotal += intBuffer;
    }
    else if(previousOperater === '−') {
        runningTotal -= intBuffer;
    }
    else if(previousOperater === '×') {
        runningTotal *= intBuffer;
    }
    else {
        runningTotal /= intBuffer;
    }
}

function handleNumber(numberString) {
   /* const num = parseInt(numberString);
    buffer = buffer*10 + num;*/
    if(buffer === "0")
        buffer = numberString;
    else
        buffer += numberString;
    }

function init() {
    document.querySelector('.calc-buttons')
        .addEventListener('click', function(event) {
            buttonClick(event.target.innerText);
        });
}

init();