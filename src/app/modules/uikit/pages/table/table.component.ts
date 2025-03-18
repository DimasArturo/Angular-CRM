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
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-table',
  standalone: true,
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
  styleUrls: ['./table.component.css'],
  providers: [UserService, TableFilterService],
})
export class TableComponent implements OnInit {
  users = signal<User[]>(userData); // Lista de usuarios
  constructor(private filterService: TableFilterService, public userService: UserService) {}

  // Computed para filtrar y ordenar usuarios
  filteredUsers = computed(() => {
    const search = this.filterService.searchField().toLowerCase();
    const order = this.filterService.orderField();

    return this.users()
      .filter((user: User) =>
        user.name.toLowerCase().includes(search) ||
        user.username.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search) ||
        user.phone.includes(search)
      )
      .sort((a: User, b: User) => {
        const defaultNewest = !order || order === '1';
        if (defaultNewest) {
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        } else if (order === '2') {
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        }
        return 0;
      });
  });

  ngOnInit(): void {
    // Inicialización si es necesario
  }

}
