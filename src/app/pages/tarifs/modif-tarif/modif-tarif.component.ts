import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService, NbComponentStatus, NbGlobalPhysicalPosition } from '@nebular/theme';
import { tarifDTO } from '../../../_DTO/TarifDTO';
import { Tarif } from '../../../_models/Tarif';
import { TailleService } from '../../../_services/taille.service';
import { TarifService } from '../../../_services/tarif.service';
import { ZoneService } from '../../../_services/zone.service';

@Component({
  selector: 'ngx-modif-tarif',
  templateUrl: './modif-tarif.component.html',
  styleUrls: ['./modif-tarif.component.scss']
})
export class ModifTarifComponent  implements OnInit {

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

      this.registerForm = this.formBuilder.group({
        Nom: ['', Validators.required],
        Zone:  ['', Validators.required],
        Taille: ['', Validators.compose([Validators.required, Validators.email])],
        Prix: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]')])],
        Shift: ['', Validators.required],
    })
 
     }

    status: NbComponentStatus ;
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    Switched:boolean;
    tarifEd: Tarif;

  

  ngOnInit(): void {
    this.tarifService.GetTarif(parseInt(localStorage.getItem('idTarif'))).subscribe(res => {
 
       this.registerForm.controls['Nom'].setValue(res.name);
      this.registerForm.controls['Prix'].setValue(res.price);
      this.registerForm.controls['Shift'].setValue(res.shift.name);
      this.registerForm.controls['Zone'].setValue(res.zone.name);
      this.registerForm.controls['Taille'].setValue(res.taille.name);

      }
    ) 

   }

 


  
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

tarifD : tarifDTO = new tarifDTO();
onFormSubmit(){
  this.submitted = true;
  this.loading = true;


  this.tarifService.GetTarif(parseInt(localStorage.getItem('idTarif'))).subscribe(res => {
    if ((res.name == this.registerForm.controls["Nom"].value) && (res.price == this.registerForm.controls["Prix"].value)
      && (res.shift.name == this.registerForm.controls["Shift"].value)
      && (res.zone.name == this.registerForm.controls["Zone"].value)
      && (res.taille.name === this.registerForm.controls["Taille"].value)
    ) {
      this.loading=false;
      this.status = "danger";
      this.toastrService.show(``, `Vous n'avez rien modifier!`, { status: this.status, destroyByClick: true, hasIcon: false, duration: 2000, position: NbGlobalPhysicalPosition.TOP_RIGHT });
    }

    else {
      this.loading = true;
      this.tarifD.name =  toTitleCase(this.registerForm.controls["Nom"].value);
      this.tarifD.taille = this.registerForm.controls["Taille"].value;
      this.tarifD.shift = this.registerForm.controls["Shift"].value;
      this.tarifD.zone = this.registerForm.controls["Zone"].value;
      this.tarifD.price= this.registerForm.controls["Prix"].value;
      this.tarifD.id = parseInt(localStorage.getItem('idTarif'));

      this.tarifService.modifyTarif(this.tarifD).subscribe(
        (data) => {
          this.status = "success"
          this.toastrService.show(``, `Tarif modifié!`, { status: this.status, destroyByClick: true, hasIcon: false, duration: 2000, position: NbGlobalPhysicalPosition.TOP_RIGHT });
          this.loading = false;
          this.router.navigate(['pages/tarif/liste']);
        },
        (error) => {
          this.status = "danger"
          this.toastrService.show(``, `Erreur de modification!`, { status: this.status, destroyByClick: true, hasIcon: false, duration: 2000, position: NbGlobalPhysicalPosition.TOP_RIGHT }); this.loading = false;
        }
      )
    }
  }
  )

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