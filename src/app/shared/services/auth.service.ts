import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { ConfigurationService } from './configuration.service';
import { HttpService } from './http.service';
import { isEmpty } from '../utils';
import * as fromRoot from '../reducers';
import Config from '../../../../models/config.model';

@Injectable()
export class AuthService implements OnDestroy {
  private _isAuthorized$: ReplaySubject<boolean>;
  private subscription: Subscription;

  constructor(
    private store$: Store<fromRoot.State>,
    private configurationService: ConfigurationService,
    private http: HttpService,
  ) {
  }

  public authorize(config): Observable<boolean> {
    return this.http
      .post('/api/login', {
        username: config.dbUserName,
        password: config.dbPassword,
      })
      .catch(() => {
        return Observable.of(false);
      })
      .mergeMap((result) => {
        return Observable.of(result);
      });
  }

  public logout(): Observable<any> {
    return this.http.post('/api/logout', {});
  }

  private isAuthorized(): Observable<boolean> {
    return this.http.post('/api/login/isAuthenticated', {});
  }

  get isAuthorized$(): Observable<boolean> {
    if (!this._isAuthorized$) {
      this._isAuthorized$ = new ReplaySubject<boolean>(1);

      this.subscription = this.isAuthorized()
        .mergeMap((isAuthorized: boolean) => {
          if (isAuthorized) {
            return Observable.of(true);
          }
          return this.configurationService.config$.mergeMap((config: Config) => {
            if (isEmpty(config)) {
              return Observable.of(false);
            }
            return this.authorize(config);
          });
        })
        .subscribe((result: boolean) => {
          this._isAuthorized$.next(result);
        });
    }

    return this._isAuthorized$.asObservable();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
