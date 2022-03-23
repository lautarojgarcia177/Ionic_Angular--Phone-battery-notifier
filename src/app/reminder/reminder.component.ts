import {Component, OnInit} from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss'],
})
export class ReminderComponent implements OnInit {

  value = 100;

  options: Options = {
    floor: 0,
    ceil: 200
  };

  constructor() {
  }

  ngOnInit() {
  }

}
