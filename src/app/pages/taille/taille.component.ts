import { Component, OnInit, ViewChild } from '@angular/core';
import { Taille,TailleSchema } from '../../_models/Taille';
import {MatDialog} from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ConfirmComponent } from '../../confirm/confirm.component';
import { TailleService } from '../../_services/taille.service';
import { DialogBoxComponent } from '../../dialog-box/dialog-box.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';
export interface TailleData {
  name: string;
  id: number;
  action: string;
}
@Component({
  selector: 'ngx-tailles',
  templateUrl: './taille.component.html',
  styleUrls: ['./taille.component.scss']
})


export class TailleComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource = new MatTableDataSource();
  tailleData: any;
  status: NbComponentStatus ;
 // @ViewChild(MatTable,{static:true}) table: MatTable<any>;

  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(  private router: Router,public dialog: MatDialog,private _liveAnnouncer: LiveAnnouncer,private tailleService: TailleService, private toastrService: NbToastrService) {
    this.tailleData = {} as Taille;
    

  }
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.getLista()
}


getLista(): void {
  this.tailleService.alltailles().subscribe((response: any) => {
    this.dataSource.data = response;
  });

} 

  openDialog(action,obj) {
    this.tailleData.action=action;
    this.tailleData.name=obj.name;
    this.tailleData.id=obj.id;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
     // width: '250px',
      //height: '150px',
      data:this.tailleData
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addRowData(result.data);
      }else if(result.event == 'Update'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }
taille = new Taille;
  addRowData(object){
    
    this.taille.name= toTitleCase(object.name);
    this.taille.id=makeid();
   // console.log(this.taill)
    console.log(this.taille)
    this.tailleService.addTaille(this.taille).subscribe(
      (data)=>{
     //0.3
     //   this.client=<Client>data;
     this.getLista();
        this.status="success"
        this.toastrService.show(``,`Taille ajouté avec succès!`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
     },
      (error)=>{
        this.status="danger"
        this.toastrService.show(``,`'Erreur Ajout!'`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
      }
    )
  
    function makeid() {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
      for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    
      return text;
    }

    function toTitleCase(str) {
      return str.replace(
        /\w\S*/g,
        function(txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
      );
    } 
  
   
  } 
 
  
  updateRowData(object){ 
    this.tailleService.GetTaille(object.id).subscribe(res => {
    if (res.name == object.name ) {
      this.status = "danger";
      this.toastrService.show(``, `Vous n'avez rien modifier!`, { status: this.status, destroyByClick: true, hasIcon: false, duration: 2000, position: NbGlobalPhysicalPosition.TOP_RIGHT });
    }

    else {
     
      this.taille.name= toTitleCase(object.name);
      this.taille.id=object.id;

      this.tailleService.modifyTaille(this.taille).subscribe(
        (data) => {
          this.getLista();
          this.status = "success"
          this.toastrService.show(``, `Taille modifié!`, { status: this.status, destroyByClick: true, hasIcon: false, duration: 2000, position: NbGlobalPhysicalPosition.TOP_RIGHT });
        },
        (error) => {
          this.status = "danger"
          this.toastrService.show(``, `Utilisateur existe déjà!`, { status: this.status, destroyByClick: true, hasIcon: false, duration: 2000, position: NbGlobalPhysicalPosition.TOP_RIGHT });
        }
      )
    }
  })
  function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  } 
 
  }




  deleteRowData(object){
    this.tailleService.deleteTaille(object.id).subscribe(
      (data) => {
        this.getLista();
        this.status = "success"
        this.toastrService.show(``, `Taille supprimé!`, { status: this.status, destroyByClick: true, hasIcon: false, duration: 2000, position: NbGlobalPhysicalPosition.TOP_RIGHT });
      },
      (error) => {
        this.status = "danger"
        this.toastrService.show(``, `probleme de supression!`, { status: this.status, destroyByClick: true, hasIcon: false, duration: 2000, position: NbGlobalPhysicalPosition.TOP_RIGHT });
      }

    )}


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
 