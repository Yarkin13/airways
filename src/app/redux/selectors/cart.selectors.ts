import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Trip } from 'src/app/shared/models/shopping-cart.model';
import { CURRENCY_EXCHANGE } from 'src/app/shared/constants/currency';
import { selectHeaderCurrency } from './header-data.selectors';

const selectCartData = createFeatureSelector<Array<Trip>>('cart');

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

export const selectCartDataById = (id: string) => createSelector(
  selectCartData,
  (cart) => {
    if (cart) {
      return cart.find((trip) => trip.id === id);
    }
    return undefined;
  }
);
