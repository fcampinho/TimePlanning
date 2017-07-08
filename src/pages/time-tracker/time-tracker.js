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
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import { UUID } from 'angular2-uuid';
import * as moment from 'moment';
import { TimeTrackerModel } from '../../models/timetracker-model';
var TimeTrackerPage = (function () {
    function TimeTrackerPage(viewCtrl, navParams) {
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.task = this.navParams.get('task');
        this.timeTracker = this.navParams.get('timeTracker');
        if (this.timeTracker) {
            this.startDate = moment(this.timeTracker.start).format();
            this.startTime = moment(this.timeTracker.start).format();
            this.end = moment(this.timeTracker.end).format();
            this.detail = this.timeTracker.detail;
        }
        else {
            this.startDate = moment().format();
            this.startTime = moment().format();
            this.end = moment().add(1, 'h').format();
            this.detail = '';
        }
        this.min = moment().add(-2, 'y').format('Y');
        this.max = moment().add(2, 'y').format('Y');
    }
    TimeTrackerPage.prototype.saveForm = function () {
        var start = moment(this.startDate);
        var startTime = moment(this.startTime);
        var end = moment(this.end);
        start.hour(startTime.hour()).minute(startTime.minute());
        end = start.clone().hour(end.hour()).minute(end.minute());
        if (this.timeTracker) {
            this.timeTracker.updatePeriod(start.toDate(), end.toDate());
            this.timeTracker.update(this.detail);
        }
        else {
            var timeTracker = new TimeTrackerModel(UUID.UUID(), start.toDate(), end.toDate(), this.detail);
            this.task.addTimeTracker(timeTracker);
        }
        this.viewCtrl.dismiss(true);
    };
    TimeTrackerPage.prototype.close = function () {
        this.viewCtrl.dismiss(false);
    };
    return TimeTrackerPage;
}());
TimeTrackerPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-time-tracker',
        templateUrl: 'time-tracker.html',
    }),
    __metadata("design:paramtypes", [ViewController, NavParams])
], TimeTrackerPage);
export { TimeTrackerPage };
//# sourceMappingURL=time-tracker.js.map