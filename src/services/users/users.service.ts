import * as feathers from 'feathers';
import { HooksObject, HookProps } from 'feathers-hooks';
const createService: (opts: object) => feathers.Service<any> = require('feathers-nedb');
import { createModel } from '../../models/users.model';
import { hooks } from './users.hooks';
import { filters } from './users.filters';

export function users(this: feathers.Application) {
  const app = this;
  const name = 'users';
  const opts = {
    name,
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  app.use('/users', createService(opts));
  const service = <feathers.Service<any> & { hooks(hooks: HooksObject): void, filter(fn: /*typeof filters*/ <T>(data: T, connection: any, hook: HookProps<T>) => T): void }> app.service(name);

  service.hooks(hooks);
  if (service.filter) {
    service.filter(filters);
  }
};
