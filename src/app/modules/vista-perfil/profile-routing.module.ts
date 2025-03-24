import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileViewComponent } from './profile.component'; // Ajusta la ruta si es necesario

const routes: Routes = [
  {
    path: '',
    component: ProfileViewComponent,
    children: [
      { path: 'profileview', component: ProfileViewComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
