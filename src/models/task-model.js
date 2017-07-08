import { ScheduleModel } from './schedule-model';
import { TimeTrackerModel } from './timetracker-model';
var TaskModel = (function () {
    function TaskModel(_id, title, detail, schedules, timeTrackers, completed) {
        this._id = _id;
        this.title = title;
        this.detail = detail;
        this.schedules = schedules;
        this.timeTrackers = timeTrackers;
        this.completed = completed;
        this.schedules = [];
        for (var i = 0; i < schedules.length; i++) {
            var schedule = new ScheduleModel(schedules[i]._id, schedules[i].start, schedules[i].end);
            this.schedules = this.schedules.concat([schedule]);
        }
        this.timeTrackers = [];
        for (var i = 0; i < timeTrackers.length; i++) {
            var timeTracker = new TimeTrackerModel(timeTrackers[i]._id, timeTrackers[i].start, timeTrackers[i].end, timeTrackers[i].detail);
            this.timeTrackers = this.timeTrackers.concat([timeTracker]);
        }
    }
    TaskModel.prototype.update = function (title, detail, completed) {
        this.title = title;
        this.detail = detail;
        this.completed = completed;
    };
    TaskModel.prototype.addSchedule = function (schedule) {
        this.schedules = this.schedules.concat([schedule]);
    };
    TaskModel.prototype.removeSchedule = function (schedule) {
        var index = this.schedules.indexOf(schedule);
        if (index > -1) {
            this.schedules = this.schedules.slice(0, index).concat(this.schedules.slice(index + 1, this.schedules.length));
        }
    };
    TaskModel.prototype.addTimeTracker = function (timetracker) {
        this.timeTrackers = this.timeTrackers.concat([timetracker]);
    };
    TaskModel.prototype.removeTimeTracker = function (timetracker) {
        var index = this.timeTrackers.indexOf(timetracker);
        if (index > -1) {
            this.timeTrackers = this.timeTrackers.splice(0, index).concat(this.timeTrackers.splice(index + 1, this.timeTrackers.length));
        }
    };
    return TaskModel;
}());
export { TaskModel };
//# sourceMappingURL=task-model.js.map