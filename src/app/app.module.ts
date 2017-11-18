import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MakesComponent } from '../makes/makes.component'
import { ModelsComponent } from '../models/models.component'
import { MakesModule } from '../makes/makes.module'


@NgModule({
  declarations: [
    AppComponent
    // ModelsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MakesModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
