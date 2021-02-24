//Needs to add
//Needs to subtract
//Needs to multiply
//Needs to divide
//Function called operate that takes an operator and 2 numbers and then calls one of the above functions on the numbers
//Clear button


//Needs to add
calcInit();

function add () {
	let value = 0;
	for (i = (arguments.length - 1); i >=0; i--) {
		value = value + arguments[i];
	}
	
	return value;
}

//Needs to subtract
function subtract () {
	let value = arguments[0];
	for (i = 1; (i < arguments.length); i++) {
		value = value - arguments[i];
	}

	return value;
}

//Needs to multiply
function multiply (array) {
	let arrayLength = array.length;
	let value = 1;
	for (i = 0; (i < arrayLength); i++) {
		value = value * array[i];
	}
	
	return value;
}


function sum (array) {
	let arrayLength = array.length;
	let value = 0;
	for (i = 0; (i < arrayLength); i++) {
		value = value + array[i];
	}
	
	return value;
}

//Raises a number to a power
function power() {
	let argumentsLength = arguments.length;
	let value = arguments[0];
	for (i = 1; (i < argumentsLength); i++) {
		value = value ** arguments[i];
	}
	
	return value;
}

function factorial(num1) {
	if (num1 === 0) {
		let value = 1;
		return value;
	} else {
		let value = num1;
		for (n = num1; n > 1; n--) {
			value = value * (n - 1);
		}	
		return value;
	}
	
}
//Adds event listeners to the buttons on page load
function calcInit () {
    getNumbers();
    getOperators();
    getExecuteOperation();
}

//Finds all the buttons with the numbers class
function getNumbers() {
    let numbers = document.getElementsByClassName('number');
    for(i=0; i<numbers.length; i++) {
        numbers[i].addEventListener('click', event => {
            let eventData = event;
            numberClicked(eventData);
        });
    }
    
}
//Finds all the buttons with the operator class
function getOperators () {
    let operators = document.getElementsByClassName('operator');
    for(i=0; i < operators.length; i++) {
        operators[i].addEventListener('click', testAlert);
    }
}
//Finds the execute operation button
function getExecuteOperation () {
    let executeOperation = document.getElementById('executeOperation');
    executeOperation.addEventListener('click', testAlert);
}

function testAlert() {
    alert('test');
}

//Determines which number was clicked
function numberClicked(eventData) {
    let buttonInformation = eventData;
    let numberClicked = buttonInformation.target.textContent;
    insertDisplay(numberClicked);
}

//Inserts the number to the display
function insertDisplay (numberClicked) {
    let displayText = document.getElementById('displayText')
    let textContent = displayText.textContent;
    console.log(textContent);
    if (textContent === '0') {
        displayText.textContent = numberClicked;
        textContent = numberClicked;
    } else {
        console.log('in else');
        
        displayText.textContent = textContent + numberClicked;
    }
    
}
