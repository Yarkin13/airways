import { IAirports } from './airports.model';

export interface IFlightInfo {
  flightNumber?: string;
  form?: IAirports;
  to?: IAirports;
  takeoffDate: string;
  landingDate?: string;
  timeMins?: number;
  seats?: {
    avaible: number;
    total: number;
  };
  price: null | {
    [key: string]: number;
  } ;
}
