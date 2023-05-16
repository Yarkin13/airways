import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CURRENCY_SIGN } from 'src/app/shared/constants/currency';
import { DATE_TEMPLATE, DATE_TEMPLATE_WITH_DAY } from 'src/app/shared/constants/date-template';
import { HeaderData } from '../state.models';

const selectHeaderData = createFeatureSelector<HeaderData>('headerData');

// DATE
export const selectHeaderDate = createSelector(
  selectHeaderData,
  (state: HeaderData) => state.dateValue,
);

export const selectDateFormatPipeString = createSelector(
  selectHeaderDate,
  (dateValue) => DATE_TEMPLATE[dateValue],
);

export const selectDateFormatPipeStringWithDay = createSelector(
  selectHeaderDate,
  (dateValue) => DATE_TEMPLATE_WITH_DAY[dateValue],
);

// CURRENCY
export const selectHeaderCurrency = createSelector(
  selectHeaderData,
  (state: HeaderData) => state.currencyValue,
);

export const selectCurrencySign = createSelector(
  selectHeaderCurrency,
  (currencyValue) => CURRENCY_SIGN[currencyValue],
);
