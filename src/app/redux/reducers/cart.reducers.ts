import { createReducer, on } from '@ngrx/store';
import { Trip } from 'src/app/shared/models/shopping-cart.model';
import { shoppingCartData } from 'src/app/shared/shopping-cart.mock';
import { CartActions } from '../actions/cart.actions';

export const initialState: Array<Trip> = shoppingCartData;

export const cartReducer = createReducer(
  initialState,
  on(
    CartActions.addToCart,
    (state, trip): Array<Trip> => [...state, trip]
  ),
  on(
    CartActions.removeFromCart,
    (state, { id }): Array<Trip> => state.filter((trip) => !id.includes(trip.id))
  ),
  on(
    CartActions.editCartTrip,
    (state, { id, info }): Array<Trip> => {
      let editTrip = state.find((trip) => id.includes(trip.id));
      if (editTrip) {
        editTrip = {
          ...editTrip,
          passengersInfo: info,
        };
        return [...state.filter((trip) => !id.includes(trip.id)), editTrip];
      }
      return state;
    }
  )
);
