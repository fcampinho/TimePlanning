var TimeTrackerModel = (function () {
    function TimeTrackerModel(id, start, end, detail) {
        this.id = id;
        this.start = start;
        this.end = end;
        this.detail = detail;
    }
    TimeTrackerModel.prototype.update = function (detail) {
        this.detail = detail;
    };
    TimeTrackerModel.prototype.updatePeriod = function (start, end) {
        this.start = start;
        this.end = end;
    };
    return TimeTrackerModel;
}());
export { TimeTrackerModel };
//# sourceMappingURL=timetracker-model.js.map