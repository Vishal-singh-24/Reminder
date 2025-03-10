import inquirer from "inquirer";
import { addTask, listTasks, completeTask, deleteTask } from "./todo";

// Function to Show the Main Menu
const mainMenu = async () => {
  while (true) {
    const { action } = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "📌 What do you want to do?",
        choices: ["➕ Add Task", "📋 View Tasks", "✔️ Complete Task", "🗑️ Delete Task", "❌ Exit"],
      },
    ]);

    if (action === "➕ Add Task") {
      const { title } = await inquirer.prompt([
        {
          type: "input",
          name: "title",
          message: "Enter task title:",
        },
      ]);
      addTask(title);
    } else if (action === "📋 View Tasks") {
      listTasks();
    } else if (action === "✔️ Complete Task") {
      const { id } = await inquirer.prompt([
        {
          type: "number",
          name: "id",
          message: "Enter task ID to mark as completed:",
        },
      ]);
      completeTask(id);
    } else if (action === "🗑️ Delete Task") {
      const { id } = await inquirer.prompt([
        {
          type: "number",
          name: "id",
          message: "Enter task ID to delete:",
        },
      ]);
      deleteTask(id);
    } else {
      console.log("👋 Exiting...");
      break;
    }
  }
};

// Start the Application
mainMenu();
