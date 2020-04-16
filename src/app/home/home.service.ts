import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';
import {Lesson} from '../models/lesson';
import {ExtraLesson} from '../models/extraLesson';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
};

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) {
  }

  private lessonUrl = 'lesson';
  private createLessonUrl = 'lesson/create';
  private getLessonsUrl = 'lesson/getAll';
  private deleteLessonUrl = 'lesson/delete';

  public createLesson(lesson) {
    return this.http.post(this.createLessonUrl, lesson, {responseType: 'text'});
  }

  public getLessons(teacher) {
    const params = new HttpParams()
      .set('teacherString', JSON.stringify(teacher));

    return this.http.get<Lesson[]>(this.getLessonsUrl, {params});
  }

  public deleteLesson(lesson) {
    const params = new HttpParams()
      .set('lessonString', JSON.stringify(lesson));
    return this.http.delete<ExtraLesson>(this.deleteLessonUrl, {params});
  }


}
