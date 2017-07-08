var ScheduleModel = (function () {
    function ScheduleModel(_id, start, end) {
        this._id = _id;
        this.start = start;
        this.end = end;
    }
    ScheduleModel.prototype.updatePeriod = function (start, end) {
        this.start = start;
        this.end = end;
    };
    return ScheduleModel;
}());
export { ScheduleModel };
//# sourceMappingURL=schedule-model.js.map