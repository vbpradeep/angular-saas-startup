import { Injectable, Injector } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, from, of } from 'rxjs';
import { concatMap, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AppGuardHelper implements CanActivate {
  public constructor(public injector: Injector) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return from(route.data.guards).pipe(
      concatMap((value) => {
        const guard = this.injector.get(value);
        const permissionEnum = route.data.permission && route.data.permission.enum;
        const result = guard.canActivate(route, state, permissionEnum);
        if (result instanceof Observable) {
          return result;
        } else if (result instanceof Promise) {
          return from(result);
        } else {
          return of(result);
        }
      }),
      first((x) => x === false || x instanceof UrlTree, true)
    );
  }
}
