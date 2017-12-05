import Make from '../make.model'

export default class MakePageDto {
  Data: Make[];
  PageNumber: number;
  PageSize: number;
  PageCount: number;

  constructor(data: Make[], pageNumber: number, pageCount: number, pageSize: number){

    this.Data = data;
    this.PageNumber = pageNumber;
    this.PageCount = pageCount;
    this.PageSize = pageSize;
  }
}
