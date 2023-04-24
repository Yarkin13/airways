import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CartActions } from 'src/app/redux/actions/cart.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FareComponent } from './fare/fare.component';
import { OrderComponent } from './order/order.component';
import { bookedFlights, bookedPassengers } from './summary.mock';
import { BookedFlight, Passenger } from '../../models/booked-flights.model';
import { PaymentModalComponent } from './payment-modal/payment-modal.component';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule, MaterialModule, FareComponent, OrderComponent],
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent {
  public flights: Array<BookedFlight> = bookedFlights;

  public passengers: Array<Passenger> = bookedPassengers;

  btnDisabled = false;

  constructor(
    public router: Router,
    private store: Store,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.btnDisabled = false;
  }

  redirectBookingPage() {
    this.router.navigateByUrl('/booking/booking');
  }

  handleAddToCart() {
    const currentFlight = {
      flights: this.flights,
      passengers: this.passengers,
    };
    this.store.dispatch(CartActions.addToCart(currentFlight));
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
