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

