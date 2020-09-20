import { Component, OnInit } from '@angular/core';
import { Post } from '../post';

import { OktaAuthService } from '@okta/okta-angular';
import { HttpClient } from '@angular/common/http';
import { Inject }  from '@angular/core';
import { Router }  from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { PostService } from '../post.service';
import { PostContent } from '../postcontent';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  //public image: any;
  postContent: PostContent = {
    text:'',
    postContentId:'',
    imageKey:'',
    imageData:'',
  }
  post: Post = { userName: '',
              post_Id: '',
              tag:'',
            postContent: this.postContent
            }
  accessToken: any;
  replyPost: Post;

  constructor(@Inject(DOCUMENT) document,/*public oktaAuth: OktaAuthService,*/ private http: HttpClient, private router: Router, public _DomSanitizationService: DomSanitizer ) {
  }

  async ngOnInit() {
    //const accessToken = await this.oktaAuth.getAccessToken();
  }

  onClickSubmit(){
    //http://gjblog-env.eba-gzw7n3uy.us-east-2.elasticbeanstalk.com/blog/new
    console.log(this.post.postContent.imageData);
    this.http.post<Post>("http://gjblog-env.eba-gzw7n3uy.us-east-2.elasticbeanstalk.com/blog/new", this.post, //{
        //headers: {
        //Authorization: 'Bearer ' + this.accessToken,s
      //}
    /*}*/).subscribe((data: any) => {

        this.replyPost = data
    }, (err) => {
      console.error(err);
    });
    this.router.navigate(['/home']);
  }

  onFileChanged(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
        const b64image: string | ArrayBuffer = reader.result;
        if (typeof b64image === 'string') {
          this.post.postContent.imageData = b64image.slice(23);
        }
        else {
          this.post.postContent.imageData = b64image.toString().slice(23)}
    };
  }
}
