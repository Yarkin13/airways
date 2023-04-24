import { Flight } from 'src/app/booking/models/booked-flights.model';

export interface State {
  headerData: HeaderData;
  cart: Array<Flight>;
}

export interface HeaderData {
  dateValue: string;
  currencyValue: string;
}
