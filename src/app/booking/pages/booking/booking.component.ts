import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { selectBookingTrip } from 'src/app/redux/selectors/booking.selectors';
import {
  PassengerInfo,
  PassengerType,
} from 'src/app/shared/models/booking.model';

@UntilDestroy()
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent {
  passengers: ('Adult' | 'Child' | 'Infant')[] = ['Adult', 'Child', 'Infant']; // не будет нужен

  tripIdInCart = '';

  passengersInfo: Array<PassengerInfo> = [];

  passengersByType: Array<PassengerType> = []; // вместо this.passengers

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private store: Store
  ) {
    this.route.params.pipe(untilDestroyed(this)).subscribe((params) => {
      const tripId = params['id'];
      if (tripId) {
        this.tripIdInCart = tripId;
      } else {
        this.tripIdInCart = '';
      }
    });
    // get data from store
    this.store
      .select(selectBookingTrip)
      .pipe(untilDestroyed(this))
      .subscribe((value) => {
        this.passengersInfo = value.passengersInfo;
        this.passengersByType = value.passengers;
      });
  }

  handleContinue() {
    // TODO save changed data to Booking obj
    // this.store.dispatch(
    //   BookingActions.setPassengersInfo({ passengersInfo: this.passengersInfo })
    // );
    if (this.tripIdInCart) {
      this.router.navigate([
        '/booking/summary',
        { id: this.tripIdInCart, edit: true },
      ]);
    } else {
      this.router.navigateByUrl('/booking/summary');
    }
  }
}
