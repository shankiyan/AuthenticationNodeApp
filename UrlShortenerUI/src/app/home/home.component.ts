import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { AppModule } from '../app.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ShortenedURL: string;
  ActualURL: string;
  spinner: boolean = false;
  UserStatus: boolean = false;
  Email;
  msg;
  User;
  constructor(private _appService: AppService) {
  }


  ngOnInit() {
    
    this.Email = localStorage.getItem('Email');
    if (this.Email == null || this.Email == '' || this.Email == undefined) {
      alert("Not Authenticated");
      window.location.href = "https://shank3.herokuapp.com";
     
    }
    else {
      this.UserStatus = true;
      this.User = localStorage.getItem('Email');
    }
  }

  LogOut() {
    localStorage.clear();
    window.location.href = "https://shank3.herokuapp.com";
  }
  copytext() {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (this.ShortenedURL));
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
    alert('Copied to clip board');
  }

  ShortenURL() {
    if (this.ActualURL == undefined || this.ActualURL == null || this.ActualURL == '') {

      alert("Enter URL");

    } else {

      var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
      if (pattern.test(this.ActualURL)) {
        let postData = { ActualURL: this.ActualURL };
        this.spinner = true;
        this._appService.post('https://immense-mountain-96755.herokuapp.com/app/ShortenURL', postData)
          .subscribe(response => {
            
            this.ShortenedURL = response["ShortenedURL"];
            this.spinner = false;
          }, error => {
            this.spinner = false;
          });
      } else {
        alert("Url is not valid! Please use with http:// or https://");
      }
    }
  }
}



