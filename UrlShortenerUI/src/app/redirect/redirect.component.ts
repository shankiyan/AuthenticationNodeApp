import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements OnInit {

  ActualURL: string;
  spinner: boolean = false;
  constructor(private _appService: AppService) { }

  ngOnInit() {
    this.RedirectToOriginalURL();
  }
  RedirectToOriginalURL() {

    this.spinner = true;

    let postData = { url: window.location.href };
    this._appService.post('https://immense-mountain-96755.herokuapp.com/app/red', postData)
      .subscribe(response => {


        this.ActualURL = response[0]["ActualURL"];


        if (this.ActualURL != undefined || this.ActualURL != '') {
          this.spinner = false;
          window.location.href = this.ActualURL;
        }
        else {
          alert("No URL Found");
          this.spinner = false;
        }
      }, error => {
        this.spinner = false;
      });
  }

}
