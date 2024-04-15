import React, { useState } from "react";
import HomeButton from "./HomeButton";

const CalculatorBtn = () => {
  const [currentNumber, setCurrentNumber] = useState("0");
  const [previousNumber, setPreviousNumber] = useState("0");
  const [currentOperator, setCurrentOperator] = useState(null);

  const clear = () => {
    setCurrentNumber("0");
    setPreviousNumber("0");
    setCurrentOperator(null);
  };

  const inputNum = (e) => {
    const value = e.target.value.toString();
    if (currentNumber === "0") {
      setCurrentNumber(value);
    } else {
      setCurrentNumber(currentNumber + value);
    }
  };

  const percent = () => {
    setCurrentNumber((parseFloat(currentNumber) / 100).toString());
  };

  const inverse = () => {
    setCurrentNumber((parseFloat(currentNumber) * -1).toString());
  };

  const calculate = () => {
    if (currentOperator && previousNumber) {
      let result;
      switch (currentOperator) {
        case "+":
          result = Number(previousNumber) + Number(currentNumber);
          break;
        case "-":
          result = Number(previousNumber) - Number(currentNumber);
          break;
        case "*":
          result = Number(previousNumber) * Number(currentNumber);
          break;
        case "/":
          result = Number(previousNumber) / Number(currentNumber);
          break;
        default:
          break;
      }
      console.log(result);
      const formattedResult = formatResult(result);
      setCurrentNumber(formattedResult);

      setPreviousNumber("0");
      setCurrentOperator(null);
    }
  };

  const operatorHandler = (e) => {
    const operatorInput = e.target.value;
    setCurrentOperator(operatorInput);
    setPreviousNumber(currentNumber);
    setCurrentNumber("0");
  };

  const formatResult = (result) => {
    const resultString = result.toString();
    if (resultString.length > 11) {
      return result.toExponential(4);
    }
    return result.toLocaleString("en-US", { maximumFractionDigits: 9 });
  };

  const insertMask = (number) => {
    if (typeof number === 'string') {
      const noMask = number.replace(/\D/g, '');
      const { length } = noMask;
  
      if (length > 9) {
        return "..." + noMask.slice(-9);
      }
  
      return number;
    }
  
    return number;
  };

  return ( 
    <div className="calculator-wrapper">
        <div className="result">
        {insertMask(currentNumber)}
          
          </div>
            <div className="calculator-container"> 
        
                <div className="gray-hover">
                    <button onClick={clear} className="calculator-btn gray">AC</button>
                </div>
                <div className="gray-hover">
                    <button onClick={inverse} className="calculator-btn gray">+/-</button>
                </div>
                <div className="gray-hover">
                    <button onClick={percent} className="calculator-btn gray">%</button>
                </div>
                <div className="operator-button-hover">
                    <button onClick={operatorHandler} value={"/"} className="calculator-btn operator-button">÷</button>
                </div>
                <div className="number-hover">
                    <button onClick={inputNum} value={7} className="calculator-btn ">7</button>
                </div>
                <div className="number-hover">
                    <button onClick={inputNum} value={8} className="calculator-btn">8</button>
                </div>
                <div className="number-hover">
                    <button onClick={inputNum} value={9} className="calculator-btn">9</button>
                </div>
                <div className="operator-button-hover">
                    <button onClick={operatorHandler} value={"*"} className="calculator-btn operator-button">x</button>
                </div>
                <div className="number-hover">
                    <button onClick={inputNum} value={4} className="calculator-btn">4</button>
                </div>
                <div className="number-hover">
                    <button onClick={inputNum} value={5} className="calculator-btn">5</button>
                </div>
                <div className="number-hover">
                    <button onClick={inputNum} value={6} className="calculator-btn">6</button>
                </div>
                <div className="operator-button-hover">
                    <button onClick={operatorHandler} value={"-"} className="calculator-btn operator-button">-</button>
                </div>
                <div className="number-hover">
                    <button onClick={inputNum} value={1} className="calculator-btn">1</button>
                </div>
                <div className="number-hover">
                    <button onClick={inputNum} value={2} className="calculator-btn">2</button>
                </div>
                <div className="number-hover">
                    <button onClick={inputNum} value={3} className="calculator-btn">3</button>
                </div>
                <div className="operator-button-hover">
                    <button onClick={operatorHandler} value={"+"} className="calculator-btn operator-button">+</button>
                </div>
                <div className="number-hover">
                    <button onClick={inputNum} value={0} className="calculator-btn-big">0</button>
                </div>
                <div className="number-hover">
                    <button onClick={inputNum} className="calculator-btn" value={"."}>.</button>
                </div>
                <div className="operator-button-hover">
                    <button  onClick={calculate} className="calculator-btn operator-button" >=</button>
                </div>
        
    </div> 
        <HomeButton />
    </div> 
    
);
}

export default CalculatorBtn; 