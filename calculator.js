// calculator.js - Simple JavaScript Calculator
// Assignment 3

var results = [];

// Build table header
document.write(`
<div class="container">
  <h1>🧮 JavaScript Calculator</h1>
  <table id="calc-table">
    <thead>
      <tr>
        <th>x</th>
        <th>op</th>
        <th>y</th>
        <th>result</th>
      </tr>
    </thead>
    <tbody id="calc-body">
`);

// Main loop
while (true) {
  // Prompt for x
  var inputX = prompt("Enter the first number (x):\n\nClick OK to continue, Cancel to stop.");
  if (inputX === null) break;

  // Prompt for operator
  var operator = prompt("Enter an operator (+, -, *, /, %):");
  if (operator === null) break;

  // Prompt for y
  var inputY = prompt("Enter the second number (y):");
  if (inputY === null) break;

  var x = Number(inputX);
  var y = Number(inputY);
  var result;
  var isError = false;

  // Validate inputs
  if (isNaN(x) || isNaN(y) || inputX.trim() === "" || inputY.trim() === "") {
    result = "wrong input number";
    isError = true;
  } else if (!["+", "-", "*", "/", "%"].includes(operator.trim())) {
    result = "computation error";
    isError = true;
  } else {
    operator = operator.trim();
    switch (operator) {
      case "+": result = x + y; break;
      case "-": result = x - y; break;
      case "*": result = x * y; break;
      case "/":
        if (y === 0) { result = "computation error"; isError = true; }
        else result = x / y;
        break;
      case "%":
        if (y === 0) { result = "computation error"; isError = true; }
        else result = x % y;
        break;
    }
  }

  // Round numeric results to avoid floating point mess
  if (!isError && typeof result === "number") {
    result = Math.round(result * 10000) / 10000;
    results.push(result);
  }

  var rowClass = isError ? "error-row" : "valid-row";
  document.write(`
      <tr class="${rowClass}">
        <td>${inputX}</td>
        <td>${operator}</td>
        <td>${inputY}</td>
        <td class="${isError ? 'error-cell' : ''}">${result}</td>
      </tr>
  `);
}

// Close main table
document.write(`
    </tbody>
  </table>
`);

// Summary table
if (results.length > 0) {
  var min = Math.min(...results);
  var max = Math.max(...results);
  var total = results.reduce((a, b) => a + b, 0);
  var avg = Math.round((total / results.length) * 10000) / 10000;
  total = Math.round(total * 10000) / 10000;

  document.write(`
  <h2>Summary <span class="subtitle">(valid results only)</span></h2>
  <table id="summary-table">
    <thead>
      <tr>
        <th>Min</th>
        <th>Max</th>
        <th>Average</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>${min}</td>
        <td>${max}</td>
        <td>${avg}</td>
        <td>${total}</td>
      </tr>
    </tbody>
  </table>
  `);
} else {
  document.write(`<p class="no-results">No valid results to summarize.</p>`);
}

document.write(`</div>`);