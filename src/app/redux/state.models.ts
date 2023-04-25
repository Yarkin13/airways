import { Flight } from 'src/app/shared/models/booked-flights.model';

export interface State {
  headerData: HeaderData;
  bookingData: Flight;
  cart: Array<Flight>;
}

export interface HeaderData {
  dateValue: string;
  currencyValue: string;
}
