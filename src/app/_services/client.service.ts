import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from "rxjs";
import { environment } from '../../environments/environment';

import { Client } from '../_models/client';


const apiUrl =environment.backendUrl;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
  

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private http: HttpClient) {
  }


  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a client-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
  
  allclients(): Observable<Client>{
    return this.http.get<Client>(`${apiUrl}client/getAllClients`, httpOptions);
}

addClient(client: any) {

return this.http.post(`${apiUrl}client/addClient`, client);
}

modifyClient(client: any) {
return this.http.put(`${apiUrl}client/ModifyClient`, client);
}

GetClient(id: string) : Observable <Client>  {
return this.http.get<Client>(`${apiUrl}client/GetClient/`+id.toString());
}

enableClient(id: string) {
return this.http.post(`${apiUrl}client/EnableClient/${id}` , httpOptions);
}

disableClient(id: string) {
return this.http.post(`${apiUrl}client/DisableClient/${id}`,httpOptions);
}

}



