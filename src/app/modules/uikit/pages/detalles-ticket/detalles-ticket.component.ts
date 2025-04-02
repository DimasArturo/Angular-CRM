import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Ticket } from 'src/app/modules/uikit/model/tickets.model';
import {Conversacion} from 'src/app/modules/uikit/model/conversacion.model';

@Component({
  selector: 'app-detalles-ticket',
  templateUrl: './detalles-ticket.component.html',
  styleUrls: ['./detalles-ticket.component.css'],
  imports: [CommonModule],
})
export class DetailsTicketComponent implements OnInit {
  ticket: any; // Objeto para almacenar los detalles del ticket
  comments: any[] = []; // Lista de comentarios
  chat: any[] = []; // Lista de mensajes del chat

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const ticketId = this.route.snapshot.paramMap.get('id_ticket'); // Obtiene el ID del ticket desde la URL
    if (ticketId) {
      this.getTicketDetails(ticketId);
    }
  }

  /**
   * Llama a la API para obtener los detalles del ticket por ID
   */
  getTicketDetails(ticketId: string): void {
    const url = `https://demo.gruposaom.com.mx:3008/crm/get-ticket-detail-by-id/${ticketId}&1`;

    this.http.get<{ success: boolean; data: any[] }>(url).subscribe({
      next: (response) => {
        console.log('Detalles del ticket:', response);
        if (response.success && response.data.length > 0) {
          this.ticket = response.data[0]; // Asigna el primer elemento del array al objeto ticket
        } else {
          console.error('No se encontraron datos para el ticket.');
        }
      },
      error: (err) => {
        console.error('Error al obtener los detalles del ticket:', err);
      },
    });
  }
  getConversacion(ticketId: string): void {
    const url = `https://demo.gruposaom.com.mx:3008/crm/get-conversacion-ticket/${ticketId}1`;
  }

  /**
   * Publica un nuevo comentario (simulación)
   */
  addComment(commentText: string): void {
    if (!commentText.trim()) {
      return;
    }

    const newComment = {
      avatar: 'https://ui-avatars.com/api/?name=Usuario',
      author: 'Usuario Actual',
      date: new Date().toISOString().split('T')[0],
      text: commentText,
    };

    this.comments.push(newComment);
    console.log('Nuevo comentario agregado:', newComment);
  }

  /**
   * Envía un mensaje al chat (simulación)
   */
  sendMessage(messageText: string): void {
    if (!messageText.trim()) {
      return;
    }

    const newMessage = {
      avatar: 'https://ui-avatars.com/api/?name=Usuario',
      text: messageText,
      time: new Date().toLocaleTimeString(),
    };

    this.chat.push(newMessage);
    console.log('Nuevo mensaje enviado:', newMessage);
  }
}
