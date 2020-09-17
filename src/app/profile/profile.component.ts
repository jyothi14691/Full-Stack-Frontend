import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgModule } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ProfileService } from '../profile.service';
import { Profile } from '../profile';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { PostService } from '../post.service';
import { PostsComponent } from '../posts/posts.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  firstName = '';
  lastName = '';
  userName = '';
  base64Image: string = '';
  profile: Profile = <any>{};
  isReadOnly: boolean;
  isHidden: boolean;



  constructor(private location: Location, private domSanitizer: DomSanitizer,
                private profileService: ProfileService, private postsComponent:PostsComponent) {

  }

  ngOnInit(): void {
    //get profile should be called here

  }

  //base64Image = [];

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed

        this.base64Image = event.target.result as string;
        //console.log(this.base64Image);

      }
    }
  }

  public delete(){
    this.base64Image = null;
  }

  onSave(){
    this.postProfile();
    this.isReadOnly = true;
    //this.isHidden = true;
  }

  goBack(): void {
    this.location.back();
  }

  postProfile(): void {
    //console.log(this.b64ToSend);
    //dataBytes = toBase64String.decode(this.base64Image);

    this.profileService.postProfile({
      firstName: this.firstName,
      lastName: this.lastName,
      userName: this.userName,
      profileImageData: this.base64Image
    }).subscribe(profile => this.profile = profile);
  }

}
