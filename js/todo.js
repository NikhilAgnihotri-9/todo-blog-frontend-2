let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskInput = document.getElementById("new-task");
const taskList = document.getElementById("task-list");
const addTaskBtn = document.getElementById("add-task-btn");
const filterButtons = document.querySelectorAll(".filter-btn");

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(filter = "all") {
  taskList.innerHTML = "";

  let filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = \`list-group-item \${task.completed ? "completed" : ""}\`;

    li.innerHTML = \`
      <span>\${task.text}</span>
      <div>
        <button class="btn btn-sm btn-success me-2" onclick="toggleTask(\${index})">✔</button>
        <button class="btn btn-sm btn-danger" onclick="deleteTask(\${index})">🗑</button>
      </div>
    \`;

    taskList.appendChild(li);
  });
}

function addTask() {
  const text = taskInput.value.trim();
  if (text !== "") {
    tasks.push({ text, completed: false });
    saveTasks();
    taskInput.value = "";
    renderTasks();
  }
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", e => e.key === "Enter" && addTask());

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderTasks(btn.dataset.filter);
  });
});

renderTasks();