import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit} from '@angular/core';
import Make from '../shared/make.model'
import { IMakeService, I_MAKE_SERVICE } from '../shared/i.makes.service'

// Class that represents a modal window
// Used to update or create new Make object
@Component({
  selector: 'table-nav',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class TableNavigation implements OnInit{

  previous: string;
  next: string;

  @Input() enablePrevious: boolean;
  @Input() enableNext: boolean;
  @Output() reportPreviousClick = new EventEmitter<any>()
  @Output() reportNextClick = new EventEmitter<any>()

  ngOnInit(){
    this.previous = "Previous"
    this.next = "Next"
  }

  clickNext(){
    this.reportNextClick.emit();
  }

  clickPrevious(){
    this.reportPreviousClick.emit();
  }
}
