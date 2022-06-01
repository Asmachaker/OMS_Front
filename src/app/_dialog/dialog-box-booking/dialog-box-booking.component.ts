import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { shift } from '../../_models/shift';
import { Taille } from '../../_models/Taille';


export interface bookingData {
  date: Date;
  name: string;
  id: number;
  action: string;
}


@Component({
  selector: 'ngx-dialog-box',
  templateUrl: './dialog-box-booking.component.html',
  styleUrls: ['./dialog-box-booking.component.scss']
})
export class DialogBoxComponentBooking  {
  shift :Array<Object> = ['Matin','Nuit']
  action:string;
  local_data:any;
 

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponentBooking>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: bookingData) {
    this.local_data = {...data};
    this.action =  this.local_data.action;
  }

  doAction(){
    this.dialogRef.close({event:this.action,data:this.local_data});
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

}