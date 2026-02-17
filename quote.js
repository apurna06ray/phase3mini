
const quotes = [
  "Believe in yourself",
  "Practice makes perfect",
  "Never give up",
  "Code daily, grow daily",
  "Consistency is the key"
];

document.getElementById("quoteBtn").addEventListener("click", function () {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  document.getElementById("quote").innerText = quotes[randomIndex];
});
