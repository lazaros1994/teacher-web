import {Teacher} from './teacher';

export class ExtraLesson {
  id: number;
  teacher: Teacher;
  studentName: string;
  studentSurname: string;
  year: number;
  month: string;
  day: number;
  startHour: string;
  startMinute: string;
  endHour: string;
  endMinute: string;
  course: string;
  euroPerHour: number;
}
