import { Component, OnInit } from '@angular/core';

//May need more update to template here
@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  public image: any;
  constructor() { }

  ngOnInit(): void {
  }

  onClickSubmit(){
    //save input
    //send away
    /*const formData = new FormData();
    for (const file of this.files) {
      formData.append(name, file, file.name);
    }
    this.http.post('url', formData).subscribe(x => ....);*/
  }

  onFileChanged(event: any) {
    this.image = event.target.image;
  }
}
