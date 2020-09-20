import { Component, Input, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isHidden: boolean;

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.profileService.change.subscribe(emitedValue => {
      this.isHidden = emitedValue;
    });
  }

}
