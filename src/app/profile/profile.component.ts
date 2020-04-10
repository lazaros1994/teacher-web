import { Component, OnInit } from '@angular/core';
import {Teacher} from '../models/teacher';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  teacher: Teacher;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.teacher = JSON.parse(localStorage.getItem('teacher'));
  }

}
