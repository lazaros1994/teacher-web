import {Teacher} from './teacher';

export class Lesson {
  id: number;
  teacher: Teacher;
  studentName: string;
  studentSurname: string;
  day: string;
  startHour: string;
  startMinute: string;
  endHour: string;
  endMinute: string;
  course: string;
  euroPerHour: number;
}
