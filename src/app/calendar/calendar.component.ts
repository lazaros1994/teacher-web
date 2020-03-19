import {Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {HomeService} from '../home/home.service';
import {Teacher} from '../models/teacher';
import {Lesson} from '../models/lesson';

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
  teacher: Teacher;
  lessons: Lesson[] = [];
  lessonCreate: Lesson = new Lesson();
  startTime: string;
  endTime: string;

  constructor(private router: Router,
              private homeService: HomeService) {
    // setInterval(() => {
    //   this.now = new Date();
    // }, 1);
  }

  ngOnInit(): void {
    this.teacher = JSON.parse(localStorage.getItem('teacher'));
    this.currentDay = this.now.getDate();
    this.currentMonth = this.now.getUTCMonth();
    this.currentYear = this.now.getFullYear();
    console.log(new Date(12, 12, 12));
    console.log(this.currentDay);
    console.log(this.currentMonth);
    console.log(this.currentYear);
    this.week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    // console.log(this.currentYear);
    // console.log(this.currentMonthDays);
    this.currentMonthDays = new Date(this.currentYear, this.currentMonth + 1).getUTCDate();
    for (let i = 0; i < this.currentMonthDays; i++) {
      // this.days.push(i + 1);
      this.allDays[i] = new Date(this.currentYear, this.currentMonth, i + 1);
      console.log(this.week[this.allDays[i].getDay()]);
    }
    this.selectedDate = this.now;
    this.getLessons();
  }

  nextMonth(): void {
    this.allDays = [];
    this.currentMonth = this.currentMonth + 1;
    this.currentMonthDays = new Date(this.currentYear, this.currentMonth + 1).getUTCDate();
    for (let i = 0; i < this.currentMonthDays; i++) {
      // this.days.push(i + 1);
      this.allDays[i] = new Date(this.currentYear, this.currentMonth, i + 1);
    }
    this.selectedDate = new Date(this.currentYear, this.currentMonth);
    console.log(this.selectedDate);
  }

  previousMonth(): void {
    this.allDays = [];
    this.currentMonth = this.currentMonth - 1;
    this.currentMonthDays = new Date(this.currentYear, this.currentMonth + 1).getUTCDate();
    for (let i = 0; i < this.currentMonthDays; i++) {
      // this.days.push(i + 1);
      this.allDays[i] = new Date(this.currentYear, this.currentMonth, i + 1);
    }
    this.selectedDate = new Date(this.currentYear, this.currentMonth);
    console.log(this.selectedDate);
  }

  getLessons(): void {
    this.homeService.getLessons(this.teacher).subscribe(data => {
      this.lessons = data;
      console.log(this.lessons);
    }, errorResponse => {
      alert(errorResponse);
    });
  }

  createLesson(day): void {
    console.log(this.startTime);
    this.lessonCreate.teacher = this.teacher;
    this.lessonCreate.day = day;
    const startTimeTokens = this.startTime.split(':', 2);
    this.lessonCreate.startHour = startTimeTokens[0];
    this.lessonCreate.startMinute = startTimeTokens[1];
    const endTimeTokens = this.endTime.split(':', 2);
    this.lessonCreate.endHour = endTimeTokens[0];
    this.lessonCreate.endMinute = endTimeTokens[1];
    this.homeService.createLesson(this.lessonCreate).subscribe(successResponse => {
      alert(successResponse);
      this.lessonCreate = new Lesson();
      this.startTime = '';
      this.endTime = '';
      this.getLessons();
    }, errorResponse => {
      alert(errorResponse);
    });
  }

  closeModal(): void {
    this.lessonCreate = new Lesson();
    this.startTime = '';
    this.endTime = '';

  }

  checkEmptyField(): boolean {
    if (this.startTime === undefined || this.endTime === undefined || this.lessonCreate.course === undefined || this.lessonCreate.studentName === undefined ||
      this.lessonCreate.studentSurname === undefined
      || this.lessonCreate.euroPerHour === undefined || this.startTime === '' || this.endTime === '' || this.lessonCreate.course === '' || this.lessonCreate.studentName === '' ||
      this.lessonCreate.studentSurname === ''
      || this.lessonCreate.euroPerHour === null) {
      return true;
    } else {
      return false;
    }

  }

}
