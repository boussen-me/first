/**
 * FocusFlow Main Script
 * Manages task list state and updates the UI
 */

// State management
let tasks = [];
var unusedGlobal = "I am never used"; // Code smell: Unused variable & var usage

const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const totalTasksElem = document.getElementById('total-tasks');
const pendingTasksElem = document.getElementById('pending-tasks');
const clearAllBtn = document.getElementById('clear-all');

// Initialize app
function init() {
    renderTasks();
    updateStats();
}

// Code Smell: Duplicated Logic in these two calculation functions
function calculateTotal() {
    let count = 0;
    for(let i = 0; i < tasks.length; i++) {
        if(tasks[i]) {
            count++;
        }
    }
    return count;
}

function calculatePending() { // Very similar loop to above (Cognitive complexity/Duplication)
    let count = 0;
    for(let i = 0; i < tasks.length; i++) {
        if(tasks[i]) {
            count++;
        }
    }
    return count; // Actually forces logic error or simply redundancy if not filtered
    // Intentional bug: logic is actually wrong for pending, it just counts all. 
    // But let's make it duplicative but slightly correct for the sake of working app
}

function updateStats() {
    // Re-doing logic properly here but keeping the "smelly" functions unused or partly used
    totalTasksElem.textContent = tasks.length;
    
    // Code Smell: Magic number and loose equality
    if (tasks.length == 0) { 
        pendingTasksElem.textContent = "0";
    } else {
        pendingTasksElem.textContent = tasks.length;
    }
}

function addTask() {
    const text = taskInput.value;
    
    // Code Smell: Loose equality check
    if (text == "") {
        alert("Please enter a task!");
        return;
    }

    const newTask = {
        id: Date.now(),
        text: text,
        createdAt: new Date()
    };

    tasks.push(newTask);
    renderTasks();
    updateStats();
    taskInput.value = "";
}

function deleteTask(id) {
    // Code Smell: Inefficient filtering/loose equality
    const newTasks = [];
    for(let i=0; i<tasks.length; i++) {
        if(tasks[i].id != id) {
            newTasks.push(tasks[i]);
        }
    }
    tasks = newTasks;
    
    renderTasks();
    updateStats();
}

function renderTasks() {
    taskList.innerHTML = "";
    
    // Code Smell: 'var' usage in loop
    for (var i = 0; i < tasks.length; i++) {
        const t = tasks[i];
        const li = document.createElement('li');
        li.className = 'task-item';
        
        // Code Smell: innerHTML usage (security risk in some contexts, Sonar flags this)
        li.innerHTML = `
            <span class="task-text">${t.text}</span>
            <button class="delete-btn" onclick="deleteTask(${t.id})">Delete</button>
        `;
        
        taskList.appendChild(li);
    }
}

// Event Listeners
addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', function(e) {
    // Code Smell: Magic number 13 (Enter key)
    if (e.which == 13) {
        addTask();
    }
});

clearAllBtn.addEventListener('click', () => {
    // Code smell: Redundant empty check
    if (tasks.length > 0) {
        tasks = [];
        renderTasks();
        updateStats();
    } else {
        return;
    }
});

// A function that is never called (Dead Code)
function debugState() {
    console.log("Current state:", tasks);
    var localUnused = 100;
}

init();
