import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core'
import Make from './shared/make.model'
import { IMakeService, I_MAKE_SERVICE } from './shared/i.makes.service'
import MakePageDto from './shared/dto/make.page.dto'

@Component({
  selector: 'app-makes',
  templateUrl: './makes.component.html',
  styleUrls: ['./makes.component.css']
})
export class MakesComponent implements OnInit{

  // Pagination
  currentPage: number;
  pageSize: number;
  numberOfPages: number;
  makes: Make[];

  error: any;

  selected: Make;
  showModal: boolean;
  sort = {
    nameAsc: true,
    abrvAsc: true
  };
  sortString: string;

  constructor(@Inject(I_MAKE_SERVICE) private service: IMakeService) { }

  ngOnInit(){
    // Initialize default paging parameters
    this.makes = [];
    this.currentPage = 1;
    this.pageSize = 5;

    // These parameters are unknown until the first
    // data is retrieved from service
    this.numberOfPages = undefined;

    this.showModal = false;
    this.sortString = (this.sort.nameAsc ? '+' : '-') + 'name'
    this.getPage();
  }

  getPage(): void{
    this.service
      .getPage(this.currentPage, this.pageSize)
      .then(pagedData => {
        console.log("got here")
        console.log(pagedData)
        this.makes = pagedData.Data;
        this.numberOfPages = pagedData.PageCount;
      })
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
    console.log("created");
    this.makes = this.makes.concat(created);
    this.getPage();
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
    this.getPage();
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

  // Pagination triggering events
  onNext(){
  console.log(this.currentPage)
    this.currentPage = this.currentPage + 1;
    console.log("new current page - " + this.currentPage)
    this.getPage();
  }

  onPrevious(){
    this.currentPage = this.currentPage - 1;
    if(this.currentPage <= 0){
      console.warn("Attempted to access non-1 page.")
      this.currentPage = 1;
    }

    console.log("new current page - " + this.currentPage)
    this.getPage();
  }
}
