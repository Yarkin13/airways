export const STEPS: Record<string, Array<boolean>> = {
  '/booking/flights': [true, false, false],
  '/booking/booking': [false, true, false],
  '/booking/summary': [false, false, true],
  default: [false, false, true],
};
