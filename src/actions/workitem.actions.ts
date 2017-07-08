import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { WorkItem } from '../commons/types';

@Injectable()
export class WorkItemActions {

    static LOAD_WORKITEMS_SUCCESS = 'LOAD_WORKITEMS_SUCCESS';
    loadWorkItemsSuccess(workItems: WorkItem[]): Action {
        return {
            type: WorkItemActions.LOAD_WORKITEMS_SUCCESS,
            payload: workItems
        }
    }

    static ADD_WORKITEM = 'ADD_WORKITEM';
    addWorkItem(workItem: WorkItem): Action {
        return {
            type: WorkItemActions.ADD_WORKITEM,
            payload: workItem
        }
    }

    static UPDATE_WORKITEM = 'UPDATE_WORKITEM';
    updateWorkItem(workItem: WorkItem): Action {
        return {
            type: WorkItemActions.UPDATE_WORKITEM,
            payload: workItem
        }
    }

    static DELETE_WORKITEM = 'DELETE_WORKITEM';
    deleteWorkItem(workItem: WorkItem): Action {
        return {
            type: WorkItemActions.DELETE_WORKITEM,
            payload: workItem
        }
    }

    static ADD_UPDATE_WORKITEM_SUCCESS = 'ADD_UPDATE_WORKITEM_SUCCESS';
    addUpdateWorkItemSuccess(workItem: WorkItem): Action {
        return {
            type: WorkItemActions.ADD_UPDATE_WORKITEM_SUCCESS,
            payload: workItem
        }
    }

    static DELETE_WORKITEM_SUCCESS = 'DELETE_WORKITEM_SUCCESS';
    deleteWorkItemSuccess(id: string): Action {
        return {
            type: WorkItemActions.DELETE_WORKITEM_SUCCESS,
            payload: id
        }
    }
}