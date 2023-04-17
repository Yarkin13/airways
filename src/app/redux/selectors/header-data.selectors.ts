import { createFeatureSelector, createSelector } from "@ngrx/store";
import { HeaderData } from "../state.models";

const selectHeaderData = createFeatureSelector<HeaderData>("headerData");

export const selectHeaderDate = createSelector(
  selectHeaderData,
  (state: HeaderData) => state.dateValue,
);

export const selectHeaderCurrency = createSelector(
  selectHeaderData,
  (state: HeaderData) => state.currencyValue,
);
