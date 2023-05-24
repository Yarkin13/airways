import { IEmptyFlight, IFlightInfo } from './flight-info.model';

export interface IFlightData {
  status: string;
  from: string;
  to: string;
  fromKey: string;
  toKey: string;
  type: string;
  dateTo: string;
  dateBack: null | string;
  adult: number;
  child: number;
  infant: number;
  flightTo: null | IFlightInfo;
  flightBack: null | IFlightInfo;
  flights: Array<IFlightInfo | IEmptyFlight>[]
}

export interface ISetFlightProps {
  from: string;
  to: string;
  fromKey: string;
  toKey: string;
  type: string;
  adult: number;
  child: number;
  infant: number;
  dateTo: string;
  dateBack: null | string;
}

export interface IBookingFlight {
  adult: number;
  child: number;
  infant: number;
  flightTo: IFlightInfo;
  flightBack: IFlightInfo | null;
}
