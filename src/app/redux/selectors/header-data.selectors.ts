import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CURRENCY_SIGN } from 'src/app/shared/constants/currency';
import { HeaderData } from '../state.models';

const selectHeaderData = createFeatureSelector<HeaderData>('headerData');

export const selectHeaderDate = createSelector(
  selectHeaderData,
  (state: HeaderData) => state.dateValue,
);

export const selectHeaderCurrency = createSelector(
  selectHeaderData,
  (state: HeaderData) => state.currencyValue,
);

export const selectCurrencySign = createSelector(
  selectHeaderCurrency,
  (currencyValue) => CURRENCY_SIGN[currencyValue],
);
