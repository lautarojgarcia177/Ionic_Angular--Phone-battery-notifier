import {Component, OnInit} from '@angular/core';
import {RemindersService} from '../reminders.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  reminders$ = this.remindersService.reminders$;

  constructor(private remindersService: RemindersService) {
  }

  editReminder(reminder: number) {
    console.log('edit reminder');
    // this.remindersService.
  }

  deleteReminder(reminder: number) {
    this.remindersService.removeReminder(reminder).then(() => {
    }).catch(() => {
      alert('There was an error');
    });
  };
}
