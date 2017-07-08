import { WorkItemActions } from '../actions/workitem.actions';
export var WorkItemsReducer = function (state, action) {
    if (state === void 0) { state = []; }
    switch (action.type) {
        case WorkItemActions.LOAD_WORKITEMS_SUCCESS:
            return action.payload;
        case WorkItemActions.ADD_UPDATE_WORKITEM_SUCCESS:
            var exists = state.find(function (workItem) { return workItem._id === action.payload._id; });
            if (exists) {
                return state.map(function (workItem) {
                    return workItem._id === action.payload._id ? action.payload : workItem;
                });
            }
            else {
                return state.concat([action.payload]);
            }
        case WorkItemActions.DELETE_WORKITEM_SUCCESS:
            return state.filter(function (workItem) { return workItem._id !== action.payload; });
        default:
            return state;
    }
    ;
};
//# sourceMappingURL=workitems.reducer.js.map