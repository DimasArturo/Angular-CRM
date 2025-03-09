import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: '[app-table-header]',
  imports: [AngularSvgIconModule, CommonModule],
  templateUrl: './table-header.component.html',
  styleUrl: './table-header.component.css',
})
export class TableHeaderComponent {

}
