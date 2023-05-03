import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from 'src/app/material/material.module';
import { Store } from '@ngrx/store';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { selectCurrencySign } from 'src/app/redux/selectors/header-data.selectors';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PaymentModalComponent } from 'src/app/shared/components/payment-modal/payment-modal.component';
import { MatSort } from '@angular/material/sort';
import { shoppingCartData, Trip } from './shopping-cart.mock';
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
  dataSource = new MatTableDataSource<Trip>(shoppingCartData);
  selection = new SelectionModel<Trip>(true, []);

  currency = '€';
  discount = '0';

  constructor(
    private store: Store,
    private router: Router,
    public dialog: MatDialog,
    private discountService: DiscountService,
  ) {
    this.store
      .select(selectCurrencySign)
      .pipe(untilDestroyed(this))
      .subscribe((value) => {
        this.currency = value;
      });
    this.discountService.getDiscount().subscribe((value) => {
      this.discount = value;
    });

    this.dataSource.sortingDataAccessor = (data, sortHeaderId) => {
      switch (sortHeaderId) {
        case 'number': return data.flight.oneWay.flightNumber;
        case 'flight': return data.flight.oneWay.from.name;
        case 'tripType': return data.flight.tripType;
        // TO DO: sort dateTime by time stamp
        case 'dateTime': return data.flight.oneWay.takeoffDate;
        case 'price': return +data.totalCost;
        default: return '';
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

  openPaymentModal() {
    this.dialog.open(PaymentModalComponent, {
      width: '400px',
    });
  }

  handleEdit(targetElement: Trip) {
    console.log(targetElement.id);
    this.router.navigateByUrl('/booking/main');
  }
}
