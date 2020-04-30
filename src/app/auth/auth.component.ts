import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {Teacher} from '../models/teacher';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  name: string;
  surname: string;
  email: string;
  password: string;
  password2: string;
  logInEmail: string;
  logInPassword: string;
  teacher: Teacher;
  emailRemind: string;
  alert: number;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.teacher = JSON.parse(localStorage.getItem('teacher'));
    if (this.teacher != null) {
      this.router.navigate(['/home']);
    }
    this.alert = 0;
  }

  createTeacher(): void {
    this.authService.createTeacher(this.name, this.surname, this.email, this.password).subscribe(successResponse => {
      if (successResponse === 'This email is not available') {
        this.alert = 2;
      } else if (successResponse === 'Teacher created successfully') {
        this.alert = 1;
      }
    }, errorResponse => {
      alert('Server error');
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

  logIn(): void {
    this.authService.logIn(this.logInEmail, this.logInPassword).subscribe(data => {
      this.teacher = data;
      localStorage.setItem('teacher', JSON.stringify(this.teacher));
      this.router.navigate(['/home']);
    }, errorResponse => {
      this.alert = 3;
    });
  }

  checkEmptyField(): boolean {
    if (this.name === undefined || this.surname === undefined || this.email === undefined
      || this.name === '' || this.surname === '' || this.email === '') {
      return true;
    } else {
      return false;
    }
  }

  forgotPassword(): void {
    this.authService.forgotPassword(this.emailRemind).subscribe(data => {
      alert('email sent successfully');
      this.emailRemind = '';
    }, errorResponse => {
      alert('No account match this email');
    });
  }

}
