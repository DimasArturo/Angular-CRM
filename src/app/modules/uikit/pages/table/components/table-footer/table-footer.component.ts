import { Component } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { User } from 'src/app/modules/uikit/model/user.model';
import { map } from 'rxjs';
import { UserService } from 'src/app/modules/uikit/services/paginado.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-footer',
  imports: [AngularSvgIconModule, CommonModule],
  templateUrl: './table-footer.component.html',
  styleUrl: './table-footer.component.css',
  providers: [UserService],
})
export class TableFooterComponent {
  currentPage$ = this.userService.currentPage$;
  totalPages$ = this.userService.users$.pipe(
    map((users: User[]) => Math.ceil(users.length / this.userService.itemsPerPage))
  );

  constructor(private userService: UserService) {}

  nextPage(): void {
    this.userService.nextPage();
  }

  prevPage(): void {
    this.userService.prevPage();
  }

}
