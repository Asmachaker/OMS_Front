import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User} from '../_models/User';
import { UserLogin} from '../_models/UserLogin'
import { AdminsService } from './admins.service';
import { NgForm } from "@angular/forms";
import { environment } from '../../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  const apiUrl =environment.backendUrl;
  
  @Injectable({ providedIn: "root" })
  export class AuthService {
    isLogin = false;

  
    constructor(private http: HttpClient, private router: Router, private userService: AdminsService) {}
  
   
    
    login(userLogin:UserLogin) {
           return this.http.post<User>(`${apiUrl}admin/authenticate`,userLogin)
    
    }

    sendEmail(email:string) {
      return this.http.post(`${apiUrl}admin/sendEmail`,email)

}

    resetPassword(password:string, id:string) {
  return this.http.post(`${apiUrl}admin/resetPassword/${id}`,password)}
   
    getUserById(id:number){
       return this.http.get<User>(`${apiUrl}admin/GetAdmin/`+id.toString());
    }

    getOldPassword(id:string){
      return this.http.get(`${apiUrl}admin/GetMdp/`+id, {responseType: 'text'});
   }
  
    getRole(){
      return localStorage.getItem('role');
    }


    isLoggedIn() {
      const loggedIn = localStorage.getItem('STATE');
      if (loggedIn == 'true')
        this.isLogin = true;
      else
        this.isLogin = false;
      return this.isLogin;
    }

    /* checkAvailability(): boolean {
     if( !!localStorage.getItem('token') && !!localStorage.getItem('role') && !!localStorage.getItem('username') 
      return true ;
    } */

    logout() {
      this.isLogin = false;
      
      localStorage.setItem('STATE', 'false');
      localStorage.setItem('role', '');
      return of({ success: this.isLogin, role: '' });
    }



  }
  


    
