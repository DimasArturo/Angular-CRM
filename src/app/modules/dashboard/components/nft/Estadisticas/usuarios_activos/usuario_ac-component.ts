import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/modules/uikit/model/user.model';
import { userData } from 'src/app/modules/uikit/data-tables/user.data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuarioac',
  templateUrl: './usuario_ac-component.html',
  styleUrls: ['./usuario_ac-component.css'],
  imports: [CommonModule]
})
export class UsuarioAcComponent implements OnInit {
  @Input() data: any;
  users: User[] = [];

  constructor() {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.users = userData
    .sort((a, b) => b.tickets - a.tickets) // Ordena los usuarios por el número de tickets en orden descendente
    .slice(0, 5);
  }

  getMedal(index: number): string {
    switch (index) {
      case 0:
        return '🥇';
      case 1:
        return '🥈';
      case 2:
        return '🥉';
      default:
        return `${index + 1}️⃣`;
    }
  }

}
