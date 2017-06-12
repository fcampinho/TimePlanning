import { Observable } from 'rxjs/Observable';
import { TaskModel } from './task-model';
var WorkItemModel = (function () {
    function WorkItemModel(id, title, tasks) {
        var _this = this;
        this.id = id;
        this.title = title;
        this.tasks = tasks;
        this.workItem = Observable.create(function (observer) {
            _this.workItemObserver = observer;
        });
        for (var i = 0; i < tasks.length; i++) {
            var task = new TaskModel(tasks[i].id, tasks[i].title, tasks[i].detail, tasks[i].schedules, tasks[i].timeTrackers, tasks[i].completed);
            this.tasks = this.tasks.concat([task]);
            //I'm not sure about good RxJS practices in this implementation, 
            //if some has a solution, I'm open to a sugestion.
            // task.updates().subscribe(update => {
            //     this.workItemObserver.next(true);
            // });
        }
    }
    WorkItemModel.prototype.update = function (title) {
        this.title = title;
        this.workItemObserver.next(true);
    };
    WorkItemModel.prototype.addTask = function (task) {
        this.tasks = this.tasks.concat([task]);
        // task.updates().subscribe(update => {
        //     this.workItemObserver.next(true);
        // });
        this.workItemObserver.next(true);
    };
    WorkItemModel.prototype.removeTask = function (task) {
        var index = this.tasks.indexOf(task);
        console.log(1);
        if (index > -1) {
            console.log(3);
            var tasks = this.tasks;
            this.tasks = tasks.slice(0, index - 1).concat(tasks.slice(index + 1, tasks.length));
        }
        console.log(2);
        this.workItemObserver.next(true);
    };
    WorkItemModel.prototype.updates = function () {
        return this.workItem;
    };
    return WorkItemModel;
}());
export { WorkItemModel };
//# sourceMappingURL=workitem-model.js.map