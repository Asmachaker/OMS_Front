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
  displayedColumns: string[] = [ 'Numéro de commande','Client', 'Emplacement','Date','Nom Station','Taille','Zone','Prix','Add'];
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
    ngOnInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.bordereauService.GetBordereau(parseInt(localStorage.getItem('idBordereau'))).subscribe((res:any) => 
        this.dataSource.data = res
       )
      
      
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
   