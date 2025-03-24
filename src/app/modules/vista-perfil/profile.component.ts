import { Component, OnInit } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ProfileComponent } from "./pages/profileview-component";

@Component({
  selector: 'app-profile-module',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [AngularSvgIconModule, ProfileComponent],
})
export class ProfileViewComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
