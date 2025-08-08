const form = document.querySelector("#todo-form");
const inputField = document.querySelector("#todo");
const todoList = document.querySelector("#todo-list");

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();

// Add new task
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const taskText = inputField.value.trim();

    if (taskText !== "") {
        const newTask = { text: taskText, done: false };
        tasks.push(newTask);
        saveTasks();
        renderTasks();
        inputField.value = "";
    }
});

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Render tasks on screen
function renderTasks() {
    todoList.innerHTML = ""; // Clear current list
    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");

        // Task text
        const taskSpan = document.createElement("span");
        taskSpan.textContent = task.text;
        if (task.done) taskSpan.classList.add("done");

        // Done button
        const doneBtn = document.createElement("button");
        doneBtn.textContent = "Done";
        doneBtn.classList.add("done-btn");
        doneBtn.addEventListener("click", () => {
            tasks[index].done = !tasks[index].done;
            saveTasks();
            renderTasks();
        });

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        listItem.appendChild(taskSpan);
        listItem.appendChild(doneBtn);
        listItem.appendChild(deleteBtn);
        todoList.appendChild(listItem);
    });
}
