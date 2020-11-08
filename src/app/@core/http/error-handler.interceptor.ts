import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger } from '../logger.service';

const log = new Logger('ErrorHandlerInterceptor');

/**
 * Adds a default error handler to all requests.
 */
@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError((error) => this.errorHandler(error)));
  }

  // Customize the default error handler here if needed
  private errorHandler(response: HttpEvent<any>): Observable<HttpEvent<any>> {
    if (!environment.production) {
      // Do something with the error
      log.error('Request error', response);
    }
    this.handleHTTPError(response);
    throw response;
  }

  handleHTTPError(err: any) {
    let errorMsg: string = !!err.error && !!err.error.Message ? err.error.Message : err.statusText;
    if (!errorMsg || errorMsg === '' || errorMsg === 'OK') {
      errorMsg = 'Unable to process request';
    }
    if (!environment.production) {
      errorMsg = err.status + ' ' + errorMsg;
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
