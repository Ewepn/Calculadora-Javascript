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
        //limpar o display após exibir o resultado e clicar em um novo número!
        if(this.newTextDisplayPrimary !== '' & this.newTextDisplaySecundary === '') this.newTextDisplayPrimary = '';

        this.newTextDisplayPrimary = '';
        this.newTextDisplaySecundary = '';
        this.operation = undefined;
    }

    delete() {
        this.newTextDisplayPrimary = this.newTextDisplayPrimary.slice(0, -1);
    }

    formatDisplay(number) {
        const convertString = number.toString();
        const intNumber = parseFloat(convertString.split('.')[0]);
        const decimalNumber = convertString.split('.')[1];

        let intDisplay;

        if(isNaN(intNumber)){
            intDisplay = '';
        }else{
            intDisplay = intNumber.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        }

        if(decimalNumber != null){ //se o decimal for diferente de vazio é adicionado um '.' (ponto) após o inteiro 
            return `${intDisplay}.${decimalNumber}`;
        }else{
            return intDisplay;
        }
    }

    changeDisplay() {
        this.textDisplayPrimary.innerHTML = this.formatDisplay(this.newTextDisplayPrimary);
        this.textDisplaySecundary.innerHTML = `${this.formatDisplay(this.newTextDisplaySecundary)}${this.operation || ''}`;
    }

    numbersValues(number){
        if(this.newTextDisplayPrimary.includes('.') & number === '.') return; //não permitir um número ter mais de um ponto flutuante
        this.newTextDisplayPrimary = `${this.newTextDisplayPrimary}${number}`;
    }

    selectOperation(operation){
        if(this.newTextDisplayPrimary === '') return; // se o display estiver limpo não é adicionado um operador 
        if(this.newTextDisplaySecundary !== '') this.calculate();

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

displayClear.addEventListener('click', () =>{ //função de Limpar o display
    calc.clear();
    calc.changeDisplay();
});

displayResult.addEventListener('click', () =>{ //função do botão 'igual'
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

for (const operations of displayOperation){ //função dos operadores 
    operations.addEventListener('click', () =>{
        calc.selectOperation(operations.innerHTML);
        calc.changeDisplay();
    });
}

displayDelete.addEventListener('click', () =>{ //função de deletar
    calc.delete();
    calc.changeDisplay();
});