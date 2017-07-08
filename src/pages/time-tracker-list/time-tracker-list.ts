import { Component } from '@angular/core';
import { IonicPage, Platform, NavController, NavParams, AlertController, ActionSheetController, ModalController } from 'ionic-angular';

import { WorkItem, Task, TimeTracker } from '../../commons/types';

import { Store } from '@ngrx/store';
import { AppState } from '../../commons/types';
import { WorkItemActions } from '../../actions/workitem.actions';

@IonicPage()
@Component({
  selector: 'page-time-tracker-list',
  templateUrl: 'time-tracker-list.html',
})
export class TimeTrackerListPage {
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

  removeTimeTracker(timeTracker: TimeTracker): void {
    let prompt = this.alertCtrl.create({
      title: 'Remove Time Tracker!',
      message: `Do you want to remove the time tracker from ${timeTracker.start} to ${timeTracker.end} ?`,
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Remove',
          handler: data => {
            this.task.removeTimeTracker(timeTracker);
            this.store.dispatch(this.workItemActions.updateWorkItem(this.workItem));
          }
        }
      ]
    });

    prompt.present();
  }

  presentActionSheet(timeTracker) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Modify task',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            this.removeTimeTracker(timeTracker);
          }
        }, {
          text: 'Update',
          icon: !this.platform.is('ios') ? 'clipboard' : null,
          handler: () => {
            this.presentModal(timeTracker);
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

  presentModal(timeTracker: TimeTracker) {
    let modal = this.modalCtrl.create('TimeTrackerPage', { task: this.task, timeTracker });
    modal.present();
    modal.onDidDismiss(update => {
      if (update) this.store.dispatch(this.workItemActions.updateWorkItem(this.workItem));
    });
  }

}
