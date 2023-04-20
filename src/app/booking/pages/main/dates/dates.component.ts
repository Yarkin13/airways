import { Component, ViewEncapsulation, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
// import { MomentDateAdapter } from '@angular/material-moment-adapter';
// import {
//   DateAdapter,
//   MAT_DATE_FORMATS,
//   MAT_DATE_LOCALE,
// } from '@angular/material/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectHeaderDate } from 'src/app/redux/selectors/header-data.selectors';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'dates',
  templateUrl: './dates.component.html',
  styleUrls: ['./dates.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // providers: [
  //   {
  //     provide: DateAdapter,
  //     useClass: MomentDateAdapter,
  //     deps: [MAT_DATE_LOCALE],
  //   },
  //   { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  // ],
})
export class DatesComponent {
  @Input() formName!: FormGroup;

  @Input() flightType!: string;

  @Input() controlName!: string;

  dateFormat$: Observable<string> = this.store.select(selectHeaderDate);

  constructor(private store: Store) {}
}
