function eval() {
    // Do not use eval!!!
    return;
}

function toRPN(expr) {
    let arr = [];
    
    let num = '';
    for (let i = 0; i < expr.length; i++) {
      if (parseInt(expr[i]) >= 0 && parseInt(expr[i]) <= 9) {
        num += expr[i];
      } else {
        if (num) {
          arr.push(num);
          num = '';
        }
        
        if (expr[i] != ' ') {
          arr.push(expr[i]);
        }
      }
    }
    
    if (num) {
      arr.push(num);
      num = '';
    }
    
    let result = '';
    let operators= new Set(['+', '-', '*', '/']);
    const operatorsPriority = {
    '(': 1,
  	'+': 2,
    '-': 2,
    '*': 3,
    '/': 3
   }
            
    let stack = [];
    for (let symbol of arr) {
       if (!operators.has(symbol) && symbol != '(' && symbol != ')') {
         result += symbol + " ";


       } else if (operators.has(symbol)) {
       
         if (stack.length == 0 || operatorsPriority[stack[stack.length - 1]] < operatorsPriority[symbol]) {
         stack.push(symbol);
         } else {
           while (stack.length != 0 && operatorsPriority[stack[stack.length - 1]] >= operatorsPriority[symbol]) {
           
           result += stack.pop() + " ";
           }
         if (stack.length == 0 || operatorsPriority[stack[stack.length - 1]] < operatorsPriority[symbol]) {
         stack.push(symbol);
         }
         }
       } else if (symbol == '(') {
         stack.push(symbol);
       } else if (symbol == ')') {
               
         while (stack.length != 0 && stack[stack.length - 1] != '(') {
           result += stack.pop() + " ";
         }
       
       }
    }
    
    for (let i = stack.length - 1; i >= 0; i--) {
      if (stack[i] != '(') {
        result += stack[i] + " ";
      }
    }

    return result;
}

function expressionCalculator(expr) {
    if (!check(expr, ['(', ')'])) {
        throw new TypeError("ExpressionError: Brackets must be paired");
    }
expr = toRPN(expr);

    let arr = [];
    
    let num = '';
    for (let i = 0; i < expr.length; i++) {
      if (parseInt(expr[i]) >= 0 && parseInt(expr[i]) <= 9) {
        num += expr[i];
      } else {
        if (num) {
          arr.push(num);
          num = '';
        }
        
        if (expr[i] != ' ') {
          arr.push(expr[i]);
        }
      }
    }
    
    if (num) {
      arr.push(num);
      num = '';
    }

  
  
    
  let operators= new Set(['+', '-', '*', '/']);
  let stack = [];

  for (let operator of arr) {
    if (operators.has(operator)) {
      let b = parseFloat(stack.pop());
      let a = parseFloat(stack.pop());
      try {
        stack.push(calc(a, b, operator));
      } catch (e) {
        throw new TypeError("TypeError: Division by zero.");
      }
    } else {
      stack.push(operator);

    }
  }

  return parseFloat(stack.pop());
}

function calc(a, b, operator) {
  switch(operator) {
    case '*':
      return a * b;
    case '/':
      if (b == 0) {
          throw new TypeError("TypeError: Division by zero.");
      }
      return a / b;
    case '+':
      return a + b;
    case '-':
      return a - b;
  }
}

function check(str, bracketsConfig) {
    let isPossible = true;
    str = str.replace(/[0-9]/g, '');
    str = str.replace(/\+/g, '');
    str = str.replace(/\-/g, '');
    str = str.replace(/\*/g, '');
    str = str.replace(/\//g, '');
    str = str.replace(/ /g, '');
    while (isPossible) {
      isPossible = false;
      if (str.indexOf(bracketsConfig[0] + bracketsConfig[1]) != -1) {
        str = str.replace(bracketsConfig[0] + bracketsConfig[1], '');
        isPossible = true;
      }
    }
    
    console.log(str);
  
    return (str.length ? false : true);
  }


module.exports = {
    expressionCalculator
}