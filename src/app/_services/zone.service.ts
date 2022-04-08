import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from "rxjs";
import { environment } from '../../environments/environment';

import { ZoneDTO } from '../_models/ZoneDTO';
import { Zone } from '../_models/Zone';

const apiUrl =environment.backendUrl;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
  

@Injectable({
  providedIn: 'root'
})
export class ZoneService {
  constructor(private http: HttpClient) {
  }


  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A zone-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a zone-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
  
  allZones(): Observable<Zone>{
    return this.http.get<Zone>(`${apiUrl}zone/getAllZone`, httpOptions);
}

deleteZone(id:string)
{
  return this.http.post(`${apiUrl}zone/deleteZone`,id);

}

addZone(zone: ZoneDTO) {

return this.http.post(`${apiUrl}zone/addZone`, zone);
}

modifyZone(zone: ZoneDTO) {
return this.http.put(`${apiUrl}zone/ModifyZone`, zone);
}

GetZone(id: string) : Observable <Zone>  {
return this.http.get<Zone>(`${apiUrl}zone/GetZone/`+id);
}


}