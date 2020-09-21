import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { Post } from '../post';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  tags: String[];
  selectedTag: String;
  postsbyTag: Post[];
  base64Image: string = '';
  isHidePosts: boolean;

  constructor(private profileService : ProfileService) { }

  ngOnInit(): void {
    this.getPopularTags();
  }

  getPopularTags(){
    this.profileService.getPopularTags().subscribe(tag => {
      this.tags = tag;
    })
  }

  onSelect(tag: string): void{
    this.selectedTag = tag;
    this.profileService.getByTagName(tag).subscribe(post => {
      this.postsbyTag = post;
      this.postsbyTag.forEach(post => {
        this.base64Image = post.postContent.imageData
        //console.log("imageData : " +this.base64Image);
      });
      this.profileService.sendData(this.postsbyTag);
    })
  }

}
