import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { addUserData } from './redux/actions/user-data.actions';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy, OnInit {
  title = 'airways';

  checkAuthenticatedSub: Subscription;

  constructor(private auth: AuthService, private readonly store: Store) {}

  ngOnInit() {
    if (this.auth.getToken()) {
      this.checkAuthenticatedSub = this.auth
        .checkAuthenticated()
        .subscribe((data) => this.store.dispatch(addUserData(data)));
    }
  }
  ngOnDestroy() {
    if (this.checkAuthenticatedSub) {
      this.checkAuthenticatedSub.unsubscribe();
    }
  }
}
