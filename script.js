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

let footer = document.querySelector("#footText");
footer.innerText = `© Todo ${year} Yash nayak`;
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
      <span><strong>${task}</strong></span>
    </label>`;
  newTask.setAttribute("class", "list-group-item p-2");
  todoList.append(newTask);
  taskName = "";
  allTaskData[`todo-${count}`] = task;
  localStorage.setItem("taskData", JSON.stringify(allTaskData));
  count++;
}

// +++++++++++++++ adding strike when we click the check box ++++++++++++++++++

function taskCheck() {
  let allList = document.querySelectorAll(".list-group-item");
  let allCheck = document.querySelectorAll(".form-check-input");
  let allLabel = document.querySelectorAll(".form-check-label");

  // console.log(allCheck[0]);
  for (let i = 0; i < allCheck.length; i++) {
    allCheck[i].addEventListener("change", function (e) {
      if (this.checked) {
        allLabel[i].style.textDecoration = "line-through";
        // allList[i].style.backgroundColor = "#96fa96";
      } else {
        allLabel[i].style.textDecoration = "none";
        // allList[i].style.backgroundColor = "#ffffff";
      }
      // console.log(allLabel[i]);
      // console.log(allLabel[i].textContent);
      // allLabel[i].textContent.style.textDecoration = "line-through";
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
  console.log(browserObj);
  // let size = Object.keys(browserObj).length;

  for (let keyValue in browserObj) {
    // document.getElementById(keyValue).value = browserObj[keyValue];
    handleNewtask(browserObj[keyValue]);
    taskCheck();
  }
});
