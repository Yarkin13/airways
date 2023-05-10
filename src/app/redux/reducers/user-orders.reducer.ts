import { createReducer, on } from '@ngrx/store';
import { shoppingCartData } from 'src/app/shared/shopping-cart.mock';
import { UserOrdersActions } from '../actions/user-orders.actions';
import { UserOrdersData } from '../state.models';

export const initialState: UserOrdersData = {
  orders: shoppingCartData,
};

export const userOrdersReducer = createReducer(
  initialState,
  on(
    UserOrdersActions.addToOrders,
    (state, { orders }): UserOrdersData => ({ ...state, orders: [...state.orders, ...orders] })
  ),
);
