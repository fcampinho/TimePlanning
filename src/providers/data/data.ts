import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';

import * as PouchDB from 'pouchdb';
import cordovaSqlitePlugin from 'pouchdb-adapter-cordova-sqlite';

import { WorkItem } from '../../commons/types';
import { WorkItemModel } from '../../models/workitem-model';

@Injectable()
export class DataProvider {
  db: any;
  cloudantUsername: string;
  cloudantPassword: string;
  remote: string;

  workItems: WorkItem[];

  constructor(public platform: Platform) {

  }

  initDB(): Promise<any> {
    return this.platform.ready()
      .then(() => {
        PouchDB.plugin(cordovaSqlitePlugin);
        this.db = new PouchDB('timeplanning.db', { adapter: 'cordova-sqlite' });
        this.cloudantUsername = 'iagenforterythernswelsca';
        this.cloudantPassword = 'fe70fb34dfec559d2381c4fc7a4a8aad202e3757';
        this.remote = 'https://fcampinho.cloudant.com/timeplanning';

        let options = {
          live: true,
          retry: true,
          continuous: true,
          auth: {
            username: this.cloudantUsername,
            password: this.cloudantPassword
          }
        };

        this.db.sync(this.remote, options);
      })
  }

  addWorkItem(workItem: WorkItem): Promise<any> {
    return this.db.post(workItem);
  }

  updateWorkItem(workItem: WorkItem): Promise<any> {
    return this.db.put(workItem);
  }

  deleteWorkItem(workItem: WorkItem): Promise<any> {
    return this.db.remove(workItem);
  }

  getDocuments(): Observable<any> {
    return Observable.fromPromise(
      this.initDB().then(() =>
        this.db.allDocs({
          include_docs: true
        }).then((result) => {
          this.workItems = result.rows.map((row) => {
            return new WorkItemModel(row.doc._id, row.doc._rev, row.doc.title, row.doc.tasks);
          });

          return this.workItems;
        }).catch((error) => {
          console.log(error);
        }))
    );
  }

  getChanges(): Observable<any> {
    return Observable.create(observer => {
      this.db
        .changes({ live: true, since: 'now', include_docs: true })
        .on('change', (change) => {
          if (change.deleted) observer.next(change.doc);
          else observer.next(new WorkItemModel(change.doc._id, change.doc._rev, change.doc.title, change.doc.tasks));
        });
    });
  }
}