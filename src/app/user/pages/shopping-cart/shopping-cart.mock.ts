interface PassengerInfo {
  firstName: string;
  lastName: string;
  type: 'Adult' | 'Child' | 'Infant';
  gender: 'male' | 'female';
  dateOfBirth: '';
  fare: string;
  charge: string;
  seat?: string;
}

interface FlightInfo {
  from: string;
  destination: string;
  date: string;
  time: string;
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
    number: string;
    oneWay: FlightInfo;
    returnWay?: FlightInfo;
    price: string;
  };
  passengersInfo: Array<PassengerInfo>;
  contactDetails: {
    code: string;
    mobile: string;
    email: string;
  };
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
      number: 'FR 1925',
      oneWay: {
        from: 'Dublin',
        destination: 'Warsaw Modlin',
        date: 'Wednesday, 1 March, 2023',
        time: '8:40 — 12:00',
      },
      returnWay: {
        from: 'Warsaw Modlin',
        destination: 'Dublin',
        date: 'Saturday, 18 March, 2023',
        time: '7:40 — 11:00',
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
    contactDetails: {
      code: '',
      mobile: '',
      email: '',
    },
    totalCost: '551.39',
  },
  {
    id: '2',
    passengers: [{ type: 'Adult', count: 1 }],
    flight: {
      tripType: 'One Way',
      number: 'FR 1936',
      oneWay: {
        from: 'Gdansk',
        destination: 'Warsaw',
        date: '28 May, 2023',
        time: '15:40 — 16:40',
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
    contactDetails: {
      code: '',
      mobile: '',
      email: '',
    },
    totalCost: '20.96',
  },
];
