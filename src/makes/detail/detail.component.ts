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
  oldState: Make;

  @Output() onCancel = new EventEmitter<any>();
  @Output() onAction = new EventEmitter<Make>();
  @ViewChild('name') nameElement: ElementRef;
  @ViewChild('abrv') abrvElement: ElementRef;

  constructor(private service: MakeService) { }

  ngOnInit(){
    this.isCreate = this.data == null || this.data == undefined;
    this.oldState = this.isCreate ? null : Object.assign({}, this.data);
    this.isUpdate = !this.isCreate;
    this.actionString = this.isCreate ? "Create" : "Save";
    this.data = this.data == null ? new Make("", "") : this.data;
  }

  // Performs the modal window action
  // It can end in one of the following scenarios:
  action() {
      let name = this.nameElement.nativeElement.value.trim();
      let abrv = this.abrvElement.nativeElement.value.trim();

      this.invalidName = name.length == 0;
      this.invalidAbrv = abrv.length == 0;

      if(this.invalidName || this.invalidAbrv){
        return;
      }
      if(this.isCreate){
        // Issue service call
        let newMake = new Make(name, abrv)
        this.onAction.emit(newMake)
      }
      else{

        // In update mode, two-way binding is in place
        // Make a deep copy of the data object in case the API call results
        // in failure. In that case, the original data reference is pointed
        // to this state and changes are reverted back.
        let state = Object.assign({}, this.data);

        // TODO Change to real API call
        // Issue api call
        let test_api = true;
        if(test_api){
          // Success
          this.onCancel.emit();
        }
        else{
          // Failure
          this.data = state;
          this.onCancel.emit();
        }
      }
  }

  cancel(){
    // Let the parent know that this component wants to be dismissed
    try{
      this.data.name = this.oldState.name;
      this.data.abbreviation = this.oldState.abbreviation;
    }
    catch(ignore) { }
    this.onCancel.emit();
  }
}
