/* eslint-disable @ngrx/avoid-dispatching-multiple-actions-sequentially */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { selectCurrencySign, selectDateFormatPipeStringWithDay } from 'src/app/redux/selectors/header-data.selectors';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
  selectBookingTrip,
  selectBookingTripInCur,
} from 'src/app/redux/selectors/booking.selectors';
import {
  ContactDetails,
  Flight,
  PassengerInfo,
  PassengerType,
} from 'src/app/shared/models/booking.model';
import { CartActions } from 'src/app/redux/actions/cart.actions';
import { CurrencyExchange, Trip } from 'src/app/shared/models/shopping-cart.model';
import { UserOrdersActions } from 'src/app/redux/actions/user-orders.actions';
import {
  selectOrderById,
  selectOrderByIdInCur,
} from 'src/app/redux/selectors/user-orders.selectors';
import { BookingActions } from 'src/app/redux/actions/booking.actions';
import { v4 as uuidv4 } from 'uuid';
import { resetFlight } from 'src/app/redux/actions/flight.action';
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
  dateFormatStr = '';
  btnDisabled = false;
  isPaid = false;
  isEdit = false;
  tripIdEdit = '';
  contactDetails: ContactDetails;
  isReturnWay = true;
  currencyExchange: CurrencyExchange;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
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
      .select(selectDateFormatPipeStringWithDay)
      .pipe(untilDestroyed(this))
      .subscribe((value) => {
        this.dateFormatStr = value;
      });

    this.route.params.pipe(untilDestroyed(this)).subscribe((params) => {
      const tripId = params['id'];
      const isEdit = params['edit'];
      if (tripId && !isEdit) {
        this.isPaid = true;
        this.store
          .select(selectOrderById(tripId))
          .pipe(untilDestroyed(this))
          .subscribe((value) => {
            if (value) {
              this.flight = value.flight;
              this.passengersInfo = value.passengersInfo;
              this.passengersFareByType = value.passengers;
              this.totalCost = value.totalCost;
            }
          });
        this.store
          .select(selectOrderByIdInCur(tripId))
          .pipe(untilDestroyed(this))
          .subscribe((value) => {
            if (value) {
              this.passengersFareByTypeInCur = value.passengers;
              this.totalCostInCur = value.totalCost;
            }
          });
      } else {
        this.isPaid = false;
        this.store
          .select(selectBookingTrip)
          .pipe(untilDestroyed(this))
          .subscribe((value) => {
            this.flight = value.flight;
            this.passengersInfo = value.passengersInfo;
            this.passengersFareByType = value.passengers;
            this.totalCost = value.totalCost;
            this.contactDetails = value.contactDetails;
            this.currencyExchange = value.currencyExchange;
          });
        this.store
          .select(selectBookingTripInCur)
          .pipe(untilDestroyed(this))
          .subscribe((value) => {
            this.passengersFareByTypeInCur = value.passengers;
            this.totalCostInCur = value.totalCost;
          });
      }
      if (tripId && isEdit) {
        this.isEdit = true;
        this.tripIdEdit = tripId;
      }
    });
  }

  redirectBookingPage() {
    this.router.navigateByUrl('/booking/booking');
  }

  handleAddToCart() {
    const currentTrip: Trip = {
      id: uuidv4(),
      passengers: this.passengersFareByType,
      flight: this.flight,
      passengersInfo: this.passengersInfo,
      totalCost: this.totalCost,
      contactDetails: this.contactDetails,
      currencyExchange: this.currencyExchange,
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
      this.store.dispatch(BookingActions.reset());
      this.store.dispatch(resetFlight());
    }, 2500);
  }

  handlePayment() {
    this.dialog
      .open(PaymentModalComponent, {
        width: '400px',
        data: {
          total: this.currency + (+this.totalCostInCur).toFixed(2),
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === 'CONFIRMED') {
          const currentTrip: Trip = {
            id: uuidv4(),
            passengers: this.passengersFareByType,
            flight: this.flight,
            passengersInfo: this.passengersInfo,
            totalCost: this.totalCost,
            contactDetails: this.contactDetails,
            currencyExchange: this.currencyExchange,
          };
          this.store.dispatch(
            UserOrdersActions.addToOrders({ orders: [currentTrip] })
          );
          this.store.dispatch(BookingActions.reset());
          this.store.dispatch(resetFlight());
          this.router.navigateByUrl('/booking/main');
        }
      });
  }

  handleReturnToUserAccount() {
    this.router.navigateByUrl('/user/account');
    this.store.dispatch(BookingActions.reset());
  }

  handleCancelEdit() {
    this.router.navigateByUrl('/user/cart');
  }

  handleSaveOnEdit() {
    this.store.dispatch(
      CartActions.editCartTrip({
        id: [this.tripIdEdit],
        info: this.passengersInfo,
      })
    );
    this.router.navigateByUrl('/user/cart');
    this.store.dispatch(BookingActions.reset());
  }
}
