import {  Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';
import { UserLogin } from '../../_models/UserLogin';



@Component({
  selector: 'ngx-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})


  export class SigninComponent implements OnInit {

    status: NbComponentStatus ;
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    roles:String;
  
  
 
  
    constructor(
    
      private formBuilder: FormBuilder,
      private router: Router,
      private authService: AuthService,
      private toastrService: NbToastrService
    ) 
    {}

    ngOnInit(): void {
      this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
    })}
  

    get fval() { return this.loginForm.controls; }


    user= new UserLogin;
  
    
    login(): void {
      this.submitted = true;
      if (this.loginForm.invalid) {
        return console.log("champs invalid");
      }
      this.loading = true;
       this.user.username=this.loginForm.controls["username"].value;
       this.user.password=this.loginForm.controls["password"].value;
       this.authService.login(this.user).toPromise().then((data:any)=> {
         localStorage.setItem('token',data.token);
         localStorage.setItem('STATE', 'true');
         console.log(this.loginForm.controls["username"].value)
         localStorage.setItem('name',data.firstName+' '+data.lastName);
         localStorage.setItem('usernameAcc',data.username);
         console.log(localStorage.getItem('usernameAcc'))
         localStorage.setItem('role',data.role)
         this.router.navigateByUrl('/pages/dashboard')
         this.status="success"
         this.toastrService.show(``,`Utilisateur connecté avec succès!`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 10000,position: NbGlobalPhysicalPosition.TOP_RIGHT}
         )}, error => {
          this.loading = false;
           
     this.status="danger"
     this.toastrService.show(``,`Coordonnées incorrectes!`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
   });

    
    }
  }

