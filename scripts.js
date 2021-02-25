//Needs to add
//Needs to subtract
//Needs to multiply
//Needs to divide
//Function called operate that takes an operator and 2 numbers and then calls one of the above functions on the numbers
//Clear button

calcInit();

//Adds event listeners to the buttons on page load
function calcInit () {
    loadButtons();
}

//Initates all the button event listeners on call
function loadButtons() {
	getNumbers();
    getOperators();
    getExecuteOperationButton();
	getClearButton();
	getRemoveLastButton();
	getOpenParenthesisButton();
	getCloseParenthesisButton();
	getSquareButton();
	getSquareRootButton();
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
        operators[i].addEventListener('click', operatorClicked);
    }
}
//Finds the execute operation button
function getExecuteOperationButton () {
    let executeOperation = document.getElementById('executeOperation');
	executeOperation.addEventListener('click', beginExecution);
}

//Finds the clear button
function getClearButton () {
    let clearButton = document.getElementById('clearButton');
    clearButton.addEventListener('click', clearClicked);
}

//Finds the removeLast button
function getRemoveLastButton () {
	let removeLastButton = document.getElementById('removeLast');
    removeLastButton.addEventListener('click', removeLast);
}

//Finds the open parenthesis button
function getOpenParenthesisButton () {
	let openParenthesisButton = document.getElementById('openParenthesis');
    openParenthesisButton.addEventListener('click', openParenthesisClicked);
}

//Finds the close parenthesis button
function getCloseParenthesisButton () {
	let closeParenthesisButton = document.getElementById('closeParenthesis');
    closeParenthesisButton.addEventListener('click', closeParenthesisClicked);
}

//Finds the decimal button
function getDecimalButton () {
	let decimalButton = document.getElementById('closeParenthesis');
   decimalButton.addEventListener('click', decimalClicked);
}

//Finds the square button
function getSquareButton () {
	let squareButton = document.getElementById('square');
   	squareButton.addEventListener('click', squareClicked);
}

//Finds the square root button
function getSquareRootButton () {
	let squareRootButton = document.getElementById('squareRoot');
   	squareRootButton.addEventListener('click', squareRootClicked);
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

//Determines which operator was clicked
function operatorClicked(eventData) {
	let buttonInformation = eventData;
	let operatorClicked = buttonInformation.target.textContent;
	insertDisplay(operatorClicked);
}

//Inserts the input to the display
function insertDisplay (input) {
    let displayText = document.getElementById('displayText')
	let currentlyOnscreen = displayText.textContent;

    //Checks if the number onscreen is 0
	if (currentlyOnscreen === '0') {
		
		//Prevents inputting operators where they are invalid when the display is empty
		if (input !== '+' && input !== '*' && input !== '÷' && input !== ')' && input !== '^2') {
			displayText.textContent = input;
			//currentlyOnscreen = displayText.textContent;
		}
	
	
    } else {
        //Stops inputting of operators if the textContent is only a subtraction symbol
		let onscreenLength = currentlyOnscreen.length
		let lastChar = currentlyOnscreen.charAt(onscreenLength - 1);
		let last2Chars = currentlyOnscreen.charAt(onscreenLength - 2) + lastChar;
		
		//Only allows close parenthesis where valid
		if (input === ')') {
			if (currentlyOnscreen.includes('(')) {
				displayText.textContent = currentlyOnscreen + input;
			} else if (!currentlyOnscreen.includes('(')) {
				input = '';
				displayText.textContent = currentlyOnscreen + input;
			}
		}

		//Only allows square to be input where valid
		if (input === '^2') {
			if (
				last2Chars !== '^2' 
				&& lastChar !== '('
				&& lastChar !== '÷'
				&& lastChar !== '*'
				&& lastChar !== '-'
				&& lastChar !== '+'
				){
				displayText.textContent = currentlyOnscreen + input;
			} else {
				input = '';
				displayText.textContent = currentlyOnscreen + input;
			}	
		}
		 
	//Only allows square root where valid
		if (input === '√(') {
			if ( lastChar !== '.'){
				displayText.textContent = currentlyOnscreen + input;
			} else {
				input = '';
				displayText.textContent = currentlyOnscreen + input;
			}	
		}
		
		//Only allows division where valid
		if (input === '÷') {
			if ( 
				lastChar !== '.'
				&& lastChar !== '('
				&& lastChar !== '÷'
				&& lastChar !== '*'
				&& lastChar !== '-'
				&& lastChar !== '+'
				){
				displayText.textContent = currentlyOnscreen + input;
			} else {
				input = '';
				displayText.textContent = currentlyOnscreen + input;
			}	
		}

		//Only allows multiplication where valid
		if (input === '*') {
			if ( 
				lastChar !== '.'
				&& lastChar !== '('
				&& lastChar !== '÷'
				&& lastChar !== '*'
				&& lastChar !== '-'
				&& lastChar !== '+'
				){
				displayText.textContent = currentlyOnscreen + input;
			} else {
				input = '';
				displayText.textContent = currentlyOnscreen + input;
			}	
		}
		
		//Only allows subtraction where valid
		if (input === '-') {
			if ( 
				lastChar !== '.'
				&& lastChar !== '÷'
				&& lastChar !== '*'
				&& lastChar !== '-'
				&& lastChar !== '+'
				){
				displayText.textContent = currentlyOnscreen + input;
			} else {
				input = '';
				displayText.textContent = currentlyOnscreen + input;
			}	
		}

		//Only allows addition where valid
		if (input === '+') {
			if ( 
				lastChar !== '.'
				&& lastChar !== '('
				&& lastChar !== '÷'
				&& lastChar !== '*'
				&& lastChar !== '-'
				&& lastChar !== '+'
				){
				displayText.textContent = currentlyOnscreen + input;
			} else {
				input = '';
				displayText.textContent = currentlyOnscreen + input;
			}	
		}
	
		//!Still adds decimals when not allowed to!
		if (input === '.') {
			if (lastChar !== '.'){
				displayText.textContent = currentlyOnscreen + input;
			} else {
				input = '';
				displayText.textContent = currentlyOnscreen + input;
			}	
		}
			
		
		displayText.textContent = currentlyOnscreen + input;
	}
    
}

//removes the last things added to the display
function removeLast() {
	let displayText = document.getElementById('displayText')
	let textContent = displayText.textContent;
	let textContentLength = textContent.length;
	let lastChar = textContent.charAt(textContentLength - 1);
	let last2Chars = textContent.charAt(textContentLength - 2) + lastChar;
	if (textContent) {
		//removes both parts of the square root upon button click
		if (last2Chars === '√(') {
			textContent = textContent.slice(0,(textContentLength - 2));
			displayText.textContent = textContent;
		}
		
		textContent = textContent.slice(0,(textContentLength - 1));
		if (textContent) {
			displayText.textContent = textContent;
		} else if (!textContent) {
			textContent = '0';
			displayText.textContent = '0';
		}
	}
	
}

//Resets the display back to 0
function clearClicked() {
	let displayText = document.getElementById('displayText')
	displayText.textContent = '0';
}

//Adds an open parenthesis
function openParenthesisClicked (eventData) {
	let buttonInformation = eventData;
	let openParenthesisClicked = buttonInformation.target.textContent;
	insertDisplay(openParenthesisClicked);
}

//Adds a closed parenthesis
function closeParenthesisClicked (eventData) {
	let buttonInformation = eventData;
	let closeParenthesisClicked = buttonInformation.target.textContent;
	insertDisplay(closeParenthesisClicked);
}

//Adds a decimal
function decimalClicked (eventData) {
	let buttonInformation = eventData;
	let decimalClicked = buttonInformation.target.textContent;
	insertDisplay(decimalClicked);
}

//Adds a square
function squareClicked (eventData) {
	let buttonInformation = eventData;
	let squareClicked = '^2';
	insertDisplay(squareClicked);
}

//Adds a square root
function squareRootClicked (eventData) {
	let buttonInformation = eventData;
	let squareRootClicked = buttonInformation.target.textContent + '(';
	insertDisplay(squareRootClicked);
}


//Actual calculating-----------------------------------------

//executes the operation
function beginExecution() {
	let currentlyOnscreen = displayText.textContent;
	executionContinued(currentlyOnscreen);
}

function executionContinued (input) {
	let fromDisplay = input;
	let i = 0;
	let fromParenthesis = [];
	
	if (fromDisplay.includes('(' && ')')) {
		while (fromDisplay.includes('(' && ')')) {
			let openIndex = fromDisplay.indexOf('(');
			let closeIndex = fromDisplay.indexOf(')');
			let insideParenthesis = fromDisplay.slice(openIndex + 1, closeIndex);
			fromParenthesis[i] = insideParenthesis;
			i++;
			
			let withoutParenthesis = fromDisplay.slice(closeIndex + 1);
			let operation = withoutParenthesis.slice(0,1);
			fromParenthesis[i] = operation;
			i++;
			console.log(i);
			fromDisplay = withoutParenthesis.slice(1);
			console.log(fromParenthesis);
		}
	} else if (fromDisplay.includes('^2') && (!fromDisplay.includes('(' && ')'))) {
		if (fromDisplay.includes('+' || '-' || '*' || '÷' || '√')) {
			console.log('extra');
		} else {
			let arrowIndex = fromDisplay.indexOf('^');
			let toBeSquared = fromDisplay.slice(0, arrowIndex);
			let numSquared = square(toBeSquared);
			displayText.textContent = numSquared;
		}
	} else if (fromDisplay.includes('*')
		&& (!fromDisplay.includes('(' && ')'))
		&& (!fromDisplay.includes('^2'))
		) {
		if (fromDisplay.includes('+' || '-' || '^2' || '÷' || '√')) {
			console.log('extra');
		} else {
			let multiplyIndex = fromDisplay.indexOf('*');
			let firstNum = fromDisplay.slice(0, multiplyIndex);
			let nextNum = fromDisplay.slice(multiplyIndex + 1,)
			multiplied = firstNum * nextNum;
			displayText.textContent = multiplied;
		}
	} else if (fromDisplay.includes('÷')
	&& (!fromDisplay.includes('(' && ')'))
	&& (!fromDisplay.includes('^2'))
	) {
	if (fromDisplay.includes('+' || '-' || '^2' || '*' || '√')) {
		console.log('extra');
	} else {
		let multiplyIndex = fromDisplay.indexOf('*');
		let firstNum = fromDisplay.slice(0, multiplyIndex);
		let nextNum = fromDisplay.slice(multiplyIndex + 1,)
		multiplied = firstNum * nextNum;
		displayText.textContent = multiplied;
	}
	
	for (i = 0; i < fromParenthesis.length; i++ ) {
		//(!fromParenthesis[i].includes('^2'))
		console.log(fromParenthesis[i]);
	}
	
	i = 0;
}
	
	
	/*if (!fromParenthesis.includes('(' && ')')) {
		while (fromParenthesis[i].includes('*')) {
			let multiplyIndex = fromParenthesis[i].indexOf('*')
			console.log(multiplyIndex);
			return;
		}
	} */
	//while (fromParenthesis includes
}

function findParenthesis () {

}

//Needs to add
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

//Squares a number
function square() {
	let value = arguments[0];
	value = value ** 2;
	
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

function sum (array) {
	let arrayLength = array.length;
	let value = 0;
	for (i = 0; (i < arrayLength); i++) {
		value = value + array[i];
	}
	
	return value;
}
