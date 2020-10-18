import { Injectable} from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UniversalAppInterceptor implements HttpInterceptor {

  constructor() {
    //
   }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      url:  req.url,
      setHeaders: {
           // Custom Header adding
      }
    });
    return next.handle(req);
  }
}
