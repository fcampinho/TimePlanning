import { Task, Schedule, TimeTracker } from '../commons/types';

export class TaskModel implements Task {
    constructor(public id: string, public title: string, public detail: string, public schedules: Schedule[], public timeTrackers: TimeTracker[], public completed: boolean) {  }

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

    done(completed: boolean) {
        this.completed = completed;
    }
}