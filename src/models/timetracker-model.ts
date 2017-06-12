import { TimeTracker } from '../commons/types';

export class TimeTrackerModel implements TimeTracker {
    constructor(public id: string, public start: Date, public end: Date, public detail: string) { }

    update(detail: string) {
        this.detail = detail;
    }

    updatePeriod(start: Date, end: Date) {
        this.start = start;
        this.end = end;
    }
}