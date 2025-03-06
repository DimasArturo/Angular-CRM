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
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule], // Asegúrate de importar CommonModule
  styleUrls: ['./tickets-table.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TicketsTableComponent {
  tickets: Ticket[] = ticketsData;
  filteredTickets: Ticket[] = [...this.tickets];
  searchQuery: string = '';
  filterDate: string = '';
  selectedDate: string = 'YYYY-MM-DD';

// Función para filtrar por texto
filterByText(): void {
  this.filteredTickets = this.tickets.filter(ticket =>
    ticket.id.toString().includes(this.searchQuery) ||
    ticket.titulo.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
    ticket.username.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
    ticket.status.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
    ticket.prioridad.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
    ticket.categoria.toLowerCase().includes(this.searchQuery.toLowerCase())
  );
}

// Función para filtrar por fecha
filterByDate(): void {
  if (this.selectedDate) {
    // Convertimos la fecha seleccionada al formato YYYY-MM-DD (mismo formato que usa <input type="date">)
    const selectedDate = new Date(this.selectedDate).toISOString().split('T')[0];

    this.filteredTickets = this.tickets.filter(ticket => {
      // Convertimos la fecha del ticket (que viene en formato DD/MM/YYYY) a un objeto Date
      const [day, month, year] = ticket.fecha_generado.split('/').map(num => parseInt(num, 10));
      const ticketDate = new Date(year, month - 1, day); // Meses en JS son 0-indexados

      // Convertimos a YYYY-MM-DD para comparar correctamente
      const formattedTicketDate = ticketDate.toISOString().split('T')[0];

      return formattedTicketDate === selectedDate;
    });
  } else {
    this.filteredTickets = [...this.tickets]; // Si no hay fecha seleccionada, mostrar todos los tickets
  }
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



}
