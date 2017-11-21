import { NgModule } from '@angular/core';
import { MakesComponent } from './makes.component'
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail/detail.component'

import { IMakeService, I_MAKE_SERVICE } from './data/i.makes.service'
import { LocalMakeService } from './data/makes.local.service'
import { MakeService }  from './data/makes.service'

import { SearchFilter } from './pipe/search.pipe'
import { OrderBy } from './pipe/sort.pipe';

@NgModule({
  imports:[CommonModule, FormsModule],
  declarations: [MakesComponent, DetailComponent, SearchFilter, OrderBy],
  // Export this component to be used
  exports: [MakesComponent],
  providers: [{provide: I_MAKE_SERVICE, useClass: LocalMakeService}],
  bootstrap: []
})
export class MakesModule { }
