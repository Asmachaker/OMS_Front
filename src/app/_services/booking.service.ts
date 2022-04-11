import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,  throwError } from "rxjs";
import { environment } from '../../environments/environment';
import { Booking } from '../_models/booking';




const apiUrl =environment.backendUrl;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
  

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  constructor(private http: HttpClient) {
  }


  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A taille-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a taille-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
  
  allBookings(): Observable<Booking>{
    return this.http.get<Booking>(`${apiUrl}booking/getAllbookings`, httpOptions);
}
}