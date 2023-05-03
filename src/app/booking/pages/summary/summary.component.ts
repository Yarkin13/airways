import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { selectCurrencySign } from 'src/app/redux/selectors/header-data.selectors';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { selectBookingFlights, selectBookingPassengers } from 'src/app/redux/selectors/booking.selectors';
import { FareComponent } from './fare/fare.component';
import { OrderComponent } from './order/order.component';
import { BookedFlight, Passenger } from '../../../shared/models/booked-flights.model';
import { PaymentModalComponent } from '../../../shared/components/payment-modal/payment-modal.component';
import { SecondMenuComponent } from '../../components/second-menu/second-menu.component';

@UntilDestroy()
@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule, MaterialModule, FareComponent, OrderComponent, SecondMenuComponent],
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent {
  public flights!: Array<BookedFlight>;

  public passengers!: Array<Passenger>;

  currency = '€';

  btnDisabled = false;

  constructor(
    public router: Router,
    private store: Store,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.btnDisabled = false;
    this.store.select(selectCurrencySign).pipe(untilDestroyed(this)).subscribe((value) => {
      this.currency = value;
    });
    this.store.select(selectBookingFlights).pipe(untilDestroyed(this)).subscribe((value) => {
      this.flights = value;
    });
    this.store.select(selectBookingPassengers).pipe(untilDestroyed(this)).subscribe((value) => {
      this.passengers = value;
    });
  }

  redirectBookingPage() {
    this.router.navigateByUrl('/booking/booking');
  }

  handleAddToCart() {
    // const currentFlight = {
    //   flights: this.flights,
    //   passengers: this.passengers,
    // };
    // this.store.dispatch(CartActions.addToCart(currentFlight));
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

  openPaymentModal() {
    this.dialog.open(PaymentModalComponent, {
      width: '400px',
    });
  }
}
