import {Component, OnInit} from '@angular/core';
import {TeacherService} from './teacher.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  age: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  password2: string;
  logInEmail: string;
  logInPassword: string;


  constructor(private teacherService: TeacherService) {
  }

  ngOnInit(): void {
  }

  createTeacher(): void {
    this.teacherService.createTeacher(this.name, this.surname, this.email, this.password).subscribe(successResponse => {
      alert(successResponse);
    }, errorResponse => {
      alert(errorResponse.error);
    });
  }

  checkPassword(): boolean {
    if (this.password === '' || this.password2 === '' || this.password === undefined ||
      this.password2 === undefined || (this.password !== this.password2)) {
      return true;
    } else {
      return false;
    }
  }

}
