import { IAirports } from './airports.model';
import { IFlightInfo } from './flight-info.model';

export interface IFlightResponse {
  flightNumber: string;
  form: IAirports;
  to: IAirports;
  takeoffDate: string;
  landingDate: string;
  timeMins: number;
  seats: {
    avaible: number;
    total: number;
  };
  price: {
    eur: number;
    usd: number;
    rub: number;
    pln: number;
  };
  otherFlights: {
    [key: string]: IFlightInfo;
  };
}
