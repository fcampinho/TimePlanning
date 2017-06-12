import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, Platform, Keyboard } from 'ionic-angular';

import { WorkItem } from '../../commons/types';
import { WorkItemModel } from '../../models/workitem-model';
import { UUID } from 'angular2-uuid';

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    public workitems: WorkItem[] = [];

    constructor(public navCtrl: NavController, 
        public alertCtrl: AlertController, public platform: Platform, private keyboard: Keyboard) { }

    addWorkItem(): void {
        let prompt = this.alertCtrl.create({
            title: 'Add Work Item!',
            message: 'Type Work Item name!',
            inputs: [
                {
                    name: 'name'
                }
            ],
            buttons: [
                {
                    text: 'Cancel'
                },
                {
                    text: 'Save',
                    handler: data => {
                        let workitem = new WorkItemModel(UUID.UUID(), data.name, []);
                        this.workitems.push(workitem);
                    }
                }
            ]
        });

        prompt.present();
    }

    updateWorkItem(slidingItem: any, workitem: WorkItem): void {
        let prompt = this.alertCtrl.create({
            title: 'Update Work Item!',
            message: 'Type Work Item name!',
            inputs: [{
                name: 'name',
                value: workitem.title
            }],
            buttons: [
                {
                    text: 'Cancel',
                    handler: () => slidingItem.close()
                },
                {
                    text: 'Save',
                    handler: data => {
                        let index = this.workitems.indexOf(workitem);
                        if (index > -1) {
                            this.workitems[index].update(data.name);
                        }

                        slidingItem.close();
                    }
                }
            ]
        });

        prompt.present();
    }

    removeWorkItem(slidingItem: any, workitem: WorkItem): void {
        let prompt = this.alertCtrl.create({
            title: 'Remove Work Item!',
            message: 'Do you want to remove this Work Item?',
            buttons: [
                {
                    text: 'Cancel',
                    handler: () => slidingItem.close()
                },
                {
                    text: 'Remove',
                    handler: data => {
                        let index = this.workitems.indexOf(workitem);
                        if (index > -1) {
                            let newWorkItems = this.workitems;
                            this.workitems = [...newWorkItems.slice(0, index), ...newWorkItems.slice(index + 1, newWorkItems.length)];
                        }
                    }
                }
            ]
        });

        prompt.present();
    }

    viewWorkItem(workitem: WorkItem): void {
        this.navCtrl.push('TaskListPage', { workitem: workitem });
    }
}
