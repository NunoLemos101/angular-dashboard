import {Component, ElementRef, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { AreaComponent } from '../area/area.component';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  providers:[AreaComponent],
  selector: 'app-widget-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Output() updateChartEvent: any = new EventEmitter();
  @Output() initChartEvent: any = new EventEmitter();
  @Output() colorChartEvent: any = new EventEmitter();

  @Input() label: string;

  areaColor: string = null;
  dataset: string = null;
  percentage: number = null;
  updateGraph: boolean = null;
  currentSelectedMenuItem: any = null;
  chartOptions: any = null;
  Highcharts: any = Highcharts;
                    

  constructor(private elementRef: ElementRef, public areaComponent: AreaComponent) {
    // Gets dataset and area-color attribute from HTML <app-widget-card> tag
    this.dataset = this.elementRef.nativeElement.getAttribute('dataset');
    this.areaColor = this.elementRef.nativeElement.getAttribute('area-color');
  }

  ngOnInit(): void {
    let currentColor: string = null;
    let currentDataSet: any = null;

    // Chooses which dataset to use based on dataset attribute written in HTML <app-widget-card> tag
    switch (this.dataset) {
      case 'Asia':
        currentDataSet = {name: this.label, data: [
            {x: 1750, y: 563},
            {x: 1800, y: 130},
            {x: 1850, y: 400},
            {x: 1900, y: 250}], zoneAxis: 'x', zones: []};
        currentColor = this.areaColor !== null ? this.areaColor : '#9DC8F1';
        break;
      case 'Africa':
        currentDataSet = {name: this.label, data: [
            {x: 1750, y: 163},
            {x: 1800, y: 230},
            {x: 1850, y: 200},
            {x: 1900, y: 300}], zoneAxis: 'x', zones: []};
        currentColor = this.areaColor !== null ? this.areaColor : '#727276';
        break;
      case 'Europe':
        currentDataSet = {name: this.label, data: [
            {x: 1750, y: 663},
            {x: 1800, y: 230},
            {x: 1850, y: 120},
            {x: 1900, y: 900}], zoneAxis: 'x', zones: []};

        currentColor = this.areaColor !== null ? this.areaColor : '#ACF29E';
        break;
      case 'America':
        currentDataSet =  {name: this.label, data: [
            {x: 1750, y: 60},
            {x: 1800, y: 90},
            {x: 1850, y: 270},
            {x: 1900, y: 430}], zoneAxis: 'x', zones: []};
        currentColor = this.areaColor !== null ? this.areaColor : '#F9BA85';
        break;
    }

    // Calculates the percentage
    this.percentage = Math.round((currentDataSet.data[currentDataSet.data.length - 1].y / currentDataSet.data[0].y) * 100);

    // Initializes the chart
    this.chartOptions = {
      chart: {
        type: 'area'
      },
      title: {
        text: null
      },
      subtitle: {
        enabled: false
      },


      xAxis: {

        categories: ['1750', '1800', '1850', '1900', '1950', '1999', '2050'],
        tickmarkPlacement: 'on',
        title: {
          enabled: false
        }
      },
      yAxis: {

        title: {
          text: 'Billions'
        },
        labels: {
          formatter(): number {
            return this.value / 1000;
          }
        }
      },
      tooltip: {
        split: true,
        valueSuffix: ' millions',
        outside: true,
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        area: {
          stacking: 'normal',
          lineColor: '#666666',
          lineWidth: 1,
          color: currentColor,
          marker: {
            lineWidth: 1,
            lineColor: '#666666'
          }
        }
      },
      series: [currentDataSet]
    };

    this.currentSelectedMenuItem = this.chartOptions.series[0].data[0];

    HC_exporting(this.Highcharts);

    this.initChartEvent.emit({data: currentDataSet});
  }

  changeData = (selectedItem) => {

    const newValue = Math.round(Math.random() * 1000);
    // Adds new data to the chart
    this.chartOptions.series[0].data[this.chartOptions.series[0].data.length - 1].y = newValue;
    // Updates the chart itself
    this.updateGraph = true;
    // Updates percentage
    this.percentage = Math.round((this.chartOptions.series[0].data[this.chartOptions.series[0].data.length - 1].y / selectedItem._elementRef.nativeElement.value.split(',')[1]) * 100);
    // Updates the big chart using an EventEmitter
    this.updateChartEvent.emit({dataset: this.dataset, x_value: this.chartOptions.series[0].data[this.chartOptions.series[0].data.length - 1].x , y_value: newValue});

  }

  triggerCardMenu = (selectedItem) => {
    this.currentSelectedMenuItem = selectedItem;
    this.percentage = Math.round((this.chartOptions.series[0].data[this.chartOptions.series[0].data.length - 1].y / selectedItem.y) * 100);

    // Checks if the selected value is equal to the one in the beggining of the graph, if yes, the chart doesn't get any painting
    if (selectedItem.x !== this.chartOptions.series[0].data[0].x) {

      this.chartOptions.series[0].zones = [{value: selectedItem.x}, {value: this.chartOptions.series[0].data[this.chartOptions.series[0].data.length - 1].x + 0.0000001 , color: '#27bab0'}];
      this.updateGraph = true;

    } else {
      this.chartOptions.series[0].zones = [];
      this.updateGraph = true;
    }
    // Updates big chart's color
    this.colorChartEvent.emit();

  }

}

// <app-root exampleData="lorem Ipsum"></app-root>

// this.elementRef.nativeElement.getAttribute('exampleData')
// @Input exampleData: string

// 2 Ways of getting data from HTML tags.
