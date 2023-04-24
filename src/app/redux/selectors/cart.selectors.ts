import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Flight } from 'src/app/booking/models/booked-flights.model';

export const selectCartData = createFeatureSelector<Array<Flight>>('cart');

export const selectCartCount = createSelector(
  selectCartData,
  (state: Array<Flight>) => state.length,
);
