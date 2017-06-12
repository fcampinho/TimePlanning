import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TimeTrackerListPage } from './time-tracker-list';

@NgModule({
  declarations: [
    TimeTrackerListPage,
  ],
  imports: [
    IonicPageModule.forChild(TimeTrackerListPage),
  ],
  exports: [
    TimeTrackerListPage
  ]
})
export class TimeTrackerListPageModule {}
