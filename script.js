const display = document.querySelector('.display');
const igual = document.querySelector('#resultado');

insert = (valor) =>{ 

    if(display.textContent == 'Display'){
        display.innerHTML = ' ';
    }else{
        display.innerHTML += valor;
    }    
}

limpar = () =>{
    
    if(display.textContent !== 'Display'){
        display.innerHTML = 'Display';
    }
}

apagar = () =>{
 
    if(display.textContent != 'Display' & display.textContent != ' '){
    
        let displayAtual = document.getElementById('display').innerHTML;
        display.innerHTML = displayAtual.substring(0, displayAtual.length -1);

    }else if(display.textContent = ' '){
        displayLimpo();
    }

    displayLimpo = () =>{
        display.innerHTML = 'Display';
    } 
}
