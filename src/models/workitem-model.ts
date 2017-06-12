import { Task } from '../commons/types';
import { TaskModel } from './task-model';

export class WorkItemModel {
    public tasks: Task[] = [];

    constructor(public id: string, public title: string, tasks: Task[]) { }

    update(title: string): void {
        this.title = title;
    }

    addTask(task: TaskModel): void {
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