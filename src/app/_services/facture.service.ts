import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,  throwError } from "rxjs";
import { environment } from '../../environments/environment';

import { Facture } from '../_models/facture';


const apiUrl =environment.backendUrl;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
  

@Injectable({
  providedIn: 'root'
})
export class FactureService {
  constructor(private http: HttpClient) {
  }


  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A facture-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a facture-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
  
  allfactures(): Observable<Facture>{
    return this.http.get<Facture>(`${apiUrl}facture/getAllFacture`, httpOptions);
}


addFacture(facture: Facture) {

return this.http.post(`${apiUrl}facture/addFacture`, facture);
}
GetFacture(id: BigInt) : Observable <Facture>  {
  return this.http.get<Facture>(`${apiUrl}facture/GetFacture/`+id);}

  MarquerFacture(factureId: BigInt) {

    return this.http.post(`${apiUrl}facture/EnableFacture/`+factureId,httpOptions);
    }
  }
