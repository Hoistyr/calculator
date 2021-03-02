//Initiates the calculator
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
	getclearEverythingButton();
	getRemoveLastButton();
	getOpenParenthesesButton();
	getCloseParenthesesButton();
	getSquareButton();
	getSquareRootButton();
	getAnsButton();
}



//----------- Functions that load the buttons -----------



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
//Finds the clear everything button
function getclearEverythingButton () {
    let clearEverythingButton = document.getElementById('clearEverythingButton');
    clearEverythingButton.addEventListener('click', clearEverythingClicked);
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

//Finds the ans button
function getAnsButton () {
	let ansButton = document.getElementById('ans');
    ansButton.addEventListener('click', ansClicked);
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



//----------- Performs an action when the buttons are clicked -----------



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

//Resets the display back to 0
function clearClicked() {
	let displayText = document.getElementById('displayText')
	displayText.textContent = '0';
}

//Resets everything
function clearEverythingClicked() {
	let displayText = document.getElementById('displayText')
	displayText.textContent = '0';
	ans = '0';
	console.log('ans reset to 0');
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

//Adds a decimal
function decimalClicked (eventData) {
	let buttonInformation = eventData;
	let decimalClicked = buttonInformation.target.textContent;
	insertDisplay(decimalClicked);
}

//Inputs the answer from the last calculation
function ansClicked (eventData) {
	let buttonInformation = eventData;
	let ansClicked = buttonInformation.target.textContent;
	insertDisplay(ansClicked);
	
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

//Inserts the input to the display
function insertDisplay (input, ans) {
    let displayText = document.getElementById('displayText')
	let currentlyOnscreen = displayText.textContent;
	//Checks if the number onscreen is 0
	if (ans === undefined) {
		ans = '';
	}
	if (currentlyOnscreen === '0') {
	
		
		//Prevents inputting operators where they are invalid when the display is empty
		if (input !== '+' && input !== '*' && input !== '÷' && input !== ')' && input !== '^2') {
			
			displayText.textContent = input;
			
			if (numberCheck(input)) {
				decimalAllowed = true;
				isFirstNumber = false;

			}
			if (input === '.' || ans.includes('.')) {
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

		//Only allows ans to be input where valid
		if (input === 'ANS') {
			if (
				last2Chars !== '^2' 
				&& previousChar !== '.'
				&& previousChar !== ')'  
				&& ( previousChar === '('
				|| previousChar === '÷'
				|| previousChar === '*'
				|| previousChar === '-'
				|| previousChar === '+')
				){
				displayText.textContent = currentlyOnscreen + input;
			} else {
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
	}
}

//Checks if an input is a number
function numberCheck (input) {
	if (input >= 0 && input <= 9) {
		return true;
	} else {
		return false;
	}
}

//executes the operation
function beginExecution() {
	let currentlyOnscreen = displayText.textContent;
	executionContinued(currentlyOnscreen);
}

//Calcuation Functions-----------------------------------------


//Changes any occurances of 'ANS in fromDisplay to the previous answer
function ansSwap (fromDisplay, ans) {
	if (fromDisplay.includes('ANS')) {	
		let ansCount = (fromDisplay.match(/ANS/g) || []).length;
			for (i=0; i < ansCount; i++){
				if (fromDisplay.includes('ANS')) {
					aIndex = fromDisplay.indexOf('A');
					sIndex = fromDisplay.indexOf('S');
					firstPiece = fromDisplay.slice(0,aIndex);
					lastPiece = fromDisplay.slice(sIndex + 1);
					fromDisplay = firstPiece + ans + lastPiece;
				}
			}
			return fromDisplay;
	} else {
		return fromDisplay;
	}
}

function parentheses (fromDisplay) {
	if (fromDisplay.includes (')')) {	
		let parenthesesCount = (fromDisplay.match(/\)/g) || []).length;
		let equalToCount = parenthesesCount;
		for (i=0; i <= parenthesesCount; i++) {	
			console.log('started loop');
			console.log(i);
			console.log('from display ' + fromDisplay);
			if (equalToCount <= 1) {
				console.log('1 set of ()')
				if (fromDisplay.includes('√')) {
					return fromDisplay;
				} else {
					let openIndex = fromDisplay.indexOf('(');
					let closeIndex = fromDisplay.indexOf(')');
					let insideParentheses = fromDisplay.slice(openIndex + 1, closeIndex);
					let lastPiece = fromDisplay.slice(closeIndex + 1);
					insideParentheses = squareRoot(insideParentheses);
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
				if (fromDisplay.includes('√')) {
					let rootIndex = fromDisplay.lastIndexOf('√');
					let openIndex = fromDisplay.indexOf('(', rootIndex);
					let closeIndex = fromDisplay.indexOf(')', rootIndex);
					let toBeSquareRooted = fromDisplay.slice(rootIndex, closeIndex + 1);
					let squareRooted = squareRoot(toBeSquareRooted);
					let firstPiece = fromDisplay.slice(0, rootIndex);
					let lastPiece = fromDisplay.slice(closeIndex + 1);
					let parenthesesEvaluated = firstPiece + squareRooted + lastPiece;
					console.log(parenthesesEvaluated);
					fromDisplay = parenthesesEvaluated;
				} else {
					let openIndex = fromDisplay.lastIndexOf('(');
					let closeIndex = fromDisplay.indexOf(')', openIndex);
					let insideParentheses = fromDisplay.slice(openIndex + 1, closeIndex);
					firstPiece = fromDisplay.slice(0, openIndex);
					lastPiece = fromDisplay.slice(closeIndex + 1);
					console.log(insideParentheses);
					insideParentheses = square(insideParentheses);
					insideParentheses = multiply(insideParentheses);
					insideParentheses = divide(insideParentheses);
					insideParentheses = add(insideParentheses);
					insideParentheses = subtract(insideParentheses);
					console.log(insideParentheses);
					let parenthesesEvaluated = firstPiece + insideParentheses + lastPiece;
					console.log(parenthesesEvaluated);
					fromDisplay = parenthesesEvaluated;
				}
				equalToCount--;
				console.log('end of multi else loop');
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
				toBeSquareRooted = squareRoot(insideSquareParentheses);
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
				if (fromDisplay.includes('+') 
				|| fromDisplay.includes('-')
				|| fromDisplay.includes('*')
				|| fromDisplay.includes('÷') ) {
					console.log('complex squaring')
					let squareIndex = fromDisplay.indexOf('^');
					let preSquareIndex = squareIndex - 1;
					let twoIndex = fromDisplay.indexOf('2', squareIndex + 1);
					let postSquareIndex = twoIndex + 1;
					let preReadyToSquare = false;
					let postReadyToSquare = false;
					let toBeSquared;
					let firstPiece;
					let lastPiece;
					while (preReadyToSquare === false && postReadyToSquare === false) {
						let preCharCheck = fromDisplay.charAt(preSquareIndex); 
						console.log(preCharCheck);
						if (preCharCheck === '*'
						|| preCharCheck === '÷'
						|| preCharCheck === '+'
						|| preCharCheck === '-'
						|| preCharCheck === ''
						) {
							if (preCharCheck === '') {
								toBeSquared = fromDisplay.slice(0, squareIndex);
								firstPiece = '';
								console.log(toBeSquared);
								preReadyToSquare = true;
							} else {
								toBeSquared = fromDisplay.slice(preSquareIndex + 1, squareIndex);
								firstPiece = fromDisplay.slice (0, preSquareIndex + 1);
								console.log(toBeSquared);
								preReadyToSquare = true;
							}	
						} else {
							preSquareIndex--;
						}
						
						console.log(preReadyToSquare);
						console.log(toBeSquared);
						if (preReadyToSquare === true) {
							let postCharCheck = fromDisplay.charAt(postSquareIndex);
							console.log(postCharCheck);
							if (postCharCheck === '*'
							|| postCharCheck === '÷'
							|| postCharCheck === '+'
							|| postCharCheck === '-'
							) {
								console.log('something after');
								lastPiece = fromDisplay.slice(postSquareIndex);
								let squared = toBeSquared ** 2;
								console.log(squared);
								fromDisplay = firstPiece + squared + lastPiece;
								console.log(fromDisplay);
								postReadyToSquare = true;
							} else {
								console.log('nothing after');
								let squared = toBeSquared ** 2;
								lastPiece = '';
								fromDisplay = firstPiece + squared + lastPiece;
								console.log(fromDisplay);
								postReadyToSquare = true;
							}
						} 
					}
					return fromDisplay.toString();	
				} else {
					//Squaring only one number
					console.log('simple squaring');
					let squareIndex = fromDisplay.indexOf('^');
					let toBeSquared = fromDisplay.slice(0, squareIndex);
					squared = toBeSquared ** 2;
					fromDisplay = squared;
					displayText.textContent = squared;
					console.log(fromDisplay);
					return fromDisplay.toString();
				}
				
			} else {	
				console.log('squaring more than two numbers');
				if (fromDisplay.includes('+') 
				|| fromDisplay.includes('-')
				|| fromDisplay.includes('*')
				|| fromDisplay.includes('÷') ) {
					console.log('complex squaring')
					let squareIndex = fromDisplay.indexOf('^');
					let preSquareIndex = squareIndex - 1;
					let twoIndex = fromDisplay.indexOf('2', squareIndex + 1);
					let postSquareIndex = twoIndex + 1;
					let preReadyToSquare = false;
					let postReadyToSquare = false;
					let toBeSquared;
					let firstPiece;
					let lastPiece;
					while (preReadyToSquare === false && postReadyToSquare === false) {
						let preCharCheck = fromDisplay.charAt(preSquareIndex); 
						console.log(preCharCheck);
						if (preCharCheck === '*'
						|| preCharCheck === '÷'
						|| preCharCheck === '+'
						|| preCharCheck === '-'
						|| preCharCheck === ''
						) {
							if (preCharCheck === '') {
								toBeSquared = fromDisplay.slice(0, squareIndex);
								firstPiece = '';
								console.log(toBeSquared);
								preReadyToSquare = true;
							} else {
								toBeSquared = fromDisplay.slice(preSquareIndex + 1, squareIndex);
								firstPiece = fromDisplay.slice (0, preSquareIndex + 1);
								console.log(toBeSquared);
								preReadyToSquare = true;
							}	
						} else {
							preSquareIndex--;
						}
						
						console.log(preReadyToSquare);
						console.log(toBeSquared);
						if (preReadyToSquare === true) {
							let postCharCheck = fromDisplay.charAt(postSquareIndex);
							console.log(postCharCheck);
							if (postCharCheck === '*'
							|| postCharCheck === '÷'
							|| postCharCheck === '+'
							|| postCharCheck === '-'
							) {
								console.log('something after');
								lastPiece = fromDisplay.slice(postSquareIndex);
								let squared = toBeSquared ** 2;
								console.log(squared);
								fromDisplay = firstPiece + squared + lastPiece;
								console.log(fromDisplay);
								postReadyToSquare = true;
							} else {
								console.log('nothing after');
								let squared = toBeSquared ** 2;
								lastPiece = '';
								fromDisplay = firstPiece + squared + lastPiece;
								console.log(fromDisplay);
								postReadyToSquare = true;
							}
						} 
					}	
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
				console.log('multiplying once');
				if (fromDisplay.includes('+') 
				|| fromDisplay.includes('-')
				|| fromDisplay.includes('÷') ) {
					console.log('complex multiplying')
					let multiplyIndex = fromDisplay.indexOf('*');
					let preMultiplyIndex = multiplyIndex - 1;
					let postMultiplyIndex = multiplyIndex + 1;
					let preReadyToMultiply = false;
					let postReadyToMultiply = false;
					let num1;
					let num2;
					let firstPiece;
					let lastPiece;
					while (preReadyToMultiply === false || postReadyToMultiply === false) {
						let preCharCheck = fromDisplay.charAt(preMultiplyIndex); 
						if (preCharCheck === '÷'
						|| preCharCheck === '+'
						|| preCharCheck === '-'
						|| preCharCheck === ''
						) {
							console.log('symbol');
							if (preCharCheck === '') {
								console.log('empty before');
								num1 = fromDisplay.slice(0, multiplyIndex);
								firstPiece = '';
								preReadyToMultiply = true;
							} else {
								console.log('stuff before');
								num1 = fromDisplay.slice(preMultiplyIndex + 1, multiplyIndex);
								firstPiece = fromDisplay.slice (0, preMultiplyIndex + 1);
								preReadyToMultiply = true;
							}	
						} else {
							preMultiplyIndex--;
						}
						
						if (preReadyToMultiply === true) {
							let postCharCheck = fromDisplay.charAt(postMultiplyIndex);
							let post2Chars = fromDisplay.slice(multiplyIndex, postMultiplyIndex + 1);
							if (postCharCheck === '÷'
							|| postCharCheck === '+'
							|| postCharCheck === '-'
							|| postCharCheck === ''
							) {
								console.log('has symbol');
								if (postCharCheck === '') {
									console.log('nothing after');
									num2 = fromDisplay.slice(multiplyIndex + 1);
									lastPiece = '';
									multiplied = num1 * num2;
									fromDisplay = firstPiece + multiplied + lastPiece;
									console.log(fromDisplay);
									postReadyToMultiply = true;
								} else if (post2Chars === '*-') {
									console.log('negative number');
									postMultiplyIndex++;
								} else {
									console.log('something after');
									num2 = fromDisplay.slice(multiplyIndex + 1, postMultiplyIndex);
									lastPiece = fromDisplay.slice(postMultiplyIndex);
									multiplied = num1 * num2;
									fromDisplay = firstPiece + multiplied + lastPiece;
									console.log(fromDisplay);
									postReadyToMultiply = true;
								}
							} else {
								postMultiplyIndex++;
							}
						} 
					}
					return fromDisplay.toString();	
				} else {
					//Multiplying only one number
					console.log('simple multiplying');
					let multiplyIndex = fromDisplay.indexOf('*');
					let num1 = fromDisplay.slice(0, multiplyIndex);
					let num2 = fromDisplay.slice(multiplyIndex + 1);
					multiplied = num1 * num2;
					fromDisplay = multiplied;
					displayText.textContent = multiplied;
					console.log(fromDisplay);
					return fromDisplay.toString();
				}
				
			} else {	
				console.log('multiplying more than two numbers');
				if (fromDisplay.includes('+') 
				|| fromDisplay.includes('-')
				|| fromDisplay.includes('÷') ) {
					console.log('complex multiplying')
					let multiplyIndex = fromDisplay.indexOf('*');
					let preMultiplyIndex = multiplyIndex - 1;
					let postMultiplyIndex = multiplyIndex + 1;
					let preReadyToMultiply = false;
					let postReadyToMultiply = false;
					let num1;
					let num2;
					let firstPiece;
					let lastPiece;
					while (preReadyToMultiply === false || postReadyToMultiply === false) {
						let preCharCheck = fromDisplay.charAt(preMultiplyIndex); 
						if (preCharCheck === '÷'
						|| preCharCheck === '+'
						|| preCharCheck === '-'
						|| preCharCheck === ''
						) {
							console.log('symbol');
							if (preCharCheck === '') {
								console.log('empty before');
								num1 = fromDisplay.slice(0, multiplyIndex);
								firstPiece = '';
								preReadyToMultiply = true;
							} else {
								console.log('stuff before');
								num1 = fromDisplay.slice(preMultiplyIndex + 1, multiplyIndex);
								firstPiece = fromDisplay.slice (0, preMultiplyIndex + 1);
								preReadyToMultiply = true;
							}	
						} else {
							preMultiplyIndex--;
						}
						
						if (preReadyToMultiply === true) {
							let postCharCheck = fromDisplay.charAt(postMultiplyIndex);
							let post2Chars = fromDisplay.slice(multiplyIndex, postMultiplyIndex + 1);
							if (postCharCheck === '*'
							|| postCharCheck === '÷'
							|| postCharCheck === '+'
							|| postCharCheck === '-'
							|| postCharCheck === ''
							) {
								console.log('has symbol');
								
								if (postCharCheck === '') {
									console.log('nothing after');
									num2 = fromDisplay.slice(multiplyIndex + 1);
									lastPiece = '';
									multiplied = num1 * num2;
									fromDisplay = firstPiece + multiplied + lastPiece;
									console.log(fromDisplay);
									postReadyToMultiply = true;
								} else if (post2Chars === '*-') {
									console.log('negative number');
									postMultiplyIndex++;
								} else {
									console.log('something after');
									num2 = fromDisplay.slice(multiplyIndex + 1, postMultiplyIndex);
									lastPiece = fromDisplay.slice(postMultiplyIndex);
									multiplied = num1 * num2;
									fromDisplay = firstPiece + multiplied + lastPiece;
									console.log(fromDisplay);
									postReadyToMultiply = true;
								}
							} else {
								postMultiplyIndex++;
							}
						} 
					}	
				}
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
				console.log('dividing once');
				if (fromDisplay.includes('+') 
				|| fromDisplay.includes('-')) {
					console.log('complex dividing')
					let divideIndex = fromDisplay.indexOf('÷');
					let preDivideIndex = divideIndex - 1;
					let postDivideIndex = divideIndex + 1;
					let preReadyToDivide = false;
					let postReadyToDivide = false;
					let num1;
					let num2;
					let firstPiece;
					let lastPiece;
					while (preReadyToDivide === false || postReadyToDivide === false) {
						let preCharCheck = fromDisplay.charAt(preDivideIndex);
						
						if (preCharCheck === '+'
						|| preCharCheck === '-'
						|| preCharCheck === ''
						) {
							console.log('symbol');
							if (preCharCheck === '') {
								console.log('empty before');
								num1 = fromDisplay.slice(0, divideIndex);
								firstPiece = '';
								preReadyToDivide = true;
							} else {
								console.log('stuff before');
								num1 = fromDisplay.slice(preDivideIndex + 1, divideIndex);
								firstPiece = fromDisplay.slice (0, preDivideIndex + 1);
								preReadyToDivide = true;
							}	
						} else {
							preDivideIndex--;
						}
						
						if (preReadyToDivide === true) {
							let postCharCheck = fromDisplay.charAt(postDivideIndex);
							let post2Chars = fromDisplay.slice(divideIndex, postDivideIndex + 1);
							console.log('directly after ' + post2Chars);
							if (postCharCheck === '+'
							|| postCharCheck === '-'
							|| postCharCheck === ''
							) {
								console.log('has symbol');
								if (postCharCheck === '') {
									console.log('nothing after');
									num2 = fromDisplay.slice(divideIndex + 1);
									lastPiece = '';
									if (num2 === '0' || num2 === 0) {
										fromDisplay = 'ERROR CANNOT ÷ BY 0 x_x'
										return fromDisplay;
									}
									divided = num1 / num2;
									fromDisplay = firstPiece + divided + lastPiece;
									console.log(fromDisplay);
									postReadyToDivide = true;
								} else if (post2Chars === '÷-') {
									console.log('negative number');
									postDivideIndex++;
								} else {
									console.log('something after');
									num2 = fromDisplay.slice(divideIndex + 1, postDivideIndex);
									if (num2 === '0' || num2 === 0) {
										fromDisplay = 'ERROR CANNOT ÷ BY 0 x_x'
										return fromDisplay;
									}
									lastPiece = fromDisplay.slice(postDivideIndex);
									divided = num1 / num2;
									fromDisplay = firstPiece + divided + lastPiece;
									console.log(fromDisplay);
									postReadyToDivide = true;
								}
							} else {
								postDivideIndex++;
							}
						} 
					}
					return fromDisplay.toString();	
				} else {
					//Dividing only one number
					console.log('simple dividing');
					let divideIndex = fromDisplay.indexOf('÷');
					let num1 = fromDisplay.slice(0, divideIndex);
					let num2 = fromDisplay.slice(divideIndex + 1);
					if (num2 === '0' || num2 === 0) {
						fromDisplay = 'ERROR CANNOT ÷ BY 0 x_x'
						return fromDisplay;
					}
					divided = num1 / num2;
					fromDisplay = divided;
					displayText.textContent = divided;
					console.log(fromDisplay);
					return fromDisplay.toString();
				}
				
			} else {	
				console.log('dividing more than two numbers');
				if (fromDisplay.includes('+') 
				|| fromDisplay.includes('-')
				|| fromDisplay.includes('÷') ) {
					console.log('complex dividing')
					let divideIndex = fromDisplay.indexOf('÷');
					let preDivideIndex = divideIndex - 1;
					let postDivideIndex = divideIndex + 1;
					let preReadyToDivide = false;
					let postReadyToDivide = false;
					let num1;
					let num2;
					let firstPiece;
					let lastPiece;
					while (preReadyToDivide === false || postReadyToDivide === false) {
						let preCharCheck = fromDisplay.charAt(preDivideIndex); 
						if (preCharCheck === '÷'
						|| preCharCheck === '+'
						|| preCharCheck === '-'
						|| preCharCheck === ''
						) {
							console.log('symbol');
							if (preCharCheck === '') {
								console.log('empty before');
								num1 = fromDisplay.slice(0, divideIndex);
								firstPiece = '';
								preReadyToDivide = true;
							} else {
								console.log('stuff before');
								num1 = fromDisplay.slice(preDivideIndex + 1, divideIndex);
								firstPiece = fromDisplay.slice (0, preDivideIndex + 1);
								preReadyToDivide = true;
							}	
						} else {
							preDivideIndex--;
						}
						
						if (preReadyToDivide === true) {
							let postCharCheck = fromDisplay.charAt(postDivideIndex);
							let directlyAfter = postCharCheck;
							if (postCharCheck === '*'
							|| postCharCheck === '÷'
							|| postCharCheck === '+'
							|| postCharCheck === '-'
							|| postCharCheck === ''
							) {
								console.log('has symbol');
								
								if (postCharCheck === '') {
									console.log('nothing after');
									num2 = fromDisplay.slice(divideIndex + 1);
									lastPiece = '';
									if (num2 === '0' || num2 === 0) {
										fromDisplay = 'ERROR CANNOT ÷ BY 0 x_x'
										return fromDisplay;
									}
									divided = num1 / num2;
									fromDisplay = firstPiece + divided + lastPiece;
									console.log(fromDisplay);
									postReadyToDivide = true;
								}  else if (directlyAfter === '-') {
									console.log('negative number');
									postDivideIndex++;
								} else {
									console.log('something after');
									num2 = fromDisplay.slice(divideIndex + 1, postDivideIndex);
									if (num2 === '0' || num2 === 0) {
										fromDisplay = 'ERROR CANNOT ÷ BY 0 x_x'
										return fromDisplay;
									}
									lastPiece = fromDisplay.slice(postDivideIndex);
									divided = num1 / num2;
									fromDisplay = firstPiece + divided + lastPiece;
									console.log(fromDisplay);
									postReadyToDivide = true;
								}
							} else {
								postDivideIndex++;
							}
						} 
					}	
				}
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
				//If the character to the left of the preaddition index is a number, shift the preaddition index left one and add that number to num1
				if (fromDisplay.includes('-')) {
					let subtractionCount = (fromDisplay.match(/\-/g) || []).length;
					if (subtractionCount < 2) {
						console.log('1 -');
						let subtractionIndex = fromDisplay.indexOf('-');
						if (additionIndex < subtractionIndex) {
							let num1 = fromDisplay.slice(0, additionIndex);
							let num2 = fromDisplay.slice(additionIndex + 1, subtractionIndex);
							console.log(num2);
							let lastPiece = fromDisplay.slice(subtractionIndex);
							let added = Number(num1) + Number(num2);
							fromDisplay = added + lastPiece;
							console.log(fromDisplay);
						} else {
							if (fromDisplay.charAt(0) === '-') {
								let num1 = fromDisplay.slice(0, additionIndex);
								let num2 = fromDisplay.slice(additionIndex + 1);
								let added = Number(num1) + Number(num2);
								fromDisplay = added;
								displayText.textContent = added;
								console.log(fromDisplay);
							} else {
								let num1 = fromDisplay.slice(subtractionIndex + 1, additionIndex);
								let num2 = fromDisplay.slice(additionIndex + 1);
								let added = Number(num1) + Number(num2);
								let firstPiece = fromDisplay.slice(0,subtractionIndex + 1);
								console.log(firstPiece);
								fromDisplay = firstPiece + added;
								displayText.textContent = fromDisplay;
								console.log(fromDisplay);
							}
							
						}
					} else {
						console.log('multiple -\'s');
						let firstSubtractionIndex = fromDisplay.indexOf('-');
						console.log(firstSubtractionIndex);
						let nextSubtractionIndex = fromDisplay.indexOf('-', firstSubtractionIndex + 1);
						console.log(firstSubtractionIndex, nextSubtractionIndex);
						if (additionIndex < firstSubtractionIndex) {
							let num1 = fromDisplay.slice(0, additionIndex);
							let num2 = fromDisplay.slice(additionIndex + 1, firstSubtractionIndex);
							let lastPiece = fromDisplay.slice(firstSubtractionIndex);
							let added = Number(num1) + Number(num2);
							fromDisplay = added + lastPiece;
						} else {
							let num1 = fromDisplay.slice(firstSubtractionIndex + 1, additionIndex);
							let num2 = fromDisplay.slice(additionIndex + 1, nextSubtractionIndex);
							let firstPiece = fromDisplay.slice(0,firstSubtractionIndex + 1);
							let lastPiece = fromDisplay.slice(nextSubtractionIndex);
							let added = Number(num1) + Number(num2);
							fromDisplay = firstPiece + added + lastPiece;
						}	
					}
					
				} else {
					let num1 = fromDisplay.slice(0, additionIndex);
					let num2 = fromDisplay.slice(additionIndex + 1)
					let added = Number(num1) + Number(num2);
					console.log(fromDisplay);
					fromDisplay = added;
					displayText.textContent = added;
				}
			} else {
				console.log('adding more than two numbers');
				additionIndex = fromDisplay.indexOf('+');
				nextAdditionIndex = fromDisplay.indexOf('+', additionIndex + 1);
				//Checks for subtracion symbols
				if (fromDisplay.includes('-')) {
					let subtractionCount = (fromDisplay.match(/\-/g) || []).length;
					//Checks number of subtraction symbols
					if (subtractionCount < 2) {
						console.log('1 -');
						let subtractionIndex = fromDisplay.indexOf('-');
						if (additionIndex < subtractionIndex) {
							let num1 = fromDisplay.slice(0, additionIndex);
							let num2 = fromDisplay.slice(additionIndex + 1, subtractionIndex);
							let lastPiece = fromDisplay.slice(subtractionIndex);
							let added = Number(num1) + Number(num2);
							fromDisplay = added + lastPiece;
							console.log(fromDisplay);
						} else {
							let num1 = fromDisplay.slice(subtractionIndex + 1, additionIndex);
							let num2 = fromDisplay.slice(additionIndex + 1);
							let firstPiece = fromDisplay.slice(0,subtractionIndex + 1);
							let added = Number(num1) + Number(num2);
							fromDisplay = firstPiece + added;
							console.log(fromDisplay);
						}
					} else {
						console.log('multiple -\'s');
						let firstSubtractionIndex = fromDisplay.indexOf('-', 1);
						console.log(firstSubtractionIndex);
						let nextSubtractionIndex = fromDisplay.indexOf('-', firstSubtractionIndex + 1);
						console.log(firstSubtractionIndex, nextSubtractionIndex);
						if (additionIndex < firstSubtractionIndex) {
							let num1 = fromDisplay.slice(0, additionIndex);
							let num2 = fromDisplay.slice(additionIndex + 1, firstSubtractionIndex);
							let lastPiece = fromDisplay.slice(firstSubtractionIndex);
							let added = Number(num1) + Number(num2);
							fromDisplay = added + lastPiece;
						} else if (additionIndex > firstSubtractionIndex && additionIndex < nextSubtractionIndex) {
							let num1 = fromDisplay.slice(firstSubtractionIndex + 1, additionIndex);
							let num2 = fromDisplay.slice(additionIndex + 1, nextSubtractionIndex);
							let firstPiece = fromDisplay.slice(0,firstSubtractionIndex + 1);
							let lastPiece = fromDisplay.slice(nextSubtractionIndex);
							let added = Number(num1) + Number(num2);
							fromDisplay = firstPiece + added + lastPiece;
							console.log(fromDisplay);
							firstSubtractionIndex = fromDisplay.indexOf('-', firstSubtractionIndex + 1);
						} else {
							let num1 = fromDisplay.slice(nextSubtractionIndex + 1, additionIndex);
							let num2 = fromDisplay.slice(additionIndex + 1);
							let firstPiece = fromDisplay.slice(0,nextSubtractionIndex + 1);
							let added = Number(num1) + Number(num2);
							fromDisplay = firstPiece + added;
							console.log(fromDisplay);	
						}
					}	
				} else {
					let num1 = fromDisplay.slice(0, additionIndex);
					let num2 = fromDisplay.slice(additionIndex + 1, nextAdditionIndex)
					let added = Number(num1) + Number(num2);
					console.log('added ' + added);
					fromDisplay = added + fromDisplay.slice(nextAdditionIndex);
					console.log('fromDis ' + fromDisplay);
					equalToCount--;
				}
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
		
		//Swaps a double negative for an addition symbol and runs the addition function
		if (fromDisplay.includes('--')) {
			fromDisplay = fromDisplay.replace('--', '+');	
			fromDisplay = add(fromDisplay);
			console.log(fromDisplay);
			subtractionCount = subtractionCount - 2;
			equalToCount = equalToCount - 2;
			if (fromDisplay.includes('--')) {
				fromDisplay = fromDisplay.replace('--', '+');	
				fromDisplay = add(fromDisplay);
				console.log(fromDisplay);
				subtractionCount = subtractionCount - 2;
				equalToCount = equalToCount - 2;
			} else if (fromDisplay.includes ('-')) {
				fromDisplay = fromDisplay;
			} else {
				return fromDisplay;
			}
		}
		
		//Starts the function
		for (i=0; i < subtractionCount; i++) {
			console.log(fromDisplay);
			if (fromDisplay.charAt(0) === '-') {
				equalToCount = equalToCount - 1;
				subtractionCount = subtractionCount - 1;
				console.log(subtractionCount);
			}
			if (equalToCount < 2) {
				console.log('subtracting two numbers');
				if (fromDisplay.charAt(0) === '-') {
					console.log('firstchar -');
					if (subtractionCount < 1) {
						return fromDisplay;
					} else {
						let subtractionIndex = fromDisplay.indexOf('-', 1);
						let num1 = fromDisplay.slice(0, subtractionIndex);
						let num2 = fromDisplay.slice(subtractionIndex + 1)
						console.log(num1, num2);
						let subtracted = Number(num1) - Number(num2);
						console.log(subtracted);
						console.log(fromDisplay);
						fromDisplay = subtracted;
						console.log(fromDisplay);
						displayText.textContent = subtracted;
					}
				} else {
					let subtractionIndex = fromDisplay.indexOf('-', 1);
					let num1 = fromDisplay.slice(0, subtractionIndex);
					let num2 = fromDisplay.slice(subtractionIndex + 1)
					let subtracted = Number(num1) - Number(num2);
					console.log(fromDisplay);
					fromDisplay = subtracted;
					console.log(fromDisplay);
					displayText.textContent = subtracted;
				}
				
			} else {
				console.log('subtracting more than two numbers');
				subtractionIndex = fromDisplay.indexOf('-', 1);
				nextSubtractionIndex = fromDisplay.indexOf('-', subtractionIndex + 1);
				let num1 = fromDisplay.slice(0, subtractionIndex);
				console.log('num1 ' + num1);
				let num2 = fromDisplay.slice(subtractionIndex + 1, nextSubtractionIndex);
				console.log('num2 ' + num2);
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
	if (typeof(ans) === 'object') {
		ans = '0';
	} else if (ans.includes('x_x')) {
		ans = '0';
	}

	fromDisplay = ansSwap(fromDisplay, ans);
	console.log('after ans ' + fromDisplay);
	
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

	displayText.textContent = fromDisplay;
	ans = fromDisplay;
	console.log('ans is now: ' + ans);
}