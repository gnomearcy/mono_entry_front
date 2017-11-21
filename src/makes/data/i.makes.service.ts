import { InjectionToken } from '@angular/core';
import { Make } from './make.model'

export interface IMakeService {
  getAll: () => Promise<Make[]>,
  deleteMake: (Make) => Promise<Make>,
  updateMake: (Make) => Promise<Make>,
  createMake: (Make) => Promise<Make>
}
export const I_MAKE_SERVICE = new InjectionToken<IMakeService>('makes.service.interface');
