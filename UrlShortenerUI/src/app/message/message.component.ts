import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { AppModule } from '../app.module';
import { Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  ShortenedURL: string;
  ActualURL: string;
  spinner: boolean = false;
  Message;
  constructor(private _appService: AppService,
    private _router: Router) { }


  ngOnInit() {
    this.ActivateAccount();
   
  }

  ActivateAccount() {
    this.spinner = true;
    let postData = { UniqueID: window.location.href.slice(-7) };
    debugger;
    this._appService.post('https://immense-mountain-96755.herokuapp.com/app/ActivateAccount', postData)
      .subscribe(response => {
        this.Message = "Welcome" + response["Email"] + '! Your Account Activated Successfully';
        localStorage.setItem('Email', response["Email"]);
        window.location.href = "http://localhost:4200/app/home";
        this.spinner = false;
      },
        error => {
          this.spinner = false;
        });
  }

 
  
}



