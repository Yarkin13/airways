export const DATE_TEMPLATE: Record<string, string> = {
  'MM/DD/YYYY': 'MMM d, yyyy',
  'DD/MM/YYYY': 'd MMM, yyyy',
  'YYYY/DD/MM': 'yyyy, d MMM',
  'YYYY/MM/DD': 'yyyy, MMM d',
};

export const DATE_TEMPLATE_WITH_DAY: Record<string, string> = {
  'MM/DD/YYYY': 'EEEE, MMM d, yyyy',
  'DD/MM/YYYY': 'EEEE, d MMM, yyyy',
  'YYYY/DD/MM': 'EEEE, yyyy, d MMM',
  'YYYY/MM/DD': 'EEEE, yyyy, MMM d',
};
