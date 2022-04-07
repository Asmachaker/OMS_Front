import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { UserService } from '../../@core/mock/users.service';
import { User } from '../../_models/User';
import { AuthService } from '../../_services/auth.service';
//import { passwordMatchValidator } from '../reset-password/pc-validator';


@Component({
  selector: 'ngx-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent implements OnInit {

  loading = false;

  username=this.route.snapshot.params['username']
  status: NbComponentStatus ;

  submitted =false;
  user= new User
  formGroup : FormGroup
ngOnInit(): void {
  
  this.formGroup = this.formBuilder.group({
    
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirm: ['', Validators.required],

})
    
}
constructor(private router:Router,private formBuilder:FormBuilder,private route:ActivatedRoute,private authService : AuthService, private toast : NbToastrService) { }

get fval() { return this.formGroup.controls; }



  get password(){
    return this.formGroup.get("password");
  }

  get confirm(){
    return this.formGroup.get("confirm");
  }



  

 

  activate(){this.submitted = true;

     this.authService.resetPassword(this.formGroup.controls['password'].value,this.username).subscribe((data)=>{
      console.log(this.formGroup.controls['password'].value)
      console.log(this.formGroup.controls['confirm'].value)
      // stop here if form is invalid
      if (this.formGroup.invalid) {
          return;
      }
        this.loading = false;
        this.router.navigate(['auth/login']);
        this.status = "success"
        this.toast.show(``, `Votre compte est activé avec succés`, { status: this.status, destroyByClick: true, hasIcon: false, duration: 2000, position: NbGlobalPhysicalPosition.TOP_RIGHT });
       
      },
      (error) => {
        this.status = "danger"
        this.toast.show(``, `Erreu d'activation du compte!`, { status: this.status, destroyByClick: true, hasIcon: false, duration: 2000, position: NbGlobalPhysicalPosition.TOP_RIGHT }); this.loading = false;
      }
)
 
 
}
}
