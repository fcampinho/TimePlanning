import { Task, Schedule, TimeTracker } from '../commons/types';

import { ScheduleModel } from './schedule-model';
import { TimeTrackerModel } from './timetracker-model';

export class TaskModel implements Task {
    constructor(public _id: string, public title: string, public detail: string, public schedules: Schedule[], public timeTrackers: TimeTracker[], public completed: boolean) {
        this.schedules = [];
        for (let i = 0; i < schedules.length; i++) {
            let schedule = new ScheduleModel(schedules[i]._id, schedules[i].start, schedules[i].end);
            this.schedules = [...this.schedules, schedule];
        }

        this.timeTrackers = [];
        for (let i = 0; i < timeTrackers.length; i++) {
            let timeTracker = new TimeTrackerModel(timeTrackers[i]._id, timeTrackers[i].start, timeTrackers[i].end, timeTrackers[i].detail);
            this.timeTrackers = [...this.timeTrackers, timeTracker];
        }
    }

    update(title: string, detail: string, completed: boolean) {
        this.title = title;
        this.detail = detail;
        this.completed = completed;
    }

    addSchedule(schedule: Schedule) {
        this.schedules = [...this.schedules, schedule];
    }
    removeSchedule(schedule: Schedule) {
        let index = this.schedules.indexOf(schedule);
        if (index > -1) {
            this.schedules = [...this.schedules.slice(0, index),
            ...this.schedules.slice(index + 1, this.schedules.length)];
        }
    }

    addTimeTracker(timetracker: TimeTracker) {
        this.timeTrackers = [...this.timeTrackers, timetracker];
    }
    removeTimeTracker(timetracker: TimeTracker) {
        let index = this.timeTrackers.indexOf(timetracker);
        if (index > -1) {
            this.timeTrackers = [...this.timeTrackers.splice(0, index),
            ...this.timeTrackers.splice(index + 1, this.timeTrackers.length)];
        }
    }
}