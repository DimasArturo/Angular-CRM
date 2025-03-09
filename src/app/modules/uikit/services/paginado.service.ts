import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../model/user.model';
import { userData } from '../data-tables/user.data';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public usersSubject = new BehaviorSubject<User[]>(userData);
  public paginatedUsersSubject = new BehaviorSubject<User[]>([]);
  public currentPageSubject = new BehaviorSubject<number>(0);
  public itemsPerPage = 3;

  users$ = this.usersSubject.asObservable();
  paginatedUsers$ = this.paginatedUsersSubject.asObservable();
  currentPage$ = this.currentPageSubject.asObservable();

  constructor() {
    this.updatePagination();
  }

  updatePagination(): void {
    const currentPage = this.currentPageSubject.value;
    const startIndex = currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    const paginatedUsers = this.usersSubject.value.slice(startIndex, endIndex);
    this.paginatedUsersSubject.next(paginatedUsers);
  }

  nextPage(): void {
    const currentPage = this.currentPageSubject.value;
    const totalPages = Math.ceil(this.usersSubject.value.length / this.itemsPerPage);
    if (currentPage < totalPages - 1) {
      this.currentPageSubject.next(currentPage + 1);
      this.updatePagination();
    }
  }

  prevPage(): void {
    const currentPage = this.currentPageSubject.value;
    if (currentPage > 0) {
      this.currentPageSubject.next(currentPage - 1);
      this.updatePagination();
    }
  }
}
