import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core'
import { Make } from './shared/make.model'
import { IMakeService, I_MAKE_SERVICE } from './shared/i.makes.service'

@Component({
  selector: 'app-makes',
  templateUrl: './makes.component.html',
  styleUrls: ['./makes.component.css']
})
export class MakesComponent implements OnInit{
  makes: Make[];
  error: any;
  selected: Make;
  showModal: boolean = false;
  sort = {
    nameAsc: true,
    abrvAsc: true
  };

  sortString: string;

  constructor(@Inject(I_MAKE_SERVICE) private service: IMakeService) { }

  ngOnInit(){
    this.sortString = (this.sort.nameAbrv ? '+' : '-') + 'name'
    this.getMakes();
  }

  getMakes(): void{
    this.service
      .getAll()
      .then(makes => this.makes = makes)
      .catch(error => this.error = error)
  }

  openCreateModal(){
    this.showModal = true;
    this.selected = null;
  }

  openUpdateModal(objToModify: Make){
    this.showModal = true;
    this.selected = objToModify;
  }

  onCanceled() {
    this.showModal = false;
   }

  onCreated(created: Make){
    this.makes.push(created);
    // Trigger view re-render by re-assigning the reference
    this.makes = this.makes.slice();
    this.showModal = false;
  }

  onUpdated(updated: Make){
    this.showModal = false;
  }

  onError(error: string){
    console.error("Error occurred while deleting Make object");
    console.error(error);
    this.showModal = false;
  }

  // Callback invoked when the DetailComponent successfully deleted an object
  // via service method.
  // This method will filter out the deleted object from local collection
  // and reflect changes on UI.
  onDeleted(deleted: Make){
    console.log("onDeleted")
    let targetIdx = this.makes.findIndex(function(el: Make){
      return el.id == deleted.id
    })


    if(targetIdx !== -1){
      console.log("target idx")
      console.log(targetIdx)
      this.makes.splice(targetIdx, 1);
      this.makes = this.makes.slice();
      console.log(this.makes)
    }
    this.showModal = false;
  }

  // Sorting
  toggleSortByAbrv(){
    // Toggle
    this.sort.abrvAsc = !this.sort.abrvAsc;
    // Format sorting string
    this.sortString = (this.sort.abrvAsc ? '+' : '-') + 'abbreviation'
  }

  toggleSortByName(){
    this.sort.nameAsc = !this.sort.nameAsc;
    this.sortString = (this.sort.nameAsc ? '+' : '-') + 'name'
  }
}
