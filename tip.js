document.getElementById("calcBtn").addEventListener("click", function () {

  const bill = Number(document.getElementById("bill").value);
  const tip = Number(document.getElementById("tip").value);
  const people = Number(document.getElementById("people").value);

  if (bill === 0 || tip === 0 || people === 0) {
    document.getElementById("result").innerText =
      "Please fill all fields";
    return;
  }

  const tipAmount = (bill * tip) / 100;
  const total = bill + tipAmount;
  const perPerson = total / people;

  document.getElementById("result").innerText =
    "Each person pays: ₹" + perPerson.toFixed(2);
});
