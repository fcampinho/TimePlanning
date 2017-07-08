import { Schedule } from '../commons/types';

export class ScheduleModel implements Schedule {
    constructor(public _id: string, public start: Date, public end: Date) { }

    updatePeriod(start: Date, end: Date) {
        this.start = start;
        this.end = end;
    }
}