import { Component } from '@angular/core';
import { IonicPage, Platform, NavController, NavParams, AlertController, ActionSheetController, ModalController } from 'ionic-angular';

import { WorkItem, Task } from '../../commons/types';

import { Store } from '@ngrx/store';
import { AppState } from '../../commons/types';
import { WorkItemActions } from '../../actions/workitem.actions';

@IonicPage()
@Component({
  selector: 'page-task-list',
  templateUrl: 'task-list.html',
})
export class TaskListPage {
  workItem: WorkItem;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public platform: Platform, public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController, public modalCtrl: ModalController,
    private store: Store<AppState>, private workItemActions: WorkItemActions) {

    this.workItem = this.navParams.get('workItem');
    console.log(this.workItem);
  }

  addItem(): void {
    this.presentModal(null);
  }

  removeTask(task: Task): void {
    let prompt = this.alertCtrl.create({
      title: 'Remove Task!',
      message: `Do you want to remove the Task (${task.title})?`,
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Remove',
          handler: data => {
            this.workItem.removeTask(task);
            this.store.dispatch(this.workItemActions.updateWorkItem(this.workItem));
          }
        }
      ]
    });

    prompt.present();
  }

  presentActionSheet(task) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Modify task',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            this.removeTask(task);
          }
        }, {
          text: 'Update',
          icon: !this.platform.is('ios') ? 'clipboard' : null,
          handler: () => {
            this.presentModal(task);
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
  
  presentModal(task: Task) {
    let modal = this.modalCtrl.create('TaskPage', { workitem: this.workItem, task });
    modal.present();
    modal.onDidDismiss(update => {
      if (update) this.store.dispatch(this.workItemActions.updateWorkItem(this.workItem));
    });
  }

  viewSchedules(e, task: Task): void {
    e.preventDefault();
    e.stopPropagation(); //stops Actionsheet propagation
    this.navCtrl.push('ScheduleListPage', { workItem: this.workItem, task });
  }

  viewTimeTrackers(e, task: Task): void {
    e.preventDefault();
    e.stopPropagation(); //stops Actionsheet propagation
    this.navCtrl.push('TimeTrackerListPage', { workItem: this.workItem, task });
  }
}