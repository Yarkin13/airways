/* eslint-disable @ngrx/avoid-dispatching-multiple-actions-sequentially */
import { Component, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUrl } from 'src/app/redux/selectors/router.selectors';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { STEPS } from 'src/app/shared/constants';
import { selectUserInfo } from 'src/app/redux/selectors/user.selectors';
import { removeUser } from 'src/app/redux/actions/user-data.actions';
import { selectCartCount } from 'src/app/redux/selectors/cart.selectors';
import { Router } from '@angular/router';
import { resetFlight } from 'src/app/redux/actions/flight.action';
import { BookingActions } from 'src/app/redux/actions/booking.actions';
import { CartActions } from 'src/app/redux/actions/cart.actions';
import { UserOrdersActions } from 'src/app/redux/actions/user-orders.actions';
import { AuthService } from '../../services/auth.service';
import { ModalService } from '../../services/modal.service';
import { UserRegisterData } from '../../models/user.model';

@UntilDestroy()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  badgeHidden = true;

  cartCount = 0;

  path$;

  isMainPage = true;

  isUserPage = false;

  currentStep: Array<boolean> = [false, false, false];

  isOpaque = false;

  user: UserRegisterData;

  constructor(
    private store: Store,
    public modal: ModalService,
    public router: Router,
    public auth: AuthService
  ) {
    this.path$ = this.store.select(selectUrl);
    this.path$.pipe(untilDestroyed(this)).subscribe((value) => {
      if (value === '/booking/main') {
        this.isMainPage = true;
        this.isUserPage = false;
      } else if (value === '/user/account' || value === '/user/cart' || value === '/404') {
        this.isMainPage = false;
        this.isUserPage = true;
      } else {
        this.isMainPage = false;
        this.isUserPage = false;
        const step = value && value.includes('/booking/flights') ? '/booking/flights' : value;
        this.currentStep = STEPS[step] || STEPS['default'];
      }
    });
    this.store
      .select(selectCartCount)
      .pipe(untilDestroyed(this))
      .subscribe((value) => {
        this.cartCount = value;
        this.badgeHidden = value <= 0;
      });

    this.store
      .select(selectUserInfo)
      .pipe(untilDestroyed(this))
      .subscribe((data) => {
        this.user = data;
      });
  }

  redirectToCart() {
    this.router.navigateByUrl('/user/cart');
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset = window.pageYOffset
      || document.documentElement.scrollTop
      || document.body.scrollTop
      || 0;
    if (offset > 10) {
      this.isOpaque = true;
    } else {
      this.isOpaque = false;
    }
  }

  logout() {
    this.auth.logout();
    this.store.dispatch(removeUser());
    this.router.navigateByUrl('/');
    this.store.dispatch(BookingActions.reset());
    this.store.dispatch(resetFlight());
    this.store.dispatch(CartActions.reset());
    this.store.dispatch(UserOrdersActions.reset());
  }

  redirectToAccount() {
    this.router.navigateByUrl('/user/account');
  }
}
