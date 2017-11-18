import { Component, OnInit } from '@angular/core';
import { Make } from './data/make.model'
import { MakeService } from './data/makes.service'

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

  constructor(private service: MakeService) { }

  ngOnInit(){
    // this.getMakes();
    this.makes = [
      new Make("John", "Doe"),
      new Make("Johness", "Doess")
    ]
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
  onCancel(){
    console.log("Child reported CANCEL")
    this.showModal = false;
  }

  onAction(make: Make){
    console.log("Child reported action")
    console.log(make)
    if(this.makes == null){
      this.makes = [];
    }
    this.makes.push(make);
    this.showModal = false;
  }
}
