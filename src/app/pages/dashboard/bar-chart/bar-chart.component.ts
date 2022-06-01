import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { BookingService } from '../../../_services/booking.service';

@Component({
  selector: 'ngx-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };

  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  private test2: any[] = [{}];
  private test: any[] = [];
  public barChartData: ChartDataSets[] = [
    { data:this.test2, label: 'Bookings' },
 
  ];



  getLista(): void {
    this.bookingService.zoneChart().subscribe((response: any) => {

      this.test2.pop();
      console.log(response)
      for (var value of response.reverse()) {
      
       this.test2.push(value.integer)
       this.test.push(value.zone.name)

      }
    console.log(this.barChartLabels)
    console.log(this.barChartData)
    
    })}
    public barChartLabels: Label[] = this.test;
  constructor(private bookingService : BookingService) {  }

  ngOnInit() {
    this.getLista()
  }

}
