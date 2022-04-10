import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { NbComponentStatus, NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { ZoneDTO } from '../../_DTO/ZoneDTO';
import {  BookingService } from '../../_services/booking.service';
import { Zone } from '../../_models/Zone';
import { Booking } from '../../_models/booking';


@Component({
  selector: 'ngx-booking',
  templateUrl: './Booking.component.html',
  styleUrls: ['./Booking.component.scss']
})
export class BookingComponent implements OnInit {



    displayedColumns: string[] = [ 'Numéro de commande','Client', 'Emplacement','Date','Nom Station','Taille','Zone','Prix','Statut'];
    dataSource = new MatTableDataSource();
    bookingData: any;
    status: NbComponentStatus ;
  
  
    @ViewChild(MatTable,{static:true}) table: MatTable<any>;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    
    constructor(  private router: Router,public dialog: MatDialog,private _liveAnnouncer: LiveAnnouncer,private bookingService: BookingService, private toastrService: NbToastrService) {
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
  }
  
  }
  }
   