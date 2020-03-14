import {Teacher} from './teacher';

export class TeacherHasLesson {
  id: number;
  teacher: Teacher;
  studentName: string;
  studentSurName: string;
  day: string;
  startHour: string;
  endHour: string;
  course: string;
  euroPerHour: number;
}
