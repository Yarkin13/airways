import { createReducer, on } from '@ngrx/store';
import { UserActions } from '../actions/user.actions';
import { UserData } from '../state.models';

export const initialState: UserData = {
  orders: [],
};

export const userReducer = createReducer(
  initialState,
  on(
    UserActions.addToOrders,
    (state, { orders }): UserData => ({ ...state, orders: [...orders] })
  ),
);
