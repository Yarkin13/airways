import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Trip } from 'src/app/shared/models/shopping-cart.model';

export const selectCartData = createFeatureSelector<Array<Trip>>('cart');

export const selectCartCount = createSelector(
  selectCartData,
  (state: Array<Trip>) => state.length,
);
