// Get DOM elements
const countDisplay = document.getElementById("count");
const incrementBtn = document.getElementById("increment");
const decrementBtn = document.getElementById("decrement");
const resetBtn = document.getElementById("reset");

// Load saved count or default to 0
let count = localStorage.getItem("repCount") ? parseInt(localStorage.getItem("repCount")) : 0;
countDisplay.textContent = count;

// Update display and save to localStorage
function updateDisplay() {
    countDisplay.textContent = count;
    localStorage.setItem("repCount", count);
}

incrementBtn.addEventListener("click", () => {
    count++;
    updateDisplay();
});

decrementBtn.addEventListener("click", () => {
    if (count > 0) count--;
    updateDisplay();
});

resetBtn.addEventListener("click", () => {
    count = 0;
    updateDisplay();
});
