import { Component, Input, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isHidePosts: boolean;

  constructor(private profileService: ProfileService) {
    profileService.sendData(false);
  }

  ngOnInit(): void {
    this.profileService.change.subscribe(emitedValue => {
      this.isHidePosts = emitedValue;
    });
  }

}
