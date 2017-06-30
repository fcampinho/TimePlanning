import { Component } from '@angular/core';
import { IonicPage, Platform, NavController, NavParams, AlertController, ActionSheetController, ModalController } from 'ionic-angular';

import { WorkItem, Task } from '../../commons/types';

@IonicPage()
@Component({
  selector: 'page-task-list',
  templateUrl: 'task-list.html',
})
export class TaskListPage {
  workitem: WorkItem;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public platform: Platform, public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController, public modalCtrl: ModalController) {

    this.workitem = this.navParams.get('workitem');
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
            this.workitem.removeTask(task);
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
    let modal = this.modalCtrl.create('TaskPage', { workitem: this.workitem, task });
    modal.present();
  }

  viewSchedules(e, task: Task): void {
    e.preventDefault();
    e.stopPropagation(); //stops Actionsheet propagation
    this.navCtrl.push('ScheduleListPage', { task });
  }

  viewTimeTrackers(e, task: Task): void {
    e.preventDefault();
    e.stopPropagation(); //stops Actionsheet propagation
    this.navCtrl.push('TimeTrackerListPage', { task });
  }
}