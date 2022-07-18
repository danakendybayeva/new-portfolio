const bill = document.querySelector("#bill");
const people = document.querySelector("#people");
const tips = document.querySelectorAll(".tip__btn");
const tipInput = document.querySelector("#custom");
const tipOut = document.querySelector(".output__tip");
const totalOut = document.querySelector(".output__total");
const resetBtn = document.querySelector(".output__btn");

tips.forEach((tip) => {
  tip.addEventListener("click", activeBtn);
  tip.addEventListener("click", calc);
});
tipInput.addEventListener("input", tipCustom);
tipInput.addEventListener("input", calc);
resetBtn.addEventListener("click", reset);
bill.addEventListener("keyup", calc);
people.addEventListener("keyup", calc);

function calc() {
  var regExp = /[a-zA-Z]/g;
  if (people.value === "0") {
    document.querySelector("#people").style.borderColor = "#c28570";
    document.querySelector(".people__error").innerText = "Can't be zero!";
    document.querySelector(".people__error").style.display = "block";
    tipOut.innerText = "$0.00";
    totalOut.innerText = "$0.00";
  } else if (
    regExp.test(bill.value) ||
    regExp.test(people.value) ||
    regExp.test(tipInput.value)
  ) {
    if (regExp.test(bill.value)) {
      document.querySelector("#bill").style.borderColor = "#c28570";
      document.querySelector(".bill__error").innerText = "Numbers only!";
      document.querySelector(".bill__error").style.display = "block";
    } else if (regExp.test(people.value)) {
      document.querySelector("#people").style.borderColor = "#c28570";
      document.querySelector(".people__error").innerText = "Numbers only!";
      document.querySelector(".people__error").style.display = "block";
    } else if (regExp.test(tipInput.value)) {
      document.querySelector("#custom").style.borderColor = "#c28570";
    }
    tipOut.innerText = "$0.00";
    totalOut.innerText = "$0.00";
  } else {
    removeError();

    const active = document.querySelector(".active__btn");
    let tipPercent = 5;
    if (active) tipPercent = getPercent(active.innerText);
    else if (tipInput !== "") tipPercent = tipInput.value;

    const total = bill.value * (1 + tipPercent / 100);
    const tip = total - bill.value;
    let tipPer = 0,
      totalPer = 0;

    if (people.value !== "") {
      tipPer = tip / people.value;
      totalPer = total / people.value;
    } else {
      tipPer = tip;
      totalPer = total;
    }
    tipOut.innerText = "$" + tipPer.toFixed(2);
    totalOut.innerText = "$" + totalPer.toFixed(2);
  }
}

function activeBtn(e) {
  let curr = document.querySelectorAll(".tip__btn");
  curr.forEach((el) => {
    el.classList.remove("active__btn");
  });
  tipInput.value = "";
  e.target.classList.add("active__btn");
}

function tipCustom() {
  if (tipInput !== "") {
    let curr = document.querySelectorAll(".tip__btn");
    curr.forEach((el) => {
      el.classList.remove("active__btn");
    });
  }
}

function reset() {
  bill.value = "";
  people.value = "";
  tipOut.innerHTML = "$0.00";
  totalOut.innerHTML = "$0.00";
  tipInput.value = "";
  removeError();
}

function removeError() {
  document.querySelector(".bill__error").style.display = "none";
  document.querySelector(".people__error").style.display = "none";
  document.querySelector("#bill").style.borderColor = "hsl(189, 41%, 97%)";
  document.querySelector("#custom").style.borderColor = "hsl(189, 41%, 97%)";
  document.querySelector("#people").style.borderColor = "hsl(189, 41%, 97%)";
}

function getPercent(str) {
  return parseInt(str.split("%")[0]);
}
