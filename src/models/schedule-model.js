var ScheduleModel = (function () {
    function ScheduleModel(id, start, end) {
        this.id = id;
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