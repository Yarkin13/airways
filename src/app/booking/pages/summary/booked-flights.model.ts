export interface BookedFlight {
  number: string;
  title: string;
  date: string;
  time: string;
}

export interface Passengers {
  name: string;
  type: string;
  count: number;
  fare: string;
  charge: string;
  seat: string | null;
}
