import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaskListPage } from './task-list';

@NgModule({
  declarations: [
    TaskListPage,
  ],
  imports: [
    IonicPageModule.forChild(TaskListPage),
  ],
  exports: [
    TaskListPage
  ]
})
export class TaskListPageModule {}
