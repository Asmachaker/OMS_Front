import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { Tarif } from '../../../_models/Tarif';
import { User } from '../../../_models/User';
import { TarifService } from '../../../_services/tarif.service';
import { DialogService } from '../../../_services/dialog.service';


@Component({
  selector: 'ngx-tarif',
  templateUrl: './tarif.component.html',
  styleUrls: ['./tarif.component.scss']
})
export class TarifComponent implements OnInit {
  displayedColumns: string[] = ['ID.', 'Shift', 'Zone', 'Taille','Prix','Actions'];

  tarifData: any;
  status: NbComponentStatus ;
  search='';
  nom: string;
  id:number
  

   constructor(private _liveAnnouncer: LiveAnnouncer, private tarifService : TarifService,private toastrService: NbToastrService ,
   private dialog: DialogService, private router:Router) {
   this.tarifData = {} as Tarif;

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
   this.tarifService.alltarifs().subscribe((response: any) => {
     this.dataSource.data = response;
   });

 } 
edit(tarif: Tarif)
{ localStorage.setItem('idTarif', tarif.id.toString());
 this.router.navigateByUrl('pages/tarif/modifTarif');
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



