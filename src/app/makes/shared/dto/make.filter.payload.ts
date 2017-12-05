export default class MakeFilterPayload
{
  name: string;
  abreviation: string;

  constructor(name: string, abreviation: string){
    this.name = name;
    this.abreviation = abreviation;
  }
}
