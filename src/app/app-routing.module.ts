import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { NewPostComponent } from './new-post/new-post.component';
import { OktaAuthGuard,  OktaCallbackComponent } from '@okta/okta-angular';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'profile', component: ProfileComponent },
  { path: 'newpost', component: NewPostComponent },
  { path: 'home', canActivate: [ OktaAuthGuard ], component: HomeComponent },
  { path: 'implicit/callback', component: OktaCallbackComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
