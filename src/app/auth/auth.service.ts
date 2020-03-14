import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Teacher} from '../models/teacher';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
};


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) {
  }

  private createTeacherUrl = '/teacher/create';
  private findTeacherUrl = 'teacher/find';

  public createTeacher(name, surname, email, password) {
    const postRequestParameters = new FormData();

    postRequestParameters.append('name', name);
    postRequestParameters.append('surname', surname);
    postRequestParameters.append('email', email);
    postRequestParameters.append('password', password);

    return this.http.post<string>(this.createTeacherUrl, postRequestParameters);
  }

  public logIn(email, password) {
    const params = new HttpParams()
      .set('email', email)
      .set('password', password);

    return this.http.get<Teacher>(this.findTeacherUrl, {params});
  }
}
