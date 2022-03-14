const displayButtons = document.querySelectorAll("[button-bt]");
const displayOperation = document.querySelectorAll("[operation-bt]");
const displayClear = document.querySelector("[clear-bt]");
const displayResult = document.querySelector("[result-bt]");
const displayDelete = document.querySelector("[delete]");
const textDisplayPrimary = document.querySelector("[displayPrimary]");
const textDisplaySecundary = document.querySelector("[displaySecundary]");

class Calculator {
    constructor(textDisplayPrimary, textDisplaySecundary){
        this.textDisplayPrimary = textDisplayPrimary;
        this.textDisplaySecundary = textDisplaySecundary;
        this.clear(); //limpar o display quando a class é chamada
    }

    clear() {
        if(this.newTextDisplayPrimary !== '' & this.newTextDisplaySecundary == ''){ //limpar o display após exibir o resultado e clicar em um novo número! 
            this.newTextDisplayPrimary = '';
        }

        this.newTextDisplayPrimary = '';
        this.newTextDisplaySecundary = '';
        this.operation = undefined;
    }

    changeDisplay() {
        this.textDisplayPrimary.innerHTML = this.newTextDisplayPrimary;
        this.textDisplaySecundary.innerHTML = `${this.newTextDisplaySecundary}${this.operation || ''}`;
    }

    numbersValues(number){
        if(this.newTextDisplayPrimary.includes('.') & number == '.') return; //não permitir um número ter mais de um ponto flutuante
        this.newTextDisplayPrimary = `${this.newTextDisplayPrimary}${number.toString()}`;
    }

    selectOperation(operation){
        if(this.newTextDisplaySecundary !== ''){
            this.calculate();
        }

        this.operation = operation;
        this.newTextDisplaySecundary = this.newTextDisplayPrimary;
        this.newTextDisplayPrimary = ''; 
    }

    calculate(){
       let calculateResult;

       const displayPrimaryBoolean = parseFloat(this.newTextDisplayPrimary);
       const displaySecundaryBoolean = parseFloat(this.newTextDisplaySecundary);

       if(isNaN(displayPrimaryBoolean) || isNaN(displaySecundaryBoolean)) return;

       switch (this.operation) {
           case '÷':
               calculateResult = displaySecundaryBoolean / displayPrimaryBoolean;
               break;      
           case 'x':
                calculateResult = displaySecundaryBoolean * displayPrimaryBoolean;
               break;
            case '-':
                calculateResult = displaySecundaryBoolean - displayPrimaryBoolean;
                break;
            case '+':
                calculateResult = displaySecundaryBoolean + displayPrimaryBoolean;
                break;
            default:
                return;
       }

       this.newTextDisplayPrimary = calculateResult;
       this.newTextDisplaySecundary = '';
       this.operation = undefined;
    }
} 

const calc = new Calculator(textDisplayPrimary, textDisplaySecundary); //passando os parâmetros para a class

displayClear.addEventListener('click', () =>{ //funcção de Limpar o display
    calc.clear();
    calc.changeDisplay();
});

displayResult.addEventListener('click', () => {
    calc.calculate();
    calc.changeDisplay();
    calc.clear();
});

for (const displayButton of displayButtons) { //função de adicionar o número primário no Display
    displayButton.addEventListener('click', () =>{
        calc.numbersValues(displayButton.innerHTML);
        calc.changeDisplay();
    });
}

for (const operations of displayOperation){
    operations.addEventListener('click', () =>{
        calc.selectOperation(operations.innerHTML);
        calc.changeDisplay();
    });
}