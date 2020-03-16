import {Teacher} from './teacher';

export class Lesson {
  id: number;
  teacher: Teacher;
  studentName: string;
  studentSurname: string;
  day: string;
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  course: string;
  euroPerHour: number;
}
