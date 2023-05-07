import { Flight } from 'src/app/shared/models/booked-flights.model';
import { UserRegisterData } from '../core/models/user.model';

export interface State {
  headerData: HeaderData;
  bookingData: Flight;
  cart: Array<Flight>;
  user?: UserRegisterData;
}

export interface HeaderData {
  dateValue: string;
  currencyValue: string;
}
