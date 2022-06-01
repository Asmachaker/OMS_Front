import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { DashboardComponent } from './dashboard.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';



const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'bar-chart',
        component: BarChartComponent,
      },
  
      {
        path: 'line-chart',
        component: LineChartComponent,
      },
      {
        path: 'pie-chart',
        component: PieChartComponent,
      }, ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

export const routedComponents = [
    PieChartComponent,
    LineChartComponent,
    BarChartComponent
];