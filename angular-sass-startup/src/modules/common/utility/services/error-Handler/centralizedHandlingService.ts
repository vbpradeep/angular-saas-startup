import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { IObserveError } from './globalErrorHandle-service';

@Injectable()
export class CentralizedErrorHandlingService {

    public observeError = new BehaviorSubject({});
    public errorHandle = this.observeError.asObservable();
    constructor( private http: HttpClient ) {
     }

    postErrors(error: IObserveError): void {
      this.observeError.next(error);
      if (error.message && error.stackTrace) {
        console.error(error.stackTrace);
      }
    }
}
