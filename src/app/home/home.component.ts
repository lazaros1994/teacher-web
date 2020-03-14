import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  studentName: string;
  studentSurname: string;
  day: string;
  course: string;
  euroPerHour: number;

  constructor() {
  }

  ngOnInit(): void {
  }



}




