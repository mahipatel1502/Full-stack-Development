import React, { useState } from 'react';
import { evaluate } from 'mathjs';
import './App.css'; 

function App() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);

  const handleClick = (value) => {
    if (value === 'AC') {
      setExpression('');
      setResult('');
    } else if (value === 'DEL') {
      setExpression(expression.slice(0, -1));
    } else if (value === '=') {
      try {
        const evalResult = evaluate(expression);
        setResult(evalResult);
        setHistory([...history, `${expression} = ${evalResult}`]);
      } catch (err) {
        setResult("Error");
      }
    } else if (value === '±') {
      if (expression.startsWith('-')) {
        setExpression(expression.slice(1));
      } else {
        setExpression('-' + expression);
      }
    } else {
      setExpression(expression + value);
    }
  };

  const buttonData = [
    { value: 'AC', type: 'function', span: 2 },
    { value: 'DEL', type: 'function' },
    { value: '/', type: 'operator' },
    
    { value: '7', type: 'number' },
    { value: '8', type: 'number' },
    { value: '9', type: 'number' },
    { value: '*', type: 'operator' },
    
    { value: '4', type: 'number' },
    { value: '5', type: 'number' },
    { value: '6', type: 'number' },
    { value: '-', type: 'operator' },
    
    { value: '1', type: 'number' },
    { value: '2', type: 'number' },
    { value: '3', type: 'number' },
    { value: '+', type: 'operator' },
    
    { value: '±', type: 'function' },
    { value: '0', type: 'number' },
    { value: '.', type: 'number' },
    { value: '=', type: 'equals' },
  ];

  const getButtonClass = (btn) => {
    let className = 'button';
    
    if (btn.span === 2) className += ' button-span-2';
    
    switch (btn.type) {
      case 'function':
        className += ' button-function';
        break;
      case 'operator':
        className += ' button-operator';
        break;
      case 'number':
        className += ' button-number';
        break;
      case 'equals':
        className += ' button-equals';
        break;
      default:
        className += ' button-number';
    }
    
    return className;
  };

  return (
    <div className="app-container">
      <div className="calculator-container">
        <div className="calculator">
          {}
          <div className="display-container">
            <div className="display">
              <div className="display-result">
                {result && `= ${result}`}
              </div>
              <div className="display-expression">
                {expression || '0'}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="buttons">
            {buttonData.map((btn, index) => (
              <button
                key={index}
                onClick={() => handleClick(btn.value)}
                className={getButtonClass(btn)}
              >
                {btn.value}
              </button>
            ))}
          </div>

          {/* History */}
          {history.length > 0 && (
            <div className="history-container">
              <div className="history-title">Recent calculations:</div>
              <div className="history-list">
                {history.slice(-3).map((calc, index) => (
                  <div key={index} className="history-item">
                    {calc}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;