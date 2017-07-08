import { WorkItem, Task } from '../commons/types';
import { TaskModel } from './task-model';

export class WorkItemModel implements WorkItem {
    public tasks: Task[] = [];

    constructor(public _id: string, public _rev: string, public title: string, tasks: any[]) {
        for (let i = 0; i < tasks.length; i++) {
            let task = new TaskModel(tasks[i]._id, tasks[i].title, tasks[i].detail, tasks[i].schedules, tasks[i].timeTrackers, tasks[i].completed);
            this.tasks = [...this.tasks, task];
        }
    }

    update(title: string): void {
        this.title = title;
    }

    addTask(task: Task): void {
        this.tasks = [...this.tasks, task];
    }

    removeTask(task: Task): void {
        let index = this.tasks.indexOf(task);
        if (index > -1) {
            let tasks = this.tasks;
            this.tasks = [...tasks.slice(0, index),
            ...tasks.slice(index + 1, tasks.length)];
        }
    }
}