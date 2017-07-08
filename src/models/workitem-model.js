import { TaskModel } from './task-model';
var WorkItemModel = (function () {
    function WorkItemModel(_id, _rev, title, tasks) {
        this._id = _id;
        this._rev = _rev;
        this.title = title;
        this.tasks = [];
        for (var i = 0; i < tasks.length; i++) {
            var task = new TaskModel(tasks[i]._id, tasks[i].title, tasks[i].detail, tasks[i].schedules, tasks[i].timeTrackers, tasks[i].completed);
            this.tasks = this.tasks.concat([task]);
        }
    }
    WorkItemModel.prototype.update = function (title) {
        this.title = title;
    };
    WorkItemModel.prototype.addTask = function (task) {
        this.tasks = this.tasks.concat([task]);
    };
    WorkItemModel.prototype.removeTask = function (task) {
        var index = this.tasks.indexOf(task);
        if (index > -1) {
            var tasks = this.tasks;
            this.tasks = tasks.slice(0, index).concat(tasks.slice(index + 1, tasks.length));
        }
    };
    return WorkItemModel;
}());
export { WorkItemModel };
//# sourceMappingURL=workitem-model.js.map