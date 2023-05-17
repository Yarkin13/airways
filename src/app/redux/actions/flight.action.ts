import { createAction, props } from '@ngrx/store';
import { ISetFlightProps } from 'src/app/shared/models/flight-data.model';
import { IFlightInfo } from 'src/app/shared/models/flight-info.model';

// export const FlightActions = createActionGroup({
//   source: 'Flight data',
//   events: {
//     'Set flight info': props<{ flightInfo: ISetFlightProps }>(),
//     'Set flight to': props<{ flight: IFlightInfo }>(),
//     'Set flight back': props<{ flight: IFlightInfo }>(),
//     'Delete flight to': props<{ flight: IFlightInfo }>(),
//     'Delete flight back':,
//   },
// });

export const setFlightInfo = createAction(
  '[Flight selection page] Set flight info',
  props<{ flightInfo: ISetFlightProps }>()
);
export const setFlightTo = createAction(
  '[Flight selection page] Set flight to',
  props<{ flight: IFlightInfo }>()
);
export const setFlightBack = createAction(
  '[Flight selection page] Set flight back',
  props<{ flight: IFlightInfo }>()
);
export const deleteFlightTo = createAction('[Flight selection page] Delete flight to');
export const deleteFlightBack = createAction('[Flight selection page] Delete flight back');
export const deleteFlight = createAction('[Flight selection page] Delete flight');
