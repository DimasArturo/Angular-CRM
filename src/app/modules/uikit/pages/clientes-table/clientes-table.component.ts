import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Cliente } from 'src/app/modules/uikit/model/clientes.model';
import { clientesData } from 'src/app/modules/uikit/data-tables/clientes.data';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-clientes-table',
  templateUrl: './clientes-table.components.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./clientes-table.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ClientesTableComponent {
  Cliente: Cliente[] = clientesData;
  filteredClientes: Cliente[] = [...this.Cliente];
  searchQuery: string = '';
    paginatedClientes: Cliente[] = [];
    // Variables de paginación
    currentPage: number = 0;
    itemsPerPage: number = 4;
    totalPages: number = 0;

    constructor() {
      this.loadClientes();
    }

    // Carga los  Clientes y configura la paginación
    loadClientes(): void {
      this.totalPages = Math.ceil(this.filteredClientes.length / this.itemsPerPage);
      this.updatePagination();
    }

    // Aplica la paginación según la página actual
    updatePagination(): void {
      const startIndex = this.currentPage * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      this.paginatedClientes = this.filteredClientes.slice(startIndex, endIndex);
    }

    // Función para cambiar a la página siguiente
    nextPages(): void {
      if (this.currentPage < this.totalPages - 1) {
        this.currentPage++;
        this.updatePagination();
      }
    }

    // Función para cambiar a la página anterior
    prevPages(): void {
      if (this.currentPage > 0) {
        this.currentPage--;
        this.updatePagination();
      }
    }

// Función para filtrar por texto
filterByText(): void {
  this.filteredClientes = this.Cliente.filter(cliente =>
    cliente.id.toString().includes(this.searchQuery) ||
    cliente.empresa.toLowerCase().includes(this.searchQuery.toLowerCase())||
    cliente.nombre.toLowerCase().includes(this.searchQuery.toLowerCase())||
    cliente.apellido.toLowerCase().includes(this.searchQuery.toLowerCase())
  );
  this.currentPage = 0;
  this.loadClientes();
}
}

