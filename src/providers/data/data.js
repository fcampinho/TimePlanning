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
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';
import * as PouchDB from 'pouchdb';
import cordovaSqlitePlugin from 'pouchdb-adapter-cordova-sqlite';
import { WorkItemModel } from '../../models/workitem-model';
var DataProvider = (function () {
    function DataProvider(platform) {
        this.platform = platform;
    }
    DataProvider.prototype.initDB = function () {
        var _this = this;
        return this.platform.ready()
            .then(function () {
            PouchDB.plugin(cordovaSqlitePlugin);
            _this.db = new PouchDB('timeplanning.db', { adapter: 'cordova-sqlite' });
            _this.cloudantUsername = 'iagenforterythernswelsca';
            _this.cloudantPassword = 'fe70fb34dfec559d2381c4fc7a4a8aad202e3757';
            _this.remote = 'https://fcampinho.cloudant.com/timeplanning';
            var options = {
                live: true,
                retry: true,
                continuous: true,
                auth: {
                    username: _this.cloudantUsername,
                    password: _this.cloudantPassword
                }
            };
            _this.db.sync(_this.remote, options);
        });
    };
    DataProvider.prototype.addWorkItem = function (workItem) {
        return this.db.post(workItem);
    };
    DataProvider.prototype.updateWorkItem = function (workItem) {
        return this.db.put(workItem);
    };
    DataProvider.prototype.deleteWorkItem = function (workItem) {
        return this.db.remove(workItem);
    };
    DataProvider.prototype.getDocuments = function () {
        var _this = this;
        return Observable.fromPromise(this.initDB().then(function () {
            return _this.db.allDocs({
                include_docs: true
            }).then(function (result) {
                _this.workItems = result.rows.map(function (row) {
                    return new WorkItemModel(row.doc._id, row.doc._rev, row.doc.title, row.doc.tasks);
                });
                return _this.workItems;
            }).catch(function (error) {
                console.log(error);
            });
        }));
    };
    DataProvider.prototype.getChanges = function () {
        var _this = this;
        return Observable.create(function (observer) {
            _this.db
                .changes({ live: true, since: 'now', include_docs: true })
                .on('change', function (change) {
                if (change.deleted)
                    observer.next(change.doc);
                else
                    observer.next(new WorkItemModel(change.doc._id, change.doc._rev, change.doc.title, change.doc.tasks));
            });
        });
    };
    return DataProvider;
}());
DataProvider = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Platform])
], DataProvider);
export { DataProvider };
//# sourceMappingURL=data.js.map