import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cuentas } from '../../model/cuentas.model';
import { cuentasData } from '../../data-tables/cuentas.data';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-cuentas-table',
  templateUrl: './cuentas-table.component.html',
  styleUrls: ['./cuentas-table.component.css'],
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CuentasTableComponent {
  cuentas: Cuentas[] = cuentasData;
  filteredCuentas: Cuentas[] = [...this.cuentas];
  paginatedCuentas: Cuentas[] = [];
  searchQuery: string = '';
  selectedDate: string = 'YYYY-MM-DD';

  // Variables de paginación
  currentPage: number = 0;
  itemsPerPage: number = 5;
  totalPages: number = 0;

  constructor() {
    this.loadCuentas();
  }

  // Carga los tickets y configura la paginación
  loadCuentas(): void {
    this.totalPages = Math.ceil(this.filteredCuentas.length / this.itemsPerPage);
    this.updatePagination();
  }

  // Aplica la paginación según la página actual
  updatePagination(): void {
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedCuentas = this.filteredCuentas.slice(startIndex, endIndex);
  }

  // Función para cambiar a la página siguiente
  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  // Función para cambiar a la página anterior
  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  // Función para filtrar por texto y actualizar la paginación
  filterByText(): void {
    this.filteredCuentas = this.cuentas.filter(cuenta =>
      cuenta.empresa.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      cuenta.sucursal.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      cuenta.rfc.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      cuenta.telefono.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      cuenta.email.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.currentPage = 0;
    this.loadCuentas();
  }
}
