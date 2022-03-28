import {Storage} from '@ionic/storage-angular';
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RemindersService {

  public reminders$: BehaviorSubject<number[]> = new BehaviorSubject([]);
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
    const reminders = await this.getAllReminders();
    if (!reminders?.length) {
      // Initialize array
      this.set('reminders', []);
    }
    this.reminders$.next(reminders);
    // await this._storage.clear();
  }

  public getAllReminders(): Promise<number[]> {
    return this._storage?.get('reminders');
  }

  public addReminder(reminder: number): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const reminders = await this.getAllReminders();
      if (reminders?.includes(reminder)) {
        reject('Reminder aleady exists');
      } else {
        reminders.push(reminder);
        await this.set('reminders', reminders);
        this.reminders$.next(reminders);
        resolve();
      }
    });
  }

  public removeReminder(reminder: number): Promise<void> {
    return new Promise(async (resolve, reject) => {
      let reminders = await this.getAllReminders();
      if (reminders.includes(reminder)) {
        reminders = reminders.filter(r => r !== reminder);
        this._storage.set('reminders', reminders);
        this.reminders$.next(reminders);
        resolve();
      } else {
        reject('Reminder does not exist');
      }
    });
  }

  public editReminder(reminderToEdit: number, editedReminder: number): Promise<void> {
    return new Promise(async (resolve, reject) => {
      let reminders = await this.getAllReminders();
      reminders = reminders.map(r => Number(r));
      if (reminders.includes(reminderToEdit)) {
        // Edit the reminder
        reminders = reminders.map(r => {
          if (r === reminderToEdit) {
            return editedReminder;
          } else {
            return r;
          }
        });
        this._storage.set('reminders', reminders);
        this.reminders$.next(reminders);
        resolve();
      } else {
        reject('Reminder does not exist');
      }
    });
  }

  // Create and expose methods that users of this service can
  // call, for example:
  private set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  private get(key: string) {
    return this._storage?.get(key);
  }

  private async remove(key: string) {
    await this._storage?.remove(key);
  }
}
