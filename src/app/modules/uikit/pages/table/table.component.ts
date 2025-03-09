import { Component, computed, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { userData } from '../../data-tables/user.data';
import { TableActionComponent } from './components/table-action/table-action.component';
import { TableFooterComponent } from './components/table-footer/table-footer.component';
import { TableHeaderComponent } from './components/table-header/table-header.component';
import { TableRowComponent } from './components/table-row/table-row.component';
import { User } from '../../model/user.model';
import { TableFilterService } from '../../services/table-filter.service';
import { UserService } from '../../services/paginado.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  imports: [
    AngularSvgIconModule,
    FormsModule,
    TableHeaderComponent,
    TableFooterComponent,
    TableRowComponent,
    TableActionComponent,
    CommonModule
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  providers: [UserService, TableFilterService],
})
export class TableComponent implements OnInit {
  users = signal<User[]>(userData);
  paginatedUsers$ = this.userService.paginatedUsers$;

  constructor(private filterService: TableFilterService, private userService: UserService) {}

  filteredUsers = computed(() => {
    const search = this.filterService.searchField().toLowerCase();
    const order = this.filterService.orderField();

    return this.users()
      .filter(
        (user: { name: string; username: string; email: string; phone: string | string[]; }) =>
          user.name.toLowerCase().includes(search) ||
          user.username.toLowerCase().includes(search) ||
          user.email.toLowerCase().includes(search) ||
          user.phone.includes(search),
      )
      .sort((a: { created_at: string | number | Date; }, b: { created_at: string | number | Date; }) => {
        const defaultNewest = !order || order === '1';
        if (defaultNewest) {
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        } else if (order === '2') {
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        }
        return 0;
      });
  });

  ngOnInit() {}
}
