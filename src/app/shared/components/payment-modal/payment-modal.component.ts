import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-payment-modal',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.scss'],
})
export class PaymentModalComponent {
  constructor(
    public dialogRef: MatDialogRef<unknown, unknown>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onConfirm() {
    this.dialogRef.close('CONFIRMED');
  }
}
