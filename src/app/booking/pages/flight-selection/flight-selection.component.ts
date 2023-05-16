import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/http.service';
import { IFlightRequest } from 'src/app/shared/models/flight-request.model';
import { IFlightResponse } from 'src/app/shared/models/flight-response.model';

@Component({
  selector: 'app-flight-selection',
  templateUrl: './flight-selection.component.html',
  styleUrls: ['./flight-selection.component.scss'],
})
export class FlightSelectionComponent {
  status = 'loading';
  flights!: IFlightResponse[];

  constructor(private route: ActivatedRoute, private httpService: HttpService) {
    route.queryParams.subscribe((queryParam) => {
      this.httpService.postFlight(queryParam as IFlightRequest).subscribe({
        next: (data) => {
          this.flights = data;
          this.status = 'success';
          console.log(data);
        },
        error: () => {
          this.status = 'error';
        },
      });
    });
  }
}
