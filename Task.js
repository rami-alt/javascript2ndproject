class Task {
    constructor(description, dueDate, priority) {
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
    }
}

const todoList = {
  tasks: [],

  addTask: function (description, dueDate, priority) {
    const newTask = new Task(description, dueDate, priority);
    this.tasks.push(newTask);
    console.log('Task added successfully!');
  },

  markTaskAsCompleted: function (index) {
    if (index >= 0 && index < this.tasks.length) {
      this.tasks[index].completed = true;
      console.log('Task marked as completed successfully!');
    } else {
      console.log('Invalid task index.');
    }
  },

  deleteTask: function (index) {
    if (index >= 0 && index < this.tasks.length) {
      this.tasks.splice(index, 1);
      console.log('Task deleted successfully!');
    } else {
      console.log('Invalid task index.');
    }
  },

  filterTasksByStatus: function (status) {
    const filteredTasks = this.tasks.filter(function (task) {
      return task.completed === status;
    });

    console.log('Filtered tasks:');
    filteredTasks.forEach(function (task, index) {
      console.log(`${index + 1}) ${task.description}`);
    });
  },

  sortTasksByDueDate: function () {
    this.tasks.sort(function (task1, task2) {
      return new Date(task1.dueDate) - new Date(task2.dueDate);
    });

    console.log('Tasks sorted by due date:');
    this.tasks.forEach(function (task, index) {
      console.log(`${index + 1}) ${task.description} (Due to: ${task.dueDate})`);
    });
  },

  sortTasksByPriority: function () {
    this.tasks.sort(function (task1, task2) {
      return task1.priority - task2.priority;
    });

    console.log('Tasks sorted by priority:');
    this.tasks.forEach(function (task, index) {
      console.log(`${index + 1}) ${task.description} (Priority: ${task.priority})`);
    });
  },

  clearAllTasks: function () {
    this.tasks = [];
    console.log('All tasks cleared!');
  },
};
// Function to handle user input
function handleUserInput() {
  console.log('***************************');
  console.log('Welcome to JS TODO-APP');
  console.log('***************************');
  console.log('Select an action:');
  console.log('1) Add a new task');
  console.log('2) List all tasks');
  console.log('3) List completed tasks');
  console.log('4) Mark a task as done');
  console.log('5) Delete a task');
  console.log('6) Sort tasks by due date');
  console.log('7) Sort tasks by priority');
  console.log('8) Clear all tasks');
  console.log('***************************');

  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  readline.question('What\'s your choice? ', function (choice) {
    switch (choice) {
      case '1':
        readline.question('Enter task description: ', function (description) {
          readline.question('Enter task due date:(DD-MM-YYYY) ', function (dueDate) {
            readline.question('Enter task priority: ', function (priority) {
              todoList.addTask(description, dueDate, priority);
              readline.close();
              handleUserInput();
            });
          });
        });
        break;
      case '2':
        if (todoList.tasks.length!==0) {
             console.log('All tasks:');
        todoList.tasks.forEach(function (task, index) {
          console.log(`${index + 1}) ${task.description}`);
        });
       
        }else console.log('there is no available tasks');
         readline.close();
        handleUserInput(); 
      
        break;
      case '3':
        if (todoList.filterTasksByStatus(true)==null) {
            console.log('there is no completed tasks');
        }
         else{ 
        console.log('Completed tasks:');
        todoList.filterTasksByStatus(true);}
        readline.close();
        handleUserInput();
        break;
      case '4':
        readline.question('Enter task index to mark as completed: ', function (index) {
          todoList.markTaskAsCompleted(index - 1);
          readline.close();
          handleUserInput();
        });
        break;
      case '5':
        readline.question('Enter task index to delete: ', function (index) {
          todoList.deleteTask(index - 1);
          readline.close();
          handleUserInput();
        });
        break;
      case '6':
        todoList.sortTasksByDueDate();
        readline.close();
        handleUserInput();
        break;
      case '7':
        todoList.sortTasksByPriority();
        readline.close();
        handleUserInput();
        break;
      case '8':
        todoList.clearAllTasks();
        readline.close();
        handleUserInput();
        break;
      default:
        console.log('Invalid choice. Please select a valid action.');
        readline.close();
        handleUserInput();
        break;
    }
  });
}

// Start the application
handleUserInput();
