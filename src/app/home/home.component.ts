import {Component, OnInit} from '@angular/core';
import {HomeService} from './home.service';
import {Teacher} from '../models/teacher';
import {Lesson} from '../models/lesson';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  week: string[] = [];
  teacher: Teacher;
  lessonCreate: Lesson = new Lesson();
  startTime: string;
  endTime: string;
  lessons: Lesson[] = [];

  constructor(private router: Router,
              private homeService: HomeService) {
  }

  ngOnInit(): void {
    this.teacher = JSON.parse(localStorage.getItem('teacher'));
    this.week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    this.getLessons();
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

  getLessons(): void {
    this.homeService.getLessons(this.teacher).subscribe(data => {
      this.lessons = data;
      console.log(this.lessons);
    }, errorResponse => {
      alert(errorResponse);
    });
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

  deleteLesson(lesson): void {
    this.homeService.deleteLesson(lesson).subscribe(data => {
      const alertMessage = 'Lesson' + data + 'deleted';
      alert(alertMessage);
      this.getLessons();
    }, errorResponse => {
      alert(errorResponse);
    });
  }
}




