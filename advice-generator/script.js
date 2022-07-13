const adviceID = document.querySelector(".advice__id");
const adviceText = document.querySelector(".advice__text");
const dice = document.querySelector(".dice");
const url = "https://api.adviceslip.com/advice";

window.addEventListener("load", getAdvice);
dice.addEventListener("click", getAdvice);

function getAdvice() {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      adviceID.innerText = "Advice #" + data.slip.id;
      adviceText.innerText = data.slip.advice;
    });
}
