import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import {  BookingService } from '../../_services/booking.service';
import { Booking } from '../../_models/booking';
import { DatePipe } from '@angular/common';
import { formatDate } from '@angular/common';
import { tap } from 'rxjs/operators';
import { DialogBoxComponentBooking } from '../../_dialog/dialog-box-booking/dialog-box-booking.component';
import { ReplanDTO } from '../../_DTO/ReplanDTO';


@Component({
  selector: 'ngx-booking',
  templateUrl: './Booking.component.html',
  styleUrls: ['./Booking.component.scss']
})
export class BookingComponent implements OnInit {



    displayedColumns: string[] = [ 'Numéro de commande','Client', 'Emplacement','Date','Nom Station','Taille','Zone','Shift','Prix','Statut','Replanifier'];
    dataSource = new MatTableDataSource();
    bookingData: any;
    status: NbComponentStatus ;
    matDate : string;
    replan :ReplanDTO;
  
    @ViewChild(MatTable,{static:true}) table: MatTable<any>;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    
    constructor( private datePipe: DatePipe ,private router: Router,public dialog: MatDialog,private _liveAnnouncer: LiveAnnouncer,private bookingService: BookingService, private toastrService: NbToastrService) {
      this.bookingData = {} as Booking;
  
    }
    ngOnInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  
      this.getLista()
  }
  

  getLista(): void {
    this.bookingService.allBookings().subscribe((response: any) => {
      this.dataSource.data = response;
    }
    )
  } 
  edit(obj,action)
 
  { this.bookingData.action=action;
    this.bookingData.date=obj.date;
    this.bookingData.name=obj.tarif.shift.name;
    this.bookingData.id=obj.numCommande;
    const dialogRef = this.dialog.open(DialogBoxComponentBooking, {
     // width: '250px',
      //height: '150px',
      data:this.bookingData
    });


    dialogRef.afterClosed().subscribe(result => {
     console.log(result)
     this.replan=new ReplanDTO()
      this.replan.id =result.data.id
      this.replan.shift=result.data.name
      this.replan.date = result.data.date
      console.log(this.replan)
    this.bookingService.Replan(this.replan).subscribe( res => {
             if (res==true){
             this.status="success"
             this.toastrService.show(``,`Booking replanifié avec succés!`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
             }else {
          this.status="danger"
          this.toastrService.show(``,`Il ya pas un box vide à cette date!`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
      
         }
    }
    )

    
    });
  }

  
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  announceSortChange(sortState: Sort) {
  if (sortState.direction) {
    this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
  } else {
    this._liveAnnouncer.announce('Sorting cleared');
  }}

  }
   