interface PassengerInfo {
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

interface FlightInfo {
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

interface PassengerType {
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

export const shoppingCartData: Array<Trip> = [
  {
    id: '1',
    passengers: [
      { type: 'Adult', count: 1 },
      { type: 'Child', count: 1 },
      { type: 'Infant', count: 1 },
    ],
    flight: {
      tripType: 'Round Trip',
      oneWay: {
        flightNumber: 'FR 1925',
        from: {
          key: 'DUB',
          country: 'Ireland',
          city: 'Dublin',
          name: 'Dublin',
        },
        to: {
          key: 'WMI',
          country: 'Poland',
          city: 'Warsaw',
          name: 'Warsaw Modlin',
        },
        takeoffDate: '2023-03-01T08:40:00.000Z',
        landingDate: '2023-03-01T12:00:00.000Z',
      },
      returnWay: {
        flightNumber: 'FR 1925',
        from: {
          key: 'WMI',
          country: 'Poland',
          city: 'Warsaw',
          name: 'Warsaw Modlin',
        },
        to: {
          key: 'DUB',
          country: 'Ireland',
          city: 'Dublin',
          name: 'Dublin',
        },
        takeoffDate: '2023-03-18T07:40:00.000Z',
        landingDate: '2023-03-18T11:00:00.000Z',
      },
      price: '166.00',
    },
    passengersInfo: [
      {
        firstName: 'Harry',
        lastName: 'Potter',
        type: 'Adult',
        gender: 'male',
        dateOfBirth: '',
        fare: '166.00',
        charge: '91.31',
        baggage: '',
        seat: '19E',
      },
      {
        firstName: 'LiLi',
        lastName: 'Potter',
        type: 'Child',
        gender: 'female',
        dateOfBirth: '',
        fare: '106.00',
        charge: '90.08',
        seat: '20E',
      },
      {
        firstName: 'James',
        lastName: 'Potter',
        type: 'Infant',
        gender: 'male',
        dateOfBirth: '',
        fare: '88.00',
        charge: '10.00',
      },
    ],
    totalCost: '551.39',
  },
  {
    id: '2',
    passengers: [{ type: 'Adult', count: 1 }],
    flight: {
      tripType: 'One Way',
      oneWay: {
        flightNumber: 'FR 1936',
        from: {
          key: 'GDN',
          country: 'Poland',
          city: 'Gdansk',
          name: 'Gdansk Lech Walesa',
        },
        to: {
          key: 'WMI',
          country: 'Poland',
          city: 'Warsaw',
          name: 'Warsaw Modlin',
        },
        takeoffDate: '2023-05-28T15:40:00.000Z',
        landingDate: '2023-05-28T16:40:00.000Z',
      },
      price: '20.96',
    },
    passengersInfo: [
      {
        firstName: 'LiLif',
        lastName: 'Potter',
        type: 'Adult',
        gender: 'female',
        dateOfBirth: '',
        fare: '20.96',
        charge: '10.00',
        seat: '20E',
      },
    ],
    totalCost: '20.96',
  },
];
