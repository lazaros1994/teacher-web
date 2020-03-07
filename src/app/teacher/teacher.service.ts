import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
};


@Injectable({
  providedIn: 'root'
})

export class TeacherService {

  constructor(private http: HttpClient) {
  }

  private createTeacherUrl = '/teacher/create';

  public createTeacher(name, surname, email, password) {
    const postRequestParameters = new FormData();
    postRequestParameters.append('name', name);
    postRequestParameters.append('surname', surname);
    postRequestParameters.append('email', email);
    postRequestParameters.append('password', password);
    return this.http.post<string>(this.createTeacherUrl, postRequestParameters);
  }
}
