import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgModule } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ProfileService } from '../profile.service';
import { Profile } from '../profile';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { Post } from '../post';
import { OktaAuthService } from '@okta/okta-angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  inputs: ['model'],
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
  loggedInUserName: string='';


  constructor(private location: Location, private domSanitizer: DomSanitizer,
                private profileService: ProfileService, public oktaAuth: OktaAuthService, private http: HttpClient) {

  }

  async ngOnInit(){
    const accessToken = await this.oktaAuth.getAccessToken();
    const userClaims = await this.oktaAuth.getUser();
    this.loggedInUserName = userClaims.name;
    //console.log("loggedInUserName: " +this.loggedInUserName);

    this.getProfile();

  }

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
  }

  goBack(): void {
    this.location.back();
  }

  postProfile(): void {
    //dataBytes = toBase64String.decode(this.base64Image);
    //console.log("valuepassed: " +this.userName);
    this.profileService.postProfile({
      firstName: this.firstName,
      lastName: this.lastName,
      userName: this.loggedInUserName,
      profileImageData: this.base64Image
    }).subscribe(profile => this.profile = profile);
  }

  getProfile(){
    this.profileService.getProfile(this.loggedInUserName)
      .subscribe(profile => {
        this.firstName = profile.firstName;
        this.lastName = profile.lastName;
        this.base64Image = profile.profileImageData;
        //console.log("=====" +this.firstName+this.lastName+this.base64Image);
      });
      this.isReadOnly = true;
  }

}
