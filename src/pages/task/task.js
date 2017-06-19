var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { UUID } from 'angular2-uuid';
import { TaskModel } from '../../models/task-model';
var TaskPage = (function () {
    function TaskPage(viewCtrl, navParams, formBuilder) {
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.task = this.navParams.get('task');
        this.workitem = this.navParams.get('workitem');
        this.title = this.task ? this.task.title : 'New Task';
        this.taskForm = formBuilder.group({
            title: [this.task ? this.task.title : '', Validators.required],
            detail: [this.task ? this.task.detail : ''],
            completed: [this.task ? this.task.completed : false]
        });
    }
    TaskPage.prototype.saveForm = function () {
        if (this.task) {
            this.task.update(this.taskForm.value.title, this.taskForm.value.detail, this.taskForm.value.completed);
        }
        else {
            var task = new TaskModel(UUID.UUID(), this.taskForm.value.title, this.taskForm.value.detail, [], [], this.taskForm.value.completed);
            this.workitem.addTask(task);
        }
        this.viewCtrl.dismiss();
    };
    TaskPage.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    return TaskPage;
}());
TaskPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-task',
        templateUrl: 'task.html',
    }),
    __metadata("design:paramtypes", [ViewController, NavParams, FormBuilder])
], TaskPage);
export { TaskPage };
//# sourceMappingURL=task.js.map