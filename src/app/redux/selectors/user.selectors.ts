import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserData } from '../state.models';

export const selectUserData = createFeatureSelector<UserData>('userData');

export const selectUserOrdersData = createSelector(
  selectUserData,
  (state: UserData) => state.orders,
);
