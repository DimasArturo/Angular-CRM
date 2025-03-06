import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/modules/uikit/model/clientes.model';
import { clientesData } from 'src/app/modules/uikit/data-tables/clientes.data';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-clientes-table',
  templateUrl: './clientes-table.components.html',
  imports: [CommonModule, FormsModule], // Asegúrate de importar CommonModule
  styleUrls: ['./clientes-table.component.css']
})
export class ClientesTableComponent {
  Cliente: Cliente[] = clientesData;
  filteredClientes: Cliente[] = [...this.Cliente];
  searchQuery: string = '';

// Función para filtrar por texto
filterByText(): void {
  this.filteredClientes = this.Cliente.filter(cliente =>
    cliente.id.toString().includes(this.searchQuery) ||
    cliente.empresa.toLowerCase().includes(this.searchQuery.toLowerCase())
  );
}
}

