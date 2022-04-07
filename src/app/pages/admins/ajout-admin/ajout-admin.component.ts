
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService, NbComponentStatus, NbGlobalPhysicalPosition } from '@nebular/theme';
import { User } from '../../../_models/User';
import { Delai } from '../../../_models/Delai';
import { AdminsService } from '../../../_services/admins.service';

@Component({
  selector: 'ngx-ajout-admin',
  templateUrl: './ajout-admin.component.html',
  styleUrls: ['./ajout-admin.component.scss']
})
export class AjoutAdminComponent implements OnInit {

  user= new User;


  

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private adminService: AdminsService,
    private toastrService: NbToastrService) { }

    status: NbComponentStatus ;
    registerForm: FormGroup;
    loading = false;
    submitted = false;
  
  

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      Nom: ['', Validators.required],
      Email: ['', Validators.compose([Validators.required, Validators.email])],
      Num_telephone: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]{8}')])],
      Adresse: ['', Validators.required],
    Prenom : ['', Validators.required],

  })}

 


  
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

onFormSubmit(){
  this.submitted = true;


  if (this.registerForm.invalid) {
    return console.log("champs invalid");
  }
 
  this.loading = true;
  this.user.lastName =  titleCaseWord(this.registerForm.controls["Nom"].value);
  this.user.firstName =  titleCaseWord(this.registerForm.controls["Prenom"].value);
  this.user.email = this.registerForm.controls["Email"].value;
  this.user.phoneNumber = this.registerForm.controls["Num_telephone"].value;
  this.user.address = this.registerForm.controls["Adresse"].value;
  
  this.user.username=makeid();
  

  this.adminService.adduser(this.user).subscribe(
    (data)=>{
      this.user=<User>data;
      this.status="success"
      this.toastrService.show(``,`Admin ajouté avec succès!`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
      this.router.navigate(['pages/admin/liste']);
   },
    (error)=>{
      this.status="danger"
      this.toastrService.show(``,`'Erreur Ajout!'`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
      this.loading = false;
    }
  )

 function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

  function titleCaseWord(word: string) {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }
} 
}


