import { Component, OnInit } from '@angular/core';
import { clientesPotencialesData } from '../../data-tables/clientes-potenciales.data';
import { Potenciales } from '../../model/clientes-potenciales.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clientes-potenciales',
  templateUrl: './clientes-potenciales.component.html',
  styleUrls: ['./clientes-potenciales.component.css'],
  imports: [CommonModule]
})
export class ClientesPotencialesComponent implements OnInit {
  clientes: Potenciales[] = [];

  constructor() {}

  ngOnInit(): void {
    this.loadClientesPotenciales();
  }

  loadClientesPotenciales(): void {
    this.clientes = clientesPotencialesData; // Carga los datos de cuentas desde el archivo de datos
  }
}
