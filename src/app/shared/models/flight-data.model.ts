import { PassengerType } from './booking.model';
import { IFlightInfo } from './flight-info.model';

export interface IFlightData {
  from: string;
  to: string;
  type: string;
  dateTo: string;
  dateBack: null | string;
  passengers: PassengerType[];
  flightTo: null | IFlightInfo;
  flightBack: null | IFlightInfo;
}

export interface ISetFlightProps {
  from: string;
  to: string;
  type: string;
  passengers: PassengerType[];
  dateTo: string;
  dateBack: null | string;
}

export interface IBookingFlight {
  passengers: PassengerType[];
  flightTo: IFlightInfo;
  flightBack: IFlightInfo | null;
}
