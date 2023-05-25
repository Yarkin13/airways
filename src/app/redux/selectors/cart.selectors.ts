import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CurrencyExchange, Trip } from 'src/app/shared/models/shopping-cart.model';
import { selectHeaderCurrency } from './header-data.selectors';

const selectCartData = createFeatureSelector<Array<Trip>>('cart');

export const selectCartCount = createSelector(
  selectCartData,
  (state: Array<Trip>) => state.length,
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

export const selectCartDataInCur = createSelector(
  selectCartData,
  selectHeaderCurrency,
  (cart, currency) => cart.map((trip) => ({
    ...trip,
    totalCost: (+trip.totalCost * trip.currencyExchange[currency as keyof CurrencyExchange])
      .toFixed(2)
      .toString()
  }))
);
