import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { selectCurrencySign, selectDateFormatPipeString } from 'src/app/redux/selectors/header-data.selectors';
import { Trip } from 'src/app/shared/models/shopping-cart.model';
import { selectUserOrdersInCur } from 'src/app/redux/selectors/user-orders.selectors';
import { MaterialModule } from 'src/app/material/material.module';

@UntilDestroy()
@Component({
  selector: 'app-user-account',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'number',
    'flight',
    'tripType',
    'dateTime',
    'passengers',
    'price',
  ];
  dataSource = new MatTableDataSource<Trip>();
  tripCount = 0;
  currency = '€';
  dateFormatStr = '';

  constructor(
    private store: Store,
    private router: Router,
  ) {
    this.store
      .select(selectUserOrdersInCur)
      .pipe(untilDestroyed(this))
      .subscribe((value) => {
        this.tripCount = value.length;
        this.dataSource.data = value;
      });
    this.store
      .select(selectCurrencySign)
      .pipe(untilDestroyed(this))
      .subscribe((value) => {
        this.currency = value;
      });
    this.store
      .select(selectDateFormatPipeString)
      .pipe(untilDestroyed(this))
      .subscribe((value) => {
        this.dateFormatStr = value;
      });

    this.dataSource.sortingDataAccessor = (data, sortHeaderId) => {
      switch (sortHeaderId) {
        case 'number':
          return data.flight.oneWay.flightNumber;
        case 'flight':
          return data.flight.oneWay.from.name;
        case 'tripType':
          return data.flight.tripType;
        case 'dateTime':
          return data.flight.oneWay.takeoffDate;
        case 'price':
          return +data.totalCost;
        default:
          return '';
      }
    };
  }

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  redirectToMain() {
    this.router.navigateByUrl('/booking/main');
  }

  redirectToSummary(element: Trip) {
    this.router.navigate(['/booking/summary', { id: element.id }]);
  }
}
