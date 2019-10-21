import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { environment } from '../../environments/environment';
import { window } from 'rxjs/operators';
import { Router } from '@angular/router'


@Component({
  selector: 'app-redirect',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit {

  Email;
  Password;
  AlertMsg;
  HideLoginDialog: boolean = true;
  spinner: boolean = false;

  constructor(private _appService: AppService,
    private _router:Router) { }

  ngOnInit() {

  }


  ValidateEmail() {
   let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    if (this.Email == '' || this.Email == undefined) {
      alert("Enter  Email");
    }
    else
      if (!regexp.test(this.Email)) {

        alert("Enter Valid Email");
      }
      else if (this.Password == '' || this.Password == undefined || String(this.Password).length < 5) {

        alert("Enter Valid Password");
      }
      else {
        this.VerifyUserAccount();
      }

 
  }


 async VerifyUserAccount() {
   this.spinner = true;
   
    let postData = { Email: this.Email, Password: this.Password };
   this._appService.post('https://immense-mountain-96755.herokuapp.com/app/VerifyUserEmail', postData)
      .subscribe(async response => {
      
        let result = await response;
        if (result["Password"] == this.Password) {
          if (result["Status"] == 0) {
            this.HideLoginDialog = false;
            this.AlertMsg = "Your Account is not Activated Yet! Please check your Email to see the Activation Link";
          }
          else if (result["Status"] == 1) {
            localStorage.setItem('Email', response["Email"]);
            this._router.navigate(['/app/home']);
            
          }
        }
        else {
          this.AlertMsg = "InValid Password";
        }
        this.spinner = false;
      }, error => {
        
        this.spinner = false;
      });
  }

}
