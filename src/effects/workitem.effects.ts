import { Injectable } from '@angular/core';
import { Effect, toPayload, Actions } from '@ngrx/effects';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/concat';

import { DataProvider } from '../providers/data/data';
import { WorkItemActions } from '../actions/workitem.actions';

@Injectable()
export class WorkItemEffects {

    constructor(
        private actions$: Actions,
        public service: DataProvider,
        private workItemActions: WorkItemActions
    ) { }

    @Effect() addWorkItem$ = this.actions$
        .ofType(WorkItemActions.ADD_WORKITEM)
        .map(toPayload)
        .mergeMap(workItem => this.service.addWorkItem(workItem));

    @Effect() updateWorkItem$ = this.actions$
        .ofType(WorkItemActions.UPDATE_WORKITEM)
        .map(toPayload)
        .mergeMap(WorkItem => this.service.updateWorkItem(WorkItem));

    @Effect() deleteWorkItem$ = this.actions$
        .ofType(WorkItemActions.DELETE_WORKITEM)
        .map(toPayload)
        .mergeMap(WorkItem => this.service.deleteWorkItem(WorkItem));

    allWorkItems$ = this.service.getDocuments()
        .map(workItems => this.workItemActions.loadWorkItemsSuccess(workItems));

    changedWorkItems$ = this.service.getChanges()
        .map(change => {
            
            if (change._deleted) {
                console.log(1);
                return this.workItemActions.deleteWorkItemSuccess(change._id);
            }
            else {
                return this.workItemActions.addUpdateWorkItemSuccess(change);
            }
        });

    @Effect() getWorkItems$ = this.allWorkItems$.concat(this.changedWorkItems$);
}