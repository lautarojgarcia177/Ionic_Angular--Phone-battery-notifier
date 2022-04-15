import {Component, OnInit} from '@angular/core';
import {map, tap} from 'rxjs/operators';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {RemindersService} from '../reminders.service';
import {Platform} from "@ionic/angular";

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss'],
})
export class ReminderComponent implements OnInit {

  value = 0;
  isValid = true;
  isCreating = false;

  constructor(
    private route: ActivatedRoute,
    private remindersService: RemindersService,
    private router: Router,
    private platform: Platform
  ) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.router.navigate(['']);
    });
  }

  ngOnInit() {
    const range = this.route.snapshot.params['range'];
    if (range && range !== 'create') {
      this.value = parseInt(range);
      this.isCreating = false;
    } else {
      this.isCreating = true;
    }
  }

  onIonChange(event) {
    const newValue = event.detail.value;
    this.value = newValue;
    // if (!this.remindersService.getReminders().find(reminder => reminder === newValue)) {
    //   console.info('Value is available');
    // } else {
    //   console.warn('Value already exists!!');
    // }
  }

  public customFormatter(value: number) {
    return `${value}%`;
  }

  saveReminder() {
    if (!this.isCreating) {
      this.remindersService.editReminder(Number(this.route.snapshot.params['range']), Number(this.value)).then(() => {
        this.router.navigate(['']);
      }).catch(() => {
        throw new Error('Failed to edit the reminder');
      });
    } else {
      this.remindersService.addReminder(Number(this.value)).then(() => {
        this.router.navigate(['']);
      }).catch(() => {
        throw new Error('Failed to add the reminder');
      });
    }
  }
}
