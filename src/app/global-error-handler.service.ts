import { ErrorHandler, Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {

  constructor(private alertController: AlertController) { }

  async handleError(error) {
    const alert = await this.alertController.create({
      header: 'There was an error',
      message: error,
    });

    await alert.present();
  }

}
