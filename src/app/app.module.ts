import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SQLite } from '@ionic-native/sqlite';

import { MyApp } from './app.component';
import { DataProvider } from '../providers/data/data';

import { StoreModule } from '@ngrx/store';  
import { EffectsModule } from '@ngrx/effects';
import { WorkItemsReducer } from '../reducers/workItems.reducer';  
import { WorkItemActions } from '../actions/workitem.actions';
import { WorkItemEffects } from '../effects/workitem.effects';  

@NgModule({
    declarations: [MyApp],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot(),
        StoreModule.provideStore({ workItems: WorkItemsReducer }),
        EffectsModule.run(WorkItemEffects)
    ],
    bootstrap: [IonicApp],
    entryComponents: [MyApp],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
    DataProvider,
    SQLite,
    WorkItemActions
    ]
})
export class AppModule { }
