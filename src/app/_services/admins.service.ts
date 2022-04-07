import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { User } from "../_models/User";

const apiUrl =environment.backendUrl;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
  

@Injectable({
    providedIn: "root"
  })
export class AdminsService {
 
constructor(private http: HttpClient) {}
user1: User;

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
  // return an observable with a user-facing error message
  return throwError(
    'Something bad happened; please try again later.');
};

allusers(): Observable<User>{
           return this.http.get<User>(`${apiUrl}admin/getAllUsers`,httpOptions );
}

adduser(user: any) {
  this.user1 = new User();

  return this.http.post(`${apiUrl}admin/addAdmin`, user);
}

modifyuser(user: any) {
  return this.http.put(`${apiUrl}admin/ModifyAdmin`, user);
}

Getuser(id: string) : Observable <User>  {
  return this.http.get<User>(`${apiUrl}admin/GetAdmin/${id}`);
}

enableUser(id: string) {
  return this.http.post(`${apiUrl}admin/EnableAdmin/${id}` , httpOptions);
}

disableUser(id: string) {
  return this.http.post(`${apiUrl}admin/DisableAdmin/${id}`,httpOptions);
}


roleuser(id:string)
{
  return this.http.get("http://localhost:8000/api/users/getRoleById/"+ id);
}
}

