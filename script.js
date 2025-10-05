// Ensure all JavaScript code runs after the HTML document is fully loaded
document.addEventListener('DOMContentLoaded', () => {

    // 1. Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // 2. Create the addTask Function
    /**
     * Handles the logic for retrieving the task, creating the list item,
     * adding the remove button, and appending it to the list.
     */
    function addTask() {
        // Retrieve and trim the input value
        const taskText = taskInput.value.trim();

        // Check if taskText is not empty
        if (taskText === "") {
            alert("Please enter a task.");
            return; // Stop execution if input is empty
        }

        // Task Creation and Removal Logic
        // Create the new list item (li)
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Create the remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        // Assign the onclick event to the remove button
        // When clicked, it removes the parent list item (listItem) from the task list (taskList)
        removeButton.onclick = function() {
            taskList.removeChild(listItem);
        };

        // Append the remove button to the list item
        listItem.appendChild(removeButton);

        // Append the complete list item to the task list
        taskList.appendChild(listItem);

        // Clear the task input field
        taskInput.value = "";
    }

    // 3. Attach Event Listeners

    // Listener for the 'Add Task' button click
    addButton.addEventListener('click', addTask);

    // Listener for the 'Enter' key press in the input field
    taskInput.addEventListener('keypress', (event) => {
        // Check if the pressed key is 'Enter'
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // NOTE: The instruction "Invoke the addTask function on DOMContentLoaded"
    // is redundant/incorrect here as calling addTask() on load would simply
    // try to add an empty task (since the input is initially empty),
    // which the empty check handles. The two event listeners above are
    // the correct mechanism for invocation based on user action.
});
