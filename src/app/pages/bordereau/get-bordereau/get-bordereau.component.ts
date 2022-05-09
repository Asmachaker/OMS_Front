import {LiveAnnouncer} from '@angular/cdk/a11y';
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { equal } from 'assert';
import { SequenceEqualSubscriber } from 'rxjs/internal/operators/sequenceEqual';
import { Booking } from '../../../_models/booking';
import { Bordereau } from '../../../_models/Bordereau';
import { BordereauService } from '../../../_services/bordereau.services';
import { DialogService } from '../../../_services/dialog.service';
import { FactureAvoirService } from '../../../_services/factureAvoir.service';



@Component({
  selector: 'ngx-bordereau',
  templateUrl: './get-bordereau.component.html',
  styleUrls: ['./get-bordereau.component.scss']
})
export class GetBordereauComponent implements OnInit {
 displayedColumns: string[] = [ 'Numéro de commande','Nom Station','Taille','Zone','Date','Prix','Add'];
    dataSource = new MatTableDataSource();
    bookingData: any;
    status: NbComponentStatus ;
    matDate : string;
    name: string
    date: Date
    id :BigInt
    loading = false;
    bordereau : Bordereau;

    @ViewChild(MatTable,{static:true}) table: MatTable<any>;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    
    constructor( private Dialog: DialogService,private datePipe: DatePipe ,private router: Router, 
      private _liveAnnouncer: LiveAnnouncer,private bordereauService: BordereauService, private toastrService: NbToastrService, 
      private factureAvService: FactureAvoirService) {
      this.bookingData = {} as Booking;

  
    }


    optionsMap : Array<Booking> = []
    ngOnInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.getLista();
      }
  
      getLista(): void {
    
        this.bordereauService.GetBordereau(parseInt(localStorage.getItem('idBordereau'))).subscribe(res => {
      
          this.dataSource.data=res.booking
          this.name=res.client.worning
          this.date=res.date
          this.id=res.id
          this.bordereau=res
          
       

         
        });   }
        
      

        selectedBooking?: Booking;
        onSelect(booking: Booking): void {

          if( this.optionsMap.indexOf(booking) == -1  )
             { this.optionsMap.push(booking)
      }

          else {
            this.optionsMap.splice(this.optionsMap.indexOf(booking),1)
          
          }
   }

   genererFacture()
   { 
      this.loading= true;
     this.Dialog
    .confirmDialog({
      title: 'Générer une facture d\'avoir pour '+this.name,
      message: 'Êtes-vous sûr?',
      confirmCaption: 'Oui',
      cancelCaption: 'Non',
    }).subscribe((yes) => {
      if (yes==true) {
this.factureAvService.checkFactureAvoir(this.id).subscribe(res =>{
  console.log(res)
  if (res.id = this.bordereau.id )
  {this.status="danger"
  this.toastrService.show(``,`'Il y a déja une facture d'avoir générée à partir de ce bordereau !'`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
}
else{

      
      this.factureAvService.GenerateFactureAvoir(this.optionsMap,this.id).subscribe(
        res=>{
          console.log(res)
          this.status="success"
          this.toastrService.show(``,`Facture d'avoir générer avec succès!`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
          this.router.navigate(['pages/bordereau/liste']);
       },
      /*   (error)=>{
          console.log(error)
          this.status="danger"
          this.toastrService.show(``,`'Un Erreur se produit !'`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
          this.loading = false;
        }) */
)}
    
    })
    }})}

   

      

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
   