import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserOrdersData } from '../state.models';

const selectUserData = createFeatureSelector<UserOrdersData>('userOrdersData');

export const selectUserOrdersData = createSelector(
  selectUserData,
  (state: UserOrdersData) => state.orders,
);
