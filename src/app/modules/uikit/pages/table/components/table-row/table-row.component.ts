import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { User } from '../../../../model/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: '[app-table-row]',
  imports: [FormsModule, AngularSvgIconModule,CommonModule],
  templateUrl: './table-row.component.html',
  styleUrl: './table-row.component.css',
})
export class TableRowComponent {
  @Input() user: User = <User>{};

  constructor() {}
}
