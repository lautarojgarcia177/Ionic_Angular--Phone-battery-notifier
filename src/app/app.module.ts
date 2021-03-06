import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {AlertController, IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HomePage} from './home/home.page';
import {ScrollingModule} from '@angular/cdk/scrolling';

import {IonicStorageModule} from '@ionic/storage-angular';
import {ReminderComponent} from './reminder/reminder.component';

import { BatteryStatus} from "@awesome-cordova-plugins/battery-status/ngx";
import { GlobalErrorHandlerService } from './global-error-handler.service';


@NgModule({
  declarations: [AppComponent, HomePage, ReminderComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, CommonModule,
    FormsModule, IonicStorageModule.forRoot(), ScrollingModule,
  ],
  providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}, BatteryStatus, {provide: ErrorHandler, useClass: GlobalErrorHandlerService}],
  bootstrap: [AppComponent],
})
export class AppModule {
}
