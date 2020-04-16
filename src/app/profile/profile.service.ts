import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {parseMinutes} from 'ngx-bootstrap/timepicker/timepicker.utils';
import {Teacher} from '../models/teacher';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
};

@Injectable({
  providedIn: 'root'
})


export class ProfileService {

  constructor(private http: HttpClient) {
  }

  private getHoursThisMonthUrl = 'teacher/getHoursThisMonth';
  private updatePersonalInfoUrl = 'teacher/updatePersonalInfo';
  private updatePasswordUrl = 'teacher/updatePassword';

  public getHoursAndEuroThisMonth(teacher) {
    const params = new HttpParams()
      .set('teacherString', JSON.stringify(teacher));

    return this.http.get<number[]>(this.getHoursThisMonthUrl, {params});
  }

  public updatePersonalInfo(teacher) {
    return this.http.put<Teacher>(this.updatePersonalInfoUrl, teacher);
  }

}
