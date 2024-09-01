export interface IMovie {
  id: string;
  rating: number;
  director: string;
  tags: string[];
  title: string;
  about: string;
  description: string;
  image: string;
  cover: string;
}

export interface ISchedule {
  daytime: string;
  hall: number;
  rows: number;
  seats: number;
  price: number;
}

export interface ISession {
  id: string;
  film: string;
  daytime: string;
  day: string;
  time: string;
  hall: string;
  rows: number;
  seats: number;
  price: number;
  taken: string[];
}

export interface ITicket {
  film: string;
  session: string;
  daytime: string;
  day: string;
  time: string;
  row: number;
  seat: number;
  price: number;
}

export interface ITicketChecked extends ITicket {
  isFree: boolean;
}
