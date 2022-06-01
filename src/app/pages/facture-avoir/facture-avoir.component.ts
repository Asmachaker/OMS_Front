
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { FactureAvoir } from '../../_models/FactureAvoir';
import { FactureAvoirService } from '../../_services/factureAvoir.service';
import { DialogService } from '../../_services/dialog.service';
import { DatePipe } from '@angular/common';
import { Facture } from '../../_models/Facture';


@Component({
  selector: 'ngx-factureAvoir',
  templateUrl: './facture-avoir.component.html',
  styleUrls: ['./facture-avoir.component.scss']
})
export class FactureAvoirComponent implements OnInit {
  displayedColumns: string[] = ['Numéro', 'Client', 'Date', 'Montant','Statut', 'Consulter'];

  factureAvoirData: any;
  status: NbComponentStatus ;
  search='';
  nom: string;
  id:BigInt
  

   constructor(private _liveAnnouncer: LiveAnnouncer,private datePipe: DatePipe, private factureAvoirService : FactureAvoirService,private toastrService: NbToastrService ,
   private dialog: DialogService, private router:Router) {
   this.factureAvoirData = {} as FactureAvoir;

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
   this.factureAvoirService.allfactureAvoirs().subscribe((response: any) => {
     this.dataSource.data = response;
   });

 } 

 edit(facture : Facture)
 {
window.open("assets/documents/factureAvoir/"+facture.name+".pdf");
console.log("assets/documents/factureAvoir/"+facture.name+".pdf")

 }

  onChangeEvent(id : BigInt) {
    console.log(id)
    this.factureAvoirService.GetFactureAvoir(id).subscribe(res=> {
      if (res.statut==true) 
      {this.status="danger"
      this.getLista();
      this.toastrService.show(``,`Cette facture d'avoir est déja utilisée`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 10000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
   
       }
       if(res.statut==false)
       {this.dialog
         .confirmDialog({
           title: 'Marquer une facture d\'avoir utilisée',
           message: 'Vous voulez Marquer facture d\'avoir utilisée de '+res.client.worning+' à '+this.datePipe.transform(res.date,"yyyy-MM-dd")+ ' payée?',
           confirmCaption: 'Oui',
           cancelCaption: 'Non',
         })
         .subscribe((yes) => {
           if (yes==true) {
             this.factureAvoirService.MarquerFactureAvoir(id).subscribe(
              data=>{
                 this.status="success"
                 this.toastrService.show(``,`La facture Avoir est utilisée`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 3000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
               },
             );;
       }
          else {
           this.getLista();
            this.toastrService.show(``,`Le factureAvoir n'est pas encore utilisée`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 10000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
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



