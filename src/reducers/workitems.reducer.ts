import { ActionReducer, Action } from '@ngrx/store';
import { WorkItemActions } from '../actions/workitem.actions';

import { WorkItem } from '../commons/types';

export const WorkItemsReducer: ActionReducer<WorkItem[]> = (state: WorkItem[] = [], action: Action) => {
    switch(action.type) {
        case WorkItemActions.LOAD_WORKITEMS_SUCCESS:
            return action.payload;
        case WorkItemActions.ADD_UPDATE_WORKITEM_SUCCESS:
            var exists = state.find(workItem => workItem._id === action.payload._id);

            if (exists) {
                return state.map(workItem => {
                    return workItem._id === action.payload._id ? action.payload : workItem;
                });
            } 
            else {
                return [...state, action.payload];
            }
        case WorkItemActions.DELETE_WORKITEM_SUCCESS:
            return state.filter(workItem => workItem._id !== action.payload);
        default:
            return state;
    };
}