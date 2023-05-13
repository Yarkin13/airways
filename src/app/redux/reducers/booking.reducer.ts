import { createReducer, on } from '@ngrx/store';
import {
  flight as bookingFlight,
  passengers as passengersType,
} from 'src/app/shared/summary.mock';
import { Trip } from 'src/app/shared/models/shopping-cart.model';
import { BookingActions } from '../actions/booking.actions';

export const initialState: Trip = {
  id: '',
  flight: bookingFlight,
  passengersInfo: [],
  passengers: passengersType,
  totalCost: '',
};

export const bookingReducer = createReducer(
  initialState,
  on(BookingActions.setBookingInitialState, (state, trip): Trip => trip),
  on(
    BookingActions.setFlight,
    (state, { flight }): Trip => ({ ...state, flight })
  ),
  on(
    BookingActions.setPassengersInfo,
    (state, passengersInfo): Trip => ({
      ...state,
      passengersInfo: passengersInfo.passengersInfo,
    })
  ),
  on(
    BookingActions.setPassengers,
    (state, { passengers }): Trip => ({ ...state, passengers }),
  ),
  on(
    BookingActions.setContactDetails,
    (state, contactDetails): Trip => ({ ...state, contactDetails })
  )
);
