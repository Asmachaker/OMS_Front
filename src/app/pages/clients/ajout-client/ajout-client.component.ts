import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService, NbComponentStatus, NbGlobalPhysicalPosition } from '@nebular/theme';
import { Client } from '../../../_models/Client';
import { ClientService } from '../../../_services/client.service';

@Component({
  selector: 'ngx-ajout-client',
  templateUrl: './ajout-client.component.html',
  styleUrls: ['./ajout-client.component.scss']
})
export class AjoutClientComponent implements OnInit {

  client= new Client;


  


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private clientService: ClientService,
    private toastrService: NbToastrService) { }

    status: NbComponentStatus ;
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    Switched:boolean;
    GNum:string;
    DNum:number;

  

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      Nom: ['', Validators.required],
      Delai:  ['', Validators.required],
      Email: ['', Validators.compose([Validators.required, Validators.email])],
      Num_telephone: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]{8}')])],
      Adresse: ['', Validators.required],
      Matricule:['', Validators.compose([Validators.required, Validators.pattern('^[0-9]{9}')])],
      Gouvernorat:['', Validators.required],

  })}

 


  
  get Nom(){
    return this.registerForm.get("Nom");
  }

  get Delai(){
    return this.registerForm.get("Delai");
  }

  get gouvernorat(){
    return this.registerForm.get("Gouvernorat");
  }
 
   
  get Adresse(){
    return this.registerForm.get("Adresse");
  }

  get Numero(){
    return this.registerForm.get("Num_telephone");
  }

  get Matricule(){
    return this.registerForm.get("Matricule");
  }

  get Email(){
    return this.registerForm.get("Email");
  }

  Gouvernorat:Array<Object> = [
    {num:1 ,name: "Ariana"},
    {num:2, name: "Béja"},
    {num:3, name: "Ben Arous"},
    {num:4, name: "Bizerte"},
    {num:5, name: "Gabès"},
    {num:6, name: "Gafsa"},
    {num:7, name: "Jendouba"},
    {num:8, name: "Kairouan"},
    {num:9, name: "Kasserine"},
    {num:10, name: "Kébili"},
    {num:11, name: "Kef"},
    {num:12, name: "Mahdia"},
    {num:13, name: "Manouba"},
    {num:14, name: "Médenine"},
    {num:15, name: "Monastir"},
    {num:16, name: "Nabeul"},
    {num:17, name: "Sfax"},
    {num:18, name: "Sidi Bouzid"},
    {num:19, name: "Siliana"},
    {num:20, name: "Sousse"},
    {num:21, name: "Tataouine"},
    {num:22, name: "Tozeur"},
    {num:23, name: "Tunis"},
    {num:24, name: "Zaghouan"},

];

DelaiPaiement= [15,30,60,90]
  

toNumber(){
  
  console.log(this.GNum);
}

tonumber(){
  
  console.log(this.DNum);
}



get fval() { return this.registerForm.controls; }

onFormSubmit(){
  this.submitted = true;


  if (this.registerForm.invalid) {
    return console.log("champs invalid");
  }
 
  this.loading = true;
  this.client.statut=this.Switched;
  this.client.worning =  toTitleCase(this.registerForm.controls["Nom"].value);
  this.client.email = this.registerForm.controls["Email"].value;
  this.client.phoneNumber = this.registerForm.controls["Num_telephone"].value;
  this.client.address = this.registerForm.controls["Adresse"].value;
  this.client.gouvernorat=this.GNum;
  this.client.deadlinePaiment=this.DNum;
  this.client.taxNumber= this.registerForm.controls["Matricule"].value;
  this.client.id=makeid();
  console.log(this.client.deadlinePaiment)

  this.clientService.addClient(this.client).subscribe(
    (data)=>{
      this.client=<Client>data;
      this.status="success"
      this.toastrService.show(``,`Client ajouté avec succès!`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
      this.router.navigate(['pages/client/liste']);
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

  function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }
} 
}


