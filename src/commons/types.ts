interface Period {
    start: Date;
    end: Date;

    updatePeriod(start: Date, end: Date);
}

export interface TimeTracker extends Period {
    id: string;
    detail: string;

    update(detail: string)
}

export interface Schedule extends Period {
    id: string;
}

export interface Task {
    id: string;
    title: string;
    detail: string;
    schedules: Schedule[];
    timeTrackers: TimeTracker[];
    completed: boolean;

    update(title: string, detail: string, completed: boolean);

    addSchedule(schedule: Schedule);
    removeSchedule(schedule: Schedule);

    addTimeTracker(timetracker: TimeTracker);
    removeTimeTracker(timetracker: TimeTracker);
}

export interface WorkItem {
    id: string;
    title: string;
    tasks: Task[];

    update(title: string): void;

    addTask(task: Task);
    removeTask(task: Task);
}