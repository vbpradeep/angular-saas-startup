

import { Injectable } from '@angular/core';
import { CentralizedErrorHandlingService } from './centralizedHandlingService';
import { IObserveError } from './globalErrorHandle-service';

@Injectable({
    providedIn: 'root'
})
export class ErrorLoggingService {

    constructor(private cel: CentralizedErrorHandlingService) { }

    logError(ex: IObserveError): void {
       this.cel.postErrors(ex);
    }
}
