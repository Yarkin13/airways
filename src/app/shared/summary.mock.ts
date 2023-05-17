import { Flight, PassengerInfo, PassengerType } from './models/booking.model';

export const flight: Flight = {
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
};

export const passengersInfo: Array<PassengerInfo> = [
  {
    firstName: 'Harry',
    lastName: 'Potter',
    passengerType: 'Adult',
    gender: 'Male',
    dateOfBirth: '',
    baggage: '23',
    seat: '19E',
    needSpecialAssistance: false,
    id: '1',
  },
  {
    firstName: 'LiLi',
    lastName: 'Potter',
    passengerType: 'Child',
    gender: 'Female',
    dateOfBirth: '',
    baggage: '12',
    seat: '20E',
    needSpecialAssistance: false,
    id: '1',
  },
  {
    firstName: 'James',
    lastName: 'Potter',
    passengerType: 'Infant',
    gender: 'Male',
    dateOfBirth: '',
    needSpecialAssistance: false,
    id: '1',
  },
];

export const passengers: Array<PassengerType> = [
  {
    type: 'Adult',
    count: 1,
  },
  {
    type: 'Child',
    count: 1,
  },
  {
    type: 'Infant',
    count: 1,
  },
];
