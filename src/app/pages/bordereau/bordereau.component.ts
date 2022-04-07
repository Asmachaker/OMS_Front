import { Component, OnInit } from '@angular/core';
import { DialogService } from '../../_services/dialog.service';

@Component({
  selector: 'ngx-bordereau',
  templateUrl: './bordereau.component.html',
  styleUrls: ['./bordereau.component.scss']
})
export class BordereauComponent implements OnInit {

  constructor(private dialog: DialogService) { }

  ngOnInit(): void {

  }

  

 /*  yesNoDialog() {
    this.dialog
      .confirmDialog({
        title: 'Are you sure?',
        message: 'Are you sure you want to do this?',
        confirmCaption: 'Yes',
        cancelCaption: 'No',
      })
      .subscribe((yes) => {
        if (yes) console.log('The user said YES');
      });
  } */
}
