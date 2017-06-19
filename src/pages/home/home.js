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
import { UUID } from 'angular2-uuid';
var HomePage = (function () {
    function HomePage(navCtrl, alertCtrl, platform, keyboard) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.platform = platform;
        this.keyboard = keyboard;
        this.workitems = [];
    }
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
                        var workitem = new WorkItemModel(UUID.UUID(), data.name, []);
                        _this.workitems.push(workitem);
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
                        var index = _this.workitems.indexOf(workitem);
                        if (index > -1) {
                            _this.workitems[index].update(data.name);
                        }
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
                        var index = _this.workitems.indexOf(workitem);
                        if (index > -1) {
                            var newWorkItems = _this.workitems;
                            _this.workitems = newWorkItems.slice(0, index).concat(newWorkItems.slice(index + 1, newWorkItems.length));
                        }
                    }
                }
            ]
        });
        prompt.present();
    };
    HomePage.prototype.viewWorkItem = function (workitem) {
        this.navCtrl.push('TaskListPage', { workitem: workitem });
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
        AlertController, Platform, Keyboard])
], HomePage);
export { HomePage };
//# sourceMappingURL=home.js.map