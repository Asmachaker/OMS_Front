
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { Client } from '../../../_models/Client';
import { User } from '../../../_models/User';
import { BordereauService } from '../../../_services/bordereau.services';
import { ClientService } from '../../../_services/client.service';
import { DialogService } from '../../../_services/dialog.service';


@Component({
  selector: 'ngx-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  displayedColumns: string[] = ['Nom', 'Email', 'Statut', 'Numéro téléphone','Matricule fiscal', 'Adresse','Gouvernorat','Delai Paiement','Actions'];

  clientData: any;
  status: NbComponentStatus ;
  search='';
  nom: string;
  id:BigInt
  

   constructor(private _liveAnnouncer: LiveAnnouncer, private clientService : ClientService,private toastrService: NbToastrService ,
   private dialog: DialogService, private router:Router, private bordereauService : BordereauService) {
   this.clientData = {} as Client;

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
   this.clientService.allclients().subscribe((response: any) => {
     this.dataSource.data = response;
   });

 } 
edit(client: Client)
{ localStorage.setItem('id', client.id.toString());
 this.router.navigateByUrl('pages/client/modifClient');
 }


  onChangeEvent(id : string) {
    this.clientService.GetClient(id).subscribe(res=> {
      if (res.statut==true) 
      {this.dialog
       .confirmDialog({
         title: 'Desactivé '+res.worning,
         message: 'Êtes-vous sûr?',
         confirmCaption: 'Oui',
         cancelCaption: 'Non',
       }).subscribe((yes) => {
         if (yes==true) {
         this.clientService.disableClient(id).subscribe(req => {
           this.status="success"
           if (req==true )  this.toastrService.show(``,`Le client est désactivé avec succés`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 10000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
         });
           
            }
        else {
         this.getLista();
          this.toastrService.show(``,`Le client est encore Activé`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 3000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
         }
       })
       }
       if(res.statut==false)
       {this.dialog
         .confirmDialog({
           title: 'Activé '+res.worning,
           message: 'Êtes-vous sûr?',
           confirmCaption: 'Oui',
           cancelCaption: 'Non',
         })
         .subscribe((yes) => {
           if (yes==true) {
             this.clientService.enableClient(id).subscribe(req => {
               if (req==true ) {
                 this.status="success"
                 this.toastrService.show(``,`Le client est activé avec succés`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 3000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
               }
             });;
       }
          else {
           this.getLista();
            this.toastrService.show(``,`Le client est encore désactivé`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 10000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
           }
         })
         }
   });} 

  genererBordereau(client : Client)
  {
    this.clientService.GetClient(client.id).subscribe(res=> {
      if (res.statut==true) 
      {
    this.dialog
    .confirmDialog({
      title: 'générer un bordereau pour  '+client.worning,
      message: 'La génération de bordereau inclus la désactivation de client,Êtes-vous sûr? ',
      confirmCaption: 'Oui',
      cancelCaption: 'Non',
    }).subscribe((yes) => {
      if (yes==true) {
      this.bordereauService.GenerateBordereau(client).subscribe()
        this.status="success"
        this.toastrService.show(``,`Bordereau et facture générés avec succés`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 3000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
       this.getLista();   
    }
    }
      )}
    else {
      this.status="danger"
      this.toastrService.show(``,`Le client est désactivé`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 3000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
     
    }})
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



