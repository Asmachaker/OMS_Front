import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,  throwError } from "rxjs";
import { environment } from '../../environments/environment';
import { Booking } from '../_models/booking';
import { Bordereau } from '../_models/Bordereau';
import { Client } from '../_models/Client';




const apiUrl =environment.backendUrl;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
  

@Injectable({
  providedIn: 'root'
})
export class BordereauService {
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
  
  allBordereaus(): Observable<Bordereau>{
    return this.http.get<Bordereau>(`${apiUrl}bordereau/getAllbordereaus`, httpOptions);
}

GetBordereau(id: number) : Observable <Bordereau>  {
  return this.http.get<Bordereau>(`${apiUrl}bordereau/GetBordereau/${id}`);
  }

  GenerateFactureAvoir(array : Array<Booking>)  {
    return this.http.post(`${apiUrl}bordereau/generateFacture`,array);
    }

    GenerateBordereau(client :Client)  {
      return this.http.post(`${apiUrl}bordereau/addbordereauClient`,client);
      }
  
}