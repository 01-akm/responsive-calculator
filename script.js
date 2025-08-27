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