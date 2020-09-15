import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgModule } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  firstName = '';
  lastName = '';

  constructor(private location: Location, private domSanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
  }

  //base64Image = [];
 base64Image: string;
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
    console.log(this.firstName);
    console.log(this.lastName);
    console.log(this.base64Image);
  }

  goBack(): void {
    this.location.back();
  }


}
