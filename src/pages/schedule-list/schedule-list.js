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
var ScheduleListPage = (function () {
    function ScheduleListPage(navCtrl, navParams, platform, alertCtrl, actionSheetCtrl, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.modalCtrl = modalCtrl;
        this.task = this.navParams.get('task');
    }
    ScheduleListPage.prototype.addItem = function () {
        this.presentModal(null);
    };
    ScheduleListPage.prototype.removeSchedule = function (schedule) {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Remove Schedule!',
            message: "Do you want to remove the schedule from " + schedule.start + " to " + schedule.end + " ?",
            buttons: [
                {
                    text: 'Cancel'
                },
                {
                    text: 'Remove',
                    handler: function (data) {
                        _this.task.removeSchedule(schedule);
                    }
                }
            ]
        });
        prompt.present();
    };
    ScheduleListPage.prototype.presentActionSheet = function (schedule) {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Modify task',
            buttons: [
                {
                    text: 'Delete',
                    role: 'destructive',
                    icon: !this.platform.is('ios') ? 'trash' : null,
                    handler: function () {
                        _this.removeSchedule(schedule);
                    }
                }, {
                    text: 'Update',
                    icon: !this.platform.is('ios') ? 'clipboard' : null,
                    handler: function () {
                        _this.presentModal(schedule);
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
    ScheduleListPage.prototype.presentModal = function (schedule) {
        var modal = this.modalCtrl.create('SchedulePage', { task: this.task, schedule: schedule });
        modal.present();
    };
    return ScheduleListPage;
}());
ScheduleListPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-schedule-list',
        templateUrl: 'schedule-list.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams,
        Platform, AlertController,
        ActionSheetController, ModalController])
], ScheduleListPage);
export { ScheduleListPage };
//# sourceMappingURL=schedule-list.js.map