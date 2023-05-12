export class DateFormat {
  value = 'MM/DD/YYYY';

  get display() {
    return {
      dateInput: this.value,
      monthYearLabel: 'MMMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY',
    };
  }

  get parse() {
    return { dateInput: this.value };
  }
}
