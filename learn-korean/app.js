// Selectors
const menuOptions = document.querySelectorAll(".menu-option");
const todoList = document.querySelector(".todo-list");
const toggleBtn = document.querySelector(".toggle-btn");
const body = document.querySelector("body");
const modal = document.querySelector(".modal");
const modalOpen = document.querySelector(".open-modal");
const modalClose = document.querySelector(".close-modal");
const overlay = document.querySelector("#overlay");

window.addEventListener("load", createContent);
window.addEventListener("load", autoChangeMode);
document.addEventListener("DOMContentLoaded", getTodos);
toggleBtn.addEventListener("click", changeMode);
menuOptions.forEach((el) => {
  el.addEventListener("click", showDetails);
});
todoList.addEventListener("click", deleteCheck);
modalOpen.addEventListener("click", openModal);
modalClose.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

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
        contentDetail.classList.add("content-detail", "hidden", element.id);
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
        titleTime.innerText = element.timeTitle;

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
  // Create LI
  const newTodo = document.createElement("li");
  newTodo.innerText = btn.parentElement.firstChild.innerText;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  //   ADD TO LOCAL STORAGE
  saveLocalTodos(btn.parentElement.firstChild.innerText);
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
}

function deleteCheck(e) {
  const item = e.target;
  //  DELETE TODO
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.remove();
  }
  //   CHECK TODO
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
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
    // Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
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

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function openModal() {
  modal.classList.toggle("active");
  overlay.classList.toggle("active");
}

function closeModal() {
  modal.classList.toggle("active");
  overlay.classList.toggle("active");
}
