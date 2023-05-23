import { createActionGroup, props, emptyProps } from '@ngrx/store';
import {
  ContactDetails,
  PassengerInfo,
} from 'src/app/shared/models/booking.model';
import { IBookingFlight } from 'src/app/shared/models/flight-data.model';
import { Trip } from 'src/app/shared/models/shopping-cart.model';

export const BookingActions = createActionGroup({
  source: 'Booking data',
  events: {
    'Set booking initial state': props<Trip>(),
    reset: emptyProps(),
    'Set flight': props<{ flightData: IBookingFlight }>(),
    'Set passengers info': props<{ passengersInfo: Array<PassengerInfo> }>(),
    'Set contact details': props<ContactDetails>(),
    'Remove passengers info': emptyProps(),
  },
});
