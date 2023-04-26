import {
  Component,
  ViewEncapsulation,
  Input,
  OnInit,
  Inject,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { selectHeaderDate } from 'src/app/redux/selectors/header-data.selectors';
import { DateFormat } from './date-format';

@Component({
  selector: 'dates',
  templateUrl: './dates.component.html',
  styleUrls: ['./dates.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: MAT_DATE_FORMATS, useClass: DateFormat }],
})
export class DatesComponent implements OnInit {
  @Input() flightSearchForm!: FormGroup;
  @Input() flightType!: string;

  dateFormat!: string;
  dateTo: FormControl = new FormControl<Date | null>(null);
  dateBack: FormControl = new FormControl<Date | null>(null);

  constructor(
    private store: Store,
    @Inject(MAT_DATE_FORMATS) public config: DateFormat
  ) {}

  ngOnInit() {
    // eslint-disable-next-line @ngrx/no-store-subscription
    this.store.select(selectHeaderDate).subscribe((date) => {
      this.config.value = date;
      this.dateFormat = date;
      this.dateTo = new FormControl(this.dateTo.value);
      this.dateBack = new FormControl(this.dateBack.value);
    });
  }

  rangePickerChange() {
    this.dateToControl?.setValue(new Date(this.dateTo.value));
    this.dateBackControl?.setValue(new Date(this.dateBack.value));
  }

  datePickerChange() {
    this.dateToControl?.setValue(new Date(this.dateTo.value));
    this.dateBackControl?.setValue(null);
  }

  get dateToControl() {
    return this.flightSearchForm.get('dateTo');
  }
  get dateBackControl() {
    return this.flightSearchForm.get('dateBack');
  }
}
