var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Effect, toPayload, Actions } from '@ngrx/effects';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/concat';
import { DataProvider } from '../providers/data/data';
import { WorkItemActions } from '../actions/workitem.actions';
var WorkItemEffects = (function () {
    function WorkItemEffects(actions$, service, workItemActions) {
        var _this = this;
        this.actions$ = actions$;
        this.service = service;
        this.workItemActions = workItemActions;
        this.addWorkItem$ = this.actions$
            .ofType(WorkItemActions.ADD_WORKITEM)
            .map(toPayload)
            .mergeMap(function (workItem) { return _this.service.addWorkItem(workItem); });
        this.updateWorkItem$ = this.actions$
            .ofType(WorkItemActions.UPDATE_WORKITEM)
            .map(toPayload)
            .mergeMap(function (WorkItem) { return _this.service.updateWorkItem(WorkItem); });
        this.deleteWorkItem$ = this.actions$
            .ofType(WorkItemActions.DELETE_WORKITEM)
            .map(toPayload)
            .mergeMap(function (WorkItem) { return _this.service.deleteWorkItem(WorkItem); });
        this.allWorkItems$ = this.service.getDocuments()
            .map(function (workItems) { return _this.workItemActions.loadWorkItemsSuccess(workItems); });
        this.changedWorkItems$ = this.service.getChanges()
            .map(function (change) {
            if (change._deleted) {
                console.log(1);
                return _this.workItemActions.deleteWorkItemSuccess(change._id);
            }
            else {
                return _this.workItemActions.addUpdateWorkItemSuccess(change);
            }
        });
        this.getWorkItems$ = this.allWorkItems$.concat(this.changedWorkItems$);
    }
    return WorkItemEffects;
}());
__decorate([
    Effect(),
    __metadata("design:type", Object)
], WorkItemEffects.prototype, "addWorkItem$", void 0);
__decorate([
    Effect(),
    __metadata("design:type", Object)
], WorkItemEffects.prototype, "updateWorkItem$", void 0);
__decorate([
    Effect(),
    __metadata("design:type", Object)
], WorkItemEffects.prototype, "deleteWorkItem$", void 0);
__decorate([
    Effect(),
    __metadata("design:type", Object)
], WorkItemEffects.prototype, "getWorkItems$", void 0);
WorkItemEffects = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Actions,
        DataProvider,
        WorkItemActions])
], WorkItemEffects);
export { WorkItemEffects };
//# sourceMappingURL=workitem.effects.js.map