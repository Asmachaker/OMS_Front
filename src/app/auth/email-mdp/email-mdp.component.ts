import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'ngx-email-mdp',
  templateUrl: './email-mdp.component.html',
  styleUrls: ['./email-mdp.component.scss']
})
export class EmailMdpComponent implements OnInit {

 
  status: NbComponentStatus ;
    loading = false;
    submitted =false;
    form: FormGroup;
    email: string
    
      constructor( private formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthService,
        private toastrService: NbToastrService) { }
    
     
  

  
    ngOnInit(): void {
      this.form = this.formBuilder.group({
        email: ['', Validators.compose([Validators.required, Validators.email])],
    })
    }
    
    get fval() { return this.form.controls; }
  

    sendMail(){
      this.submitted = true;
      if (this.form.invalid) {
        return console.log("champs invalid");
      }
      this.email=this.form.controls["email"].value;
      this.authService.sendEmail(this.email).subscribe((data) =>{
       // this.router.navigateByUrl("/auth/login");
        this.status="success"
        this.toastrService.show(``,`Email envoyer avec succès!`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});       
        },(error) =>{
         this.status="danger"
         this.toastrService.show(``,`Pas d'utilisateur avec cet email!!`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
  
  
      })

    }
  }
    
  


