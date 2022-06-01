import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { color, Color } from 'echarts';
import { Label } from 'ng2-charts';
import { BookingService } from '../../../_services/booking.service';

@Component({
  selector: 'ngx-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
  private test2: any[] = [{}];
  private test: any[] = [];
  public lineChartData: ChartDataSets[] = [
    { data:this.test2, label: 'Bookings' },
 
  ];

  public lineChartLabels: Label[] = this.test;
  public lineChartOptions: (ChartOptions & { }) = {
    responsive: true,
  };
  public lineChartColors = [
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];




  getLista(): void {
    this.bookingService.Bookingschart().subscribe((response: any) => {
      this.test2.pop();
      console.log(response)
      for (var value of response.reverse()) {
      
       this.test2.push(value.number)
       this.test.push(value.date)
      }
      console.log(this.test2)
      console.log(this.test)
      console.log(this.lineChartLabels)
    
    })}

  constructor(private bookingService : BookingService) {  }

  ngOnInit() {
    this.getLista()
  }
}
