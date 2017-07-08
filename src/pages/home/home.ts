import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, Platform, Keyboard } from 'ionic-angular';
//import { UUID } from 'angular2-uuid';

import { WorkItem } from '../../commons/types';
import { WorkItemModel } from '../../models/workitem-model';

import { DataProvider } from '../../providers/data/data';

import 'rxjs/add/operator/concat';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../../commons/types';
import { WorkItemActions } from '../../actions/workitem.actions';

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    public workitems: Observable<WorkItem[]>;

    constructor(public navCtrl: NavController,
        public alertCtrl: AlertController, public platform: Platform, private keyboard: Keyboard,
        public service: DataProvider, private store: Store<AppState>, private workItemActions: WorkItemActions) {


    }

    ionViewDidLoad() {
        this.platform.ready().then(() => {
            this.workitems = this.store.select(state => state.workItems);
        });
    }

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
                        let workitem = new WorkItemModel('', '', data.name, []);
                        this.store.dispatch(this.workItemActions.addWorkItem(workitem));
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
                        workitem.update(data.name);
                        this.store.dispatch(this.workItemActions.updateWorkItem(workitem));

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
                        this.store.dispatch(this.workItemActions.deleteWorkItem(workitem));
                    }
                }
            ]
        });

        prompt.present();
    }

    viewWorkItem(workItem: WorkItem): void {
        this.navCtrl.push('TaskListPage', { workItem });
    }
}
