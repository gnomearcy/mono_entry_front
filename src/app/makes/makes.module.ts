import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MakesComponent } from './makes.component'
import { DetailComponent } from './detail/detail.component'
import { TableNavigation } from './navigation/navigation.component'
import { IMakeService, I_MAKE_SERVICE } from './shared/i.makes.service'
import { LocalMakeService } from './shared/makes.local.service'
import { MakeService }  from './shared/makes.service'

import { SearchFilter } from './pipe/search.pipe'
import { OrderBy } from './pipe/sort.pipe';

@NgModule({
  imports:[CommonModule, FormsModule],
  declarations: [MakesComponent, DetailComponent, SearchFilter, OrderBy, TableNavigation],
  // Export this component to be used
  exports: [MakesComponent],
  providers: [{provide: I_MAKE_SERVICE, useClass: LocalMakeService}],
  bootstrap: []
})
export class MakesModule { }
