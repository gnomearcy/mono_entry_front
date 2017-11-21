import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core'
import { Make } from './data/make.model'
import { IMakeService, I_MAKE_SERVICE } from './data/i.makes.service'

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

  constructor(@Inject(I_MAKE_SERVICE) private service: IMakeService) { }

  ngOnInit(){
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
    let targetIdx = this.makes.findIndex(function(el: Make){
      return el.id == deleted.id
    })

    if(targetIdx !== -1){
      this.makes.splice(targetIdx, 1);
    }
    this.showModal = false;
  }
}
