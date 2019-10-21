import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RedirectComponent } from './redirect/redirect.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './signup/signup.component';
import { MessageComponent } from './message/message.component';

const routes: Routes = [
  { path: 'app/red', component: RedirectComponent },
  { path: '', component: SignUpComponent },
  { path: 'app/activateEmail/:uniqueid', component: MessageComponent },
  { path: 'home', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
