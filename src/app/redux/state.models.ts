import { UserRegisterData } from '../core/models/user.model';
import { IFlightData } from '../shared/models/flight-data.model';
import { Trip } from '../shared/models/shopping-cart.model';

export interface State {
  headerData: HeaderData;
  bookingData: Trip;
  flightData: IFlightData;
  cart: Array<Trip>;
  user?: UserRegisterData;
  userOrders: UserOrdersData;
}

export interface HeaderData {
  dateValue: string;
  currencyValue: string;
}

export interface UserOrdersData {
  orders: Array<Trip>;
}
