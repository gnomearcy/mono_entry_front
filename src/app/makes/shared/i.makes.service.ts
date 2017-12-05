import { InjectionToken } from '@angular/core';
import Make from './make.model'
import MakePageDto from './dto/make.page.dto'

export interface IMakeService {
  getPage: (pageNumber, pageSize) => Promise<MakePageDto>,
  deleteMake: (Make) => Promise<Make>,
  updateMake: (Make) => Promise<Make>,
  createMake: (Make) => Promise<Make>
}

// Interfaces are artifacts in Typescript and therefor cannot be injected.
// To inject an interface via constructor injection, following must be done:
// - create an InjectionToken with interface type as parameter type
//   (in this case, parameter type is IMakeService)
// - provide the thing to inject through Module's "providers" array like so:
//   {provide: <value>, useClass: <name_of_class_that_implements_interface>}
//   NOTE: <value> is name of this variable (in this case, I_MAKE_SERVICE)
// - inject it in the constructor via @Inject(<value>)
export const I_MAKE_SERVICE = new InjectionToken<IMakeService>('makes.service.interface');
