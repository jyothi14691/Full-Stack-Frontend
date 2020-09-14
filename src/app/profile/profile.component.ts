import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  firstName = '';
  lastName = '';

  constructor(private location: Location) {
  }

  ngOnInit(): void {
  }

  url = '';
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result as string;
      }
    }
  }
  public delete(){
    this.url = null;
  }

  onSave(){
    // this.url =
  }

  goBack(): void {
    this.location.back();
  }


}
