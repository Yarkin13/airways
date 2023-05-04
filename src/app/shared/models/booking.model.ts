export interface PassengerInfo {
  firstName: string;
  lastName: string;
  type: 'Adult' | 'Child' | 'Infant';
  gender: 'male' | 'female';
  dateOfBirth: '';
  baggage?: string;
  seat?: string;
}

export interface FlightInfo {
  flightNumber: string,
  from: {
    key: string,
    country: string,
    city: string,
    name: string
  },
  to: {
    key: string,
    country: string,
    city: string,
    name: string
  },
  takeoffDate: string;
  landingDate: string;
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
