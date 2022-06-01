import { Component, OnInit } from '@angular/core';
import { ChartColor, ChartOptions, ChartType } from 'chart.js';
import { Color } from 'echarts';
import { Label, SingleDataSet, monkeyPatchChartJsTooltip, monkeyPatchChartJsLegend } from 'ng2-charts';
import { BookingService } from '../../../_services/booking.service';

@Component({
  selector: 'ngx-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  // Pie
  private test2: any[] = [];
  private test: number[];
  public pieChartOptions: ChartOptions = {
    responsive: true,
    defaultColor:'red'
  };
  
  pieChartColors: ChartColor[] = [
    'red',    // color for data at index 0
    'blue',   // color for data at index 1
    'green',  // color for data at index 2
    'black',  // color for data at index 3
    //...
]
    
    
  ;
  public pieChartLabels: Label[] = this.test2;
  public pieChartData: SingleDataSet= [500,600];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  getLista(): void {
    this.bookingService.clientChart().subscribe((response: any) => {
      this.test2.pop();
      console.log(response)
      for (var value of response.reverse()) {
        []
        this.pieChartData.push(value.bookings)
        this.test2.push(value.client.worning)
      }
      console.log(this.test2)
      // console.log(this.test)
      console.log(this.pieChartData)

    })
  }


  ngOnInit() {
    this.getLista()
  }
  constructor(private bookingService: BookingService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }


}
