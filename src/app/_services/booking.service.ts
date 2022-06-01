import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,  throwError } from "rxjs";
import { environment } from '../../environments/environment';
import { BookingDTO } from '../_DTO/BookingDTO';
import { BookingClientDTO } from '../_DTO/BookingClientDTO';
import { BookingZoneDTO } from '../_DTO/BookingZoneDTO';
import { Booking } from '../_models/booking';
import { ReplanDTO } from '../_DTO/ReplanDTO';




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

 
Bookingschart(): Observable<BookingDTO>{
  return this.http.get<BookingDTO>(`${apiUrl}booking/bookingChart`, httpOptions);
}

clientChart(): Observable<BookingClientDTO>{
  return this.http.get<BookingClientDTO>(`${apiUrl}booking/clientChart`, httpOptions);
}

zoneChart(): Observable<BookingZoneDTO>{
  return this.http.get<BookingZoneDTO>(`${apiUrl}booking/zoneChart`, httpOptions);
}

Replan(replan:ReplanDTO){
  return this.http.post<any>(`${apiUrl}booking/ReplanOms`,replan);
}
}