import { createActionGroup, props } from '@ngrx/store';
import {
  ContactDetails,
 
  PassengerInfo, PassengerType,
} from 'src/app/shared/models/booking.model';
import { IBookingFlight } from 'src/app/shared/models/flight-data.model';
import { Trip } from 'src/app/shared/models/shopping-cart.model';

export const BookingActions = createActionGroup({
  source: 'Booking data',
  events: {
    'Set booking initial state': props<Trip>(),
    'Set flight': props<{ flightData: IBookingFlight }>(),
    'Set passengers info': props<{ passengersInfo: Array<PassengerInfo> }>(),
    'Set passengers': props<{ passengers: Array<PassengerType> }>(),
    'Set contact details': props<ContactDetails>(),
  },
});
