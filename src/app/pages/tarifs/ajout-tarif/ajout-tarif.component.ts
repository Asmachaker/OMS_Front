import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService, NbComponentStatus, NbGlobalPhysicalPosition } from '@nebular/theme';
import { Tarif } from '../../../_models/Tarif';
import { TailleService } from '../../../_services/taille.service';
import { TarifService } from '../../../_services/tarif.service';
import { ZoneService } from '../../../_services/zone.service';

@Component({
  selector: 'ngx-ajout-tarif',
  templateUrl: './ajout-tarif.component.html',
  styleUrls: ['./ajout-tarif.component.scss']
})
export class AjoutTarifComponent implements OnInit {

  tarif= new Tarif;
  ZoneData = [];
  TailleData = [];
  ShiftData = [];


  

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private tarifService: TarifService,
    private tailleService: TailleService,
    private zoneService: ZoneService,
    private toastrService: NbToastrService) {
      this.zoneService.allZones().subscribe((data) => {
      for(var i = 0; i < data.length; i++){  // loop through the object array
             this.ZoneData.push(data[i]);        // push each element to sys_id
        }
      })

       this.tailleService.alltailles().subscribe((data) => {
        for(var i = 0; i < data.length; i++){  // loop through the object array
             this.TailleData.push(data[i]);        // push each element to sys_id
        }
      })

      this.tarifService.allshifts().subscribe((data) => {
        for(var i = 0; i < data.length; i++){  // loop through the object array
             this.ShiftData.push(data[i]);        // push each element to sys_id
        }
      })


 
     }

    status: NbComponentStatus ;
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    Switched:boolean;

  

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      Nom: ['', Validators.required],
      Zone:  ['', Validators.required],
      Taille: ['', Validators.compose([Validators.required, Validators.email])],
      Prix: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]')])],
      Shift: ['', Validators.required],
  })}

 


  
  get Nom(){
    return this.registerForm.get("Nom");
  }

  get Zone(){
    return this.registerForm.get("Zone");
  }

  get Taille(){
    return this.registerForm.get("Taille");
  }
 
   
  get Shift(){
    return this.registerForm.get("Shift");
  }

  get Prix(){
    return this.registerForm.get("Prix");
  }


get fval() { return this.registerForm.controls; }

onFormSubmit(){
  this.submitted = true;
 // console.log(this.registerForm.controls["Zone"].value)
  this.loading = true;
 
  this.tarif.name =  toTitleCase(this.registerForm.controls["Nom"].value);
  this.tarif.zone = this.registerForm.controls["Zone"].value;
  this.tarif.taille = this.registerForm.controls["Taille"].value;
  this.tarif.shift = this.registerForm.controls["Shift"].value;
  this.tarif.price= this.registerForm.controls["Prix"].value;;
  this.tarif.id=randomIntFromInterval(10000,99999);


  this.tarifService.addTarif(this.tarif).subscribe(
    (data)=>{
      this.tarif=<Tarif>data;
      this.status="success"
      this.toastrService.show(``,`Tarif ajouté avec succès!`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
      this.router.navigate(['pages/tarif/liste']);
   },
    (error)=>{
      this.status="danger"
      this.toastrService.show(``,`'Erreur Ajout!'`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
      this.loading = false;
    }
  ) 

  function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
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


