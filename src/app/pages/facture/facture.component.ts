
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { Facture } from '../../_models/Facture';
import { FactureService } from '../../_services/facture.service';
import { DialogService } from '../../_services/dialog.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'ngx-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.scss']
})
export class FactureComponent implements OnInit {
  displayedColumns: string[] = ['Numéro', 'Client', 'Date', 'Montant','Statut', 'Consulter'];

  factureData: any;
  status: NbComponentStatus ;
  search='';
  nom: string;
  id:BigInt
  

   constructor(private _liveAnnouncer: LiveAnnouncer,private datePipe: DatePipe, private factureService : FactureService,private toastrService: NbToastrService ,
   private dialog: DialogService, private router:Router) {
   this.factureData = {} as Facture;

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
   this.factureService.allfactures().subscribe((response: any) => {
     this.dataSource.data = response;
   });

 } 


  onChangeEvent(id : BigInt) {
    console.log(id)
    this.factureService.GetFacture(id).subscribe(res=> {
      if (res.statut==true) 
      {this.status="danger"
      this.getLista();
      this.toastrService.show(``,`Cette facture est déja payée`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 10000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
   
       }
       if(res.statut==false)
       {this.dialog
         .confirmDialog({
           title: 'Marquer une facture payée',
           message: 'Vous voulez Marquer la facutre de '+res.client.worning+' à '+this.datePipe.transform(res.date,"yyyy-MM-dd")+ ' payée?',
           confirmCaption: 'Oui',
           cancelCaption: 'Non',
         })
         .subscribe((yes) => {
           if (yes==true) {
             this.factureService.MarquerFacture(id).subscribe(
              (data)=>{
                 this.status="success"
                 this.toastrService.show(``,`La facture est payée`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 3000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
               },
               (error)=>{ this.status="danger"
               this.toastrService.show(``,`'Erreur!'`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
              }
             );;
       }
          else {
           this.getLista();
            this.toastrService.show(``,`Le facture est encore impayée`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 10000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
           }
         })
         }
   });} 
 
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



