import {LiveAnnouncer} from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { Bordereau } from '../../../_models/Bordereau';
import { BordereauService } from '../../../_services/bordereau.services';



@Component({
  selector: 'ngx-bordereau',
  templateUrl: './bordereau.component.html',
  styleUrls: ['./bordereau.component.scss']
})
export class BordereauComponent implements OnInit {
  displayedColumns: string[] = ['ID.', 'Client', 'Date','Details'];

  bordereauData: any;
  status: NbComponentStatus ;
  search='';
  nom: string;
  id:BigInt
  

   constructor(private _liveAnnouncer: LiveAnnouncer, private bordereauService : BordereauService,private toastrService: NbToastrService , private router:Router) {
   this.bordereauData = {} as Bordereau;

 }

 dataSource = new MatTableDataSource();

 @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

 ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.getLista()
}



 getLista(): void {
   this.bordereauService.allBordereaus().subscribe((response: any) => {
     this.dataSource.data = response;
   });

 } 
edit(bordereau: Bordereau)
{ localStorage.setItem('idBordereau', bordereau.id.toString());
 this.router.navigateByUrl('pages/bordereau/DetailsBordereau');
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
 }}



