let runningTotal = 0;
let buffer = '0';
let previousOperator;
const screen = document.querySelector('.screen');

function buttonClick(value){
    if(isNaN(value)){
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol){
    switch(symbol){
        case 'AC':
            buffer = '0';
            runningTotal = 0;
            break
        case '=':
            if (previousOperator === null){
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        case 'C':
            if (screen.innerText === 'ERR'){
                return;
            }

            if (buffer.length === 1){
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '+':
        case '−':
        case '×':
        case '÷':
            if (screen.innerText === 'ERR'){
                break;
            } else {
                handleMath(symbol);
                break;
            }
    }
}

function handleMath(symbol){
    if (buffer === '0'){
        return;
    }

    const intBuffer = parseInt(buffer);

    if (runningTotal === 0){
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }
    previousOperator = symbol;
    buffer = '0';
}

function flushOperation(intBuffer){
    let result;

    switch(previousOperator){
        case '+':
            result = runningTotal + intBuffer;
            break;
        case '−':
            result = runningTotal - intBuffer;
            break;
        case '×':
            result = runningTotal * intBuffer;
            break;
        case '÷':
            result = runningTotal / intBuffer;
            break;
        default:
            return;
    }

    if (result.toString().length > 8){
        screen.innerText = 'ERR';
        return;
    } 
    runningTotal = result;
}

function handleNumber(numberString){
    if (buffer.length === 8){
        return;
    }

    if (buffer === '0'){
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

function init(){
    document.querySelector('.calc-buttons').addEventListener('click', function(event){
        buttonClick(event.target.innerText);
    })
}

init();
