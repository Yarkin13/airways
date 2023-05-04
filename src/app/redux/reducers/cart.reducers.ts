import { createReducer, on } from '@ngrx/store';
import { Trip } from 'src/app/shared/models/shopping-cart.model';
import { shoppingCartData } from 'src/app/shared/shopping-cart.mock';
import { CartActions } from '../actions/cart.actions';

export const initialState: Array<Trip> = shoppingCartData;

export const cartReducer = createReducer(
  initialState,
  on(
    CartActions.addToCart,
    (state, flight): Array<Trip> => [...state, flight]
  )
);
