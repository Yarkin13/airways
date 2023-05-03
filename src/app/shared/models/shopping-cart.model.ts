export interface PassengerInfo {
  firstName: string;
  lastName: string;
  type: 'Adult' | 'Child' | 'Infant';
  gender: 'male' | 'female';
  dateOfBirth: '';
  fare: string;
  charge: string;
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

export interface PassengerType {
  type: 'Adult' | 'Child' | 'Infant';
  count: number;
}

export interface Trip {
  id: string;
  passengers: Array<PassengerType>;
  flight: {
    tripType: 'Round Trip' | 'One Way';
    oneWay: FlightInfo;
    returnWay?: FlightInfo;
    price: string;
  };
  passengersInfo: Array<PassengerInfo>;
  totalCost: string;
}
