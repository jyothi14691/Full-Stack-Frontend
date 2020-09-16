import { Injectable, OnInit } from '@angular/core';
import { Post } from './post';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { OktaAuthService } from '@okta/okta-angular';

@Injectable({
  providedIn: 'root'
})
export class PostService /**/ implements OnInit {

  //private blogUrl = 'http://gjblog-env.eba-gzw7n3uy.us-east-2.elasticbeanstalk.com/blog/all';
  private blogUrl = 'http://localhost:5000/blog/all';

  constructor(public oktaAuth: OktaAuthService, private http: HttpClient) { }

  accessToken: any;

  getPosts(): Observable<Post[]> {
    this.getAuth();
    console.log(this.accessToken);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.accessToken}`
      //Authorization: 'Bearer eyJraWQiOiJqYlRyX092dGpvdVNGUlJKWkt1eVd2ZFc3T0hrZk42dVc3d3VzbDh5MFVrIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULkRDaTB5elZTajdKeW4zM3RQTlFkdW9pdWlMeTVXZGpUbmkyRjNYUkhDNkkiLCJpc3MiOiJodHRwczovL2Rldi0xNzY5NjUub2t0YS5jb20vb2F1dGgyL2RlZmF1bHQiLCJhdWQiOiJhcGk6Ly9kZWZhdWx0IiwiaWF0IjoxNjAwMjg1OTQyLCJleHAiOjE2MDAyODk1NDIsImNpZCI6IjBvYXd0MmVsNGRCT0tma25wNHg2IiwidWlkIjoiMDB1d3Q0OWkzVllQQ0w3R1g0eDYiLCJzY3AiOlsib3BlbmlkIl0sInN1YiI6IkdKQmxvZ1ppcENvZGVAZ21haWwuY29tIn0.JdRrpkJQlKG35NbDdTFdmd-H7HVkwYyugarQl1qiBeCe1SNe_I8gQQdYZWNTcSVcdTXBIwIUue_qjnXjwW34HudY8jqo_pNJQRXgH92udwd0yrJ2fjuOF-h8kmtVYTJDDps7fZ2AfSwatlzLlv5qtjL3PDEjuri1mFXQhloq0CAXJiVaX1Nt2k6LmZKezGXq1HmhfcIxU6rRywc6AlEpKzDXXRYz4g7cSlRcILloqAht_wbxUAhb-mG2f8rXRc29KoOlTRa1HTQO3vo2z6AG6JFVgGSDN9YKxY5gJUV6414JeL9-b9C10jVZbhFZxMhKmhiqxhRtvirPoqxSG1r5Pg'
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
/**/
  async ngOnInit(){
    this.accessToken = await this.oktaAuth.getAccessToken();
    console.log(accessToken);
  }
/**/
  async getAuth(){
    this.accessToken = await this.oktaAuth.getAccessToken();
    //this.accessToken = await this.oktaAuth.getIdToken();
  }
}
