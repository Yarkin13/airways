/* eslint-disable @ngrx/avoid-dispatching-multiple-actions-sequentially */
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from 'src/app/material/material.module';
import { Store } from '@ngrx/store';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
  selectCurrencySign,
  selectDateFormatPipeString,
  selectHeaderCurrency,
} from 'src/app/redux/selectors/header-data.selectors';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PaymentModalComponent } from 'src/app/shared/components/payment-modal/payment-modal.component';
import { MatSort } from '@angular/material/sort';
import { Trip } from 'src/app/shared/models/shopping-cart.model';
import {
  selectCartDataById,
  selectCartDataInCur,
} from 'src/app/redux/selectors/cart.selectors';
import { CartActions } from 'src/app/redux/actions/cart.actions';
import { UserOrdersActions } from 'src/app/redux/actions/user-orders.actions';
import { BookingActions } from 'src/app/redux/actions/booking.actions';
import {
  CURRENCY_EXCHANGE
} from 'src/app/shared/constants/currency';
import { MenuComponent } from './menu/menu.component';
import { PromoInputComponent } from './promo-input/promo-input.component';
import { DiscountService } from '../../services/discount.service';

@UntilDestroy()
@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
  imports: [CommonModule, MaterialModule, MenuComponent, PromoInputComponent],
})
export class ShoppingCartComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'select',
    'number',
    'flight',
    'tripType',
    'dateTime',
    'passengers',
    'price',
  ];
  dataSource = new MatTableDataSource<Trip>();
  selection = new SelectionModel<Trip>(true, []);
  tripCount = 0;
  currency = '';
  headerCurrency = '';
  discount = '';
  dateFormatStr = '';

  constructor(
    private store: Store,
    private router: Router,
    public dialog: MatDialog,
    private discountService: DiscountService
  ) {
    this.store
      .select(selectCartDataInCur)
      .pipe(untilDestroyed(this))
      .subscribe((value) => {
        this.tripCount = value.length;
        this.dataSource.data = value;
        this.selection.setSelection(
          ...this.selection.selected.map(
            (s) => value.find((row) => row.id === s.id) as Trip
          )
        );
      });
    this.store
      .select(selectCurrencySign)
      .pipe(untilDestroyed(this))
      .subscribe((value) => {
        this.currency = value;
      });
    this.store
      .select(selectHeaderCurrency)
      .pipe(untilDestroyed(this))
      .subscribe((value) => {
        this.headerCurrency = value;
      });
    this.store
      .select(selectDateFormatPipeString)
      .pipe(untilDestroyed(this))
      .subscribe((value) => {
        this.dateFormatStr = value;
      });
    this.discountService.getDiscount().subscribe((value) => {
      this.discount = value;
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

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Trip): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.flight.oneWay.flightNumber + 1
    }`;
  }

  /** Gets the total cost of all transactions + disc */
  getTotalCost() {
    const disc = +this.discount;
    const total = this.dataSource.data
      .filter((el) => this.selection.isSelected(el))
      .map((el) => +el.totalCost)
      .reduce((acc, value) => acc + value, 0);

    if (total && disc) {
      return (total * (1 - 0.01 * disc)).toFixed(2);
    }
    return total ? total.toFixed(2) : total;
  }

  redirectToMain() {
    this.router.navigateByUrl('/booking/main');
  }

  handlePayment() {
    this.dialog
      .open(PaymentModalComponent, {
        width: '400px',
        data: {
          total: this.currency + this.getTotalCost(),
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === 'CONFIRMED') {
          const selectedTrip = this.selection.selected.map((trip) => ({
            ...trip,
            discount: this.discount,
            totalCost: (
              +trip.totalCost
              / CURRENCY_EXCHANGE[this.headerCurrency]
            )
              .toFixed(2)
              .toString(),
          }));
          this.store.dispatch(
            UserOrdersActions.addToOrders({
              orders: selectedTrip,
            })
          );

          this.store.dispatch(
            CartActions.removeFromCart({
              id: this.selection.selected.map((trip) => trip.id),
            })
          );
          this.selection.clear();
        }
      });
  }

  handleEdit(targetElement: Trip) {
    this.store
      .select(selectCartDataById(targetElement.id))
      .pipe(untilDestroyed(this))
      .subscribe((value) => {
        if (value) {
          this.store.dispatch(BookingActions.setBookingInitialState(value));
        }
      });
    this.router.navigate(['/booking/booking', { id: targetElement.id }]);
  }

  handleDelete(tripId: string) {
    this.selection.setSelection(
      ...this.selection.selected.filter((s) => tripId !== s.id)
    );
    this.store.dispatch(CartActions.removeFromCart({ id: [tripId] }));
  }
}
