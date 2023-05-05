import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { selectCurrencySign } from 'src/app/redux/selectors/header-data.selectors';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
  selectBookingFlight,
  selectCurTripCost,
  selectCurTripCostInCur,
  selectPassengersFareByType,
  selectPassengersFareByTypeInCur,
  selectPassengersInfo,
} from 'src/app/redux/selectors/booking.selectors';
import {
  Flight,
  PassengerInfo,
  PassengerType,
} from 'src/app/shared/models/booking.model';
import { CartActions } from 'src/app/redux/actions/cart.actions';
import { Trip } from 'src/app/shared/models/shopping-cart.model';
import { UserActions } from 'src/app/redux/actions/user.actions';
import { FareComponent } from './fare/fare.component';
import { OrderComponent } from './order/order.component';
import { PaymentModalComponent } from '../../../shared/components/payment-modal/payment-modal.component';
import { SecondMenuComponent } from '../../components/second-menu/second-menu.component';

@UntilDestroy()
@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    FareComponent,
    OrderComponent,
    SecondMenuComponent,
  ],
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent {
  public flight!: Flight;

  public passengersInfo!: Array<PassengerInfo>;

  public passengersFareByTypeInCur!: Array<PassengerType>;

  public passengersFareByType!: Array<PassengerType>;

  public totalCostInCur!: string;

  public totalCost!: string;

  currency = '€';

  btnDisabled = false;

  constructor(
    public router: Router,
    private store: Store,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.btnDisabled = false;
    this.store
      .select(selectCurrencySign)
      .pipe(untilDestroyed(this))
      .subscribe((value) => {
        this.currency = value;
      });
    this.store
      .select(selectBookingFlight)
      .pipe(untilDestroyed(this))
      .subscribe((value) => {
        this.flight = value;
      });
    this.store
      .select(selectPassengersInfo)
      .pipe(untilDestroyed(this))
      .subscribe((value) => {
        this.passengersInfo = value;
      });
    this.store
      .select(selectPassengersFareByTypeInCur)
      .pipe(untilDestroyed(this))
      .subscribe((value) => {
        this.passengersFareByTypeInCur = value;
      });
    this.store
      .select(selectPassengersFareByType)
      .pipe(untilDestroyed(this))
      .subscribe((value) => {
        this.passengersFareByType = value;
      });
    this.store
      .select(selectCurTripCostInCur)
      .pipe(untilDestroyed(this))
      .subscribe((value) => {
        this.totalCostInCur = value;
      });
    this.store
      .select(selectCurTripCost)
      .pipe(untilDestroyed(this))
      .subscribe((value) => {
        this.totalCost = value;
      });
  }

  redirectBookingPage() {
    this.router.navigateByUrl('/booking/booking');
  }

  handleAddToCart() {
    const currentTrip: Trip = {
      id: performance.now().toString(),
      passengers: this.passengersFareByType,
      flight: this.flight,
      passengersInfo: this.passengersInfo,
      totalCost: this.totalCost,
    };
    this.store.dispatch(CartActions.addToCart(currentTrip));
    this.snackBar.open('Item was successfully added to your cart!', '', {
      duration: 1500,
      panelClass: ['snackBar'],
      verticalPosition: 'top',
    });
    this.btnDisabled = true;
    setTimeout(() => {
      this.snackBar.open('Redirecting to main page...', '', {
        duration: 1000,
        panelClass: ['snackBarRedirect'],
        verticalPosition: 'top',
      });
    }, 1500);
    setTimeout(() => {
      this.router.navigateByUrl('/booking/main');
    }, 2500);
  }

  handlePayment() {
    this.dialog
      .open(PaymentModalComponent, {
        width: '400px',
        data: {
          total: this.currency + this.totalCostInCur,
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === 'CONFIRMED') {
          const currentTrip: Trip = {
            id: performance.now().toString(),
            passengers: this.passengersFareByType,
            flight: this.flight,
            passengersInfo: this.passengersInfo,
            totalCost: this.totalCost,
          };
          this.store.dispatch(
            UserActions.addToOrders({ orders: [currentTrip] })
          );
          this.router.navigateByUrl('/booking/main');
        }
      });
  }
}
