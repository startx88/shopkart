import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { AlertService } from '../services/alert.service';
import { Color } from './enums/color.enum ';

export function errorHandler(error: HttpErrorResponse, alert: AlertService) {
  console.log(error);
  const errorMessage = 'Something went wrong';
  if (!error.error || !error.error.errors) {
    return throwError(errorMessage);
  }

  alert.alertShow({
    message: error.error.errors[0].message,
    color: Color.danger,
  });
  return throwError(error.error.errors);
}
