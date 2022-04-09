import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Code } from '../../_models/Code';

import { ZoneService } from '../../_services/zone.service';


export interface ZoneData {
  name: string;
  id: number;
  code:number
  action: string;
}

@Component({
  selector: 'ngx-dialog-box-zone',
  templateUrl: './dialog-box-zone.component.html',
  styleUrls: ['./dialog-box-zone.component.scss']
})


  export class DialogBoxComponentZone  {
    zoneForm:any;
    action:string;
    local_data:any;
    CodeName: String;
    names:string;
    CodePostal: Array<Object> = [
      { name :"Ariana",code:2080},
      { name :"Bizerte",code:7000},
      { name :"Gabes",code:6000},
      { name :"Gafsa",code:2100},
      { name :"Bardo",code:2000},
     ]
     registerForm: FormGroup;
  
    constructor(public zoneService:ZoneService,private formBuilder: FormBuilder,
      public dialogRef: MatDialogRef<DialogBoxComponentZone>,
      //@Optional() is used to prevent error if no data is passed
      @Optional() @Inject(MAT_DIALOG_DATA) public data: ZoneData) {
      this.local_data = {...data};
      this.action =  this.local_data.action;

      
      console.log(this.local_data.code)

      }
    
     
  
    doAction(){
   
      this.dialogRef.close({event:this.action,data:this.local_data});
    }
  
    closeDialog(){
      this.dialogRef.close({event:'Cancel'});
    }
  
  }