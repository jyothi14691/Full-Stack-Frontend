import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(username:string, password:string ) {
    //http://gjblog-env.eba-gzw7n3uy.us-east-2.elasticbeanstalk.com/blog/authenticate
    sessionStorage.setItem('username', username);
    return this.http.post<any>('http://localhost:5000/blog/authenticate', {'username':username, 'password':password})
      .subscribe(res => this.setSession(res)), (err) => {
        console.error(err);
      };
  }

  private setSession(authResult) {
    const expiresAt = moment().add(1740,'second');
    sessionStorage.setItem('id_token', JSON.parse(JSON.stringify(authResult)).jwt);
    sessionStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    sessionStorage.removeItem("id_token");
    sessionStorage.removeItem("expires_at");
    sessionStorage.remoteItem("username")
  }

  public isLoggedIn() {
    return (moment().isBefore(this.getExpiration()) && (sessionStorage.getItem('id_token') != null));
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = sessionStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  createAuthProfile(username:string, password:string){
      //http://gjblog-env.eba-gzw7n3uy.us-east-2.elasticbeanstalk.com/blog/register
      this.http.post<any>('http://localhost:5000/blog/register', {'username':username, 'password':password})
      .subscribe(res => this.setSession(res)), (err) => {
        console.error(err);
      };
      return this.login(username, password);
  }

}
