import { Component } from '@angular/core';
import { IonicPage, Platform, NavController, NavParams, AlertController, ActionSheetController, ModalController } from 'ionic-angular';

import { Task, Schedule } from '../../commons/types';

@IonicPage()
@Component({
  selector: 'page-schedule-list',
  templateUrl: 'schedule-list.html',
})
export class ScheduleListPage {
  task: Task;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public platform: Platform, public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController, public modalCtrl: ModalController) {

    this.task = this.navParams.get('task');
  }

  addItem(): void {
    this.presentModal(null);
  }

  removeSchedule(schedule: Schedule): void {
    let prompt = this.alertCtrl.create({
      title: 'Remove Schedule!',
      message: `Do you want to remove the schedule from ${schedule.start} to ${schedule.end} ?`,
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Remove',
          handler: data => {
            this.task.removeSchedule(schedule);
          }
        }
      ]
    });

    prompt.present();
  }

  presentActionSheet(schedule) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Modify task',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            this.removeSchedule(schedule);
          }
        }, {
          text: 'Update',
          icon: !this.platform.is('ios') ? 'clipboard' : null,
          handler: () => {
            this.presentModal(schedule);
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => { }
        }
      ]
    });

    actionSheet.present();
  }

  presentModal(schedule: Schedule) {
    let modal = this.modalCtrl.create('SchedulePage', { task: this.task, schedule });
    modal.present();
  }
}
