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

  age: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  password2: string;
  logInEmail: string;
  logInPassword: string;
  teacher: Teacher;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  createTeacher(): void {
    this.authService.createTeacher(this.name, this.surname, this.email, this.password).subscribe(successResponse => {
      alert(successResponse);
      console.log('coble');
    }, errorResponse => {
      alert(errorResponse);
      console.log('oxi');

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
      alert('Wrong email or password');
    });
  }

}
