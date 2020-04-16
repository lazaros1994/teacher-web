import {Component, OnInit} from '@angular/core';
import {Teacher} from '../models/teacher';
import {Router} from '@angular/router';
import {ProfileService} from './profile.service';
import {HomeService} from '../home/home.service';
import {Lesson} from '../models/lesson';
import {CalendarService} from '../calendar/calendar.service';
import {ExtraLesson} from '../models/extraLesson';
import {CancelledLesson} from '../models/cancelledLesson';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  teacher: Teacher;
  hoursAndEuroThisMonth: number[] = [];
  extraLessons: ExtraLesson[] = [];
  extraLessonThisMonthCounter: number;
  cancelledLessons: CancelledLesson[] = [];
  cancelledLessonThisMonthCounter: number;
  currentMonth: number;
  currentYear: number;
  public now: Date = new Date();
  newName: string;
  newSurname: string;
  newEmail: string;
  newPassword: string;
  confirmNewPassword: string;

  constructor(private router: Router,
              private profileService: ProfileService,
              private  calendarService: CalendarService) {
  }

  ngOnInit(): void {
    this.teacher = JSON.parse(localStorage.getItem('teacher'));
    this.currentMonth = this.now.getUTCMonth();
    this.currentYear = this.now.getFullYear();
    this.extraLessonThisMonthCounter = 0;
    this.cancelledLessonThisMonthCounter = 0;
    this.getHoursThisMonth();
    this.getAllCancelledLessons();
    this.getAllExtraLessons();
    this.newName = this.teacher.name;
    this.newSurname = this.teacher.surname;
    this.newEmail = this.teacher.email;
  }

  getHoursThisMonth(): void {
    this.profileService.getHoursAndEuroThisMonth(this.teacher).subscribe(data => {
      this.hoursAndEuroThisMonth = data;
    }, errorResponse => {
      alert(errorResponse);
    });
  }


  getAllExtraLessons(): void {
    this.calendarService.getExtraLessons(this.teacher).subscribe(data => {
      this.extraLessons = data;
      this.extraLessons.forEach(extraLesson => {
        if (extraLesson.year === this.currentYear && extraLesson.month === this.currentMonth) {
          this.extraLessonThisMonthCounter++;
        }
      });

    }, errorResponse => {
      alert(errorResponse);
    });
  }

  getAllCancelledLessons(): void {
    this.calendarService.getCancelledLessons(this.teacher).subscribe(data => {
      this.cancelledLessons = data;
      this.cancelledLessons.forEach(cancelledLesson => {
        if (cancelledLesson.year === this.currentYear && cancelledLesson.month === this.currentMonth) {
          this.cancelledLessonThisMonthCounter++;
        }
      });
    }, errorResponse => {
      alert(errorResponse);
    });
  }

  checkPassword(): boolean {
    if (this.newPassword === '' || this.confirmNewPassword === '' || this.newPassword === undefined ||
      this.confirmNewPassword === undefined || (this.newPassword !== this.confirmNewPassword)) {
      return true;
    } else {
      return false;
    }
  }

  checkPersonalInfo(): boolean {
    if (this.teacher.name === '' || this.teacher.surname === '' || this.teacher.email === '' || this.teacher.name === undefined ||
      this.teacher.surname === undefined || this.teacher.email === undefined) {
      return true;
    } else {
      return false;
    }
  }

  updatePersonalInfo(): void {
    this.teacher.name = this.newName;
    this.teacher.surname = this.newSurname;
    this.teacher.email = this.newEmail;
    this.profileService.updatePersonalInfo(this.teacher).subscribe(data => {
      this.teacher = data;
      localStorage.setItem('teacher', JSON.stringify(this.teacher));
    }, errorResponse => {
      alert(errorResponse);
    });

  }

  updatePassword(): void {
    this.teacher.password = this.newPassword;
    this.profileService.updatePersonalInfo(this.teacher).subscribe(data => {
      this.teacher = data;
      localStorage.setItem('teacher', JSON.stringify(this.teacher));
    }, errorResponse => {
      alert(errorResponse);
    });

  }

}
