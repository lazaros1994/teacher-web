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
  lesson: Lesson = new Lesson();
  startTime: string;
  endTime: string;
  lessons: Lesson[] = [];

  constructor(private router: Router,
              private homeService: HomeService) {
  }

  ngOnInit(): void {
    this.teacher = JSON.parse(localStorage.getItem('teacher'));
    this.week = ['Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο', 'Κυριακή'];
  }

  createLesson(day): void {
    this.lesson.teacher = this.teacher;
    this.lesson.day = day;
    const startTimeTokens = this.startTime.split(':', 2);
    this.lesson.startHour = +startTimeTokens[0];
    this.lesson.startMinute = +startTimeTokens[1];
    const endTimeTokens = this.endTime.split(':', 2);
    this.lesson.endHour = +endTimeTokens[0];
    this.lesson.endMinute = +endTimeTokens[1];
    this.homeService.createLesson(this.lesson).subscribe(successResponse => {
      alert(successResponse);
      this.lesson = new Lesson();
      this.startTime = '';
      this.endTime = '';
    }, errorResponse => {
      alert(errorResponse);
    });
  }

  closeModal(): void {
    this.lesson = new Lesson();
    this.startTime = '';
    this.endTime = '';

  }

  getLessons(): void {
    this.homeService.getLessons(this.teacher).subscribe(data => {
      this.lessons = data;
    }, errorResponse => {
      alert(errorResponse);
    });
  }

}




