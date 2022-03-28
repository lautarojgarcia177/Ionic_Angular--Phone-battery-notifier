import {Component, OnInit} from '@angular/core';
import {BatteryStatus} from '@awesome-cordova-plugins/battery-status/ngx';
import {RemindersService} from "./reminders.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  private reminders: Array<number>;

  constructor(private batteryStatus: BatteryStatus, private remindersService: RemindersService) {
  }

  ngOnInit() {
    this.remindersService.reminders$.subscribe(reminders => {
      console.log(reminders);
    });
    // watch change in battery status
    const subscription = this.batteryStatus.onChange().subscribe(status => {
      console.log(status.level, status.isPlugged);
    });

    // stop watch
    subscription.unsubscribe();
  }
}
