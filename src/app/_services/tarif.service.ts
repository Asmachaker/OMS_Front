import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from "rxjs";
import { environment } from '../../environments/environment';

import { Tarif } from '../_models/tarif';


const apiUrl =environment.backendUrl;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
  

@Injectable({
  providedIn: 'root'
})
export class TarifService {
  constructor(private http: HttpClient) {
  }


  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A tarif-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a tarif-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
  
  alltarifs(): Observable<Tarif>{
    return this.http.get<Tarif>(`${apiUrl}tarif/getAllTarif`, httpOptions);
}

addTarif(tarif: any) {

return this.http.post(`${apiUrl}tarif/addTarif`, tarif);
}

modifyTarif(tarif: any) {
return this.http.put(`${apiUrl}tarif/ModifyTarif`, tarif);
}

GetTarif(id: number) : Observable <Tarif>  {
return this.http.get<Tarif>(`${apiUrl}tarif/GetTarif/${id}`);
}

deleteTarif(id:number)
{
  return this.http.post(`${apiUrl}zone/deleteTarif`,id);

}

}