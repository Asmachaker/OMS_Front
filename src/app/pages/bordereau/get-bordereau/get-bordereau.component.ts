import {LiveAnnouncer} from '@angular/cdk/a11y';
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { Bordereau } from '../../../_models/Bordereau';
import { BordereauService } from '../../../_services/bordereau.services';



@Component({
  selector: 'ngx-bordereau',
  templateUrl: './get-bordereau.component.html',
  styleUrls: ['./get-bordereau.component.scss']
})
export class GetBordereauComponent implements OnInit {
  displayedColumns: string[] = [ 'Numéro de commande','Nom Station','Taille','Zone','Date','Prix','Add'];
    dataSource = new MatTableDataSource();
    bordereauData: any;
    status: NbComponentStatus ;
    matDate : string;
  
    @ViewChild(MatTable,{static:true}) table: MatTable<any>;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    
    constructor( private datePipe: DatePipe ,private router: Router,public dialog: MatDialog,private _liveAnnouncer: LiveAnnouncer,private bordereauService: BordereauService, private toastrService: NbToastrService) {
      this.bordereauData = {} as Bordereau;
  
    }
    list: any[] = [];
    ngOnInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.getLista();
      }
  
      getLista(): void {
    
        this.bordereauService.GetBordereau(parseInt(localStorage.getItem('idBordereau'))).subscribe(res => {
          for(var i = 0; i < res.booking.length; i++){
            this.dataSource[i] = {
              id: res.booking[i].id,
              date: res.booking[i].date,
              station: res.booking[i].stationName,
              taille:  res.booking[i].tarif.taille.name,
              zone: res.booking[i].tarif.zone.name,            
              prix: res.booking[i].tarif.price
             
            }
           }
    
        });   }

  
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
   