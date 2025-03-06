import { Component, Input, OnInit } from '@angular/core';
import ApexCharts from 'apexcharts';

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic-component.html',
  styleUrls: ['./graphic-component.css'],
})
export class graphicComponent implements OnInit {
  @Input() nft: any;

  constructor() {}

  ngOnInit(): void {
  }
}
