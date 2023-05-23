import { Component, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { BookingActions } from 'src/app/redux/actions/booking.actions';
import { selectBookingTrip } from 'src/app/redux/selectors/booking.selectors';
import {
  ContactDetails,
  PassengerInfo,
} from 'src/app/shared/models/booking.model';

@UntilDestroy()
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent {
  passengersByType: ('Adult' | 'Child' | 'Infant')[] = [];

  initPassengersLength = 0;

  tripIdInCart = '';

  passengersInfo: PassengerInfo[] = [];

  passengersInfoForRender: PassengerInfo[] = [];

  submitEmitter: EventEmitter<void> = new EventEmitter();

  passengersInfoFormsValidArray: boolean[] = [];

  contactDetailsValid = false;

  contactDetailsInfo: ContactDetails;

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
        this.passengersInfo = [...value.passengersInfo];
        this.passengersInfoForRender = [...value.passengersInfo];

        value.passengers.forEach((passengerType) => {
          for (let i = 0; i < passengerType.count; i += 1) {
            this.passengersByType.push(passengerType.type);
          }
        });
      });

    this.initPassengersLength =
      this.passengersInfo.length || this.passengersByType.length;
  }

  getPassengersValidInfo(value: boolean) {
    this.passengersInfoFormsValidArray.push(value);
  }

  getContactDetails(value: ContactDetails) {
    this.contactDetailsInfo = value;
  }

  getPassengersFormInfo(value: PassengerInfo) {
    if (this.passengersInfo.find((passenger) => passenger.id === value.id)) {
      this.passengersInfo[
        this.passengersInfo.findIndex((passenger) => passenger.id === value.id)
      ] = value;
    } else {
      this.passengersInfo.push(value);
    }
  }

  getContactDetailsValid(value: boolean) {
    this.contactDetailsValid = value;
  }

  handleContinue() {
    this.submitEmitter.emit();

    const validPassengersForm = this.passengersInfoFormsValidArray.every(
      (item) => item === true
    );

    if (validPassengersForm && this.contactDetailsValid) {
      /* eslint-disable-next-line */
      this.store.dispatch(
        BookingActions.setPassengersInfo({
          passengersInfo: this.passengersInfo,
        })
      );
      /* eslint-disable-next-line */
      this.store.dispatch(
        BookingActions.setContactDetails(this.contactDetailsInfo)
      );

      if (this.tripIdInCart) {
        this.router.navigate([
          '/booking/summary',
          { id: this.tripIdInCart, edit: true },
        ]);
      } else {
        this.router.navigateByUrl('/booking/summary');
      }
    }

    this.passengersInfoFormsValidArray = [];
    this.passengersInfo = [];
  }
}
