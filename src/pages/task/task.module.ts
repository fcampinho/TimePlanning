import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaskPage } from './task';

@NgModule({
  declarations: [
    TaskPage,
  ],
  imports: [
    IonicPageModule.forChild(TaskPage),
  ],
  exports: [
    TaskPage
  ]
})
export class TaskPageModule {}
