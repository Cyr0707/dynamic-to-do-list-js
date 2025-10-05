function addTask() {
        // ... (input validation code)

        // Create the new list item (li)
        const listItem = document.createElement('li');
        listItem.textContent = taskText; // 1. Set li textContent

        // Create the remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove"; // 2. Set button textContent
        removeButton.className = 'remove-btn'; // 3. Assign class name (without classList.add)

        // Assign the onclick event to the remove button
        removeButton.onclick = function() { // 4. Assign onclick event
            // Removes the parent list item (listItem) from the task list (taskList)
            taskList.removeChild(listItem); 
        };

        // Append the button to the list item
        listItem.appendChild(removeButton);

        // Append the complete list item to the task list
        taskList.appendChild(listItem);

        // Clear the task input field
        taskInput.value = ""; // 5. Clear input field
    }
