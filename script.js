const displayButtons = document.querySelectorAll("[button-bt]");
const displayOperation = document.querySelectorAll("[operation-bt]");
const displayClear = document.querySelector("[clear-bt]");
const displayResult = document.querySelector("[result-bt]");
const displayDelete = document.querySelector("[delete]");
const textDisplayPrimary = document.querySelector("[display1]");
const textDisplaySecundary = document.querySelector("[display2]");

class Calculator {
    constructor(textDisplayPrimary, textDisplaySecundary){
        this.textDisplayPrimary = textDisplayPrimary;
        this.textDisplaySecundary = textDisplaySecundary;
    }

    clear() {
        this.newTextDisplayPrimary = "";
        this.newTextDisplaySecundary = "";
    }

    changeDisplay() {
        this.textDisplayPrimary.innerText = this.newTextDisplayPrimary;
        this.textDisplaySecundary.innerText = this.newTextDisplaySecundary;
    }
} 

const calc = new Calculator(textDisplayPrimary, textDisplaySecundary);

displayClear.addEventListener("click", () =>{
    calc.clear();
    calc.changeDisplay();
});