import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
};

@Injectable({
  providedIn: 'root'
})

export class CalendarService {

  constructor(private http: HttpClient) {
  }

  private createUrl = 'extralesson/create';
  private cancelLessonUrl = 'lesson/cancel';

  public createExtraLesson(extraLesson) {
    console.log('eftase edw');
    return this.http.post(this.createUrl, extraLesson, {responseType: 'text'});
  }

  public createCancelledLesson(cancelledLesson) {
    return this.http.post(this.cancelLessonUrl, cancelledLesson, {responseType: 'text'});
  }
}
