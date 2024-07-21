const inputBox = document.querySelector("input");
const ul = document.querySelector("ul");
const colorBtn = document.querySelector(".btn");
const para = document.querySelector("p");
const taskBtn = document.querySelector("button");

// Load saved tasks when the page loads
document.addEventListener("DOMContentLoaded", loadTasks);

taskBtn.addEventListener("click", (evt) => {
  evt.preventDefault();
  if (inputBox.value === "") {
    alert("Enter some Task");
  } else if (inputBox.value.length > 42) {
    alert("Word limit exceeded! Maximum 41 characters allowed");
  } else {
    const task = document.createElement("li");
    ul.prepend(task);
    task.innerHTML = `${inputBox.value} <span><i class="fa-regular fa-trash-can"></i></span>`;
    getCheck(task);
    genRanColor(task);
    saveData();
  }
  inputBox.value = "";
});

function getCheck(task) {
  task.addEventListener("click", (evt) => {
    if (evt.target.tagName === "LI") {
      task.classList.toggle("checked");
    } else if (evt.target.tagName === "I") {
      task.remove();
      saveData();
    }
  });
}

let isEnable = true;
function colourSwitch() {
  if (isEnable) {
    isEnable = false;
    colorBtn.classList.add("onSlide");
    para.style.animation = "none";
    colorBtn.parentElement.style.backgroundColor = "#d8dbe0";
  } else {
    isEnable = true;
    colorBtn.classList.remove("onSlide");
    para.style.animation = "rainbow 5s ease infinite";
    colorBtn.parentElement.style.backgroundColor = "#80b918";
  }
}

colorBtn.parentElement.addEventListener("click", colourSwitch);

function genRanColor(task) {
  if (isEnable) {
    let red = Math.floor(Math.random() * 255);
    let green = Math.floor(Math.random() * 255);
    let blue = Math.floor(Math.random() * 255);
    task.style.color = `rgb(${red}, ${green}, ${blue})`;
  }
}

function saveData() {
  const tasks = [];
  ul.querySelectorAll("li").forEach((task) => {
    tasks.push({
      text: task.firstChild.textContent,
      checked: task.classList.contains("checked"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (savedTasks) {
    savedTasks.forEach((savedTask) => {
      const task = document.createElement("li");
      task.innerHTML = `${savedTask.text} <span><i class="fa-regular fa-trash-can"></i></span>`;
      if (savedTask.checked === false) {
        task.classList.add("checked");
      }
      ul.prepend(task);
      getCheck(task);
      genRanColor(task);
    });
  }
}
