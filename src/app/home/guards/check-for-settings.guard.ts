import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../shared/services/auth.service';

@Injectable()
export class CheckForSettingsGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuthorized$
      .mergeMap((isAuthorized: boolean) => {
        if (!isAuthorized) {
          this.router.navigate([ '/settings' ]);
        }

        return Observable.of(isAuthorized);
      });
  }
}
