import { Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { selectUrl } from 'src/app/redux/selectors/router.selectors';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { STEPS } from 'src/app/shared/constants';
import { selectCartCount } from 'src/app/redux/selectors/cart.selectors';
import { Router } from '@angular/router';
import { AuthComponent } from '../auth/auth.component';

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

  constructor(private store: Store, public dialog: MatDialog, public router: Router) {
    this.path$ = this.store.select(selectUrl);
    this.path$.pipe(untilDestroyed(this)).subscribe((value) => {
      if (value === '/booking/main') {
        this.isMainPage = true;
        this.isUserPage = false;
      } else if (value === '/user/account' || value === '/user/cart') {
        this.isMainPage = false;
        this.isUserPage = true;
      } else {
        this.isMainPage = false;
        this.isUserPage = false;
        this.currentStep = STEPS[value] || STEPS['default'];
      }
    });
    this.store.select(selectCartCount).pipe(untilDestroyed(this)).subscribe((value) => {
      this.cartCount = value;
      if (value > 0) {
        this.badgeHidden = false;
      } else {
        this.badgeHidden = true;
      }
    });
  }

  openAuthModal() {
    this.dialog.open(AuthComponent);
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
}
