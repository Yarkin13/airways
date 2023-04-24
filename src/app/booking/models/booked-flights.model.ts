export interface BookedFlight {
  number: string;
  title: string;
  date: string;
  time: string;
}

export interface Passenger {
  name: string;
  type: string;
  count: number;
  fare: string;
  charge: string;
  seat: string | null;
}

// for Cart
export interface Flight {
  flights: Array<BookedFlight>,
  passengers: Array<Passenger>,
}
