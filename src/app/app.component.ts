import { Component, OnDestroy, OnInit } from '@angular/core';
import { RemindersService } from './reminders.service';
import {
  LocalNotifications,
  LocalNotificationSchema,
} from '@capacitor/local-notifications';
import { BatteryStatus } from '@awesome-cordova-plugins/battery-status/ngx';
import { Subscription } from 'rxjs';
import {filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private reminders: Array<number>;
  private batteryLevelSubscription: Subscription;
  private currentNotificationId = 0;

  constructor(
    private remindersService: RemindersService,
    private batteryStatus: BatteryStatus
  ) {}

  ngOnInit() {
    this.remindersService.reminders$.subscribe((reminders) => {
      this.reminders = reminders;
      this.batteryLevelSubscription = this.batteryStatus
        .onChange()
        .pipe(
          filter((status) => this.reminders.includes(status.level)),
          tap(status => console.log('battery status', status)),
          )
        .subscribe((status) => {
          this.currentNotificationId++;
          this.sendNotification({
            id: this.currentNotificationId,
            title: 'Remember to charge your phone battery',
            body: 'Your phone has ' + status.level + ' battery left',
          });
        });
    });
  }

  ngOnDestroy() {
    this.batteryLevelSubscription.unsubscribe();
  }

  async sendNotification(notification: LocalNotificationSchema) {
    await LocalNotifications.schedule({
      notifications: [notification],
    });
  }
}
