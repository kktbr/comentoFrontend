const processDisplay = document.getElementById('process');
const resultDisplay = document.getElementById('result');
let currentInput = '';
let operator = '';
let previousInput = '';
let midResult = '';

document.querySelectorAll('.buttons button').forEach(button => {
  button.addEventListener('click', () => {
    const value = button.innerText;

    if (!isNaN(value) || value === '.') {
      // 숫자 또는 소수점 입력
      if (!previousInput) {
        currentInput += value;
        midResult = currentInput
        updateProcessDisplay(previousInput + operator + currentInput);
        updateResultDisplay(previousInput + operator + currentInput);
      } else if (previousInput && operator) {
        previousInput = previousInput
        currentInput += value;
        updateProcessDisplay(previousInput + operator + currentInput);
        midResult = calculate(parseFloat(previousInput), parseFloat(currentInput), operator);
        midResult = String(midResult);
        updateResultDisplay(midResult);
      }
      
    } else if (value === 'C') {
      // 초기화
      currentInput = '';
      previousInput = '';
      operator = '';
      midResult = '';
      updateProcessDisplay('0');
      updateResultDisplay('0');
      
    } else if (value === 'del') {
      // 마지막 문자 삭제
      if (currentInput) {
        currentInput = currentInput.slice(0, -1);
        midResult = calculate(parseFloat(previousInput), parseFloat(currentInput), operator);
        midResult = String(midResult);
        updateProcessDisplay(previousInput + operator + currentInput);
        updateResultDisplay(previousInput + operator + currentInput); 
        
      } else if (operator) {
        operator = '';
        currentInput = previousInput;
        previousInput = '';
        midResult = currentInput
        updateProcessDisplay(previousInput + operator + currentInput);
        updateResultDisplay(previousInput + operator + currentInput);
      } else {
        updateProcessDisplay('0');
        updateResultDisplay('0');
      }
      
    } else if (['+', '-', '×', '÷', 'mod'].includes(value)) {
      // 연산자 입력
      if (midResult) {
        previousInput = midResult;
        currentInput = '';
        operator = value;
        updateProcessDisplay(previousInput + operator + currentInput);
        updateResultDisplay(previousInput + operator + currentInput);  
      }
    } else if (value === '+/-') {
      // 부호 반전
      if (currentInput) {
        currentInput = String(parseFloat(currentInput) * -1);
        midResult = currentInput
        updateProcessDisplay(previousInput + operator + currentInput);
        updateResultDisplay(previousInput + operator + currentInput);
      } 
    } else if (value === '=') {
      // 계산 수행
      if (previousInput && currentInput && operator) {
        const finalResult = calculate(parseFloat(previousInput), parseFloat(currentInput), operator);
        updateProcessDisplay(finalResult);
        updateResultDisplay(finalResult);
        currentInput = String(finalResult);
        previousInput = '';
        operator = '';
      }
    }
  });
});

function calculate(num1, num2, operator) {
  switch (operator) {
    case '+': return num1 + num2;
    case '-': return num1 - num2;
    case '×': return num1 * num2;
    case '÷': return num2 === 0 ? 'Error' : num1 / num2;
    case 'mod': return num1 % num2;
    default: return 0;
  }
}

function updateProcessDisplay(value) {
  processDisplay.value = value;
}

function updateResultDisplay(value) {
  resultDisplay.value = value;
}


