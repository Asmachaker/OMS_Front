import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NbComponentStatus, NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { AuthService } from '../../../_services/auth.service';

@Component({
  selector: 'ngx-reset-mdp',
  templateUrl: './reset-mdp.component.html',
  styleUrls: ['./reset-mdp.component.scss']
})
export class ResetMdpComponent implements OnInit {
  
  status: NbComponentStatus ;
    loading = false;
    submitted =false;
    formGroup:FormGroup
   
  

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
      
      oldPassword:['',Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm: ['', Validators.required],
  
  })}

  reset(){
    this.authService.getOldPassword(localStorage.getItem('usernameAcc')).subscribe(res=>{
      console.log(res)
      if (res == this.formGroup.controls["oldPassword"].value ){
        console.log(res)
    this.authService.resetPassword(this.formGroup.controls['password'].value,localStorage.getItem('usernameAcc')).subscribe((data)=>{
      this.submitted = true;
      console.log(this.formGroup.controls['password'].value)
      console.log(this.formGroup.controls['confirm'].value)
      // stop here if form is invalid
    
        this.loading = false;
        this.router.navigate(['pages/dashboard']);
        this.status = "success"
        this.toast.show(``, `Mot de passe réinitialisé avec succés!`, { status: this.status, destroyByClick: true, hasIcon: false, duration: 2000, position: NbGlobalPhysicalPosition.TOP_RIGHT });
       
      },
      (error) => {
        this.status = "danger"
        this.toast.show(``, `Erreur d'initialisation!`, { status: this.status, destroyByClick: true, hasIcon: false, duration: 2000, position: NbGlobalPhysicalPosition.TOP_RIGHT }); this.loading = false;
      }
    )}
    else{ this.status = "danger"
    this.toast.show(``, `Vérifiez les données insérées!`, { status: this.status, destroyByClick: true, hasIcon: false, duration: 2000, position: NbGlobalPhysicalPosition.TOP_RIGHT });
   }
    })


 
}



}
