import { Component } from '@angular/core';
import{ AppService} from './app.service';
import{AppModule} from './app.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'URLShortenerAngCLI';
  ShortenedURL:string;
ActualURL:string;
constructor(
  private _appService: AppService
) { }

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
    if(this.ActualURL==undefined || this.ActualURL==null)
    {
      alert("Enter URL");
      
    }else{
    let postData={ActualURL:this.ActualURL};
    
    this._appService.post('https://immense-mountain-96755.herokuapp.com/app/ShortenURL',postData)
      .subscribe(response => {
this.ShortenedURL=response["ShortenedURL"];
      }, error => {
        
      });

  }
}
}
