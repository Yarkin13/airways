import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthComponent } from '../auth/auth.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  badgeHidden = true;

  constructor(public dialog: MatDialog) {}

  openAuthModal() {
    this.dialog.open(AuthComponent);
  }

  toggleBadgeVisibility() {
    this.badgeHidden = !this.badgeHidden;
  }
}
