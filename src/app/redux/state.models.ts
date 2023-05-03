import { Flight } from 'src/app/shared/models/booked-flights.model';
import { Trip } from '../shared/models/shopping-cart.model';

export interface State {
  headerData: HeaderData;
  bookingData: Flight;
  cart: Array<Trip>;
}

export interface HeaderData {
  dateValue: string;
  currencyValue: string;
}
