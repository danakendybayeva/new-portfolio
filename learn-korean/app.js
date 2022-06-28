// Selectors
const main = document.querySelector(".main");
const menuOptions = document.querySelectorAll(".menu-option");
const todoList = document.querySelector(".todo-list");
const toggleBtn = document.querySelector(".toggle-btn");
const body = document.querySelector("body");
const modal = document.querySelector(".modal");
const modalOpen = document.querySelector(".open-modal");
const modalOpenTask = document.querySelector(".add-task");
const modalsClose = document.querySelectorAll(".close-modal");
const overlay = document.querySelector("#overlay");
const modalTask = document.querySelector(".modal__add-task");
const modalTime = document.querySelector(".modal__time");
const timerDiv = document.querySelector(".timer");
const showTime = document.querySelector(".show-time");
const blocks = document.querySelectorAll(".block");
const timeTotal = document.querySelector(".time-total");

// For counting time studied today
var timeCounter = 0;
timeCount(timeCounter);

// Event Listeners
window.addEventListener("load", createContent);
window.addEventListener("load", autoChangeMode);
document.addEventListener("DOMContentLoaded", getTodos);
toggleBtn.addEventListener("click", changeMode);
menuOptions.forEach((el) => {
  el.addEventListener("click", showDetails);
});
todoList.addEventListener("click", deleteCheck);
todoList.addEventListener("click", startTimerTodo);
blocks.forEach((el) => {
  el.addEventListener("click", startTimerTodo);
});
modalOpen.addEventListener("click", openModal);
modalsClose.forEach((el) => {
  el.addEventListener("click", closeModal);
});
overlay.addEventListener("click", closeModal);
modalOpenTask.addEventListener("click", openModalTask);

function autoChangeMode() {
  let hour = new Date().getHours();

  if (hour >= 7 && hour <= 18) {
    toggleBtn.innerHTML = `<i class="fa-solid fa-moon"></i>`;
    body.classList.toggle("light-mode");
  } else {
    toggleBtn.innerHTML = `<i class="fa-solid fa-sun"></i>`;
    body.classList.toggle("dark-mode");
  }
}

function changeMode() {
  const light = document.querySelector(".light-mode");
  if (light) toggleBtn.innerHTML = `<i class="fa-solid fa-sun"></i>`;
  else toggleBtn.innerHTML = `<i class="fa-solid fa-moon"></i>`;

  body.classList.toggle("light-mode");
}

function createContent(event) {
  event.preventDefault();
  fetch("data.json")
    .then((resp) => resp.json())
    .then((jsonData) => {
      jsonData.forEach((element) => {
        const contentWrapper = document.querySelector(".content-wrapper");
        const contentDetail = document.createElement("div");
        contentDetail.classList.add(
          "content-detail",
          "hidden",
          element.id,
          element.option.toLowerCase()
        );
        contentWrapper.appendChild(contentDetail);

        const detailsFlexDiv = document.createElement("div");
        detailsFlexDiv.classList.add("details-flex");
        contentDetail.appendChild(detailsFlexDiv);
        detailsFlexDiv.addEventListener("click", closeContent);

        const titleDiv = document.createElement("div");
        titleDiv.classList.add("title");
        detailsFlexDiv.appendChild(titleDiv);

        const closeBtn = document.createElement("button");
        closeBtn.classList.add("close-btn");
        closeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        titleDiv.appendChild(closeBtn);

        const titleHeader = document.createElement("h1");
        titleHeader.innerHTML =
          `${element.option}` + ' <i class="fa-solid fa-cookie-bite"></i>';

        const titleTime = document.createElement("p");
        titleTime.innerText = "Time: " + element.timeTitle;

        titleDiv.append(titleHeader, titleTime);

        const hColors = [0, 1, 2, 3, 4, 5];
        var keysColors = [];

        Object.entries(element.content).forEach((el) => {
          keysColors.push(el);
        });

        hColors.forEach(function (el) {
          var detailDiv = document.createElement("div");
          detailDiv.classList.add("detail");
          detailsFlexDiv.appendChild(detailDiv);
          detailDiv.addEventListener("click", addTodo);
          var headerColor = document.createElement("h1");
          headerColor.innerText = keysColors[el][0];
          headerColor.classList.add(keysColors[el][1].color);
          detailDiv.appendChild(headerColor);

          var tasksList = document.createElement("ul");
          tasksList.classList.add("tasks-list");
          detailDiv.appendChild(tasksList);
          keysColors[el].forEach(function (t) {
            for (const [key, value] of Object.entries(t)) {
              if (key === "tasks") {
                const values = value.toString().split(",");
                values.forEach(function (v) {
                  var task = document.createElement("div");
                  task.classList.add("task-item");
                  task.dataset.color = element.option.toLowerCase();
                  tasksList.appendChild(task);

                  var taskItem = document.createElement("li");
                  taskItem.innerText = v;

                  var taskBtn = document.createElement("button");
                  taskBtn.classList.add("add-btn", keysColors[el][1].color);
                  taskBtn.innerHTML = ' <i class="fa-solid fa-utensils"></i>';

                  task.append(taskItem, taskBtn);
                });
              }
            }
          });
        });
      });
    });
}

function showDetails(event) {
  const menuOption = event.currentTarget;

  const allContent = document.querySelectorAll(".content-detail");
  for (let option of menuOptions) {
    option.classList.remove("active-menu");
  }
  for (let content of allContent) {
    content.classList.add("hidden");
  }

  const gotoBlock = document.querySelector("." + menuOption.dataset.goto);
  gotoBlock.classList.remove("hidden");
  gotoBlock.classList.toggle("active-content");

  menuOption.classList.add("active-menu");
  event.preventDefault();
}

function closeContent(event) {
  const curr = event.currentTarget;
  const item = event.target;

  const currMenu = document.querySelector(".active-menu");
  if (currMenu) currMenu.classList.remove("active-menu");

  if (item.classList[0] === "close-btn" || item.classList[0] === "add-btn") {
    curr.parentElement.classList.toggle("active-content");
    curr.parentElement.classList.add("hidden");
  }
}

function addTodo(event) {
  const btn = event.target;
  // Prevent form from submitting
  event.preventDefault();
  // Create DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  todoDiv.dataset.timeAmount = 0;
  // Set date when todo was added
  const todoDate = new Date();
  const day = todoDate.toLocaleDateString("en-us", {
    day: "numeric",
  });
  const month = todoDate.toLocaleDateString("en-us", {
    month: "short",
  });
  const todoDateFull = day + " " + month;
  // Create todo LI
  const newTodo = document.createElement("li");
  newTodo.innerHTML = `<p class="todo-name"><i class="fa-solid fa-circle"></i> 
              ${btn.parentElement.firstChild.innerText}</p> 
              <p class="todo-date">${todoDateFull}</p>`;
  newTodo.classList.add("todo-item");
  const icon = newTodo.querySelector(".fa-circle");
  setColor(todoDiv, icon, btn.parentElement.dataset.color);
  todoDiv.appendChild(newTodo);
  //   ADD TO LOCAL STORAGE
  const text = btn.parentElement.firstChild.innerText; // Name of the todo
  const circleColor = btn.parentElement.dataset.color; // Type of the todo (tall, grane, etc.)
  const isCompleted = false; // Is todo completed
  saveLocalTodos({ text, circleColor, isCompleted, todoDateFull });
  // START TIMER BUTTON
  const timerButton = document.createElement("button");
  timerButton.innerHTML = '<i class="fa-solid fa-clock"></i>';
  timerButton.classList.add("timer-btn");
  todoDiv.appendChild(timerButton);
  // CHECK MARK BUTTON
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  // CHECK TRASH BUTTON
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  // APPEND TO TODO LIST
  todoList.appendChild(todoDiv);
}

// For setting time of the todo by type
function setColor(todo, icon, type) {
  switch (type) {
    case "tall":
      todo.dataset.timeAmount = 15;
      icon.classList.add("pink");
      break;
    case "grande":
      todo.dataset.timeAmount = 30;
      icon.classList.add("blue");
      break;
    case "venti":
      todo.dataset.timeAmount = 0;
      icon.classList.add("green");
      break;
    case "trenta":
      todo.dataset.timeAmount = 0;
      icon.classList.add("orange");
      break;
    default:
      break;
  }
}

function startTimerTodo(e) {
  const item = e.target;
  // For Venti and Trenta type of todos.
  // When clicking these todos modal with time blocks opens
  if (
    e.path[1].dataset.timeAmount === "0" &&
    item.classList[0] === "timer-btn"
  ) {
    item.parentElement.classList.add("forBlocks");
    openModalTime(item);
  } else if (
    item.classList[0] === "timer-btn" ||
    item.classList[0] === "block"
  ) {
    closeModal();
    main.classList.add("hidden");
    timerDiv.classList.remove("hidden");
    if (item.classList[0] === "timer-btn")
      timer(item.parentElement.dataset.timeAmount, item.parentElement);
    else if (item.classList[0] === "block") {
      const parentItem = document.querySelector(".forBlocks");
      timer(item.dataset.timeAmount, parentItem);
    }
  }
}

function deleteCheck(e) {
  const item = e.target;
  const todo = item.parentElement;

  //  DELETE TODO
  if (item.classList[0] === "trash-btn") {
    removeLocalTodos(todo);
    todo.remove();
  }
  //   CHECK TODO
  if (item.classList[0] === "complete-btn") {
    todo.classList.toggle("completed");
    checkLocalTodos(todo);
  }
}

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    // Create DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    if (todo.isCompleted) todoDiv.classList.add("completed");
    // Create TODO LI
    const newTodo = document.createElement("li");
    newTodo.innerHTML = `<p class="todo-name"><i class="fa-solid fa-circle"></i> ${todo.text}</p> 
    <p class="todo-date">${todo.todoDateFull}</p>`;
    newTodo.classList.add("todo-item");
    const icon = newTodo.querySelector(".fa-circle");
    setColor(todoDiv, icon, todo.circleColor);
    todoDiv.appendChild(newTodo);
    // START TIMER BUTTON
    const timerButton = document.createElement("button");
    timerButton.innerHTML = '<i class="fa-solid fa-clock"></i>';
    timerButton.classList.add("timer-btn");
    todoDiv.appendChild(timerButton);
    // CHECK MARK BUTTON
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    // CHECK TRASH BUTTON
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    // APPEND TO LIST
    todoList.appendChild(todoDiv);
  });
}

// For deleting todo from local storage
function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  const index = todos.findIndex((obj) => {
    return obj.text === todoIndex.trim();
  });
  todos.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// For checking todo in local storage
function checkLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.querySelector(".todo-name").innerText;
  var result = todos.filter((obj) => {
    return obj.text === todoIndex.trim();
  });
  if (todo.classList.contains("completed")) result[0].isCompleted = true;
  else result[0].isCompleted = false;

  localStorage.setItem("todos", JSON.stringify(todos));
}

function openModal() {
  modal.classList.toggle("active");
  overlay.classList.toggle("active");
}

function openModalTask() {
  modalTask.classList.toggle("active");
  overlay.classList.toggle("active");
}

function openModalTime(item) {
  if (item.classList[0] === "timer-btn") {
    modalTime.classList.toggle("active");
    overlay.classList.toggle("active");
  }
}

function closeModal() {
  if (modal.classList.contains("active")) modal.classList.toggle("active");
  if (modalTask.classList.contains("active"))
    modalTask.classList.toggle("active");
  if (modalTime.classList.contains("active"))
    modalTime.classList.toggle("active");
  if (overlay.classList.contains("active")) overlay.classList.toggle("active");
  if (!timerDiv.classList.contains("hidden")) {
    timerDiv.classList.add("hidden");
    main.classList.remove("hidden");
  }
}

function timer(mins, todo) {
  if (todo.classList.contains("forBlocks")) todo.classList.remove("forBlocks");

  const controlBtn = document.querySelector(".control");
  const resetBtn = document.querySelectorAll(".reset");

  let interval = null;
  let remainingSeconds = mins * 60;

  const hourS = Math.floor((mins * 60) / 3600);
  const minuteS = Math.floor(((mins * 60) % 3600) / 60);
  const secondS = Math.floor((mins * 60) % 60);

  showTime.innerText =
    toPadStart(hourS) + ":" + toPadStart(minuteS) + ":" + toPadStart(secondS);

  controlBtn.addEventListener("click", () => {
    if (interval === null) {
      startTimer();
    } else {
      stopTimer();
    }
  });

  resetBtn.forEach((el) => {
    el.addEventListener("click", () => {
      stopTimer();
      remainingSeconds = 0;
      updateInterfaceTime();
    });
  });

  function updateInterfaceTime() {
    const hours = Math.floor(remainingSeconds / 3600);
    const minutes = Math.floor((remainingSeconds % 3600) / 60);
    const seconds = Math.floor(remainingSeconds % 60);

    if (hours === 0) document.querySelector(".hours").innerText = "";
    else document.querySelector(".hours").innerText = toPadStart(hours) + ":";
    document.querySelector(".minutes").innerText = toPadStart(minutes);
    document.querySelector(".seconds").innerText = toPadStart(seconds);
  }

  function updateInterfaceControls() {
    if (interval === null) {
      controlBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
      controlBtn.classList.add("start");
      controlBtn.classList.remove("stop");
    } else {
      controlBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
      controlBtn.classList.add("stop");
      controlBtn.classList.remove("start");
    }
  }

  function startTimer() {
    if (remainingSeconds === 0) return;

    interval = setInterval(() => {
      remainingSeconds--;
      updateInterfaceTime();

      if (remainingSeconds === 0) {
        stopTimer();
        document.querySelector(".show-time").innerText = "You're Done";

        timeCount(parseInt(mins));

        todo.classList.toggle("completed");

        checkLocalTodos(todo);

        setTimeout(() => {
          closeModal();
        }, 3000);
      }
    }, 1000);

    updateInterfaceControls();
  }

  function stopTimer() {
    clearInterval(interval);

    interval = null;

    updateInterfaceControls();
  }
}

// For adding additional 0 before the number, so there are two digits
function toPadStart(number) {
  return number.toString().padStart(2, "0");
}

// For showing total time studied today
function timeCount(mins) {
  let hour = 0,
    min = 0;
  timeCounter = timeCounter + mins;
  hour = Math.floor(timeCounter / 60);
  min = Math.floor(timeCounter % 60);
  timeTotal.innerText = toPadStart(hour) + "h " + toPadStart(min) + "m";
}
