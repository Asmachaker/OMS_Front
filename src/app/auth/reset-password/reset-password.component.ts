import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { AuthService } from '../../_services/auth.service';



@Component({
  selector: 'ngx-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  status: NbComponentStatus ;
    loading = false;
    submitted =false;
    formGroup:FormGroup
  username=this.route.snapshot.params['username']
  

  constructor(private router:Router,private formBuilder:FormBuilder,private route:ActivatedRoute,private authService : AuthService, private toast : NbToastrService) { }


  get fval() { return this.formGroup.controls; }



  get password(){
    return this.formGroup.get("password");
  }

  get confirm(){
    return this.formGroup.get("confirm");
  }



  ngOnInit(): void {
  
    this.formGroup = this.formBuilder.group({
      
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm: ['', Validators.required],
  
  })}
 




  activate(){
    this.authService.resetPassword(this.formGroup.controls['password'].value,this.username).subscribe((data)=>{
      this.submitted = true;
console.log(this.formGroup.controls['password'].value)
console.log(this.formGroup.controls['confirm'].value)
      // stop here if form is invalid
    
        this.loading = false;
        this.router.navigate(['auth/login']);
        this.status = "success"
        this.toast.show(``, `Mot de passe réinitialisé avec succés!`, { status: this.status, destroyByClick: true, hasIcon: false, duration: 2000, position: NbGlobalPhysicalPosition.TOP_RIGHT });
       
      },
      (error) => {
        this.status = "danger"
        this.toast.show(``, `Erreur d'initialisation!`, { status: this.status, destroyByClick: true, hasIcon: false, duration: 2000, position: NbGlobalPhysicalPosition.TOP_RIGHT }); this.loading = false;
      }
)

 
}


}
