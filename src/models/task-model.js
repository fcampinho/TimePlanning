import { Observable } from 'rxjs/Observable';
var TaskModel = (function () {
    function TaskModel(id, title, detail, schedules, timeTrackers, completed) {
        if (completed === void 0) { completed = false; }
        var _this = this;
        this.id = id;
        this.title = title;
        this.detail = detail;
        this.schedules = schedules;
        this.timeTrackers = timeTrackers;
        this.completed = completed;
        this.taskItem = Observable.create(function (observer) {
            _this.taskItemObserver = observer;
        });
    }
    TaskModel.prototype.update = function (title, detail) {
        this.title = title;
        this.detail = detail;
        this.taskItemObserver.next(true);
    };
    TaskModel.prototype.addSchedule = function (schedule) {
        this.schedules = this.schedules.concat([schedule]);
        this.taskItemObserver.next(true);
    };
    TaskModel.prototype.removeSchedule = function (schedule) {
        var index = this.schedules.indexOf(schedule);
        if (index > -1) {
            this.schedules = this.schedules.slice(0, index - 1).concat(this.schedules.slice(index + 1, this.schedules.length));
        }
        this.taskItemObserver.next(true);
    };
    TaskModel.prototype.addTimeTracker = function (timetracker) {
        this.timeTrackers = this.timeTrackers.concat([timetracker]);
        this.taskItemObserver.next(true);
    };
    TaskModel.prototype.removeTimeTracker = function (timetracker) {
        var index = this.timeTrackers.indexOf(timetracker);
        if (index > -1) {
            this.timeTrackers = this.timeTrackers.splice(0, index - 1).concat(this.timeTrackers.splice(index + 1, this.timeTrackers.length));
        }
        this.taskItemObserver.next(true);
    };
    TaskModel.prototype.done = function (completed) {
        this.completed = completed;
        this.taskItemObserver.next(true);
    };
    TaskModel.prototype.updates = function () {
        return this.taskItem;
    };
    return TaskModel;
}());
export { TaskModel };
//# sourceMappingURL=task-model.js.map