import { Trip } from 'src/app/shared/models/shopping-cart.model';

export const shoppingCartData: Array<Trip> = [
  {
    id: '1',
    passengers: [
      {
        type: 'Adult',
        count: 1,
        fare: '166.00',
        charge: '91.31',
      },
      {
        type: 'Child',
        count: 1,
        fare: '106.00',
        charge: '90.08',
      },
      {
        type: 'Infant',
        count: 1,
        fare: '88.00',
        charge: '10.00',
      },
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
        passengerType: 'Adult',
        gender: 'Male',
        dateOfBirth: '',
        baggage: '23',
        seat: '19E',
        id: '1',
        needSpecialAssistance: false,
      },
      {
        firstName: 'LiLi',
        lastName: 'Potter',
        passengerType: 'Child',
        gender: 'Female',
        dateOfBirth: '',
        baggage: '12',
        seat: '20E',
        id: '2',
        needSpecialAssistance: false,
      },
      {
        firstName: 'James',
        lastName: 'Potter',
        passengerType: 'Infant',
        gender: 'Male',
        dateOfBirth: '',
        id: '3',
        needSpecialAssistance: false,
      },
    ],
    totalCost: '551.39',
  },
  {
    id: '2',
    passengers: [
      {
        type: 'Adult',
        count: 1,
        fare: '20.96',
        charge: '11.53',
      },
    ],
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
        passengerType: 'Adult',
        gender: 'Female',
        dateOfBirth: '',
        seat: '20E',
        id: '1',
        needSpecialAssistance: false,
      },
    ],
    totalCost: '32.49',
  },
];
