import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post.service';

import { OktaAuthService } from '@okta/okta-angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  post: Post[];

  constructor(private postService: PostService,public oktaAuth: OktaAuthService, private http: HttpClient) { }

  //getPosts(): void {
    //this.postService.getPosts().subscribe(post => this.post = post);
  //}

  async ngOnInit(){
    const accessToken = await this.oktaAuth.getAccessToken();
    this.http.get("http://gjblog-env.eba-gzw7n3uy.us-east-2.elasticbeanstalk.com/blog/all", {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      }
    }).subscribe((data: any) => {
      // Use the data returned by the API
        this.post = data
    }, (err) => {
      console.error(err);
    });
  }

}
