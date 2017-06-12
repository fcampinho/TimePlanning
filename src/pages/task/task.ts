import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UUID } from 'angular2-uuid';

import { WorkItem, Task } from '../../commons/types';
import { TaskModel } from '../../models/task-model';

@IonicPage()
@Component({
  selector: 'page-task',
  templateUrl: 'task.html',
})
export class TaskPage {
  workitem: WorkItem;
  task: Task;
  title: string;
  taskForm: FormGroup;

  constructor(public viewCtrl: ViewController, public navParams: NavParams, public formBuilder: FormBuilder) {
    this.task = this.navParams.get('task');
    this.workitem = this.navParams.get('workitem');

    this.title = this.task ? this.task.title : 'New Task';

    this.taskForm = formBuilder.group({
      title: [this.task ? this.task.title : '', Validators.required],
      detail: [this.task ? this.task.detail : ''],
      completed: [this.task ?  this.task.completed : false]
    });
  }

  saveForm() {
    if (this.task) {
      this.task.update(this.taskForm.value.title, this.taskForm.value.detail, this.taskForm.value.completed);
    }
    else {
      let task = new TaskModel(UUID.UUID(), this.taskForm.value.title, this.taskForm.value.detail, [], [], this.taskForm.value.completed);
      this.workitem.addTask(task);
    }
    this.viewCtrl.dismiss();
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
