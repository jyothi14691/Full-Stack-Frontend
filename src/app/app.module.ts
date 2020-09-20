import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AppRoutingModule } from './app-routing.module';
import { MarkdownPipe } from './markdown.pipe';
import { NewPostComponent } from './new-post/new-post.component';
import { OktaAuthModule, OktaCallbackComponent } from '@okta/okta-angular';
import {OKTA_CONFIG} from '@okta/okta-angular';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';

const oktaConfig = {
    issuer: 'https://dev-176965.okta.com/oauth2/default',
    redirectUri: window.location.origin + '/implicit/callback',
    clientId: '0oaz4njvbK4yXEd9b4x6',
    scopes: ['openid', 'profile', 'email'],
    pkce: true
};

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    HomeComponent,
    ProfileComponent,
    MarkdownPipe,
    NewPostComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    OktaAuthModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: OKTA_CONFIG, useValue: oktaConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
