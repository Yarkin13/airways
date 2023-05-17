import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IFlightData } from 'src/app/shared/models/flight-data.model';

export const selectFlightData = createFeatureSelector<IFlightData>('flightData');

export const selectFlightTo = createSelector(
  selectFlightData,
  (state: IFlightData) => state.flightTo
);

export const selectFlightBack = createSelector(
  selectFlightData,
  (state: IFlightData) => state.flightBack
);

export const selectFlightNotReady = createSelector(selectFlightData, (state: IFlightData) => {
  if (state.type === 'roundTrip' && state.flightTo && state.flightBack) return false;
  if (state.type === 'oneWay' && state.flightTo) return false;
  return true;
});
