import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { NbComponentStatus, NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { DialogBoxComponentZone } from '../../_dialog/dialog-box-zone/dialog-box-zone.component';
import { ZoneDTO } from '../../_DTO/ZoneDTO';
import {  ZoneService } from '../../_services/zone.service';
import { Zone } from '../../_models/Zone';
import { Code } from '../../_models/Code';
export interface zone_Data {
  name: string;
  id: number;
  code:Code
  action: string;
}
@Component({
  selector: 'ngx-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.scss']
})
export class ZoneComponent implements OnInit {



    displayedColumns: string[] = ['id', 'name','Code Postal', 'Emplacement','action'];
    dataSource = new MatTableDataSource();
    zoneData: any;
    status: NbComponentStatus ;
  
  
    @ViewChild(MatTable,{static:true}) table: MatTable<any>;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    
    constructor(  private router: Router,public dialog: MatDialog,private _liveAnnouncer: LiveAnnouncer,private zoneService: ZoneService, private toastrService: NbToastrService) {
      this.zoneData = {} as Zone;
      
  
    }
    ngOnInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  
      this.getLista()
  }
  
  
  getLista(): void {
    this.zoneService.allZones().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  
  } 
  
    openDialog(action,obj) {
      
      this.zoneData.action=action;
      this.zoneData.name=obj.name;
      this.zoneData.id=obj.id;
      this.zoneData.code=obj.code
     console.log(this.zoneData);
      const dialogRef = this.dialog.open(DialogBoxComponentZone, {
       // width: '250px',
        //height: '150px',
        data:this.zoneData})
  
      dialogRef.afterClosed().subscribe(result => {
        if(result.event == 'Add'){
          this.addRowData(result.data);
        }else if(result.event == 'Update'){
          this.getLista();
          this.updateRowData(result.data);
        }else if(result.event == 'Delete'){
          this.deleteRowData(result.data);
        }
      });
    }

  zone = new Zone;
  zones = new ZoneDTO;
    addRowData(object){
      console.log(object)
      this.zones.name= toTitleCase(object.name);
      this.zones.id=randomIntFromInterval(1000,9999);
      this.zones.codePostal= object.code;
     // console.log(this.taill)
      console.log(this.zones)
      this.zoneService.addZone(this.zones).subscribe(
        (data)=>{
       //0.3
       //   this.client=<Client>data;
       this.getLista();
          this.status="success"
          this.toastrService.show(``,`Zone ajouté avec succès!`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
       },
        (error)=>{
          this.status="danger"
          this.toastrService.show(``,`'Erreur d'Ajout!'`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
        }
      )
    
      function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
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
      this.zoneService.GetZone(object.id).subscribe(res => {
      if ((res.name == object.name ) && (res.code.name == object.code.name)) {
        this.status = "danger";
        this.toastrService.show(``, `Vous n'avez rien modifier!`, { status: this.status, destroyByClick: true, hasIcon: false, duration: 2000, position: NbGlobalPhysicalPosition.TOP_RIGHT });
      }
  
      else {
       
        this.zones.name= toTitleCase(object.name);
        this.zones.id=object.id;
        this.zones.codePostal= object.code.name;
        console.log()
        this.getLista();
  
        this.zoneService.modifyZone(this.zones).subscribe(
          (data) => {
            this.getLista();
            this.status = "success"
            this.toastrService.show(``, `Zone modifié!`, { status: this.status, destroyByClick: true, hasIcon: false, duration: 2000, position: NbGlobalPhysicalPosition.TOP_RIGHT });
          },
          (error) => {
            this.status = "danger"
            this.toastrService.show(``, `Erreur de modification!`, { status: this.status, destroyByClick: true, hasIcon: false, duration: 2000, position: NbGlobalPhysicalPosition.TOP_RIGHT });
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
      this.zoneService.deleteZone(object.id).subscribe(
        (data) => {
          this.getLista();
          this.status = "success"
          this.toastrService.show(``, `Zone supprimé!`, { status: this.status, destroyByClick: true, hasIcon: false, duration: 2000, position: NbGlobalPhysicalPosition.TOP_RIGHT });
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
   