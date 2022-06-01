import {Component, OnDestroy} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { Subject } from 'rxjs';
import { takeWhile } from 'rxjs/operators' ;
import { SolarData } from '../../@core/data/solar';
import { BookingDTO } from '../../_DTO/BookingDTO';
import { User } from '../../_models/User';
import { BookingService } from '../../_services/booking.service';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent{

  constructor() {  }

  ngOnInit() {
  
  }
}