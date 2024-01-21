// ++++++++++++++++ Dates +++++++++++++++++++
let subH = document.querySelector("#subhead_Date");
let today = new Date();
let option1 = { weekday: "long" };
let option2 = { month: "short" };

let day = today.toLocaleDateString("en-US", option1);
let month = today.toLocaleDateString("en-US", option2);
let date = today.getDate();
let year = today.getFullYear();
subH.textContent = `${day}, ${month} ${date}, ${year}`;

// +++++++++++++++ adding new todo to the list ++++++++++++++++++
let taskForm = document.querySelector("#addNewTaskForm");
let todoList = document.querySelector("#todo-list");
let getTaskInput = document.querySelector("#taskInput");
let taskName = "";
let count = 1;
let allTaskData = {};

getTaskInput.addEventListener("input", (e) => {
  taskName = e.target.value;
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // console.log("submited");
  if (taskName !== "") {
    document.getElementById("errorMsg").textContent = "";
    handleNewtask(taskName);
    // console.log(getTaskInput.value);
    getTaskInput.value = "";
    getTaskInput.focus();
    taskCheck();
    deletTask();
  } else {
    document.getElementById("errorMsg").textContent = "Please enter the task.";
    getTaskInput.value = "";
    getTaskInput.focus();
  }
});

function handleNewtask(task) {
  let newTask = document.createElement("li");
  newTask.innerHTML = `
      <input class="form-check-input me-1" id="todo-${count}" type="checkbox" style="background-color:#1D2B53">
      <label class="form-check-label" for="todo-${count}">
      ${task}
    </label>  <i id="crossMark-${count}" class="fa-solid fa-xmark"></i>`;
  newTask.setAttribute("class", "list-group-item p-2");
  newTask.setAttribute("id", `list-group-item-${count}`);
  todoList.append(newTask);
  taskName = "";
  allTaskData[`todo-${count}`] = task;
  localStorage.setItem("taskData", JSON.stringify(allTaskData));

  deletTask(`list-group-item-${count}`);
  count++;
}

// +++++++++++++++ adding strike when we click the check box ++++++++++++++++++

function taskCheck() {
  let allList = document.querySelectorAll(".list-group-item");
  let allCheck = document.querySelectorAll(".form-check-input");
  let allLabel = document.querySelectorAll(".form-check-label");

  for (let i = 0; i < allCheck.length; i++) {
    allCheck[i].addEventListener("change", function (e) {
      if (this.checked) {
        allLabel[i].style.textDecoration = "line-through";
      } else {
        allLabel[i].style.textDecoration = "none";
      }
    });
  }
}

// +++++++++++++++ clear all the task when we click clear all btn ++++++++++++++++++
const clearAllBtn = document.getElementById("clearAllBtn");

clearAllBtn.addEventListener("click", (e) => {
  allTaskData = {};
  localStorage.setItem("taskData", JSON.stringify(allTaskData));
  todoList.innerHTML = "";
});

// ++++++++++++++++ storing data in loal storage +++++++++++++++++
// fetching the store the task from local storage
document.addEventListener("DOMContentLoaded", function () {
  let browserObj = JSON.parse(localStorage.getItem("taskData"));
  // console.log(browserObj);
  // let size = Object.keys(browserObj).length;

  for (let keyValue in browserObj) {
    // document.getElementById(keyValue).value = browserObj[keyValue];
    handleNewtask(browserObj[keyValue]);
    taskCheck();
  }
});

// +++++++++++++++++++ delete +++++++++++++++++++++++++
// let
// cross.addEventListener("click", deletTask);

function deletTask() {
  let listItems = document.querySelectorAll(".list-group-item");
  let allCheck = document.querySelectorAll(".form-check-input");
  let allCross = document.querySelectorAll(".fa-solid");
  for (let i = 0; i < allCross.length; i++) {
    allCross[i].addEventListener("click", function (e) {
      if (this.click) {
        // console.log(allCheck[i].id);
        delete allTaskData[allCheck[i].id];
        localStorage.setItem("taskData", JSON.stringify(allTaskData));
        listItems[i].remove();
      }
    });
  }
}
