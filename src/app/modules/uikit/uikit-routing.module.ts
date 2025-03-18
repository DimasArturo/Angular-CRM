import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UikitComponent } from './uikit.component';
import { TableComponent } from './pages/table/table.component';
import { TicketsTableComponent } from './pages/tickets-table/tickets-table.component';
import { ClientesTableComponent } from './pages/clientes-table/clientes-table.component';
import { CuentasTableComponent } from './pages/cuentas-table/cuentas-table.component';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

const routes: Routes = [
  {
    path: '',
    component: UikitComponent,
    children: [
      { path: '', redirectTo: 'components', pathMatch: 'full' },
      { path: 'table', component: TableComponent },
      { path: '**', redirectTo: 'errors/404' },
      {path: 'tickets-table', component: TicketsTableComponent},
      {path: 'clientes-table', component: ClientesTableComponent},
      {path: 'cuentas-table', component: CuentasTableComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, MatSelectModule, MatFormFieldModule],
  exports: [RouterModule],
})
export class UikitRoutingModule {}
