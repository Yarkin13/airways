import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Trip } from 'src/app/shared/models/shopping-cart.model';
import { CURRENCY_EXCHANGE } from 'src/app/shared/constants/currency';
import { selectHeaderCurrency } from './header-data.selectors';

export const selectCartData = createFeatureSelector<Array<Trip>>('cart');

export const selectCartCount = createSelector(
  selectCartData,
  (state: Array<Trip>) => state.length,
);

export const selectCartDataInCur = createSelector(
  selectCartData,
  selectHeaderCurrency,
  (cart, currency) => cart.map((trip) => ({
    ...trip,
    totalCost: (+trip.totalCost * CURRENCY_EXCHANGE[currency])
      .toFixed(2)
      .toString()
  }))
);
