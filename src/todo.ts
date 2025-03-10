import fs from "fs";

// Define Task Interface
interface Task {
  id: number;
  title: string;
  completed: boolean;
}

// JSON File Path
const FILE_PATH = "./src/data.json";

// Function to Load Tasks from JSON
export const loadTasks = (): Task[] => {
  try {
    const data = fs.readFileSync(FILE_PATH, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Function to Save Tasks to JSON
const saveTasks = (tasks: Task[]): void => {
  fs.writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2));
};

// Function to Add a New Task
export const addTask = (title: string): void => {
  const tasks = loadTasks();
  const newTask: Task = {
    id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
    title,
    completed: false,
  };
  tasks.push(newTask);
  saveTasks(tasks);
  console.log(`✅ Task "${title}" added successfully!`);
};

// Function to List All Tasks
export const listTasks = (): void => {
  const tasks = loadTasks();
  if (tasks.length === 0) {
    console.log("📂 No tasks found!");
    return;
  }
  console.log("\n📌 To-Do List:");
  tasks.forEach((task) => {
    console.log(`${task.id}. ${task.completed ? "✔️" : "❌"} ${task.title}`);
  });
};

// Function to Mark a Task as Completed
export const completeTask = (id: number): void => {
  const tasks = loadTasks();
  const task = tasks.find((task) => task.id === id);
  if (!task) {
    console.log("⚠️ Task not found!");
    return;
  }
  task.completed = true;
  saveTasks(tasks);
  console.log(`✅ Task "${task.title}" marked as completed!`);
};

// Function to Delete a Task
export const deleteTask = (id: number): void => {
  let tasks = loadTasks();
  const updatedTasks = tasks.filter((task) => task.id !== id);
  if (tasks.length === updatedTasks.length) {
    console.log("⚠️ Task not found!");
    return;
  }
  saveTasks(updatedTasks);
  console.log(`🗑️ Task deleted successfully!`);
};
