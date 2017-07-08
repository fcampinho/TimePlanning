import { Component } from '@angular/core';
import { IonicPage, Platform, NavController, NavParams, AlertController, ActionSheetController, ModalController } from 'ionic-angular';

import { WorkItem, Task, Schedule } from '../../commons/types';

import { Store } from '@ngrx/store';
import { AppState } from '../../commons/types';
import { WorkItemActions } from '../../actions/workitem.actions';

@IonicPage()
@Component({
  selector: 'page-schedule-list',
  templateUrl: 'schedule-list.html',
})
export class ScheduleListPage {
  task: Task;
  workItem: WorkItem;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public platform: Platform, public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController, public modalCtrl: ModalController,
    private store: Store<AppState>, private workItemActions: WorkItemActions) {

    this.task = this.navParams.get('task');
    this.workItem = this.navParams.get('workItem');
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
            this.store.dispatch(this.workItemActions.updateWorkItem(this.workItem));
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
    modal.onDidDismiss(update => {
      if (update) this.store.dispatch(this.workItemActions.updateWorkItem(this.workItem));
    });
  }
}
