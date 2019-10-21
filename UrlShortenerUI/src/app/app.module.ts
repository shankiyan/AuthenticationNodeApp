import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{AppService} from './app.service';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RedirectComponent } from './redirect/redirect.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './signup/signup.component';
import { MessageComponent } from './message/message.component';

const routes: Routes = [
  { path: 'app/red/:id', component: RedirectComponent },
  { path: 'app/activateEmail/:uniqueid', component: MessageComponent },
  { path: '', component: SignUpComponent },
  { path: 'app/home', component: HomeComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    RedirectComponent,
    SignUpComponent,
    HomeComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
