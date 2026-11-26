// Get DOM elements
const billInput = document.getElementById("bill");
const tipInput = document.getElementById("tip");
const peopleInput = document.getElementById("people");
const calcBtn = document.getElementById("calcBtn");
const resetBtn = document.getElementById("resetBtn");
const result = document.getElementById("result");
const roundUpCheckbox = document.getElementById("roundUp");
const tipButtons = document.querySelectorAll(".tip-btn");
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// Dark mode toggle
function toggleTheme() {
  body.classList.toggle("dark-mode");
  themeToggle.textContent = body.classList.contains("dark-mode") ? "☀️" : "🌙";
  localStorage.setItem("theme", body.classList.contains("dark-mode") ? "dark" : "light");
}

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
  themeToggle.textContent = "☀️";
}

// Function to set tip percentage from buttons
function setTipPercentage(percent) {
  tipInput.value = percent;
}

// Calculate tip function
function calculateTip() {
  const bill = parseFloat(billInput.value);
  const tipPercent = parseFloat(tipInput.value);
  const people = parseInt(peopleInput.value);

  // Validation
  if (isNaN(bill) || bill <= 0) {
    result.innerText = "Please enter a valid bill amount greater than 0.";
    return;
  }
  if (isNaN(tipPercent) || tipPercent < 0) {
    result.innerText = "Please enter a valid tip percentage (0 or more).";
    return;
  }
  if (isNaN(people) || people <= 0) {
    result.innerText = "Please enter a valid number of people (1 or more).";
    return;
  }

  // Calculations
  const tipAmount = (bill * tipPercent) / 100;
  const total = bill + tipAmount;
  let perPerson = total / people;

  // Round up if checked
  if (roundUpCheckbox.checked) {
    perPerson = Math.ceil(perPerson);
  }

  // Display results
  result.innerHTML = `
    <strong>Tip Amount:</strong> ₹${tipAmount.toFixed(2)}<br>
    <strong>Total Bill:</strong> ₹${total.toFixed(2)}<br>
    <strong>Each Person Pays:</strong> ₹${perPerson.toFixed(2)}${roundUpCheckbox.checked ? ' (rounded up)' : ''}
  `;
  result.classList.add("show");
}

// Reset function
function resetCalculator() {
  billInput.value = "";
  tipInput.value = "";
  peopleInput.value = "";
  roundUpCheckbox.checked = false;
  result.innerText = "";
  result.classList.remove("show");
}

// Event listeners
calcBtn.addEventListener("click", calculateTip);
resetBtn.addEventListener("click", resetCalculator);
themeToggle.addEventListener("click", toggleTheme);

// Keyboard support
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    calculateTip();
  }
  if (e.key === "Escape") {
    resetCalculator();
  }
});

// Tip button event listeners
tipButtons.forEach(button => {
  button.addEventListener("click", () => {
    const tipValue = button.getAttribute("data-tip");
    setTipPercentage(tipValue);
  });
});
