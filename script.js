const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
let tasks = [];

if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  displayTasks(tasks);
}

taskForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const status = document.getElementById("status").value;
  tasks.push({ id: Date.now(), name, status });
  displayTasks(tasks);
  saveTasks();
  taskForm.reset();
});

function displayTasks(tasksToDisplay) {
  taskList.innerHTML = "";
  tasksToDisplay.forEach((task) => {
    const row = document.createElement("tr");
    row.innerHTML = `
              <td class="${task.status === "Completed" ? "completed" : ""}">${
      task.name
    }</td>
              <td class="${task.status === "Completed" ? "completed" : ""}">${
      task.status
    }</td>
              <td>
                  <button onclick="toggleStatus(${
                    task.id
                  })">Toggle Status</button>
                  <button onclick="deleteTask(${task.id})">Delete</button>
              </td>
          `;
    taskList.appendChild(row);
  });
}

function filterTasks(filter) {
  let filteredTasks = [];
  if (filter === "Active") {
    filteredTasks = tasks.filter((task) => task.status === "Active");
  } else if (filter === "Completed") {
    filteredTasks = tasks.filter((task) => task.status === "Completed");
  } else if (filter === "All") {
    filteredTasks = tasks;
  }
  displayTasks(filteredTasks);
}

function toggleStatus(id) {
  tasks = tasks.map((task) => {
    if (task.id === id) {
      task.status = task.status === "Active" ? "Completed" : "Active";
    }
    return task;
  });
  displayTasks(tasks);
  saveTasks();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  displayTasks(tasks);
  saveTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
