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

  ngOnInit(): void {
    this.getPosts();
  }

}
