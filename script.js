/**
 * To-Do List Application JavaScript Logic
 * Enhanced with Local Storage for task persistence.
 */
document.addEventListener('DOMContentLoaded', () => {

    // 1. Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // 2. Helper Functions for Local Storage Management

    /**
     * Retrieves the tasks array from Local Storage, or returns an empty array if none found.
     * @returns {string[]} The array of task strings.
     */
    function getTasksFromStorage() {
        return JSON.parse(localStorage.getItem('tasks') || '[]');
    }

    /**
     * Saves the current tasks array back to Local Storage.
     * @param {string[]} tasksArray The array of task strings to save.
     */
    function saveTasksToStorage(tasksArray) {
        localStorage.setItem('tasks', JSON.stringify(tasksArray));
    }
    
    // 3. Task Creation and Removal Logic (Modified to accept taskText and an optional save flag)

    /**
     * Creates a task element in the DOM and optionally saves it to Local Storage.
     * @param {string} taskText The text for the new task.
     * @param {boolean} [save=true] Flag to control whether to save the task to Local Storage.
     */
    function addTask(taskText, save = true) {
        
        // Skip validation if we are loading saved tasks
        if (taskText.trim() === "") {
            if (save) alert("Please enter a task.");
            return;
        }

        const trimmedTaskText = taskText.trim();
        
        // --- DOM Creation Logic ---
        const listItem = document.createElement('li');
        listItem.textContent = trimmedTaskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn');

        // Assign the onclick event for removal
        removeButton.onclick = function() {
            // Remove the task from the DOM
            taskList.removeChild(listItem);
            
            // Remove the task from Local Storage
            removeTaskFromStorage(trimmedTaskText);
        };

        // Append elements to the DOM
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);
        
        // --- Local Storage Update Logic ---
        if (save) {
            let storedTasks = getTasksFromStorage();
            storedTasks.push(trimmedTaskText);
            saveTasksToStorage(storedTasks);
            
            // Clear the input field only when adding a *new* task via the button/keypress
            taskInput.value = "";
        }
    }

    /**
     * Removes a task from the tasks array in Local Storage.
     * @param {string} taskText The text of the task to remove.
     */
    function removeTaskFromStorage(taskText) {
        let storedTasks = getTasksFromStorage();
        // Filter out the task that matches the removed text
        const updatedTasks = storedTasks.filter(task => task !== taskText);
        saveTasksToStorage(updatedTasks);
    }
    
    // 4. Loading Tasks from Local Storage

    /**
     * Loads tasks from Local Storage when the page initializes.
     */
    function loadTasks() {
        // Retrieve and parse tasks, defaulting to an empty array
        const storedTasks = getTasksFromStorage();

        // For each stored task, create the DOM element (with save=false)
        storedTasks.forEach(taskText => addTask(taskText, false)); 
    }

    // 5. Attach Event Listeners

    // Listener for the 'Add Task' button click
    addButton.addEventListener('click', () => {
        addTask(taskInput.value);
    });

    // Listener for the 'Enter' key press in the input field
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(taskInput.value);
        }
    });

    // 6. Initialize: Load existing tasks on page load
    loadTasks();
});
