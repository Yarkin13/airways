import { createReducer, on } from '@ngrx/store';
import { Flight } from 'src/app/shared/models/booked-flights.model';
import { CartActions } from '../actions/cart.actions';

export const initialState: Array<Flight> = [];

export const cartReducer = createReducer(
  initialState,
  on(
    CartActions.addToCart,
    (state, flight): Array<Flight> => [...state, flight]
  )
);
