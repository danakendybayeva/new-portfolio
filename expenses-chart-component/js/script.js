const chart = document.querySelector(".chart__details");
const bars = document.querySelectorAll(".bar__box");

window.addEventListener("load", buildBars);
bars.forEach((bar) => {});
// object.addEventListener("mouseover", myScript);

function buildBars() {
  fetch("./js/data.json")
    .then((res) => res.json())
    .then((data) => {
      let nums = [];
      data.forEach((el) => {
        nums.push(el.amount);
      });
      let max = Math.max(...nums);
      data.forEach((el) => {
        const detailBar = document.createElement("div");
        detailBar.classList.add("detail__bar");
        chart.append(detailBar);
        const barTag = document.createElement("div");
        barTag.classList.add("bar__tag");
        barTag.innerText = "$" + el.amount;
        barTag.setAttribute("data-day", el.day);
        const barBox = document.createElement("div");
        barBox.classList.add("bar__box");
        if (isCurrentDay(el.day)) barBox.classList.add("active");
        barBox.setAttribute("data-day", el.day);
        barBox.style.setProperty(
          "--height",
          Math.floor(setHeight(max, el.amount)) + "px"
        );
        barBox.addEventListener("mouseover", showTag);
        barBox.addEventListener("mouseout", hideTag);

        const barDay = document.createElement("div");
        barDay.classList.add("bar__day");
        barDay.innerText = el.day;
        detailBar.append(barTag, barBox, barDay);
      });
    });
}

function showTag(e) {
  e.target.parentElement.firstChild.style.display = "block";
  //   e.target.parentElement.firstChild.classList.toggle("hidden");
}
function hideTag(e) {
  e.target.parentElement.firstChild.style.display = "none";
  //   e.target.parentElement.firstChild.classList.toggle("hidden");
}

function isCurrentDay(day) {
  let date = new Date().getDay();
  const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  return days[date] === day;
}

function setHeight(max, amount) {
  let obj = (((amount * 100) / max) * 150) / 100;
  return obj;
}
