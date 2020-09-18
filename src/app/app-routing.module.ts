import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { OktaAuthGuard,  OktaCallbackComponent } from '@okta/okta-angular';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'profile', canActivate: [ OktaAuthGuard ], component: ProfileComponent },
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
