import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core'
import { Make } from './data/make.model'
// import { MakeService } from './data/makes.service'
import { IMakeService, I_MAKE_SERVICE } from './data/i.makes.service'

@Component({
  selector: 'app-makes',
  templateUrl: './makes.component.html',
  styleUrls: ['./makes.component.css']
})
export class MakesComponent implements OnInit{
  makes: Make[];
  error: any;

  // Populated when row is clicked
  // It will open up the modal
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

  openUpdateModal(make: Make){
    this.showModal = true;
    this.selected = make;
  }

  // Bindings to the Details component
  onCanceled(){
    console.log("Child reported CANCEL")
    this.showModal = false;
  }

  // onAction(make: Make){
  //   console.log("Child reported action")
  //   console.log(make)
  //   if(this.makes == null){
  //     this.makes = [];
  //   }
  //   this.makes.push(make);
  //   this.showModal = false;
  // }

  onCreated(created: Make){
    console.log("created")
    console.log(created)
    this.makes.push(created);
    this.showModal = false;
  }

  onUpdated(updated: Make){
    this.showModal = false;
  }

  onError(error: string){
    window.alert("error occured > " + error)
  }

  onDeleted(deleted: Make){

    console.log("returned from delete")
    console.log("deleted object >")
    console.log(deleted)
    let targetIdx = this.makes.findIndex(function(el: Make){
      return el.id == deleted.id
    })

    if(targetIdx !== -1){
      console.log("index to remove from this.makes >")
      console.log(targetIdx)
      this.makes.splice(targetIdx, 1);
      console.log("after splice")
      console.log(this.makes)
    }
    this.showModal = false;
  }
}
