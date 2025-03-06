import { Component, Input, OnInit } from '@angular/core';
import ApexCharts from 'apexcharts';

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic-component.html',
  styleUrls: ['./graphic-component.css'],
})
export class GraphicComponent implements OnInit {
  @Input() nft: any;

  constructor() {}

  getChartOptions() {
    return {
      series: [90, 85, 70],
      colors: ["#1C64F2", "#16BDCA", "#FDBA8C"],
      chart: {
        height: "350px",
        width: "100%",
        type: "radialBar",
        sparkline: {
          enabled: true,
        },
      },
      plotOptions: {
        radialBar: {
          track: {
            background: '#E5E7EB',
          },
          dataLabels: {
            show: false,
          },
          hollow: {
            margin: 0,
            size: "32%",
          }
        },
      },
      grid: {
        show: false,
        strokeDashArray: 4,
        padding: {
          left: 2,
          right: 2,
          top: -23,
          bottom: -20,
        },
      },
      labels: ["Done", "In progress", "To do"],
      legend: {
        show: true,
        position: "bottom",
        fontFamily: "Inter, sans-serif",
      },
      tooltip: {
        enabled: true,
        x: {
          show: false,
        },
      },
      yaxis: {
        show: false,
        labels: {
          formatter: function (value: string) {
            return value + '%';
          }
        }
      }
    };
  }

  ngOnInit(): void {
    if (document.getElementById("radial-chart") && typeof ApexCharts !== 'undefined') {
      const chart = new ApexCharts(document.querySelector("#radial-chart"), this.getChartOptions());
      chart.render();
    }
  }
}
