import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileViewComponent } from './profile.component';

@NgModule({
  imports: [CommonModule, ProfileRoutingModule, ProfileViewComponent],
})
export class ProfileModule {}
