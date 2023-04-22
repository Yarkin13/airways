import { BookedFlight, Passengers } from './booked-flights.model';

export const bookedFlights: Array<BookedFlight> = [
  {
    number: 'FR 1925',
    title: 'Dublin — Warsaw Modlin',
    date: 'Wednesday, 1 March, 2023',
    time: '8:40 — 12:00',
  },
  {
    number: 'FR 1925',
    title: 'Warsaw Modlin — Dublin',
    date: 'Saturday, 18 March, 2023',
    time: '7:40 — 11:00',
  },
];

export const bookedPassengers: Array<Passengers> = [
  {
    name: 'Harry Potter',
    type: 'adult',
    count: 1,
    fare: '166.00',
    charge: '91.31',
    seat: 'Seat 19E',
  },
  {
    name: 'LiLi Potter',
    type: 'child',
    count: 1,
    fare: '106.00',
    charge: '90.08',
    seat: 'Seat 20E',
  },
  {
    name: 'James Potter',
    type: 'infant',
    count: 1,
    fare: '88.00',
    charge: '10.00',
    seat: null,
  },
];
