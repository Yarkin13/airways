import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { selectCurrencySign } from 'src/app/redux/selectors/header-data.selectors';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
  selectBookingTrip,
  selectBookingTripInCur,
} from 'src/app/redux/selectors/booking.selectors';
import {
  Flight,
  PassengerInfo,
  PassengerType,
} from 'src/app/shared/models/booking.model';
import { CartActions } from 'src/app/redux/actions/cart.actions';
import { Trip } from 'src/app/shared/models/shopping-cart.model';
import { UserOrdersActions } from 'src/app/redux/actions/user-orders.actions';
import {
  selectOrderById,
  selectOrderByIdInCur,
} from 'src/app/redux/selectors/user-orders.selectors';
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

  isPaid = false;

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

    this.route.params.pipe(untilDestroyed(this)).subscribe((params) => {
      const tripId = params['id'];
      if (tripId) {
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
          });
        this.store
          .select(selectBookingTripInCur)
          .pipe(untilDestroyed(this))
          .subscribe((value) => {
            this.passengersFareByTypeInCur = value.passengers;
            this.totalCostInCur = value.totalCost;
          });
      }
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
            UserOrdersActions.addToOrders({ orders: [currentTrip] })
          );
          this.router.navigateByUrl('/booking/main');
        }
      });
  }

  redirectToUserAccount() {
    this.router.navigateByUrl('/user/account');
  }
}
