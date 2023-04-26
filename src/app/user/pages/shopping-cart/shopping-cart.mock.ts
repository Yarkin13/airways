interface PassengerInfo {
  firstName: string;
  lastName: string;
  type: 'adult' | 'child' | 'infant';
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

export interface Trip {
  passengers: {
    adult?: number;
    child?: number;
    infant?: number;
  };
  flight: {
    tripType: 'Round Trip' | 'One Way';
    number: string;
    oneWay: FlightInfo;
    returnWay?: FlightInfo;
    price: string;
  };
  passengersInfo: Array<PassengerInfo>;
  contactDetails: {
    code: string,
    mobile: string,
    email: string,
  }
  totalCost: string;
}

export const shoppingCartData: Array<Trip> = [
  {
    passengers: {
      adult: 1,
      child: 1,
      infant: 1,
    },
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
        type: 'adult',
        gender: 'male',
        dateOfBirth: '',
        fare: '166.00',
        charge: '91.31',
        seat: 'Seat 19E',
      },
      {
        firstName: 'LiLi',
        lastName: 'Potter',
        type: 'child',
        gender: 'female',
        dateOfBirth: '',
        fare: '106.00',
        charge: '90.08',
        seat: 'Seat 20E',
      },
      {
        firstName: 'James',
        lastName: 'Potter',
        type: 'infant',
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
    passengers: {
      adult: 1,
    },
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
        type: 'adult',
        gender: 'female',
        dateOfBirth: '',
        fare: '20.96',
        charge: '10.00',
        seat: 'Seat 20E',
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
