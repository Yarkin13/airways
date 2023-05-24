import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { headerDataReducer } from './redux/reducers/header-data.reducer';
import { AppRoutingModule } from './app-routing.module';
import { cartReducer } from './redux/reducers/cart.reducers';
import { bookingReducer } from './redux/reducers/booking.reducer';
import { SecondMenuComponent } from './booking/components/second-menu/second-menu.component';
import { userReducer } from './redux/reducers/user.reducer';
import { InterceptorAuthService } from './core/interceptors/interceptor-auth.service';
import { InterceptorUrlService } from './core/interceptors/interceptor-url.service';
import { userOrdersReducer } from './redux/reducers/user-orders.reducer';
import { HttpService } from './http.service';
import { flightReducer } from './redux/reducers/flight.reducer';
import { EditMenuComponent } from './booking/components/edit-menu/edit-menu.component';
import { FlightEffects } from './redux/effects/flight.effect';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    SecondMenuComponent,
    EditMenuComponent,
    BrowserAnimationsModule,
    StoreModule.forRoot({
      headerData: headerDataReducer,
      userOrdersData: userOrdersReducer,
      bookingData: bookingReducer,
      flightData: flightReducer,
      cart: cartReducer,
      router: routerReducer,
      userInfo: userReducer,
    }),
    HttpClientModule,
    EffectsModule.forRoot([FlightEffects]),
    StoreRouterConnectingModule.forRoot(),
    AppRoutingModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: true, // Restrict extension to log-only mode
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorUrlService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorAuthService,
      multi: true,
    },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    HttpService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
