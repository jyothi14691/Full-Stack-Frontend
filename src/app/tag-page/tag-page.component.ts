import { Component, OnInit } from '@angular/core';
import { TagsService } from '../tags.service';
import { Post } from '../post';

@Component({
  selector: 'app-tag-page',
  templateUrl: './tag-page.component.html',
  styleUrls: ['./tag-page.component.css']
})
export class TagPageComponent implements OnInit {

  postFromTag: Post[];

  constructor(private tagService: TagsService) { }

  ngOnInit(): void {
    //consume post from tag service
    this.tagService.change.subscribe(emitedValue => {
      this.postFromTag = emitedValue;
    });
  }

}
