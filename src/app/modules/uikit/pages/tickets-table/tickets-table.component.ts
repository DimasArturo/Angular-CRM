import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Ticket } from 'src/app/modules/uikit/model/tickets.model';

@Component({
  selector: 'app-tickets-table',
  templateUrl: './tickets-table.component.html',
  styleUrls: ['./tickets-table.component.css'],
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TicketsTableComponent implements OnInit {
  // Lista completa de tickets desde la API
  tickets: Ticket[] = [];

  // Lista de tickets que se muestran paginados
  paginatedTickets: Ticket[] = [];
  estados: string[] = ['Propuesta Enviada', 'Cotizando', 'En Proceso', 'Cerrado']; // Estados disponibles


  // Parámetros de paginación
  currentPage: number = 0;
  pageSize: number = 10;
  totalPages: number = 0;

  // Filtros
  searchQuery: string = '';
  selectedDate: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const fechaI = '2023-01-01 00:00:00';
    const fechaF = '2023-12-31 23:59:59';
    this.getTicketsPorRangoFechas(fechaI, fechaF, 1);
  }

  /**
   * Llama a la API para obtener tickets dentro del rango de fechas
   */
  getTicketsPorRangoFechas(fechaI: string, fechaF: string, tipo: number): void {
    const url = `https://demo.gruposaom.com.mx:3008/crm/get-tickets-ventas-all/${encodeURIComponent(fechaI)}&${encodeURIComponent(fechaF)}&${tipo}`;

    this.http.get<{ data: Ticket[] }>(url).subscribe({
      next: (response) => {
        console.log('Respuesta de la API:', response);
        this.tickets = response.data;
        this.applyPagination();
      },
      error: (err) => {
        console.error('Error al obtener tickets:', err);
        this.tickets = [];
      },
    });
  }

  /**
   * Devuelve los tickets filtrados por nombre y fecha
   */
  filteredTickets(): Ticket[] {
    return this.tickets.filter((ticket) =>
      (!this.searchQuery || ticket.nameCliente?.toLowerCase().includes(this.searchQuery.toLowerCase())) &&
      (!this.selectedDate || ticket.fecha_creacion?.startsWith(this.selectedDate))
    );
  }

  /**
   * Aplica la paginación sobre los tickets filtrados
   */
  applyPagination(): void {
    const filtered = this.filteredTickets();
    this.totalPages = Math.ceil(filtered.length / this.pageSize);
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedTickets = filtered.slice(start, end);
  }
   /**
   * Confirma el cambio de estado del ticket
   */
   confirmEstadoChange(ticket: Ticket): void {
    const previousEstado = ticket.name_estado_ticket; // Estado anterior
    const confirmed = confirm(`¿Estás seguro de que deseas cambiar el estado a "${ticket.name_estado_ticket}"?`);

    if (!confirmed) {
      // Si el usuario cancela, revertimos el cambio
      ticket.name_estado_ticket = previousEstado;
    } else {
      // Aquí puedes implementar la lógica para enviar el cambio a la API
      console.log(`Estado cambiado a: ${ticket.name_estado_ticket}`);
      // Ejemplo de llamada POST para actualizar el estado en la base de datos:
      // this.updateEstado(ticket);
    }
  }

  /**
   * Actualiza el estado del ticket en la base de datos (implementación futura)
   */
  updateEstado(ticket: Ticket): void {
    const url = `https://demo.gruposaom.com.mx:3008/crm/update-ticket-estado`;
    const body = {
      id_ticket: ticket.id_ticket,
      name_estado_ticket: ticket.name_estado_ticket,
    };

    this.http.post(url, body).subscribe({
      next: (response) => {
        console.log('Estado actualizado correctamente:', response);
      },
      error: (err) => {
        console.error('Error al actualizar el estado:', err);
      },
    });
  }

  /**
   * Se ejecuta al escribir en el buscador
   */
  filterByText(): void {
    this.currentPage = 0;
    this.applyPagination();
  }

  /**
   * Se ejecuta al seleccionar una fecha
   */
  filterByDate(): void {
    this.currentPage = 0;
    this.applyPagination();
  }

  /**
   * Cambia a la página siguiente
   */
  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.applyPagination();
    }
  }

  /**
   * Cambia a la página anterior
   */
  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.applyPagination();
    }
  }

  /**
   * Devuelve la clase CSS para el estado del ticket
   */
  getStatusClass(status: string): { [key: string]: boolean } {
    return {
      'bg-pendiente': status === 'Pendiente',
      'bg-en-proceso': status === 'En proceso',
      'bg-seguimiento': status === 'Seguimiento',
      'bg-cerrado': status === 'Cerrado',
      'bg-ganado': status === 'Ganado',
      'bg-perdido': status === 'Perdido',
      'bg-desestimado': status === 'Desestimado',
    };
  }

  /**
   * Devuelve la clase CSS para la prioridad del ticket
   */
  getPrioridadClass(prioridad: string): { [key: string]: boolean } {
    return {
      'bg-alta': prioridad === 'Alta',
      'bg-media': prioridad === 'Media',
      'bg-baja': prioridad === 'Baja',
    };
  }

  /**
   * Devuelve la clase CSS para la categoría del ticket
   */
  getCategoria(categoria: string): { [key: string]: boolean } {
    return {
      'bg-seguridad': categoria === 'Seguridad y vigilancia',
      'bg-redes': categoria === 'Redes',
      'bg-software': categoria === 'Software',
      'bg-mantenimiento': categoria === 'Mantenimiento',
    };
  }
}
