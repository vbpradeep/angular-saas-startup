import { Injectable, Injector, ErrorHandler  } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from './error-service';
import { ErrorLoggingService } from './errorLogging-service';

export interface IObserveError {
    message?: string;
    // eslint-disable-next-line @typescript-eslint/ban-types
    error?: {};
    stackTrace?: string;
}

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    constructor(private injector: Injector) { }

    handleError(error: Error| HttpErrorResponse): void {
        const errorService = this.injector.get(ErrorService);
        const logger = this.injector.get(ErrorLoggingService);
        const chunkFailedMessage = /Loading chunk [\d]+ failed/;
        const errorParam: IObserveError = {
            error
        };

        if (error instanceof HttpErrorResponse) {
             // Server Error
             errorParam.message = errorService.getServerMessage(error);
             errorParam.stackTrace = errorService.getServerStack(error);
         } else {
             // Client Error
             errorParam.message = errorService.getClientMessage(error);
             errorParam.stackTrace = errorService.getClientStack(error);
         }
         if (chunkFailedMessage.test(errorParam.message)) {
            window.location.reload();
          }

        // Always log errors
        logger.logError(errorParam);
    }

}
