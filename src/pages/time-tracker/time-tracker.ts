import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import { UUID } from 'angular2-uuid';
import * as moment from 'moment';

import { Task, TimeTracker } from '../../commons/types';
import { TimeTrackerModel } from '../../models/timetracker-model';

@IonicPage()
@Component({
  selector: 'page-time-tracker',
  templateUrl: 'time-tracker.html',
})
export class TimeTrackerPage {
  startDate: string;
  startTime;
  end;
  detail: string;

  task: Task;
  timeTracker: TimeTracker;

  min: string;
  max: string;
  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
    this.task = this.navParams.get('task');
    this.timeTracker = this.navParams.get('timeTracker');

    if (this.timeTracker) {
      this.startDate = moment(this.timeTracker.start).format();
      this.startTime = moment(this.timeTracker.start).format();
      this.end = moment(this.timeTracker.end).format();
      this.detail = this.timeTracker.detail;
    } else {
      this.startDate = moment().format();
      this.startTime = moment().format();
      this.end = moment().add(1, 'h').format();
      this.detail = '';
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

    if (this.timeTracker) {
      this.timeTracker.updatePeriod(start.toDate(), end.toDate());
      this.timeTracker.update(this.detail);
    }
    else {
      let timeTracker = new TimeTrackerModel(UUID.UUID(), start.toDate(), end.toDate(), this.detail);
      this.task.addTimeTracker(timeTracker);
    }
    this.viewCtrl.dismiss();
  }

  close() {
    this.viewCtrl.dismiss();
  }
}