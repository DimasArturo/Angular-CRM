import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: '',
    loadChildren: () => import('./modules/layout/layout.module').then(m => m.LayoutModule),
  },
  {
    path: 'errors',
    loadChildren: () => import('./modules/error/error.module').then(m => m.ErrorModule),
  },
  { path: '**', redirectTo: 'errors/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
