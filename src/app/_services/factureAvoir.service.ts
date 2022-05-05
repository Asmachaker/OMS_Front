import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,  throwError } from "rxjs";
import { environment } from '../../environments/environment';
import { Booking } from '../_models/booking';

import { FactureAvoir } from '../_models/factureAvoir';


const apiUrl =environment.backendUrl;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
  

@Injectable({
  providedIn: 'root'
})
export class FactureAvoirService {
  constructor(private http: HttpClient) {
  }


  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A factureAvoir-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a factureAvoir-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
  
  allfactureAvoirs(): Observable<FactureAvoir>{
    return this.http.get<FactureAvoir>(`${apiUrl}factureAvoir/getAllFactureAvoir`, httpOptions);
}


addFactureAvoir(factureAvoir: FactureAvoir) {

return this.http.post(`${apiUrl}factureAvoir/addFactureAvoir`, factureAvoir);
}
GetFactureAvoir(id: BigInt) : Observable <FactureAvoir>  {
  return this.http.get<FactureAvoir>(`${apiUrl}factureAvoir/GetFactureAvoir/`+id);}

  MarquerFactureAvoir(factureId: BigInt) {

    return this.http.post(`${apiUrl}factureAvoir/EnableFactureAvoir/`+factureId,httpOptions);
    }

    GenerateFactureAvoir(array : Array<Booking>,id: BigInt )  {
      return this.http.post<any>(`${apiUrl}factureAvoir/generateFactureAvoir/`+id,array);
      }

}