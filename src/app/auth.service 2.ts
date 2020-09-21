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
    localStorage.setItem('username', username);
    return this.http.post<any>('http://localhost:5000/blog/authenticate', {'username':username, 'password':password})
      .subscribe(res => this.setSession(res)), (err) => {
        console.error(err);
      };
  }

  private setSession(authResult) {
    const expiresAt = moment().add(1740,'second');
    localStorage.setItem('id_token', JSON.parse(JSON.stringify(authResult)).jwt);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.remoteItem("username")
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
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
