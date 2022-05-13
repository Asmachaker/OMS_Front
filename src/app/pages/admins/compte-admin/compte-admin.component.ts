import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService, NbGlobalPhysicalPosition, NbComponentStatus } from '@nebular/theme';
import { number } from 'echarts';
import { get } from 'http';
import { User } from '../../../_models/User';
import { AdminsService } from '../../../_services/admins.service';

@Component({
  selector: 'ngx-compte-admin',
  templateUrl: './compte-admin.component.html',
  styleUrls: ['./compte-admin.component.scss']
})
export class CompteAdminComponent implements OnInit {

  constructor( private formBuilder: FormBuilder,
  private router: Router,
  private adminService: AdminsService,
  private toastrService: NbToastrService) {  this.registerForm = this.formBuilder.group({
    Username:[''],
    Nom: ['', Validators.required],
    Prenom:  ['', Validators.required],
    Email: ['', Validators.compose([Validators.required, Validators.email])],
    Num_telephone: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]{8}')])],
    Adresse: ['', Validators.required],


}) }

  status: NbComponentStatus ;
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  Switched:boolean;
  GNum:string;
  DNum:number;



ngOnInit(): void {
  this.adminService.Getuser(localStorage.getItem('usernameAcc')).subscribe(res => {

    this.registerForm.controls['Nom'].setValue(res.lastName);
    this.registerForm.controls['Prenom'].setValue(res.firstName);
    this.registerForm.controls['Email'].setValue(res.email);
    this.registerForm.controls['Num_telephone'].setValue(res.phoneNumber);
    this.registerForm.controls['Adresse'].setValue(res.address);
    this.registerForm.controls['Username'].setValue(localStorage.getItem('usernameAcc'))
    console.log(localStorage.getItem('usernameAcc'))

  }
  )
 }



 get Prenom(){
  return this.registerForm.get("Prenom");
}

get Nom(){
  return this.registerForm.get("Nom");
}
 
get Adresse(){
  return this.registerForm.get("Adresse");
}

get Numero(){
  return this.registerForm.get("Num_telephone");
}

get Email(){
  return this.registerForm.get("Email");
}


get fval() { return this.registerForm.controls; }


user : User = new User();
onFormSubmit(){

this.submitted = true;
// return for here if form is invalid
if (this.registerForm.invalid) {
  return console.log("champs invalid");
}
this.adminService.Getuser(localStorage.getItem('usernameAcc')).subscribe(res => {
  if ((res.lastName == this.registerForm.controls["Nom"].value) && (res.firstName == this.registerForm.controls["Prenom"].value)
    && (res.email == this.registerForm.controls["Email"].value)
    && (res.phoneNumber == this.registerForm.controls["Num_telephone"].value)
    && (res.address === this.registerForm.controls["Adresse"].value)
  //  && (res.deadlinePaiment === this.DNum)
  ) {
    this.status = "danger";
    this.toastrService.show(``, `Vous n'avez rien modifier!`, { status: this.status, destroyByClick: true, hasIcon: false, duration: 2000, position: NbGlobalPhysicalPosition.TOP_RIGHT });
  }

  else {
    this.loading = true;
    this.user.lastName =  titleCaseWord(this.registerForm.controls["Nom"].value);
    this.user.email = this.registerForm.controls["Email"].value;
    this.user.phoneNumber = this.registerForm.controls["Num_telephone"].value;
    this.user.address = this.registerForm.controls["Adresse"].value;
    this.user.firstName= this.registerForm.controls["Prenom"].value;
   
    this.user.username = localStorage.getItem('usernameAcc');

    this.adminService.modifyuser(this.user).subscribe(
      (data) => {
        this.status = "success"
        this.toastrService.show(``, `Informations modifiés!`, { status: this.status, destroyByClick: true, hasIcon: false, duration: 2000, position: NbGlobalPhysicalPosition.TOP_RIGHT });
        this.loading = false;
        this.router.navigate(['pages/dashboard']);
      },
      (error) => {
        this.status = "danger"
        this.toastrService.show(``, `Utilisateur existe déjà!`, { status: this.status, destroyByClick: true, hasIcon: false, duration: 2000, position: NbGlobalPhysicalPosition.TOP_RIGHT }); this.loading = false;
      }
    )
  }
}
)



function titleCaseWord(word: string) {
  if (!word) return word;
  return word[0].toUpperCase() + word.substr(1).toLowerCase();
}
} 
}
