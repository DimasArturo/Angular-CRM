import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/modules/uikit/model/tickets.model';
import { ticketsData } from '../../data-tables/tickets.data';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-tickets-table',
  templateUrl: './tickets-table.component.html',
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule],
  styleUrls: ['./tickets-table.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TicketsTableComponent {
  tickets: Ticket[] = ticketsData;
  filteredTickets: Ticket[] = [...this.tickets];
  paginatedTickets: Ticket[] = [];
  searchQuery: string = '';
  selectedDate: string = 'YYYY-MM-DD';

  // Variables de paginación
  currentPage: number = 0;
  itemsPerPage: number = 5;
  totalPages: number = 0;

  constructor() {
    this.loadTickets();
  }

  // Carga los tickets y configura la paginación
  loadTickets(): void {
    this.totalPages = Math.ceil(this.filteredTickets.length / this.itemsPerPage);
    this.updatePagination();
  }

  // Aplica la paginación según la página actual
  updatePagination(): void {
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedTickets = this.filteredTickets.slice(startIndex, endIndex);
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
    this.filteredTickets = this.tickets.filter(ticket =>
      ticket.id.toString().includes(this.searchQuery) ||
      ticket.titulo.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      ticket.username.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      ticket.status.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      ticket.prioridad.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      ticket.categoria.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.currentPage = 0;
    this.loadTickets();
  }

  // Función para filtrar por fecha y actualizar la paginación
  filterByDate(): void {
    if (this.selectedDate) {
      const selectedDate = new Date(this.selectedDate).toISOString().split('T')[0];

      this.filteredTickets = this.tickets.filter(ticket => {
        const [day, month, year] = ticket.fecha_generado.split('/').map(num => parseInt(num, 10));
        const ticketDate = new Date(year, month - 1, day);
        const formattedTicketDate = ticketDate.toISOString().split('T')[0];

        return formattedTicketDate === selectedDate;
      });
    } else {
      this.filteredTickets = [...this.tickets];
    }
    this.currentPage = 0;
    this.loadTickets();
  }

  estados = [
    'Pendiente',
    'En proceso',
    'Seguimiento',
    'Cerrado',
    'Ganado',
    'Perdido',
    'Desestimado'
  ];

  getStatusClass(status: string) {
    return {
      'bg-pendiente': status === 'Pendiente',
      'bg-en-proceso': status === 'En proceso',
      'bg-seguimiento': status === 'Seguimiento',
      'bg-cerrado': status === 'Cerrado',
      'bg-ganado': status === 'Ganado',
      'bg-perdido': status === 'Perdido',
      'bg-desestimado': status === 'Desestimado'
    };
  }

  getPrioridadClass(prioridad: string) {
    return {
      'bg-alta': prioridad === 'Alta',
      'bg-media': prioridad === 'Media',
      'bg-baja': prioridad === 'Baja'
    };
  }

  getCategoria(categoria: string) {
    return {
      'bg-seguridad': categoria === 'Seguridad y vigilancia',
      'bg-redes': categoria === 'Redes',
      'bg-software': categoria === 'Software',
      'bg-mantenimiento': categoria === 'Mantenimiento',
    };
  }
}
