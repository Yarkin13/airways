import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
/* eslint-disable-next-line */
import { AuthComponent } from '../components/auth/auth.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(public dialog: MatDialog) {}

  openAuthModal() {
    this.dialog.open(AuthComponent);
  }

  closeAllModal() {
    this.dialog.closeAll();
  }
}
