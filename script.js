const display = document.getElementById('display');
const buttons = document.querySelectorAll('#buttons button');

let currentInput = "";
let operator=["+","-","*","/"];
let shouldReplaceDisplay = false;
let storedInputOne = null;
let storedInputTwo = null;
let storedOperation = null;
let calculationResult = null;

for(const b of buttons){

b.addEventListener('click', function pressed(event){
    let clickedValue=event.target.dataset.value;
    
    if(!isNaN(parseInt(clickedValue))){
        
        if(currentInput==="0" || shouldReplaceDisplay===true){
        currentInput=clickedValue;
        display.textContent = currentInput;
        shouldReplaceDisplay=false;
        
        } else {
            currentInput+=clickedValue;
            display.textContent = currentInput;
        }

    } else if (clickedValue === "."){
        if (shouldReplaceDisplay===true){
            currentInput="0.";
            display.textContent = currentInput;
            shouldReplaceDisplay=false;
            
        } else{
            if(!currentInput.includes(".")){
            currentInput+=".";
            display.textContent=currentInput;
            }
        }
    
    } else if(operator.includes(clickedValue)){
            storedInputOne=currentInput;
            storedOperation=clickedValue;
            shouldReplaceDisplay=true;
            console.log(`Operator pressed: Stored Input 1 = ${storedInputOne}, Operation = ${storedOperation}`);
   
    } else if (clickedValue==="="){
        //checking existence of both a first number and a pending operation
        if(storedInputOne !== null && storedOperation !==null){
            storedInputTwo=currentInput;
            let convInputOne = Number(storedInputOne);
            let convInputTwo = Number (storedInputTwo);

            console.log(`Calculating: ${convInputOne} ${storedOperation} ${convInputTwo}`);
            
            if (storedOperation === "+"){
                calculationResult = convInputOne + convInputTwo;
                //prepare for new "chained" calculation//
                storedInputOne=calculationResult;
                storedInputTwo=null;
                storedOperation=null;
                shouldReplaceDisplay=true;
            } else if(storedOperation === "-"){
                calculationResult = convInputOne - convInputTwo;
                //prepare for new "chained" calculation//
                storedInputOne=calculationResult;
                storedInputTwo=null;
                storedOperation=null;
                shouldReplaceDisplay=true;
            } else if(storedOperation === "*"){
                calculationResult = convInputOne * convInputTwo;
                //prepare for new "chained" calculation//
                storedInputOne=calculationResult;
                storedInputTwo=null;
                storedOperation=null;
                shouldReplaceDisplay=true;
            } else if(storedOperation === "/"){
                if(convInputTwo===0){
                    calculationResult="Error."
                    storedInputOne=null;
                    storedInputTwo=null;
                    storedOperation=null;
                    display.textContent=calculationResult;
                    shouldReplaceDisplay=true;
                    console.log("Division by zero error occurred."); 
                    return;
                }
                    calculationResult = convInputOne / convInputTwo;

                    console.log(`Calculation Result: ${calculationResult}`);
                    //prepare for new "chained" calculation//
                    storedInputOne=calculationResult;
                    storedInputTwo=null;
                    storedOperation=null;
                    shouldReplaceDisplay=true;
            }
            display.textContent = calculationResult;
        }
         
    } else if(clickedValue==="AC"){
        storedInputOne=null;
        storedInputTwo=null;
        storedOperation=null;
        currentInput=0;
        shouldReplaceDisplay=true;
        display.textContent = "0";
        console.log("Calculator cleared (AC pressed). State reset.");
    
    } else if(clickedValue==="squarert"){
        
        function squareRoot (){
        
            const inputNum = parseInt(currentInput);
            return Math.sqrt(inputNum);
        }
        display.textContent = squareRoot();
    }
} 
    )
};
