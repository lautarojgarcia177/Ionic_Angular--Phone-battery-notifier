import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RemindersService {

  reminders = [40, 20];

  constructor() { }

  getReminders() {
    return this.reminders;
  }

  deleteReminder(reminderToDelete: number) {
    this.reminders = this.reminders.filter(reminder => reminder !== reminderToDelete);
  }
}
