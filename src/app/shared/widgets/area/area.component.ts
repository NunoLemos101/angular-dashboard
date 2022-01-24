import {Component, ElementRef, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-widget-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {

  Highcharts = Highcharts;
  chartOptions: any = {};
  updateGraph: boolean = null;

  constructor() { }

  ngOnInit(): void {
    this.chartOptions = {
      chart: {
        type: 'line'
      },
      title: {
        text: 'Historic and Estimated Worldwide Population Growth by Region'
      },
      subtitle: {
        text: 'Source: Wikipedia.org'
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
          formatter: function() {
            return this.value / 1000;
          }
        }
      },
      tooltip: {
        split: true,
        valueSuffix: ' millions'
      },

      plotOptions: {
        area: {
          stacking: 'normal',
          lineColor: '#666666',
          lineWidth: 1,
          marker: {
            lineWidth: 1,
            lineColor: '#666666'
          }
        },
      },
      series: []
    };

    HC_exporting(this.Highcharts);

    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
  }

  handleRandomDataEventEmitter = ($event) => {
    console.log($event.dataset);
    let currentDataSet = null;
    switch ($event.dataset) {
      case 'Asia':
        currentDataSet = this.chartOptions.series[0].data[this.chartOptions.series[0].data.length - 1] = {x: $event.x_value, y: $event.y_value};
        break;
      case 'Africa':
        currentDataSet = this.chartOptions.series[1].data[this.chartOptions.series[1].data.length - 1] = {x: $event.x_value, y: $event.y_value};
        break;
      case 'Europe':
        currentDataSet = this.chartOptions.series[2].data[this.chartOptions.series[2].data.length - 1] = {x: $event.x_value, y: $event.y_value};
        break;
      case 'America':
        currentDataSet = this.chartOptions.series[3].data[this.chartOptions.series[3].data.length - 1] = {x: $event.x_value, y: $event.y_value};
        break;
    }
    this.updateGraph = true;
  }

  handleColorChangeEventEmitter = () => this.updateGraph = true;

  handleInitEventEmitter = ($event) => this.chartOptions.series.push($event.data);
}
