import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common'

import { AppComponent } from './app.component';
import { MakesComponent } from '../makes/makes.component'
import { ModelsComponent } from '../models/models.component'
import { MakesModule } from '../makes/makes.module'
import { ModelsModule } from '../models/models.module'

@NgModule({
  declarations: [
    AppComponent
    // ModelsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MakesModule,
    ModelsModule,
    HttpModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
