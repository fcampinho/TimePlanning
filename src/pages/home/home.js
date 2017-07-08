var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, Platform, Keyboard } from 'ionic-angular';
import { WorkItemModel } from '../../models/workitem-model';
import { DataProvider } from '../../providers/data/data';
import 'rxjs/add/operator/concat';
import { Store } from '@ngrx/store';
import { WorkItemActions } from '../../actions/workitem.actions';
var HomePage = (function () {
    function HomePage(navCtrl, alertCtrl, platform, keyboard, service, store, workItemActions) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.platform = platform;
        this.keyboard = keyboard;
        this.service = service;
        this.store = store;
        this.workItemActions = workItemActions;
    }
    HomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.workitems = _this.store.select(function (state) { return state.workItems; });
        });
    };
    HomePage.prototype.addWorkItem = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
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
                    handler: function (data) {
                        var workitem = new WorkItemModel('', '', data.name, []);
                        _this.store.dispatch(_this.workItemActions.addWorkItem(workitem));
                    }
                }
            ]
        });
        prompt.present();
    };
    HomePage.prototype.updateWorkItem = function (slidingItem, workitem) {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Update Work Item!',
            message: 'Type Work Item name!',
            inputs: [{
                    name: 'name',
                    value: workitem.title
                }],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function () { return slidingItem.close(); }
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        workitem.update(data.name);
                        _this.store.dispatch(_this.workItemActions.updateWorkItem(workitem));
                        slidingItem.close();
                    }
                }
            ]
        });
        prompt.present();
    };
    HomePage.prototype.removeWorkItem = function (slidingItem, workitem) {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Remove Work Item!',
            message: 'Do you want to remove this Work Item?',
            buttons: [
                {
                    text: 'Cancel',
                    handler: function () { return slidingItem.close(); }
                },
                {
                    text: 'Remove',
                    handler: function (data) {
                        _this.store.dispatch(_this.workItemActions.deleteWorkItem(workitem));
                    }
                }
            ]
        });
        prompt.present();
    };
    HomePage.prototype.viewWorkItem = function (workItem) {
        this.navCtrl.push('TaskListPage', { workItem: workItem });
    };
    return HomePage;
}());
HomePage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-home',
        templateUrl: 'home.html'
    }),
    __metadata("design:paramtypes", [NavController,
        AlertController, Platform, Keyboard,
        DataProvider, Store, WorkItemActions])
], HomePage);
export { HomePage };
//# sourceMappingURL=home.js.map