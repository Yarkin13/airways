import { createReducer, on } from '@ngrx/store';
import { Trip } from 'src/app/shared/models/shopping-cart.model';
import { Flight, PassengerType } from 'src/app/shared/models/booking.model';
import { BookingActions } from '../actions/booking.actions';

export const initialState: Trip = {
  id: '',
  flight: {
    tripType: 'One Way',
    oneWay: {
      flightNumber: '',
      from: {
        key: '',
        country: '',
        city: '',
        name: '',
      },
      to: {
        key: '',
        country: '',
        city: '',
        name: '',
      },
      takeoffDate: '',
      landingDate: '',
      seats: {
        available: 0,
        total: 0,
      },
    },
    price: '',
  },
  passengersInfo: [],
  passengers: [],
  totalCost: '',
  contactDetails: {
    countryCode: '',
    phone: '',
    email: '',
  },
};

export const bookingReducer = createReducer(
  initialState,
  on(BookingActions.setBookingInitialState, (state, trip): Trip => trip),
  on(BookingActions.reset, (): Trip => ({ ...initialState })),
  on(BookingActions.setFlight, (state, { flightData }): Trip => {
    const { flightTo, flightBack, adult, child, infant } = flightData;
    const flight: Flight = {
      tripType: 'Round Trip',
      oneWay: {
        flightNumber: flightTo.flightNumber,
        from: flightTo.form,
        to: flightTo.to,
        takeoffDate: flightTo.takeoffDate,
        landingDate: flightTo.landingDate,
        seats: {
          available: flightTo.seats.avaible,
          total: flightTo.seats.total,
        },
      },
      price: flightBack
        ? (flightTo.price['eur'] + flightBack.price['eur']).toString()
        : flightTo.price['eur'].toString(),
    };

    if (flightBack) {
      flight.returnWay = {
        flightNumber: flightBack.flightNumber,
        from: flightBack.form,
        to: flightBack.to,
        takeoffDate: flightBack.takeoffDate,
        landingDate: flightBack.landingDate,
        seats: {
          available: flightBack.seats.avaible,
          total: flightBack.seats.total,
        },
      };
    }

    const passengers = [
      { type: 'Adult', count: adult },
      { type: 'Child', count: child },
      { type: 'Infant', count: infant },
    ].filter((p) => p.count > 0) as PassengerType[];

    return { ...state, passengers, flight };
  }),
  on(
    BookingActions.setPassengersInfo,
    (state, passengersInfo): Trip => ({
      ...state,
      passengersInfo: passengersInfo.passengersInfo,
    })
  ),
  on(
    BookingActions.setContactDetails,
    (state, contactDetails): Trip => ({ ...state, contactDetails })
  ),
  on(BookingActions.removePassengersInfo, (state): Trip => ({ ...state, passengersInfo: [] }))
);
