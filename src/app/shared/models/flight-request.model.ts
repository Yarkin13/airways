export interface IFlightRequest {
  fromKey: string;
  toKey: string;
  forwardDate: string;
  backDate?: string;
}
