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
import { ScheduleModel } from '../../models/schedule-model';
var SchedulePage = (function () {
    function SchedulePage(viewCtrl, navParams) {
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.task = this.navParams.get('task');
        this.schedule = this.navParams.get('schedule');
        if (this.schedule) {
            this.startDate = moment(this.schedule.start).format();
            this.startTime = moment(this.schedule.start).format();
            this.end = moment(this.schedule.end).format();
        }
        else {
            this.startDate = moment().format();
            this.startTime = moment().format();
            this.end = moment().add(1, 'h').format();
        }
        this.min = moment().add(-2, 'y').toISOString();
        this.max = moment().add(2, 'y').toISOString();
    }
    SchedulePage.prototype.saveForm = function () {
        var start = moment(this.startDate);
        var startTime = moment(this.startTime);
        var end = moment(this.end);
        start.hour(startTime.hour()).minute(startTime.minute());
        end = start.clone().hour(end.hour()).minute(end.minute());
        if (this.schedule) {
            this.schedule.updatePeriod(start.toDate(), end.toDate());
        }
        else {
            var schedule = new ScheduleModel(UUID.UUID(), start.toDate(), end.toDate());
            this.task.addSchedule(schedule);
        }
        this.viewCtrl.dismiss();
    };
    SchedulePage.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    return SchedulePage;
}());
SchedulePage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-schedule',
        templateUrl: 'schedule.html',
    }),
    __metadata("design:paramtypes", [ViewController, NavParams])
], SchedulePage);
export { SchedulePage };
//# sourceMappingURL=schedule.js.map