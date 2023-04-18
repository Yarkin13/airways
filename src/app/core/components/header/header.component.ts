import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { selectUrl } from 'src/app/redux/selectors/router.selectors';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthComponent } from '../auth/auth.component';

@UntilDestroy()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  badgeHidden = true;

  path$;

  isMainPage = true;

  isUserPage = false;

  currentPage = '';

  constructor(private store: Store, public dialog: MatDialog) {
    this.path$ = this.store.select(selectUrl);
    this.path$.pipe(untilDestroyed(this)).subscribe((value) => {
      if (value === '/booking/main') {
        this.isMainPage = true;
      } else if (value === '/user') {
        this.isMainPage = false;
        this.isUserPage = true;
      } else {
        this.isMainPage = false;
        this.isUserPage = false;
        this.currentPage = value;
      }
    });
  }

  openAuthModal() {
    this.dialog.open(AuthComponent);
  }

  toggleBadgeVisibility() {
    this.badgeHidden = !this.badgeHidden;
  }
}
