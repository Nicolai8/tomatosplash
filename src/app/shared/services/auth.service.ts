import { Injectable, OnDestroy } from '@angular/core';
import { ConfigurationService } from './configuration.service';
import { HttpService } from './http.service';
import { Observable } from 'rxjs/Observable';
import { isEmpty } from '../utils';
import { Subscription } from 'rxjs/Subscription';
import * as layout from '../actions/layout';
import * as fromRoot from '../reducers';
import { Store } from '@ngrx/store';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class AuthService implements OnDestroy {
  isAuthorized$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  private subscription: Subscription;

  constructor(
    private store$: Store<fromRoot.State>,
    private configurationService: ConfigurationService,
    private http: HttpService,
  ) {
    this.subscription = this.configurationService.config$.subscribe((config) => {
      if (isEmpty(config)) {
        this.isAuthorized$.next(false);
        return;
      }

      this.authorize(config);
    });
  }

  private authorize(config): void {
    this.http.post('/api/login', {
      username: config.dbUserName,
      password: config.dbPassword,
    }).catch(() => {
      return Observable.of(false);
    }).subscribe((result) => {
      if (result || typeof result === 'boolean') {
        this.isAuthorized$.next(result);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
