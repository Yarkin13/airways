import { createActionGroup, props } from '@ngrx/store';
import { Flight, PassengerInfo } from 'src/app/shared/models/booking.model';

export const BookingActions = createActionGroup({
  source: 'Booking data',
  events: {
    'Set flight': props<{ flight: Flight }>(),
    'Set passengers info': props<{ passengersInfo: Array<PassengerInfo> }>(),
  },
});
