import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError, map, tap } from 'rxjs/operators';
import { Profile } from './profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  //private blogUrl = 'http://gjblog-env.eba-gzw7n3uy.us-east-2.elasticbeanstalk.com/blog';
  private blogUrl = 'http://localhost:5000/blog';

  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('id_token')
    })
  }

  postProfile(profile: Profile): Observable<Profile> {
    //console.log(JSON.stringify(profile));
    return this.http.post<Profile>(this.blogUrl + '/profile', JSON.stringify(profile), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getProfile(username: string): Observable<Profile> {
    return this.http.get<Profile>(this.blogUrl + '/profile/'+username, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  // Error handling
  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }
}
