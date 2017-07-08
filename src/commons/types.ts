interface Period {
    start: Date;
    end: Date;

    updatePeriod(start: Date, end: Date);
}

export interface TimeTracker extends Period {
    _id: string;
    detail: string;

    update(detail: string)
}

export interface Schedule extends Period {
    _id: string;
}

export interface Task {
    _id: string;
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
    _id: string;
    _rev: string;
    title: string;
    tasks: Task[];

    update(title: string): void;

    addTask(task: Task);
    removeTask(task: Task);
}

export interface AppState {  
    workItems: WorkItem[];
}