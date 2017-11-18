import { NgModule } from '@angular/core';
import { MakesComponent } from './makes.component'
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail/detail.component'
import { MakeService }  from './data/makes.service'
console.log("asdad")
console.log(MakeService)

@NgModule({
  imports:[CommonModule, FormsModule],
  declarations: [MakesComponent, DetailComponent],
  // Export this component to be used
  exports: [MakesComponent],
  providers: [MakeService],
  bootstrap: []
})
export class MakesModule { }
