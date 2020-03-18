import {Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {compareSegments} from '@angular/compiler-cli/ngcc/src/sourcemaps/segment_marker';

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
  days: number[] = [];
  allDays: Date[] = [];
  selectedDate: Date = new Date();

  constructor() {
    // setInterval(() => {
    //   this.now = new Date();
    // }, 1);
  }

  ngOnInit(): void {
    this.currentDay = this.now.getDate();
    this.currentMonth = this.now.getUTCMonth();
    this.currentYear = this.now.getFullYear();
    console.log(new Date(12, 12, 12));
    console.log(this.currentDay);
    console.log(this.currentMonth);
    console.log(this.currentYear);
    // console.log(this.currentYear);
    // console.log(this.currentMonthDays);
    this.currentMonthDays = new Date(this.currentYear, this.currentMonth + 1).getUTCDate();
    for (let i = 0; i < this.currentMonthDays; i++) {
      // this.days.push(i + 1);
      this.allDays[i] = new Date(this.currentYear, this.currentMonth, i + 1);
    }
    this.selectedDate = this.now;
    console.log(this.allDays);
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

}
