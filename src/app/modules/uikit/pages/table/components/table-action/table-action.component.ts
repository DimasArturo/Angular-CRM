import { Component } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TableFilterService } from '../../../../services/table-filter.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-action',
  imports: [AngularSvgIconModule, CommonModule],
  templateUrl: './table-action.component.html',
  styleUrl: './table-action.component.css',
})
export class TableActionComponent {
  constructor(public filterService: TableFilterService) {}

  onSearchChange(value: Event) {
    const input = value.target as HTMLInputElement;
    this.filterService.searchField.set(input.value);
  }

  onOrderChange(value: Event) {
    const selectElement = value.target as HTMLSelectElement;
    this.filterService.orderField.set(selectElement.value);
  }
}
