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
	getOpenParenthesesButton();
	getCloseParenthesesButton();
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

//Finds the open parentheses button
function getOpenParenthesesButton () {
	let openParenthesesButton = document.getElementById('openParentheses');
    openParenthesesButton.addEventListener('click', openParenthesesClicked);
}

//Finds the close parentheses button
function getCloseParenthesesButton () {
	let closeParenthesesButton = document.getElementById('closeParentheses');
    closeParenthesesButton.addEventListener('click', closeParenthesesClicked);
}

//Finds the decimal button
function getDecimalButton () {
	let decimalButton = document.getElementById('closeParentheses');
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

		//Only allows close parentheses where valid
		if (input === '(') {
			if (previousChar != '.') {
				displayText.textContent = currentlyOnscreen + input;
				decimalAllowed = true;
			} else {
				input = '';
				displayText.textContent = currentlyOnscreen + input;
			}
		}
		
		//Only allows close parentheses where valid
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

//Adds an open parentheses
function openParenthesesClicked (eventData) {
	let buttonInformation = eventData;
	let openParenthesesClicked = buttonInformation.target.textContent;
	insertDisplay(openParenthesesClicked);
}

//Adds a closed parentheses
function closeParenthesesClicked (eventData) {
	let buttonInformation = eventData;
	let closeParenthesesClicked = buttonInformation.target.textContent;
	insertDisplay(closeParenthesesClicked);
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

function parentheses (fromDisplay) {
	if (fromDisplay.includes (')')) {
		
		let parenthesesCount = (fromDisplay.match(/\)/g) || []).length;
		let equalToCount = parenthesesCount;
		console.log(equalToCount);
		for (i=0; i < equalToCount; i++) {	
			console.log('started loop');
			console.log(i);
			if (equalToCount < 2) {
				console.log('1 set of ()')
				if (fromDisplay.includes('√')) {
					return fromDisplay;
				} else {
					let openIndex = fromDisplay.indexOf('(');
					let closeIndex = fromDisplay.indexOf(')');
					let insideParentheses = fromDisplay.slice(openIndex + 1, closeIndex);
					let lastPiece = fromDisplay.slice(closeIndex + 1);
					console.log('1 set of () ' + insideParentheses);
					insideParentheses = square(insideParentheses);
					insideParentheses = multiply(insideParentheses);
					insideParentheses = divide(insideParentheses);
					insideParentheses = add(insideParentheses);
					insideParentheses = subtract(insideParentheses);
					if (fromDisplay.charAt(0) === '(') {
						let parenthesesEvaluated = insideParentheses + lastPiece;
						return parenthesesEvaluated;
					} else {
						let firstPiece = fromDisplay.slice(0, openIndex);
						console.log(firstPiece);
						if (fromDisplay.charAt(fromDisplay.length - 1) === ')') {
							let parenthesesEvaluated = firstPiece + insideParentheses;
							return parenthesesEvaluated;
						} else {
							console.log(lastPiece);
							let parenthesesEvaluated = firstPiece + insideParentheses + lastPiece;
							return parenthesesEvaluated;
						}
						
					}
				}	
			} else {
				console.log('more than one set of parentheses');
				let openIndex = fromDisplay.lastIndexOf('(');
				let closeIndex = fromDisplay.indexOf(')', openIndex);
				let insideParentheses = fromDisplay.slice(openIndex + 1, closeIndex);
				let firstPiece = fromDisplay.slice(0, openIndex);
				let lastPiece = fromDisplay.slice(closeIndex + 1);
				/*console.log(insideParentheses);
				insideParentheses = square(insideParentheses);
				insideParentheses = multiply(insideParentheses);
				insideParentheses = divide(insideParentheses);
				insideParentheses = add(insideParentheses);
				insideParentheses = subtract(insideParentheses);
				console.log(insideParentheses); */
				parenthesesEvaluated = firstPiece + insideParentheses + lastPiece;
				console.log(parenthesesEvaluated);
				fromDisplay = parenthesesEvaluated;
				equalToCount--;
				console.log(equalToCount);
				
				//!--Problem is here --!
				return ':o';
			}
			
		}	
	} else {
		console.log('leaving () ');
		return fromDisplay;
	}
}

function squareRoot (fromDisplay) {
	if (fromDisplay.includes('√')) {
		let rootCount = (fromDisplay.match(/√/g) || []).length;
		for (i=0; i < rootCount; i++) {
			let rootIndex = fromDisplay.indexOf('√');
			let openIndex = fromDisplay.indexOf('(', rootIndex);
			let closeIndex = fromDisplay.indexOf(')', rootIndex);
			let insideSquareParentheses = fromDisplay.slice(openIndex + 1, closeIndex);
			console.log(insideSquareParentheses);
			
			if (insideSquareParentheses.includes('+')
			 || insideSquareParentheses.includes('-')
			 || insideSquareParentheses.includes('*')
			 || insideSquareParentheses.includes( '√')
			 || insideSquareParentheses.includes('÷') 
			 ||insideSquareParentheses.includes('^') 
			 ) {
				console.log('inside dif sqrrt');
				toBeSquareRooted = square(insideSquareParentheses);
				console.log(toBeSquareRooted);
				toBeSquareRooted = multiply(toBeSquareRooted);
				console.log(toBeSquareRooted);
				toBeSquareRooted = divide(toBeSquareRooted);
				console.log(toBeSquareRooted);
				toBeSquareRooted = add(toBeSquareRooted);
				console.log(toBeSquareRooted);
				toBeSquareRooted = subtract(toBeSquareRooted);
				console.log(toBeSquareRooted);
				squareRooted = Math.sqrt(toBeSquareRooted);
				displayText.textContent = squareRooted;
				fromDisplay = fromDisplay.slice(0,rootIndex) + squareRooted + fromDisplay.slice(closeIndex + 1);
				return fromDisplay;

			} else {
				console.log('did not contain other operations');
				squareRooted = Math.sqrt(insideSquareParentheses);
				displayText.textContent = squareRooted;
				fromDisplay = fromDisplay.slice(0,rootIndex) + squareRooted + fromDisplay.slice(closeIndex + 1);
				return fromDisplay;
			}
			
		}
	} else {
		return fromDisplay;
	}
}

function square (fromDisplay) {
	if (fromDisplay.includes('^2')) {
		let squareCount = (fromDisplay.match(/\^/g) || []).length;
		let equalToCount = squareCount;
		for (i=0; i < squareCount; i++) {
			if (equalToCount < 2) {
				console.log('just squaring one');
				let squareIndex = fromDisplay.indexOf('^');
				let toBeSquared = fromDisplay.slice(0, squareIndex);
				let twoIndex = fromDisplay.indexOf('2', squareIndex + 1);
				console.log(toBeSquared);
				squared = toBeSquared ** 2;
				console.log(squared);
				if (fromDisplay.includes('+' || '-' || '*' || '√' || '÷' )) {
					let withoutSquared = fromDisplay = fromDisplay.slice(twoIndex + 1);
					let firstChar = fromDisplay.charAt(0);
					console.log('nosquared' + withoutSquared);
					if (!(firstChar >= 0 && firstChar <= 9)) {
						moveToBack = fromDisplay[0];
						fromDisplay = fromDisplay.slice(1);
						fromDisplay = fromDisplay + moveToBack + squared;
						console.log('fromDis ' + fromDisplay);
						return fromDisplay.toString();
					}
				} else {
					fromDisplay = squared;
					displayText.textContent = squared;
					console.log(fromDisplay);
					return fromDisplay.toString();
				}
				
			} else {	
				console.log('squaring more than two numbers');
				squareIndex = fromDisplay.indexOf('^');
				twoIndex = fromDisplay.indexOf('2', squareIndex + 1);
				toBeSquared = fromDisplay.slice(0, squareIndex);
				squared = toBeSquared ** 2;
				fromDisplay = fromDisplay.slice(twoIndex + 1);
				firstChar = fromDisplay.charAt(0);
				if (firstChar >= 0 && firstChar <= 9) {
					fromDisplay = fromDisplay.slice(twoIndex + 1) + squared;
					console.log('fromDis ' + fromDisplay);
				} else {
					moveToBack = fromDisplay[0];
					fromDisplay = fromDisplay.slice(1);
					fromDisplay = fromDisplay + moveToBack + squared;
					console.log('fromDis ' + fromDisplay);
				}
				equalToCount--;
			}
		}
	} else {
		return fromDisplay;
	}
}

function multiply (fromDisplay) {
	if (fromDisplay.includes('*')) {
		console.log('has multiply sign');
		let multiplyCount = (fromDisplay.match(/\*/g) || []).length;
		let equalToCount = multiplyCount;
		for (i=0; i < multiplyCount; i++) {
			if (equalToCount < 2) {
				console.log('just multiplying one');
				let multiplyIndex = fromDisplay.indexOf('*');
				let num1 = fromDisplay.slice(0, multiplyIndex);
				let num2 = fromDisplay.slice(multiplyIndex + 1);
				multiplied = num1 * num2;
				console.log(multiplied);
				if (fromDisplay.includes('+' || '-' || '^' || '√' || '÷' )) {
					let withoutSquared = fromDisplay = fromDisplay.slice(twoIndex + 1);
					let firstChar = fromDisplay.charAt(0);
					if (!(firstChar >= 0 && firstChar <= 9)) {
						moveToBack = fromDisplay[0];
						fromDisplay = fromDisplay.slice(1);
						fromDisplay = fromDisplay + moveToBack + squared;
						console.log('fromDis ' + fromDisplay);
						return fromDisplay.toString();
					}
				} else {
					fromDisplay = multiplied;
					displayText.textContent = multiplied;
					console.log(fromDisplay);
					return fromDisplay.toString();
				}
				
			} else {	
				console.log('multiplying more than two numbers');
				multiplyIndex = fromDisplay.indexOf('*');
				nextIndex = fromDisplay.indexOf('*', multiplyIndex + 1);
				num1 = fromDisplay.slice(0, multiplyIndex);
				num2 = fromDisplay.slice(multiplyIndex + 1, nextIndex);
				console.log(num1 + '' + num2);
				multiplied = num1 * num2;
				console.log(multiplied);
				fromDisplay = multiplied + '*' + fromDisplay.slice(nextIndex + 1);
				console.log('from display: ' + fromDisplay);
				
			equalToCount--;
			}
		} 

		return fromDisplay.toString(); 
	} else {
		return fromDisplay;
	}
}

function divide (fromDisplay) {
	if (fromDisplay.includes('÷')) {
		console.log('has division symbol');
		let divideCount = (fromDisplay.match(/÷/g) || []).length;
		let equalToCount = divideCount;
		for (i=0; i < divideCount; i++) {
			if (equalToCount < 2) {
				console.log('just dividing one');
				let divideIndex = fromDisplay.indexOf('÷');
				let num1 = fromDisplay.slice(0, divideIndex);
				let num2 = fromDisplay.slice(divideIndex + 1);
				divided = num1 / num2;
				console.log(divided);
				if (fromDisplay.includes('+' || '-' || '^' || '√' || '*' )) {
					let withoutSquared = fromDisplay = fromDisplay.slice(twoIndex + 1);
					let firstChar = fromDisplay.charAt(0);
					if (!(firstChar >= 0 && firstChar <= 9)) {
						moveToBack = fromDisplay[0];
						fromDisplay = fromDisplay.slice(1);
						fromDisplay = fromDisplay + moveToBack + squared;
						console.log('fromDis ' + fromDisplay);
						return fromDisplay.toString();
					}
				} else {
					fromDisplay = divided;
					displayText.textContent = divided;
					console.log(fromDisplay);
					return fromDisplay.toString();
				}
				
			} else {	
				console.log('dividing more than two numbers');
				divideIndex = fromDisplay.indexOf('÷');
				nextIndex = fromDisplay.indexOf('÷', divideIndex + 1);
				num1 = fromDisplay.slice(0, divideIndex);
				num2 = fromDisplay.slice(divideIndex + 1, nextIndex);
				console.log(num1 + '' + num2);
				divided = num1 / num2;
				console.log(divided);
				fromDisplay = divided + '÷' + fromDisplay.slice(nextIndex + 1);
				console.log('from display: ' + fromDisplay);
				
			equalToCount--;
			}
		} 

		return fromDisplay.toString(); 
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
		return fromDisplay.toString(); 
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
	let fromParentheses = [];
	
	fromDisplay = parentheses(fromDisplay);
	console.log('after parentheses ' + fromDisplay);
	
	fromDisplay = squareRoot(fromDisplay);
	console.log('after sqrrt ' + fromDisplay);

	fromDisplay = square(fromDisplay);
	console.log('after sqr ' + fromDisplay);
	
	fromDisplay = multiply(fromDisplay);
	console.log('after multiply ' + fromDisplay);

	fromDisplay = divide(fromDisplay);
	console.log('after divide ' + fromDisplay);
	
	fromDisplay = add(fromDisplay);
	console.log('after add ' + fromDisplay);
	
	fromDisplay = subtract(fromDisplay);
	console.log('after subtract ' + fromDisplay);

	if (fromDisplay.includes('(' && ')')) {
		while (fromDisplay.includes('(' && ')')) {
			let openIndex = fromDisplay.indexOf('(');
			let closeIndex = fromDisplay.indexOf(')');
			let insideParentheses = fromDisplay.slice(openIndex + 1, closeIndex);
			fromParentheses[i] = insideParentheses;
			i++;
			
			let withoutParentheses = fromDisplay.slice(closeIndex + 1);
			let operation = withoutParentheses.slice(0,1);
			fromParentheses[i] = operation;
			i++;
			console.log(i);
			fromDisplay = withoutParentheses.slice(1);
			console.log(fromParentheses);
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
	for (i = 0; i < fromParentheses.length; i++ ) {
		//(!fromParentheses[i].includes('^2'))
		console.log(fromParentheses[i]);
	}
	
	i = 0;
}
	
	
	/*if (!fromParentheses.includes('(' && ')')) {
		while (fromParentheses[i].includes('*')) {
			let multiplyIndex = fromParentheses[i].indexOf('*')
			console.log(multiplyIndex);
			return;
		}
	} */
	//while (fromParentheses includes
}

function findParentheses () {

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
/*function multiply (array) {
	let arrayLength = array.length;
	let value = 1;
	for (i = 0; (i < arrayLength); i++) {
		value = value * array[i];
	}
	
	return value;
}*/

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
