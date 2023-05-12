import { createReducer, on } from '@ngrx/store';
import { UserOrdersActions } from '../actions/user-orders.actions';
import { UserOrdersData } from '../state.models';

export const initialState: UserOrdersData = {
  orders: [],
};

export const userOrdersReducer = createReducer(
  initialState,
  on(
    UserOrdersActions.addToOrders,
    (state, { orders }): UserOrdersData => ({ ...state, orders: [...state.orders, ...orders] })
  ),
);
