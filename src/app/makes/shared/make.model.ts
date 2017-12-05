import uuid from '../../../utils/uuid'

export default class Make{
  id: string;
  name: string;
  abbreviation: string;

  constructor(name: string, abbreviation: string){
    this.id = uuid();
    this.name = name;
    this.abbreviation = abbreviation;
  }
}
