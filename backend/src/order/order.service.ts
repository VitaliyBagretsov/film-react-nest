import { Injectable } from '@nestjs/common';

import { FilmsService } from '../films/films.service';
import { ITicketChecked } from '../types';
import { TicketFailException } from '../exceptions/ticket-fail.exception';

import { OrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(public filmsService: FilmsService) {}

  async create(order: OrderDto) {
    const ticketPromises: Promise<ITicketChecked>[] = order.tickets.map(
      this.filmsService.updateSeat.bind(this.filmsService),
    );

    const ticketChecked = await Promise.all(ticketPromises);
    if (ticketChecked.filter((ticket) => !ticket.isFree).length)
      throw new TicketFailException();
    const ticketsAdd = ticketChecked.filter((ticket) => ticket.isFree);

    return { items: ticketsAdd, total: ticketsAdd.length };
  }
}
