import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent {
  constructor(private router: Router) {}

  redirectToMain() {
    this.router.navigateByUrl('/booking/main');
  }
}
