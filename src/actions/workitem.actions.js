var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
var WorkItemActions = WorkItemActions_1 = (function () {
    function WorkItemActions() {
    }
    WorkItemActions.prototype.loadWorkItemsSuccess = function (workItems) {
        return {
            type: WorkItemActions_1.LOAD_WORKITEMS_SUCCESS,
            payload: workItems
        };
    };
    WorkItemActions.prototype.addWorkItem = function (workItem) {
        return {
            type: WorkItemActions_1.ADD_WORKITEM,
            payload: workItem
        };
    };
    WorkItemActions.prototype.updateWorkItem = function (workItem) {
        return {
            type: WorkItemActions_1.UPDATE_WORKITEM,
            payload: workItem
        };
    };
    WorkItemActions.prototype.deleteWorkItem = function (workItem) {
        return {
            type: WorkItemActions_1.DELETE_WORKITEM,
            payload: workItem
        };
    };
    WorkItemActions.prototype.addUpdateWorkItemSuccess = function (workItem) {
        return {
            type: WorkItemActions_1.ADD_UPDATE_WORKITEM_SUCCESS,
            payload: workItem
        };
    };
    WorkItemActions.prototype.deleteWorkItemSuccess = function (id) {
        return {
            type: WorkItemActions_1.DELETE_WORKITEM_SUCCESS,
            payload: id
        };
    };
    return WorkItemActions;
}());
WorkItemActions.LOAD_WORKITEMS_SUCCESS = 'LOAD_WORKITEMS_SUCCESS';
WorkItemActions.ADD_WORKITEM = 'ADD_WORKITEM';
WorkItemActions.UPDATE_WORKITEM = 'UPDATE_WORKITEM';
WorkItemActions.DELETE_WORKITEM = 'DELETE_WORKITEM';
WorkItemActions.ADD_UPDATE_WORKITEM_SUCCESS = 'ADD_UPDATE_WORKITEM_SUCCESS';
WorkItemActions.DELETE_WORKITEM_SUCCESS = 'DELETE_WORKITEM_SUCCESS';
WorkItemActions = WorkItemActions_1 = __decorate([
    Injectable()
], WorkItemActions);
export { WorkItemActions };
var WorkItemActions_1;
//# sourceMappingURL=workitem.actions.js.map