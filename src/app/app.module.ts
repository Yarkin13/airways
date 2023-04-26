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
import { cartReducer } from './redux/reducers/cart.reducers';
import { bookingReducer } from './redux/reducers/booking.reducer';
import { SecondMenuComponent } from './booking/components/second-menu/second-menu.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    SecondMenuComponent,
    BrowserAnimationsModule,
    StoreModule.forRoot({
      headerData: headerDataReducer,
      bookingData: bookingReducer,
      cart: cartReducer,
      router: routerReducer,
    }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
