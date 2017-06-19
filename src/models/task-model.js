var TaskModel = (function () {
    function TaskModel(id, title, detail, schedules, timeTrackers, completed) {
        this.id = id;
        this.title = title;
        this.detail = detail;
        this.schedules = schedules;
        this.timeTrackers = timeTrackers;
        this.completed = completed;
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
    TaskModel.prototype.done = function (completed) {
        this.completed = completed;
    };
    return TaskModel;
}());
export { TaskModel };
//# sourceMappingURL=task-model.js.map