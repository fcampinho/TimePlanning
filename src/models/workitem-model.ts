import { WorkItem, Task } from '../commons/types';

export class WorkItemModel implements WorkItem {
    public tasks: Task[] = [];

    constructor(public id: string, public title: string, tasks: Task[]) { }

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