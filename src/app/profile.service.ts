import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable, of, throwError, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError, map, tap } from 'rxjs/operators';
import { Profile } from './profile';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  //private blogUrl = 'http://gjblog-env.eba-gzw7n3uy.us-east-2.elasticbeanstalk.com/blog';
  private localBlogUrl = 'http://localhost:5000/blog';

  @Output() change: EventEmitter<any> = new EventEmitter();
  //eventsSubject: Subject<void> = new Subject<void>();
  //postsbyTag: Post[];

  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  postProfile(profile: Profile): Observable<Profile> {
    //console.log(JSON.stringify(profile));
    return this.http.post<Profile>(this.localBlogUrl + '/profile', JSON.stringify(profile), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getProfile(username: string): Observable<Profile> {
    return this.http.get<Profile>(this.localBlogUrl + '/profile/'+username, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  getPopularTags(): Observable<String[]>{
    return this.http.get<String[]>(this.localBlogUrl + '/popular-tags',this.httpOptions)
    .pipe(retry(2),
    catchError(this.handleError))
  }

  getByTagName(tag: String): Observable<Post[]>{
    //this.sendData(true);
    return this.http.get<Post[]>(`${this.localBlogUrl}/tag?tag=${tag}`, this.httpOptions)
    .pipe(retry(2),
    catchError(this.handleError))
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

  sendData(data: any): any {
    this.change.emit(data);
  }


}
