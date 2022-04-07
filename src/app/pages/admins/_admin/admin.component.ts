import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NbComponentStatus, NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { last } from 'rxjs/operators';
import { User } from '../../../_models/User';
import { AdminsService } from '../../../_services/admins.service';
import { DialogService } from '../../../_services/dialog.service';

@Component({
  selector: 'ngx-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {


  displayedColumns: string[] = ['Nom', 'Email', 'Statut', 'Numéro téléphone','Actions'];

  userData: any;
  status: NbComponentStatus ;
  search='';
  nom: string;
  username:BigInt
  

   constructor(private _liveAnnouncer: LiveAnnouncer, private adminService : AdminsService,private toastrService: NbToastrService ,
   private dialog: DialogService, private router:Router) {
   this.userData = {} as User;

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
   this.adminService.allusers().subscribe((response: any) => {
     this.dataSource.data = response;
   });

 } 
edit(admin: User)
{ localStorage.setItem('usernameAcc', admin.username.toString());
 this.router.navigateByUrl('pages/admin/modifAdmin');
 }


  onChangeEvent(username : string) {
    this.adminService.Getuser(username).subscribe(res=> {
      if (res.enabled==true) 
      {this.dialog
       .confirmDialog({
         title: 'Desactivé '+res.firstName+''+res.lastName,
         message: 'Êtes-vous sûr?',
         confirmCaption: 'Oui',
         cancelCaption: 'Non',
       }).subscribe((yes) => {
         if (yes==true) {
         this.adminService.disableUser(username).subscribe(req => {
           this.status="success"
           if (req==true )  this.toastrService.show(``,`Le admin est désactivé avec succés`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 10000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
         });
           
            }
        else {
         this.getLista();
          this.toastrService.show(``,`Le admin est encore Activé`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 3000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
         }
       })
       }
       if(res.enabled==false)
       {this.dialog
         .confirmDialog({
           title: 'Activé '+res.firstName+''+res.lastName,
           message: 'Êtes-vous sûr?',
           confirmCaption: 'Oui',
           cancelCaption: 'Non',
         })
         .subscribe((yes) => {
           if (yes==true) {
             this.adminService.enableUser(username).subscribe(req => {
               if (req==true ) {
                 this.status="success"
                 this.toastrService.show(``,`Le admin est activé avec succés`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 3000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
               }
             });;
       }
          else {
           this.getLista();
            this.toastrService.show(``,`Le admin est encore désactivé`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 10000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
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
