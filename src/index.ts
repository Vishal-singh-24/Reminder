import { ReminderDatabase } from "./todo";
import inquirer from "inquirer";


const db = new ReminderDatabase();

async function mainMenu() {
  while (true) {
    const { action } = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "Choose an action:",
        choices: ["Create", "View All", "View One", "Update", "Delete", "Exit"],
      },
    ]);

    if (action === "Create") {
      const { id, title, description } = await inquirer.prompt([
        { type: "input", name: "id", message: "Enter reminder ID:" },
        { type: "input", name: "title", message: "Enter title:" },
        { type: "input", name: "description", message: "Enter description (optional):" },
      ]);
      db.createReminder(id, title, description);
    } else if (action === "View All") {
      console.log(db.getAllReminders());
    } else if (action === "View One") {
      const { id } = await inquirer.prompt([{ type: "input", name: "id", message: "Enter reminder ID:" }]);
      console.log(db.getReminder(id));
    } else if (action === "Update") {
      const { id, title, description } = await inquirer.prompt([
        { type: "input", name: "id", message: "Enter reminder ID:" },
        { type: "input", name: "title", message: "Enter new title (leave blank to keep the same):" },
        { type: "input", name: "description", message: "Enter new description (leave blank to keep the same):" },
      ]);
      db.updateReminder(id, title, description);
    } else if (action === "Delete") {
      const { id } = await inquirer.prompt([{ type: "input", name: "id", message: "Enter reminder ID:" }]);
      db.removeReminder(id);
    } else if (action === "Exit") {
      console.log("Goodbye!");
      process.exit();
    }
  }
}

mainMenu();
