import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HomeService} from '../home/home.service';
import {Teacher} from '../models/teacher';
import {Lesson, LessonWithCancelled} from '../models/lesson';
import {ExtraLesson} from '../models/extraLesson';
import {CalendarService} from './calendar.service';
import {CancelledLesson} from '../models/cancelledLesson';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  public now: Date = new Date();
  currentMonth: number;
  currentYear: number;
  currentMonthDays: number;
  allDays: Date[] = [];
  selectedDate: Date = new Date();
  week: string[] = [];
  months: string[] = [];
  teacher: Teacher;
  lessons: Lesson[] = [];
  extraLessons: ExtraLesson[] = [];
  extraLessonCreate: ExtraLesson = new ExtraLesson();
  startTime: string;
  endTime: string;
  cancelledLesson: CancelledLesson = new CancelledLesson();
  allCancelledLessons: CancelledLesson[] = [];
  weeklyAndCancelledLessons: LessonWithCancelled[] = [];
  cancelledLessonToBeDeleted: CancelledLesson = new CancelledLesson();

  constructor(private router: Router,
              private homeService: HomeService,
              private calendarService: CalendarService) {
  }

  ngOnInit(): void {
    this.teacher = JSON.parse(localStorage.getItem('teacher'));
    this.currentMonth = this.now.getUTCMonth();
    this.currentYear = this.now.getFullYear();
    this.week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    this.currentMonthDays = new Date(this.currentYear, this.currentMonth + 1).getUTCDate();
    for (let i = 0; i < this.currentMonthDays; i++) {
      this.allDays[i] = new Date(this.currentYear, this.currentMonth, i + 1);
    }
    this.selectedDate = this.now;
    this.getLessons();
    this.getAllExtraLessons();
    this.getAllCancelledLessons();
  }


  nextMonth(): void {
    this.allDays = [];
    this.currentMonth = this.currentMonth + 1;
    this.currentMonthDays = new Date(this.currentYear, this.currentMonth + 1).getUTCDate();
    for (let i = 0; i < this.currentMonthDays; i++) {
      this.allDays[i] = new Date(this.currentYear, this.currentMonth, i + 1);
    }

    this.selectedDate = new Date(this.currentYear, this.currentMonth);
    this.getLessons();
    this.getAllExtraLessons();
    this.getAllCancelledLessons();
  }

  previousMonth(): void {
    this.allDays = [];
    this.currentMonth = this.currentMonth - 1;
    this.currentMonthDays = new Date(this.currentYear, this.currentMonth + 1).getUTCDate();
    for (let i = 0; i < this.currentMonthDays; i++) {
      this.allDays[i] = new Date(this.currentYear, this.currentMonth, i + 1);
    }
    this.selectedDate = new Date(this.currentYear, this.currentMonth);
    this.getLessons();
    this.getAllExtraLessons();
    this.getAllCancelledLessons();
  }

  getLessons(): void {
    this.homeService.getLessons(this.teacher).subscribe(data => {
      this.lessons = data;
      let i = 0;
      this.lessons.forEach(lesson => {
        this.weeklyAndCancelledLessons[i] = new LessonWithCancelled();
        this.weeklyAndCancelledLessons[i].lesson = lesson;
        for (let j = 0; j <= this.currentMonthDays; j++) {
          this.weeklyAndCancelledLessons[i].daysCancelled[j] = 0;
        }
        i++;
      });
    }, errorResponse => {
      alert(errorResponse);
    });
  }


  createExtraLesson(year, month, day): void {
    this.extraLessonCreate.teacher = this.teacher;
    this.extraLessonCreate.day = day;
    this.extraLessonCreate.month = month;
    this.extraLessonCreate.year = year;
    const startTimeTokens = this.startTime.split(':', 2);
    this.extraLessonCreate.startHour = startTimeTokens[0];
    this.extraLessonCreate.startMinute = startTimeTokens[1];
    const endTimeTokens = this.endTime.split(':', 2);
    this.extraLessonCreate.endHour = endTimeTokens[0];
    this.extraLessonCreate.endMinute = endTimeTokens[1];
    this.calendarService.createExtraLesson(this.extraLessonCreate).subscribe(successResponse => {
      alert(successResponse);
      this.extraLessonCreate = new ExtraLesson();
      this.startTime = '';
      this.endTime = '';
      this.getLessons();
      this.getAllExtraLessons();
    }, errorResponse => {
      alert(errorResponse);
    });
  }

  closeModal(): void {
    this.extraLessonCreate = new ExtraLesson();
    this.startTime = '';
    this.endTime = '';

  }

  checkEmptyField(): boolean {
    if (this.startTime === undefined || this.endTime === undefined || this.extraLessonCreate.course === undefined
      || this.extraLessonCreate.studentName === undefined ||
      this.extraLessonCreate.studentSurname === undefined
      || this.extraLessonCreate.euroPerHour === undefined || this.startTime === ''
      || this.endTime === '' || this.extraLessonCreate.course === '' || this.extraLessonCreate.studentName === '' ||
      this.extraLessonCreate.studentSurname === ''
      || this.extraLessonCreate.euroPerHour === null) {
      return true;
    } else {
      return false;
    }

  }

  cancelLesson(lesson, day): void {
    this.cancelledLesson.lesson = lesson;
    this.cancelledLesson.year = day.getFullYear();
    this.cancelledLesson.month = day.getMonth();
    this.cancelledLesson.day = day.getDate();
    this.calendarService.createCancelledLesson(this.cancelledLesson).subscribe(successResponse => {
      alert(successResponse);
      this.extraLessonCreate = new ExtraLesson();
      this.startTime = '';
      this.endTime = '';
      this.getLessons();
      this.getAllCancelledLessons();
      this.getAllExtraLessons();
    }, errorResponse => {
      alert(errorResponse);
    });

  }

  deleteExtraLesson(extraLesson): void {
    this.calendarService.deleteExtraLesson(extraLesson).subscribe(data => {
      const alertMessage = 'Extra Lesson' + data + 'deleted';
      alert(alertMessage);
      this.getLessons();
      this.getAllCancelledLessons();
      this.getAllExtraLessons();
    }, errorResponse => {
      alert(errorResponse);
    });
  }

  deleteCancelledLesson(lesson, day): void {
    console.log('day is ' + day);
    console.log('current is ' + this.selectedDate);
    console.log(this.allCancelledLessons);
    this.allCancelledLessons.forEach(cl => {
      console.log(cl.lesson.id);
      console.log(cl.id);
      if (lesson.id === cl.lesson.id && cl.year === day.getFullYear() &&
        cl.month === day.getMonth() && cl.day === day.getDate()) {
        this.cancelledLessonToBeDeleted = cl;

        this.calendarService.deleteCancelledLesson(this.cancelledLessonToBeDeleted).subscribe(data => {
          const alertMessage = 'Cancelled Lesson' + data + 'deleted';
          alert(alertMessage);
          this.getLessons();
          this.getAllCancelledLessons();
          this.getAllExtraLessons();
        }, errorResponse => {
          alert(errorResponse);
        });
      }
    });


  }

  getAllExtraLessons(): void {
    this.calendarService.getExtraLessons(this.teacher).subscribe(data => {
      this.extraLessons = data;
    }, errorResponse => {
      alert(errorResponse);
    });
  }

  getAllCancelledLessons(): void {
    this.calendarService.getCancelledLessons(this.teacher).subscribe(data => {
      this.allCancelledLessons = data;
      this.allCancelledLessons.forEach(cl => {
        this.weeklyAndCancelledLessons.forEach(wl => {
          if (wl.lesson.id === cl.lesson.id && cl.year === this.selectedDate.getFullYear() && cl.month === this.selectedDate.getMonth()) {
            wl.daysCancelled[cl.day] = 1;

          }
        });
      });
    }, errorResponse => {
      alert(errorResponse);
    });
  }

}
