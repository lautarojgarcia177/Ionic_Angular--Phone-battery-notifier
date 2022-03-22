import {Component, OnInit} from '@angular/core';
import {RemindersService} from '../reminders.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  reminders: number[];

  constructor(private remindersService: RemindersService) {}

  ngOnInit() {
    this.reminders = this.remindersService.reminders;
  }

  editReminder(reminder: number) {
    console.log('edit reminder');
  }

  deleteReminder(reminder: number) {
    console.log('delete reminder');
    this.remindersService.deleteReminder(reminder);
  };
}
