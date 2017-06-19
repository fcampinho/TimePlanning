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
var TimeTrackerListPage = (function () {
    function TimeTrackerListPage(navCtrl, navParams, platform, alertCtrl, actionSheetCtrl, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.modalCtrl = modalCtrl;
        this.task = this.navParams.get('task');
    }
    TimeTrackerListPage.prototype.addItem = function () {
        this.presentModal(null);
    };
    TimeTrackerListPage.prototype.removeTimeTracker = function (timeTracker) {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Remove Time Tracker!',
            message: "Do you want to remove the time tracker from " + timeTracker.start + " to " + timeTracker.end + " ?",
            buttons: [
                {
                    text: 'Cancel'
                },
                {
                    text: 'Remove',
                    handler: function (data) {
                        _this.task.removeTimeTracker(timeTracker);
                    }
                }
            ]
        });
        prompt.present();
    };
    TimeTrackerListPage.prototype.presentActionSheet = function (timeTracker) {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Modify task',
            buttons: [
                {
                    text: 'Delete',
                    role: 'destructive',
                    icon: !this.platform.is('ios') ? 'trash' : null,
                    handler: function () {
                        _this.removeTimeTracker(timeTracker);
                    }
                }, {
                    text: 'Update',
                    icon: !this.platform.is('ios') ? 'clipboard' : null,
                    handler: function () {
                        _this.presentModal(timeTracker);
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
    TimeTrackerListPage.prototype.presentModal = function (timeTracker) {
        var modal = this.modalCtrl.create('TimeTrackerPage', { task: this.task, timeTracker: timeTracker });
        modal.present();
    };
    return TimeTrackerListPage;
}());
TimeTrackerListPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-time-tracker-list',
        templateUrl: 'time-tracker-list.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams,
        Platform, AlertController,
        ActionSheetController, ModalController])
], TimeTrackerListPage);
export { TimeTrackerListPage };
//# sourceMappingURL=time-tracker-list.js.map