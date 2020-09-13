import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  post: Post[];

  constructor(private postService: PostService) { }

  getPosts(): void {
    this.postService.getPosts().subscribe(post => this.post = post);
  }

  updateImages(): void {
    for(var item of this.post){
      item.postContent.imageData= "data:image/jpg;base64,".concat(item.postContent.imageData);
      console.log(item.postContent.imageData);
    }
  }

  ngOnInit(): void {
    this.getPosts();
  }

}
