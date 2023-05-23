import {
  PassengerType,
  Flight,
  PassengerInfo,
  ContactDetails,
} from './booking.model';

export interface Trip {
  id: string;
  passengers: Array<PassengerType>;
  flight: Flight;
  passengersInfo: Array<PassengerInfo>;
  totalCost: string;
  discount?: string;
  contactDetails: ContactDetails;
}
