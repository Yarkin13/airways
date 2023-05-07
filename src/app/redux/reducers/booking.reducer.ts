import { createReducer, on } from '@ngrx/store';
import { flight as bookingFlight, passengersInfo as bookingPassengers, passengers as passengersType } from 'src/app/shared/summary.mock';
import { Trip } from 'src/app/shared/models/shopping-cart.model';
import { BookingActions } from '../actions/booking.actions';

export const initialState = {
  id: '',
  flight: bookingFlight,
  passengersInfo: bookingPassengers,
  passengers: passengersType,
  totalCost: '',
};

export const bookingReducer = createReducer(
  initialState,
  on(
    BookingActions.setFlight,
    (state, { flight }): Trip => ({ ...state, flight }),
  ),
  on(
    BookingActions.setPassengersInfo,
    (state, { passengersInfo }): Trip => ({ ...state, passengersInfo }),
  ),
);
