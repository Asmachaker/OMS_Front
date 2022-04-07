import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from "rxjs";
import { environment } from '../../environments/environment';

import { Taille } from '../_models/taille';


const apiUrl =environment.backendUrl;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
  

@Injectable({
  providedIn: 'root'
})
export class TailleService {
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
  
  alltailles(): Observable<Taille>{
    return this.http.get<Taille>(`${apiUrl}taille/getAllTaille`, httpOptions);
}

deleteTaille(id:string)
{
  return this.http.post(`${apiUrl}taille/deleteTaille`,id.toString());

}

addTaille(taille: Taille) {

return this.http.post(`${apiUrl}taille/addTaille`, taille);
}

modifyTaille(taille: any) {
return this.http.put(`${apiUrl}taille/ModifyTaille`, taille);
}

GetTaille(id: string) : Observable <Taille>  {
return this.http.get<Taille>(`${apiUrl}taille/GetTaille/`+id.toString());
}


}