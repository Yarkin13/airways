import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { headerDataReducer } from './redux/reducers/header-data.reducer';
import { AppRoutingModule } from './app-routing.module';
import { SummaryComponent } from './booking/pages/summary/summary.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ headerData: headerDataReducer, router: routerReducer }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    AppRoutingModule,
    SummaryComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
