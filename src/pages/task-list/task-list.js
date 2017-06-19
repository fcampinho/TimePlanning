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
import { IonicPage, Platform, NavController, NavParams, AlertController, ActionSheetController, ModalController } from 'ionic-angular';
//import { TaskModel } from '../../models/task-model';
var TaskListPage = (function () {
    function TaskListPage(navCtrl, navParams, platform, alertCtrl, actionSheetCtrl, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.modalCtrl = modalCtrl;
        this.workitem = this.navParams.get('workitem');
    }
    TaskListPage.prototype.addItem = function () {
        this.presentModal(null);
    };
    TaskListPage.prototype.removeTask = function (task) {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Remove Task!',
            message: "Do you want to remove the Task (" + task.title + ")?",
            buttons: [
                {
                    text: 'Cancel'
                },
                {
                    text: 'Remove',
                    handler: function (data) {
                        _this.workitem.removeTask(task);
                    }
                }
            ]
        });
        prompt.present();
    };
    TaskListPage.prototype.presentActionSheet = function (task) {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Modify task',
            buttons: [
                {
                    text: 'Delete',
                    role: 'destructive',
                    icon: !this.platform.is('ios') ? 'trash' : null,
                    handler: function () {
                        _this.removeTask(task);
                    }
                }, {
                    text: 'Update',
                    icon: !this.platform.is('ios') ? 'clipboard' : null,
                    handler: function () {
                        _this.presentModal(task);
                    }
                }, {
                    text: 'Cancel',
                    role: 'cancel',
                    icon: !this.platform.is('ios') ? 'close' : null,
                    handler: function () { }
                }
            ]
        });
        actionSheet.present();
    };
    TaskListPage.prototype.presentModal = function (task) {
        var modal = this.modalCtrl.create('TaskPage', { workitem: this.workitem, task: task });
        modal.present();
    };
    TaskListPage.prototype.viewSchedules = function (e, task) {
        e.preventDefault();
        e.stopPropagation(); //stops Actionsheet propagation
        this.navCtrl.push('ScheduleListPage', { task: task });
    };
    TaskListPage.prototype.viewTimeTrackers = function (e, task) {
        e.preventDefault();
        e.stopPropagation(); //stops Actionsheet propagation
        this.navCtrl.push('TimeTrackerListPage', { task: task });
    };
    return TaskListPage;
}());
TaskListPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-task-list',
        templateUrl: 'task-list.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams,
        Platform, AlertController,
        ActionSheetController, ModalController])
], TaskListPage);
export { TaskListPage };
//# sourceMappingURL=task-list.js.map