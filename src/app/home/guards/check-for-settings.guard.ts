import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { select, Store } from '@ngrx/store';

import * as fromHome from '../reducers';
import * as fromConfig from '../../shared/reducers/config';
import Config from '../../../../models/config.model';
import { isEmpty } from '../../shared/utils';

@Injectable()
export class CheckForSettingsGuard implements CanActivate {
  constructor(
    private store: Store<fromHome.State>,
    private router: Router
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.pipe(select(fromConfig.getConfig))
      .mergeMap((config: Config) => {
        const configIsSet = !isEmpty(config);
        if (!configIsSet) {
          this.router.navigate([ '/settings' ]);
        }

        return Observable.of(configIsSet);
      });
  }
}
