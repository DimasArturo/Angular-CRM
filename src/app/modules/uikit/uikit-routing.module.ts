import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UikitComponent } from './uikit.component';
import { TableComponent } from './pages/table/table.component';
import { TicketsTableComponent } from './pages/tickets-table/tickets-table.component';
import { CommonModule } from '@angular/common';


const routes: Routes = [
  {
    path: '',
    component: UikitComponent,
    children: [
      { path: '', redirectTo: 'components', pathMatch: 'full' },
      { path: 'table', component: TableComponent },
      { path: '**', redirectTo: 'errors/404' },
      {path: 'tickets-table', component: TicketsTableComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
})
export class UikitRoutingModule {}
