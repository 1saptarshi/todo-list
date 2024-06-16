// Select elements
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const themeToggle = document.getElementById('theme-toggle');

// Event Listeners
document.addEventListener('DOMContentLoaded', getTasks);
taskForm.addEventListener('submit', addTask);
taskList.addEventListener('click', handleTaskActions);
themeToggle.addEventListener('click', toggleTheme);

// Functions
function addTask(e) {
    e.preventDefault();

    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const li = document.createElement('li');
    li.className = 'flex justify-between items-center p-2 bg-gray-100 dark:bg-gray-700 mb-2 rounded-lg';
    li.innerHTML = `
        <span class="flex-1 text-gray-800 dark:text-gray-200">${taskText}</span>
        <div class="flex items-center space-x-2">
            <button class="check-task p-2 text-green-500"><i class="fas fa-check"></i></button>
            <button class="delete-task p-2 text-red-500"><i class="fas fa-trash"></i></button>
        </div>
    `;

    taskList.appendChild(li);

    storeTaskInLocalStorage(taskText);

    taskInput.value = '';
}

function handleTaskActions(e) {
    if (e.target.classList.contains('delete-task') || e.target.closest('.delete-task')) {
        if (confirm('Are you sure you want to delete this task?')) {
            const taskItem = e.target.closest('li');
            taskList.removeChild(taskItem);
            removeTaskFromLocalStorage(taskItem);
        }
    } else if (e.target.classList.contains('check-task') || e.target.closest('.check-task')) {
        const taskItem = e.target.closest('li');
        taskItem.classList.toggle('completed');
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark');
    if (document.body.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        localStorage.setItem('theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

function loadTheme() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        document.body.classList.add('dark');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        document.body.classList.remove('dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

function storeTaskInLocalStorage(task) {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
    loadTheme();

    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'flex justify-between items-center p-2 bg-gray-100 dark:bg-gray-700 mb-2 rounded-lg';
        li.innerHTML = `
            <span class="flex-1 text-gray-800 dark:text-gray-200">${task}</span>
            <div class="flex items-center space-x-2">
                <button class="check-task p-2 text-green-500"><i class="fas fa-check"></i></button>
                <button class="delete-task p-2 text-red-500"><i class="fas fa-trash"></i></button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

function removeTaskFromLocalStorage(taskItem) {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks = tasks.filter(task => task !== taskItem.querySelector('span').textContent);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
