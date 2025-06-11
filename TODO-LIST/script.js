const newtaskBtn = document.getElementById("newBtn");
const taskForm = document.getElementById("task-form");

// when 'new task' is clicked, displays the form to add task
newtaskBtn.addEventListener("click", () => {
  if(taskForm.style.display === "none" || taskForm.style.display === ""){
    taskForm.style.display = "block";
  } else{
    taskForm.style.display = "none";
  }
});

function updateTaskCount() {
  // Count all <li> elements inside all .list-container
  const allTasks = document.querySelectorAll(".list-container li");
  const taskCount = allTasks.length;

  // Update the hero section text
  const countDisplay = document.getElementById("task-count");
  countDisplay.textContent = `Today you have ${taskCount} task${taskCount !== 1 ? "s" : ""}`;
}

function addtask(){
  const inputBox = document.getElementById("task-input");
  const categorySelect = document.getElementById("task-category")
  const selectedCategory = categorySelect.value;

  if(inputBox.value === ''){
    alert("You must type something");
  } 

  const categoryDiv = document.querySelector(`.category[data-category="${selectedCategory}"]`);

  const listCon= categoryDiv.querySelector(".list-container");

  const li = document.createElement("li");
  li.textContent = inputBox.value;

  let span = document.createElement("span");
  span.innerHTML = "\u00d7";
  li.appendChild(span);

  listCon.appendChild(li);

  inputBox.value = "";
  updateTaskCount();
  saveData();
}

document.addEventListener("click", function(e){
  if(e.target.tagName === "LI"){
    e.target.classList.toggle("checked");
  } else if(e.target.tagName === "SPAN" && e.target.parentElement.tagName === "LI"){
    e.target.parentElement.remove();
    updateTaskCount();
    saveData();
  }
}, false);

updateTaskCount();

function saveData() {
  const gallery = document.querySelector(".gallery");
  localStorage.setItem("tasks", gallery.innerHTML);
}


function showTask() {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    document.querySelector(".gallery").innerHTML = savedTasks;
  }
  updateTaskCount();
}
showTask();