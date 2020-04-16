import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Lesson} from '../models/lesson';
import {ExtraLesson} from '../models/extraLesson';
import {CancelledLesson} from '../models/cancelledLesson';

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
  private getAllExtraLessonsUrl = 'extralesson/getAll';
  private deleteExtraLessonUrl = 'extralesson/delete';
  private getAllCancelledUrl = 'lesson/getAllCancelled';
  private deleteCancelledLessonUrl = 'lesson/deleteCancelled';

  public createExtraLesson(extraLesson) {

    return this.http.post(this.createUrl, extraLesson, {responseType: 'text'});
  }

  public createCancelledLesson(cancelledLesson) {
    return this.http.post(this.cancelLessonUrl, cancelledLesson, {responseType: 'text'});
  }

  public getExtraLessons(teacher) {
    const params = new HttpParams()
      .set('teacherString', JSON.stringify(teacher));

    return this.http.get<ExtraLesson[]>(this.getAllExtraLessonsUrl, {params});
  }

  public deleteExtraLesson(extraLesson) {
    const params = new HttpParams()
      .set('extraLessonString', JSON.stringify(extraLesson));
    return this.http.delete<ExtraLesson>(this.deleteExtraLessonUrl, {params});
  }

  public deleteCancelledLesson(lesson) {
    const params = new HttpParams()
      .set('lessonString', JSON.stringify(lesson));

    return this.http.delete<CancelledLesson>(this.deleteCancelledLessonUrl, {params});
  }

  public getCancelledLessons(teacher) {
    const params = new HttpParams()
      .set('teacherString', JSON.stringify(teacher));

    return this.http.get<CancelledLesson[]>(this.getAllCancelledUrl, {params});
  }
}
