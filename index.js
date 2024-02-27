document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const dueDateInput = document.getElementById('dueDateInput');
    const todoTasksTable = document.getElementById('todoTasks').querySelector('tbody');
    const completedTasksTable = document.getElementById('completedTasks').querySelector('tbody');

    taskForm.addEventListener('submit', function (event) {
        event.preventDefault();
        addTask(taskInput.value, dueDateInput.value);
        taskInput.value = '';
        dueDateInput.value = '';
    });

    function addTask(taskText, dueDate) {
        const taskItem = document.createElement('tr');
        const taskCell = document.createElement('td');
        const dueDateCell = document.createElement('td');
        const actionsCell = document.createElement('td');
        const completeButton = document.createElement('button');

        taskCell.textContent = taskText;

        if (dueDate) {
            dueDateCell.textContent = dueDate;
        }

        completeButton.textContent = 'Complete';
        completeButton.addEventListener('click', function () {
            moveTaskToCompleted(taskItem);
        });

        actionsCell.appendChild(completeButton);

        taskItem.appendChild(taskCell);
        taskItem.appendChild(dueDateCell);
        taskItem.appendChild(actionsCell);

        todoTasksTable.appendChild(taskItem);
    }

    function moveTaskToCompleted(taskItem) {
        const clonedTask = taskItem.cloneNode(true);
        const actionsCell = clonedTask.querySelector('td:last-child');
        const completeButton = clonedTask.querySelector('button');
        completeButton.textContent = 'Remove from Completed';
        completeButton.addEventListener('click', function () {
            removeTaskFromCompleted(clonedTask);
        });

        actionsCell.appendChild(completeButton);
        completedTasksTable.appendChild(clonedTask);

        // Remove the task from Todo Tasks
        todoTasksTable.removeChild(taskItem);
    }

    function removeTaskFromCompleted(taskItem) {
        // Remove the task from Completed Tasks
        completedTasksTable.removeChild(taskItem);
    }
});