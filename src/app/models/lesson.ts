import {Teacher} from './teacher';
import {CancelledLesson} from './cancelledLesson';

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

export class LessonWithCancelled {
  lesson: Lesson;
  daysCancelled: number[] = [];
}
