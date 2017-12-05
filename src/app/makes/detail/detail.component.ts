import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  OnInit,
  Inject,
  ElementRef} from '@angular/core';
import Make from '../shared/make.model'
import { IMakeService, I_MAKE_SERVICE } from '../shared/i.makes.service'

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
  oldState: Make;

  @Output() reportCancel = new EventEmitter<any>();
  @Output() reportCreate = new EventEmitter<Make>();
  @Output() reportDelete = new EventEmitter<any>();
  @Output() reportUpdate = new EventEmitter<any>();
  @Output() reportError = new EventEmitter<any>();
  @ViewChild('name') nameElement: ElementRef;
  @ViewChild('abrv') abrvElement: ElementRef;

  constructor(@Inject(I_MAKE_SERVICE) private service: IMakeService) { }

  ngOnInit(){
    this.isCreate = this.data == null || this.data == undefined;
    this.oldState = this.isCreate ? null : Object.assign({}, this.data);
    this.isUpdate = !this.isCreate;
    this.actionString = this.isCreate ? "Create" : "Save";
    this.data = this.data == null ? new Make("", "") : this.data;
  }

  /*
    Form validation method.
    Returns a valid Make object to update
  */
  private validate(): Make{
    let name = this.nameElement.nativeElement.value.trim();
    let abrv = this.abrvElement.nativeElement.value.trim();

    this.invalidName = name.length == 0;
    this.invalidAbrv = abrv.length == 0;

    if(this.invalidName || this.invalidAbrv){
      return null;
    }
    return new Make(name, abrv);
  }

  clickCreate(){
    let newObject = this.validate();
    if(newObject == null){
      return;
    }
    this.service
        .createMake(newObject)
        .then(new_obj => this.reportCreate.emit(new_obj))
        .catch(error => this.reportError.emit("error while creating new object"))
  }

  clickUpdate(){
    let validState = this.validate();
    if(validState == null) { return; }

    this.service
        .updateMake(this.data)
        .then(updated => this.reportUpdate.emit(updated))
        .catch(error => {
          this.data = this.oldState;
          this.reportError.emit("Error while updating item");
        })
  }

  clickCancel(){
    if(this.isUpdate){
      try{
        // In update mode, the @Input "data" objects' properties are
        // two-way bound to parents' data collection.
        // In case the user modifies the properties and cancels the operation
        // the properties have to be updated from the "data" objects' initial
        // state to revert the changes back in the parent.
        // See ngOnInit for how the old state is computed.
        this.data.name = this.oldState.name;
        this.data.abbreviation = this.oldState.abbreviation;
      }
      catch(ignored){}
    }
    this.reportCancel.emit();
  }

  clickDelete(){
    this.service
      .deleteMake(this.data)
      .then((deleted) => this.reportDelete.emit(deleted))
      .catch((error) => {this.reportError.emit("error while deleting an object")})
    }
  }
