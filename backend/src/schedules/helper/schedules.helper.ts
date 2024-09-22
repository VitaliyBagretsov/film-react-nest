import { Schedule } from '../entities/schedule.entity';

export const convertSchedule = (schedule: Schedule[]) =>
  schedule.map((item) => ({
    ...item,
    id: item.id.toString(),
    taken: item.taken.map(({ seat }) => seat),
  }));
