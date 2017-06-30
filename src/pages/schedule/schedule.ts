import { Component } from '@angular/core';

import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import { UUID } from 'angular2-uuid';
import * as moment from 'moment';

import { Task, Schedule } from '../../commons/types';
import { ScheduleModel } from '../../models/schedule-model';

@IonicPage()
@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
})
export class SchedulePage {
  startDate: string;
  startTime: string;
  end: string;

  task: Task;
  schedule: Schedule;

  min: string;
  max: string;

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
    this.task = this.navParams.get('task');
    this.schedule = this.navParams.get('schedule');

    if (this.schedule) {
      this.startDate = moment(this.schedule.start).format();
      this.startTime = moment(this.schedule.start).format();
      this.end = moment(this.schedule.end).format();
    } else {
      this.startDate = moment().format();
      this.startTime = moment().format();
      this.end = moment().add(1, 'h').format();
    }

    this.min = moment().add(-2, 'y').format('Y');
    this.max = moment().add(2, 'y').format('Y');
  }

  saveForm() {
    let start = moment(this.startDate);
    let startTime = moment(this.startTime);
    let end = moment(this.end);

    start.hour(startTime.hour()).minute(startTime.minute());
    end = start.clone().hour(end.hour()).minute(end.minute());

    if (this.schedule) {
      this.schedule.updatePeriod(start.toDate(), end.toDate());
    }
    else {
      let schedule = new ScheduleModel(UUID.UUID(), start.toDate(), end.toDate());
      this.task.addSchedule(schedule);
    }
    this.viewCtrl.dismiss();
  }

  close() {
    this.viewCtrl.dismiss();
  }
}