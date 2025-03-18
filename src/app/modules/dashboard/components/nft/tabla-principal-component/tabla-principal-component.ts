import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/modules/uikit/model/tickets.model';
import { ticketsData } from '../../../../uikit/data-tables/tickets.data';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-tabla-principal',
  templateUrl: './tabla-principal-component.html',
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule],
  styleUrls: ['./tabla-principal-component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class tablaPrincipalComponent implements OnInit {
  tickets: Ticket[] = [];

  ngOnInit(): void {
    this.tickets = [
      {
        id: 70210,
        titulo: "Actualización de firewall",
        empresa: "Grupo Magno",
        descripcion: "Configuración y actualización del firewall perimetral para mejorar la seguridad de la red.",
        status: "Pendiente",
        fecha_generado: "08/03/2025",
        fecha_asignado: "",
        fecha_atendido: "",
        fecha_resuelto: "",
        username: "Sin Asignar",
        id_user: 285,
        prioridad: "Alta",
        categoria: "Seguridad y vigilancia",
        observaciones: ""
      },
      {
        id: 70211,
        titulo: "Instalación de VPN",
        empresa: "Grupo Magno",
        descripcion: "Implementación de una VPN para acceso remoto seguro a la red corporativa.",
        status: "Pendiente",
        fecha_generado: "09/03/2025",
        fecha_asignado: "",
        fecha_atendido: "",
        fecha_resuelto: "",
        username: "Sin Asignar",
        id_user: 286,
        prioridad: "Alta",
        categoria: "Redes",
        observaciones: ""
      }
    ];
  }
  getStatusClass(status: string) {
    return {
      'bg-pendiente': status === 'Pendiente',
    };
  }
  getPrioridadClass(prioridad: string) {
    return {
      'bg-alta': prioridad === 'Alta',
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
