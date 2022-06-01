
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService, NbComponentStatus, NbGlobalPhysicalPosition } from '@nebular/theme';
import { User } from '../../../_models/User';
import { AdminsService } from '../../../_services/admins.service';

@Component({
  selector: 'ngx-ajout-admin',
  templateUrl: './ajout-admin.component.html',
  styleUrls: ['./ajout-admin.component.scss']
})
export class AjoutAdminComponent implements OnInit {

  user= new User;
  i: number;


  

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



compteur:boolean
onFormSubmit(){
  this.submitted = true;
  this.compteur=false
  this.adminService.allusers().subscribe(res=>{
    this.i=0
  for (let j = 0; j <res.length ; j++) {
    if(this.registerForm.controls["Email"].value == res[j].email)
    {this.i++}}
  if(this.i>0)
  { console.log(this.i)   
    this.status="danger"
        this.toastrService.show(``,`'Ce mail existe déja!'`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
        this.loading = false;}
        else {
    this.loading = true;
    this.user.lastName =  titleCaseWord(this.registerForm.controls["Nom"].value);
    this.user.firstName =  titleCaseWord(this.registerForm.controls["Prenom"].value);
    this.user.email = this.registerForm.controls["Email"].value;
    this.user.phoneNumber = this.registerForm.controls["Num_telephone"].value;
    this.user.address = this.registerForm.controls["Adresse"].value;
    this.user.username= titleCaseWord(this.registerForm.controls["Nom"].value)+this.registerForm.controls["Prenom"].value+Math.floor(Math.random()*(999-100+1)+100)
    console.log(this.user.username)
  
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
      })    }
    }
    )
    
  
  



 function titleCaseWord(word:string) {
  if (!word) return word;
  return word[0].toUpperCase() + word.substr(1).toLowerCase();
   
 } }

} 



