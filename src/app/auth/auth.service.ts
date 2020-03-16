import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpXsrfTokenExtractor} from '@angular/common/http';
import {Teacher} from '../models/teacher';
import {Observable} from 'rxjs';
import {Lesson} from '../models/lesson';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
};


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) {
  }

  private createTeacherUrl = 'teacher/create';
  private findTeacherUrl = 'teacher/find';

  public createTeacher(name, surname, email, password) {
    const postRequestParameters = new FormData();

    postRequestParameters.append('name', name);
    postRequestParameters.append('surname', surname);
    postRequestParameters.append('email', email);
    postRequestParameters.append('password', password);

    return this.http.post(this.createTeacherUrl,  postRequestParameters, {responseType:  'text'});
  }

  public logIn(email, password) {
    const params = new HttpParams()
      .set('email', email)
      .set('password', password);

    return this.http.get<Teacher>(this.findTeacherUrl, {params});

  }


}
