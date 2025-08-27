 // A class to handle all calculator logic
        class Calculator {
            constructor(previousOperandTextElement, currentOperandTextElement) {
                this.previousOperandTextElement = previousOperandTextElement;
                this.currentOperandTextElement = currentOperandTextElement;
                this.clear();
            }
             // Clears all data to default state
            clear() {
                this.currentOperand = '0';
                this.previousOperand = '';
                this.operation = undefined;
                this.isResultDisplayed = false;
            }
            // Deletes the last character from the current operand
            delete() {
                if (this.currentOperand.length === 1 && this.currentOperand !== '0') {
                    this.currentOperand = '0';
                } else if (this.currentOperand.length > 1) {
                    this.currentOperand = this.currentOperand.toString().slice(0, -1);
                }
            }
             // Appends a number to the current operand
            appendNumber(number) {
                if (number === '.' && this.currentOperand.includes('.')) return;
                if (this.isResultDisplayed) {
                    this.currentOperand = number;
                    this.isResultDisplayed = false;
                } else {
                    this.currentOperand = this.currentOperand === '0' ? number : this.currentOperand.toString() + number.toString();
                }
            }

            // Sets the chosen operation
            chooseOperation(operation) {
                if (this.currentOperand === '' && this.previousOperand === '') return;
                if (this.previousOperand !== '') {
                    this.compute();
                }
                this.operation = operation;
                this.previousOperand = this.currentOperand;
                this.currentOperand = '';
            }
             // Performs the calculation
            compute() {
                let computation;
                const prev = parseFloat(this.previousOperand);
                const current = parseFloat(this.currentOperand);
                if (isNaN(prev) || isNaN(current)) return;
 // Use a switch statement for operations
                switch (this.operation) {
                    case '+':
                        computation = prev + current;
                        break;
                    case '-':
                        computation = prev - current;
                        break;
                    case '×':
                        computation = prev * current;
                        break;
                    case '÷':
                        if (current === 0) { // Handle division by zero
                            alert("Error: Cannot divide by zero!");
                            this.clear();
                            return;
                        }
                        computation = prev / current;
                        break;
                    default:
                        return;
                }
                this.currentOperand = computation;
                this.operation = undefined;
                this.previousOperand = '';
                this.isResultDisplayed = true;
            }

            // Helper function to format the displayed number with commas
            getDisplayNumber(number) {
                const stringNumber = number.toString();
                const integerDigits = parseFloat(stringNumber.split('.')[0]);
                const decimalDigits = stringNumber.split('.')[1];
                let integerDisplay;
                if (isNaN(integerDigits)) {
                    integerDisplay = '';
                } else {
                    integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
                }
                if (decimalDigits != null) {
                    return `${integerDisplay}.${decimalDigits}`;
                } else {
                    return integerDisplay;
                }
            }

          // Updates the text content of the display elements
            updateDisplay() {
                this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
                if (this.operation != null) {
                    this.previousOperandTextElement.innerText =
                        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
                } else {
                    this.previousOperandTextElement.innerText = '';
                }
            }
        }

 // --- DOM Element Selection and Event Listeners ---
        const numberButtons = document.querySelectorAll('[data-number]');
        const operationButtons = document.querySelectorAll('[data-operator]');
        const equalsButton = document.querySelector('[data-equals]');
        const deleteButton = document.querySelector('[data-delete]');
        const allClearButton = document.querySelector('[data-all-clear]');
        const previousOperandTextElement = document.querySelector('#previous-operand');
        const currentOperandTextElement = document.querySelector('#current-operand');
// Create a new calculator instance
        const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

     
        // Add click listeners for number buttons
        numberButtons.forEach(button => {
            button.addEventListener('click', () => {
                calculator.appendNumber(button.innerText);
                calculator.updateDisplay();
            });
        });

      