import { Component, OnInit } from '@angular/core';
import { RemindersService } from '../reminders.service';
import { map } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  reminders$ = this.remindersService.reminders$.pipe(
    map((reminders) => reminders.sort((a, b) => a - b))
  );

  constructor(
    private remindersService: RemindersService,
    public alertController: AlertController
  ) {}

  editReminder(reminder: number) {
    console.log('edit reminder');
    // this.remindersService.
  }

  async deleteReminder(reminder: number, slidingItem: any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Are you sure?',
      message: 'You are about to delete this reminder',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          id: 'cancel-button',
          handler: async (blah) => {
            await slidingItem.close();
          },
        },
        {
          text: 'Yes',
          id: 'confirm-button',
          handler: () => {
            this.remindersService
              .removeReminder(reminder)
              .then(() => {})
              .catch(() => {
                throw new Error('There was an error removing the reminder');
              });
          },
        },
      ],
    });

    await alert.present();
  }
}
