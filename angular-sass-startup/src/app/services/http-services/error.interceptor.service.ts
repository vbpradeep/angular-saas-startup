import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
  })
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor() {
      //
     }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(tap(evt => {
          if (evt instanceof HttpResponse) {
            if (evt.ok) {
              // 
            }
          }
        }), catchError(err => {
          this.handleHTTPError(err);
          return throwError(err);
        }));
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    handleHTTPError(err) {
      let errorMsg: string = (!!err.error && !!err.error.Message ?  err.error.Message : err.statusText);
      if (!errorMsg || errorMsg === '' || errorMsg === 'OK') {
        errorMsg = 'Unable to process request';
      }
      if (!environment.production) {
        errorMsg = err.status + ' '  + errorMsg;
      }
      if (err.status === 400) {
        return;
      }
      if (err.status === 0) {
        // Network error
        return;
      }
      if ([401].indexOf(err.status) !== -1) {
        // Unauthorized error
        return throwError(err);
      }

      if ([403].indexOf(err.status) !== -1) {
        // Access denied error message
        return throwError(err);
      }

      if ([404, 501, 406, 405].indexOf(err.status) !== -1) {
        // failure error message
        return throwError(err);
      }

      if ([500, 502, 0, 503, 504, 413].indexOf(err.status) !== -1) {
        // Server Error
        return throwError(err);
      } else {

        return throwError(err);
      }
    }
}
