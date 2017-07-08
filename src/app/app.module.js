var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
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
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map