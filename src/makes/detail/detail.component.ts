import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  OnInit,
  ElementRef} from '@angular/core';
import { Make } from '../data/make.model'
import { MakeService } from '../data/makes.service'

// Class that represents a modal window
// Used to update or create new Make object
@Component({
  selector: 'make-details',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {

  // Objects' details that are being shown here.
  // If the passed in value is "null" or "undefined" -> Create mode
  // Otherwise -> Update mode
  @Input() data: Make;

  // UI value for the action button
  // Changes value depending on the state of this component
  // State can be "Create" or "Update"
  actionString: string;
  isCreate: boolean;
  isUpdate: boolean;
  invalidName: boolean = false;
  invalidAbrv: boolean = false;

  @Output() onCancel = new EventEmitter<any>();
  @Output() onAction = new EventEmitter<Make>();
  @ViewChild('name') nameElement: ElementRef;
  @ViewChild('abrv') abrvElement: ElementRef;


  constructor(private service: MakeService) { }

  ngOnInit(){

    console.log(this.data);
    this.isCreate = this.data == null || this.data == undefined;
    this.isUpdate = !this.isCreate;
    this.actionString = this.isCreate ? "Create" : "Save";
    this.data = this.data == null ?  new Make("", "") : this.data;
  }

  // Performs the modal window action
  // It either issues a create or update
  action(){
    if(this.isCreate){
      console.log("Creating new Make object")
      // TODO perform validation
      // TODO construct the Make object from values
      let name = this.nameElement.nativeElement.value.trim();
      let abrv = this.abrvElement.nativeElement.value.trim();

      this.invalidName = name.length == 0;
      this.invalidAbrv = abrv.length == 0;

      if(this.invalidName || this.invalidAbrv){
        return;
      }
      let newMake = new Make(name, abrv)
      this.onAction.emit(newMake)
    }
    else if(this.isUpdate){
      this.onAction.emit(this.data);
    }
    else{
      console.error("Unsupported mode");
      this.onCancel.emit();
    }
  }

  // Dismisses this modal window
  cancel(){
    // TODO how to report to parent
    console.log("canceling")
    console.log(this.onCancel)
    this.onCancel.emit();
  }
}
