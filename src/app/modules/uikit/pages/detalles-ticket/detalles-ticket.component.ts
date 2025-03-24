import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/modules/uikit/model/tickets.model';
import { ticketsData } from '../../data-tables/tickets.data';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tickets-table',
  templateUrl: './detalles-ticket.component.html',
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule, RouterModule],
  styleUrls: ['./detalles-ticket.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DetailsTicketComponent implements OnInit {
  ticket: Ticket | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const ticketId = this.route.snapshot.paramMap.get('id');
    if (ticketId) {
      this.ticket = ticketsData.find(ticket => ticket.id === parseInt(ticketId, 10));
    }
  }
}
