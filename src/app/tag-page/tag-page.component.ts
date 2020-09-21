import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { Post } from '../post';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tag-page',
  templateUrl: './tag-page.component.html',
  styleUrls: ['./tag-page.component.css']
})
export class TagPageComponent implements OnInit {

  isHidden: boolean;

  postsFromTags: Post[];

  constructor(private profileService: ProfileService, private location: Location,) { }

  ngOnInit(): void {
    this.profileService.change.subscribe(emitedValue => {
      //this.isHidden = emitedValue;
      this.postsFromTags = emitedValue;
    });
  }

  goBack(): void {
    this.location.back();
  }

}
