import {Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {HomeService} from '../home/home.service';
import {Teacher} from '../models/teacher';
import {Lesson} from '../models/lesson';
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
  currentDay: number;
  currentMonth: number;
  currentYear: number;
  currentMonthDays: number;
  allDays: Date[] = [];
  selectedDate: Date = new Date();
  week: string[] = [];
  months: string[] = [];
  teacher: Teacher;
  lessons: Lesson[] = [];
  extraLessonCreate: ExtraLesson = new ExtraLesson();
  startTime: string;
  endTime: string;
  cancelledLesson: CancelledLesson = new CancelledLesson();

  constructor(private router: Router,
              private homeService: HomeService,
              private calendarService: CalendarService) {
  }

  ngOnInit(): void {
    this.teacher = JSON.parse(localStorage.getItem('teacher'));
    this.currentDay = this.now.getDate();
    this.currentMonth = this.now.getUTCMonth();
    this.currentYear = this.now.getFullYear();
    this.week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.currentMonthDays = new Date(this.currentYear, this.currentMonth + 1).getUTCDate();
    for (let i = 0; i < this.currentMonthDays; i++) {
      this.allDays[i] = new Date(this.currentYear, this.currentMonth, i + 1);
    }
    this.selectedDate = this.now;
    this.getLessons();
  }

  nextMonth(): void {
    this.allDays = [];
    this.currentMonth = this.currentMonth + 1;
    this.currentMonthDays = new Date(this.currentYear, this.currentMonth + 1).getUTCDate();
    for (let i = 0; i < this.currentMonthDays; i++) {
      this.allDays[i] = new Date(this.currentYear, this.currentMonth, i + 1);
    }
    this.selectedDate = new Date(this.currentYear, this.currentMonth);
  }

  previousMonth(): void {
    this.allDays = [];
    this.currentMonth = this.currentMonth - 1;
    this.currentMonthDays = new Date(this.currentYear, this.currentMonth + 1).getUTCDate();
    for (let i = 0; i < this.currentMonthDays; i++) {
      this.allDays[i] = new Date(this.currentYear, this.currentMonth, i + 1);
    }
    this.selectedDate = new Date(this.currentYear, this.currentMonth);
  }

  getLessons(): void {
    this.homeService.getLessons(this.teacher).subscribe(data => {
      this.lessons = data;
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
    if (this.startTime === undefined || this.endTime === undefined || this.extraLessonCreate.course === undefined || this.extraLessonCreate.studentName === undefined ||
      this.extraLessonCreate.studentSurname === undefined
      || this.extraLessonCreate.euroPerHour === undefined || this.startTime === '' || this.endTime === '' || this.extraLessonCreate.course === '' || this.extraLessonCreate.studentName === '' ||
      this.extraLessonCreate.studentSurname === ''
      || this.extraLessonCreate.euroPerHour === null) {
      return true;
    } else {
      return false;
    }

  }

  cancelLesson(lesson, day): void {
    console.log(lesson);
    console.log(day.getFullYear());
    console.log(this.months[day.getMonth()]);
    console.log(day.getDate());
    this.cancelledLesson.lesson = lesson;
    this.cancelledLesson.year = day.getFullYear();
    this.cancelledLesson.month = this.months[day.getMonth()];
    this.cancelledLesson.day = day.getDate();
    this.calendarService.createCancelledLesson(this.cancelledLesson).subscribe(successResponse => {
      alert(successResponse);
      this.extraLessonCreate = new ExtraLesson();
      this.startTime = '';
      this.endTime = '';
      this.getLessons();
    }, errorResponse => {
      alert(errorResponse);
    });

  }

}
