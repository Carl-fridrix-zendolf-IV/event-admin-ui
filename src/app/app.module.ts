import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent }  from './app.component';
import { MainComponent } from './components/main/main';
import { UsersComponent } from './components/users/users';
import { ChatComponent } from './components/chats/chats.list';
import { ChatDetailComponent } from './components/chats/chats.detail';

import { GetUsers, GetChats, GetSpeakers, GetMessages, PutMessage } from './services/http';

const appRoutes: Routes = [
    { path: '', component: MainComponent },
    { path: 'users', component: UsersComponent },
    { path: 'chats', component: ChatComponent },
    { path: 'chats/:id', component: ChatDetailComponent }
];

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule, RouterModule.forRoot(appRoutes, {useHash: true})],
  providers:    [ GetUsers, GetChats, GetSpeakers, GetMessages, PutMessage ],
  declarations: [ AppComponent, MainComponent, UsersComponent, ChatComponent, ChatDetailComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
