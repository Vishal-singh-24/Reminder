import * as fs from "fs";

interface Reminder {
  id: string;
  title: string;
  description?: string;
  date: string;
}

class ReminderDatabase {
  private reminders: Reminder[] = [];
  private filePath = "reminders.json";

  constructor() {
    this.loadReminders();
  }

  private loadReminders(): void {
    if (fs.existsSync(this.filePath)) {
      const data = fs.readFileSync(this.filePath, "utf-8");
      this.reminders = JSON.parse(data);
    }
  }

  private saveReminders(): void {
    fs.writeFileSync(this.filePath, JSON.stringify(this.reminders, null, 2));
  }

  createReminder(id: string, title: string, description?: string, date?: string): void {
    const newReminder: Reminder = {
      id,
      title,
      description,
      date: date || new Date().toISOString(),
    };
    this.reminders.push(newReminder);
    this.saveReminders();
    console.log("Reminder added successfully.");
  }

  exists(id: string): boolean {
    return this.reminders.some((reminder) => reminder.id === id);
  }

  getAllReminders(): Reminder[] {
    return this.reminders;
  }

  getReminder(id: string): Reminder | null {
    return this.reminders.find((reminder) => reminder.id === id) || null;
  }

  removeReminder(id: string): void {
    this.reminders = this.reminders.filter((reminder) => reminder.id !== id);
    this.saveReminders();
    console.log("Reminder deleted successfully.");
  }

  updateReminder(id: string, title?: string, description?: string, date?: string): void {
    const reminder = this.getReminder(id);
    if (reminder) {
      if (title) reminder.title = title;
      if (description) reminder.description = description;
      if (date) reminder.date = date;
      this.saveReminders();
      console.log("Reminder updated successfully.");
    } else {
      console.log("Reminder not found.");
    }
  }
}

export { ReminderDatabase, Reminder };
