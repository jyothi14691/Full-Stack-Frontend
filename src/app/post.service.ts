import { Injectable, OnInit } from '@angular/core';
import { Post } from './post';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService /**/ implements OnInit {

  /*//private blogUrl = 'http://gjblog-env.eba-gzw7n3uy.us-east-2.elasticbeanstalk.com/blog/all';
  private blogUrl = 'http://localhost:5000/blog/all';*/

  constructor(private http: HttpClient) { }
/*
  accessToken: any;

  getPosts(): Observable<Post[]> {
    this.getAuth();
    console.log(this.accessToken);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.accessToken}`
    })

    return this.http.get<Post[]>(this.blogUrl, { headers: headers})//{responseType: 'json'})
    .pipe(
      catchError(this.handleError<Post[]>('getPosts', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
*/
  ngOnInit(){

  }
}
