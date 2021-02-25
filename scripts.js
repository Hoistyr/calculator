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
			
			if (numberCheck(input)) {
				decimalAllowed = true;
				isFirstNumber = false;

			}
			if (input === '.') {
				decimalAllowed = false;

			}
			
		}
	
	
    } else {
        //Stops inputting of operators if the textContent is only a subtraction symbol
		let onscreenLength = currentlyOnscreen.length
		let previousChar = currentlyOnscreen.charAt(onscreenLength - 1);
		let last2Chars = currentlyOnscreen.charAt(onscreenLength - 2) + previousChar;

		//Only allows close parenthesis where valid
		if (input === '(') {
			if (previousChar != '.') {
				displayText.textContent = currentlyOnscreen + input;
				decimalAllowed = true;
			} else {
				input = '';
				displayText.textContent = currentlyOnscreen + input;
			}
		}
		
		//Only allows close parenthesis where valid
		if (input === ')') {
			if (currentlyOnscreen.includes('(')) {
				displayText.textContent = currentlyOnscreen + input;
				decimalAllowed = false;
			} else if (!currentlyOnscreen.includes('(')) {
				input = '';
				displayText.textContent = currentlyOnscreen + input;
			}
		}

		//Only allows square to be input where valid
		if (input === '^2') {
			if (
				last2Chars !== '^2' 
				&& previousChar !== '('
				&& previousChar !== '÷'
				&& previousChar !== '*'
				&& previousChar !== '-'
				&& previousChar !== '+'
				&& previousChar !== '.'
				){
				displayText.textContent = currentlyOnscreen + input;
				decimalAllowed = false;
			} else {
				input = '';
				displayText.textContent = currentlyOnscreen + input;
			}	
		}
		 
		//Only allows square root where valid
		if (input === '√(') {
			if ( previousChar !== '.'){
				displayText.textContent = currentlyOnscreen + input;
				decimalAllowed = true;
			} else {
				input = '';
				displayText.textContent = currentlyOnscreen + input;
			}	
		}
		
		//Only allows division where valid
		if (input === '÷') {
			if ( 
				previousChar !== '.'
				&& previousChar !== '('
				&& previousChar !== '÷'
				&& previousChar !== '*'
				&& previousChar !== '-'
				&& previousChar !== '+'
				){
				displayText.textContent = currentlyOnscreen + input;
				decimalAllowed = true;
			} else {
				input = '';
				displayText.textContent = currentlyOnscreen + input;
			}	
		}

		//Only allows multiplication where valid
		if (input === '*') {
			if ( 
				previousChar !== '.'
				&& previousChar !== '('
				&& previousChar !== '÷'
				&& previousChar !== '*'
				&& previousChar !== '-'
				&& previousChar !== '+'
				){
				displayText.textContent = currentlyOnscreen + input;
				decimalAllowed = true;
			} else {
				input = '';
				displayText.textContent = currentlyOnscreen + input;
			}	
		}
		
		//Only allows subtraction where valid
		if (input === '-') {
			if ( 
				previousChar !== '.'
				&& previousChar !== '÷'
				&& previousChar !== '*'
				&& last2Chars !== '--'
				){
				displayText.textContent = currentlyOnscreen + input;
				decimalAllowed = true;
			} else {
				input = '';
				displayText.textContent = currentlyOnscreen + input;
			}	
		}

		//Only allows addition where valid
		if (input === '+') {
			if ( 
				previousChar !== '.'
				&& previousChar !== '('
				&& previousChar !== '÷'
				&& previousChar !== '*'
				&& previousChar !== '-'
				&& previousChar !== '+'
				){
				displayText.textContent = currentlyOnscreen + input;
				let decimalAllowed = true;
			} else {
				input = '';
				displayText.textContent = currentlyOnscreen + input;
			}	
		}
	
		//Checks to see if the input is a number
		let isNumber = numberCheck(input);
	
		
		//Checks to see if the input is a number
		if (isNumber === true && previousChar === '.') {
			displayText.textContent = currentlyOnscreen + input;
			decimalAllowed = false;

		
		} else if (isNumber === true
			&& (previousChar === '+' 
			|| previousChar === '-'
			|| previousChar === '*'
			|| previousChar === '÷'
			|| previousChar === '(')
			){
			decimalAllowed = true;

			displayText.textContent = currentlyOnscreen + input;
		} else if (isNumber === true && numberCheck(previousChar) === true){

			displayText.textContent = currentlyOnscreen + input;
		}

		
		//Only allows decimals where valid
		if (input === '.') {
			if (previousChar === '.') {
				input = '';
				displayText.textContent = currentlyOnscreen + input;
			} else if (decimalAllowed === true) {
				displayText.textContent = currentlyOnscreen + input;
				decimalAllowed = false;

			}
		}


		/*if (input === '.') {
			console.log('in decimal input');
			console.log('decimal state: ' + decimalAllowed);
			if (decimalAllowed === false) {
				console.log('decimal denied');
				input = '';
				displayText.textContent = currentlyOnscreen + input;
			} else if (decimalAllowed = true 
				&& previousChar != '.'
				&& (previousChar === '+' 
				|| previousChar === '-'
				|| previousChar === '*'
				|| previousChar === '÷')
				){
				console.log('fresh decimal accepted');
				displayText.textContent = currentlyOnscreen + input;
				decimalAllowed = false;
			} else if (decimalAllowed = true) {
				console.log('number decimal accepted');
				displayText.textContent = currentlyOnscreen + input;
				decimalAllowed = false;
				console.log('change to ' + decimalAllowed);
			} else {
				
			}		
		}*/
		
	}
    
}


function numberCheck (input) {
	if (input >= 0 && input <= 9) {
		return true;
	} else {
		return false;
	}
}

//removes the last things added to the display
function removeLast() {
	let displayText = document.getElementById('displayText')
	let textContent = displayText.textContent;
	let textContentLength = textContent.length;
	let previousChar = textContent.charAt(textContentLength - 1);
	let last2Chars = textContent.charAt(textContentLength - 2) + previousChar;
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

function squareRoot (fromDisplay) {
	if (fromDisplay.includes('√')) {
		let rootCount = (fromDisplay.match(/√/g) || []).length;
		for (i=0; i < rootCount; i++) {
			let rootIndex = fromDisplay.indexOf('√');
			let openIndex = fromDisplay.indexOf('(', rootIndex);
			let closeIndex = fromDisplay.indexOf(')', rootIndex);
			let insideSquareParenthesis = fromDisplay.slice(openIndex + 1, closeIndex);
			squareRooted = Math.sqrt(insideSquareParenthesis);
			displayText.textContent = squareRooted;
			fromDisplay = fromDisplay.slice(0,rootIndex) + squareRooted + fromDisplay.slice(closeIndex + 1);
			return fromDisplay;
		}
	} else {
		return fromDisplay;
	}
}

function square (fromDisplay) {
	if (fromDisplay.includes('^2')) {
		let squareCount = (fromDisplay.match(/^/g) || []).length;
		let equalToCount = squareCount;
		for (i=0; i < squareCount; i++) {
			if (equalToCount < 2) {
				console.log('just squaring one');
				let squareIndex = fromDisplay.indexOf('^');
				let toBeSquared = fromDisplay.slice(0, squareIndex);
				console.log(toBeSquared);
				squared = toBeSquared ** 2;
				fromDisplay = squared;
				displayText.textContent = squared;
				console.log(fromDisplay);
				return fromDisplay;
			} /*else {
				console.log('adding more than two numbers');
				additionIndex = fromDisplay.indexOf('+');
				nextAdditionIndex = fromDisplay.indexOf('+', additionIndex + 1);
				let num1 = fromDisplay.slice(0, additionIndex);
				let num2 = fromDisplay.slice(additionIndex + 1, nextAdditionIndex)
				let added = Number(num1) + Number(num2);
				console.log('added ' + added);
				fromDisplay = added + fromDisplay.slice(nextAdditionIndex);
				console.log('fromDis ' + fromDisplay);
				equalToCount--;
			}*/
		}
	} else {
		return fromDisplay;
	}
}

function add (fromDisplay) {
	if (fromDisplay.includes('+')) {
		console.log('has plus sign');
		let additionCount = (fromDisplay.match(/\+/g) || []).length;
		let equalToCount = additionCount;
		for (i=0; i < additionCount; i++) {
			if (equalToCount < 2) {
				console.log('adding two numbers');
				let additionIndex = fromDisplay.indexOf('+');
				let num1 = fromDisplay.slice(0, additionIndex);
				let num2 = fromDisplay.slice(additionIndex + 1)
				let added = Number(num1) + Number(num2);
				console.log(fromDisplay);
				fromDisplay = added;
				displayText.textContent = added;
			} else {
				console.log('adding more than two numbers');
				additionIndex = fromDisplay.indexOf('+');
				nextAdditionIndex = fromDisplay.indexOf('+', additionIndex + 1);
				let num1 = fromDisplay.slice(0, additionIndex);
				let num2 = fromDisplay.slice(additionIndex + 1, nextAdditionIndex)
				let added = Number(num1) + Number(num2);
				console.log('added ' + added);
				fromDisplay = added + fromDisplay.slice(nextAdditionIndex);
				console.log('fromDis ' + fromDisplay);
				equalToCount--;
			}
		}
		return fromDisplay; 
	} else {
		return fromDisplay;
	}
}

function subtract (fromDisplay) {
	if (fromDisplay.includes('-')) {
		console.log('has minus sign');
		let subtractionCount = (fromDisplay.match(/\-/g) || []).length;
		let equalToCount = subtractionCount;
		for (i=0; i < subtractionCount; i++) {
			if (equalToCount < 2) {
				console.log('subtracting two numbers');
				let subtractionIndex = fromDisplay.indexOf('-');
				let num1 = fromDisplay.slice(0, subtractionIndex);
				let num2 = fromDisplay.slice(subtractionIndex + 1)
				let subtracted = Number(num1) - Number(num2);
				console.log(fromDisplay);
				fromDisplay = subtracted;
				displayText.textContent = subtracted;
			} else {
				console.log('subtracting more than two numbers');
				subtractionIndex = fromDisplay.indexOf('-');
				nextSubtractionIndex = fromDisplay.indexOf('-', subtractionIndex + 1);
				let num1 = fromDisplay.slice(0, subtractionIndex);
				let num2 = fromDisplay.slice(subtractionIndex + 1, nextSubtractionIndex)
				let subtracted = Number(num1) - Number(num2);
				console.log('subtracted ' + subtracted);
				fromDisplay = subtracted + fromDisplay.slice(nextSubtractionIndex);
				console.log('fromDis ' + fromDisplay);
				equalToCount--;
			}
		}
		return fromDisplay; 
	} else {
		return fromDisplay;
	}
}

function executionContinued (input) {
	let fromDisplay = input;
	let i = 0;
	let fromParenthesis = [];
	fromDisplay = square(fromDisplay);
	console.log('after sqr ' + fromDisplay);
	fromDisplay = squareRoot(fromDisplay);
	console.log('after sqrrt ' + fromDisplay);
	

	fromDisplay = add(fromDisplay);
	console.log('after add ' + fromDisplay);
	fromDisplay = subtract(fromDisplay);
	console.log('after subtract ' + fromDisplay);

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
	} else if (fromDisplay.includes('^2') 
		&& (!fromDisplay.includes('(' && ')'))) {
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
	&& (!fromDisplay.includes('*'))
	) { 
		if (fromDisplay.includes('+' || '-' || '^2' || '*' || '√')) {
		console.log('extra');
		} else {
			let divideIndex = fromDisplay.indexOf('÷');
			let firstNum = fromDisplay.slice(0, divideIndex);
			let nextNum = fromDisplay.slice(divideIndex + 1,)
			if (nextNum === 0 || nextNum === '0') {
				displayText.textContent = 'CANNOT ÷ BY 0, NICE TRY';
			} else {
				divided = firstNum / nextNum;
				displayText.textContent = divided;
			}
			
			
		}
	} else if (fromDisplay.includes('+')
	&& (!fromDisplay.includes('(' && ')'))
	&& (!fromDisplay.includes('^2'))
	&& (!fromDisplay.includes('*'))
	&& (!fromDisplay.includes('÷'))
	) {
		if (fromDisplay.includes('-' || '^2' || '*' || '√')) {
			console.log('extra');
		} else {
			let addIndex = fromDisplay.indexOf('+');
			let firstNum = fromDisplay.slice(0, addIndex);
			let nextNum = fromDisplay.slice(addIndex + 1,)
			added = Number(firstNum) + Number(nextNum);
			displayText.textContent = added;
		}
	} else if (fromDisplay.includes('-')
	&& (!fromDisplay.includes('(' && ')'))
	&& (!fromDisplay.includes('^2'))
	&& (!fromDisplay.includes('*'))
	&& (!fromDisplay.includes('÷'))
	&& (!fromDisplay.includes('+'))
	) { 
		if (fromDisplay.includes('+' || '^2' || '*' || '√')) {
			console.log('extra');
		} else {
			console.log('subtraction');
			let subtractIndex = fromDisplay.lastIndexOf('-');
			let firstNum = fromDisplay.slice(0, subtractIndex);
			let nextNum = fromDisplay.slice(subtractIndex + 1,)
			subtracted = Number(firstNum) - Number(nextNum);
			displayText.textContent = subtracted;
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
/*function add () {
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
}*/

//Needs to multiply
function multiply (array) {
	let arrayLength = array.length;
	let value = 1;
	for (i = 0; (i < arrayLength); i++) {
		value = value * array[i];
	}
	
	return value;
}

/*//Squares a number
function square() {
	let value = arguments[0];
	value = value ** 2;
	
	return value;
}*/

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
