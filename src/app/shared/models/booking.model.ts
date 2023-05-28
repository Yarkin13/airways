export interface PassengerInfo {
  firstName: string;
  lastName: string;
  passengerType: 'Adult' | 'Child' | 'Infant';
  gender: 'Male' | 'Female';
  needSpecialAssistance: boolean;
  dateOfBirth: string;
  baggage?: string;
  seat?: Seat;
  id: string;
}

export interface Seat {
  oneWay?: string,
  returnWay?: string,
}
export interface FlightInfo {
  flightNumber: string;
  from: {
    key: string;
    country: string;
    city: string;
    name: string;
  };
  to: {
    key: string;
    country: string;
    city: string;
    name: string;
  };
  takeoffDate: string;
  landingDate: string;
  seats: {
    available: number;
    total: number;
  };
}

export interface Flight {
  tripType: 'Round Trip' | 'One Way';
  oneWay: FlightInfo;
  returnWay?: FlightInfo;
  price: string;
}

export interface PassengerType {
  type: 'Adult' | 'Child' | 'Infant';
  count: number;
  fare?: string;
  charge?: string;
}

export interface ContactDetails {
  countryCode: string;
  phone: string;
  email: string;
}
