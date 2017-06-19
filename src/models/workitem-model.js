var WorkItemModel = (function () {
    function WorkItemModel(id, title, tasks) {
        this.id = id;
        this.title = title;
        this.tasks = [];
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