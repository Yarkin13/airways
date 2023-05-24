import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';
import { selectFlightData } from 'src/app/redux/selectors/flight.selectors';
import { Store } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditMenuComponent } from '../edit-menu/edit-menu.component';

@Component({
  selector: 'app-second-menu',
  standalone: true,
  imports: [CommonModule, MaterialModule, SharedModule, EditMenuComponent],
  templateUrl: './second-menu.component.html',
  styleUrls: ['./second-menu.component.scss'],
})
export class SecondMenuComponent {
  flight$ = this.store.select(selectFlightData);
  showEditForm = false;
  isFlightsPage!: boolean;

  constructor(private store: Store, private route: ActivatedRoute, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isFlightsPage = event.url.includes('booking/flights');
      }
    });
  }

  editFlight() {
    this.showEditForm = !this.showEditForm;
  }

  hideEditForm() {
    this.showEditForm = false;
  }
}
