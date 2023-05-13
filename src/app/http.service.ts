import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { API_URL } from './shared/constants';
import { IAirports } from './booking/airports.model';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {}

  getAirports(request: string): Observable<IAirports[]> {
    return this.http
      .get<IAirports[]>(`${API_URL}search/airport?q=${request}`)
      .pipe(
        catchError((err) => {
          console.error(err);
          return [];
        })
      );
  }
}
