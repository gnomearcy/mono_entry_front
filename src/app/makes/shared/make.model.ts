import uuid from '../../../utils/uuid'

export class Make{
  id: string;
  name: string;
  abbreviation: string;

  constructor(name: string, abbreviation: string){
    this.id = uuid();
    this.name = name;
    this.abbreviation = abbreviation;
  }

  constructor(make: Make){
    this.id = make.id;
    this.name = make.name;
    this.abbreviation = make.abbreviation;
  }
}
