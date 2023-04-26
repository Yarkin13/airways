import { createActionGroup, props } from '@ngrx/store';
import { BookedFlight, Passenger } from 'src/app/shared/models/booked-flights.model';

export const BookingActions = createActionGroup({
  source: 'Booking data',
  events: {
    'Set flights': props<{ flights: Array<BookedFlight> }>(),
    'Set passengers': props<{ passengers: Array<Passenger> }>(),
  },
});
