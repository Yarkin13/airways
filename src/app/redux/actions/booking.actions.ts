import { createActionGroup, props } from '@ngrx/store';
import {
  ContactDetails,
  Flight,
  PassengerInfo, PassengerType,
} from 'src/app/shared/models/booking.model';
import { Trip } from 'src/app/shared/models/shopping-cart.model';

export const BookingActions = createActionGroup({
  source: 'Booking data',
  events: {
    'Set booking initial state': props<Trip>(),
    'Set flight': props<{ flight: Flight }>(),
    'Set passengers info': props<{ passengersInfo: Array<PassengerInfo> }>(),
    'Set passengers': props<{ passengers: Array<PassengerType> }>(),
    'Set contact details': props<ContactDetails>(),
  },
});
