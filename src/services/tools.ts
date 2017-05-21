import * as feathers from 'feathers';
import { HooksObject, HookProps } from 'feathers-hooks';
const createService: (opts: object) => feathers.Service<any> = require('feathers-nedb');
type FilterFn = <T>(data: T, connection: any, hook: HookProps<T>) => T): void;

export function makeServices(obj: object) {
  return R.mapObjIndexed((opts: {
    factory: (app: feathers.Application) => /*Model*/any,
    paginate?: obj /*feathers.Pagination?*/,
    hooks?: HooksObject,
    filters?: FilterFn,
    middlewares?: any[],
  }, name: string) => (app: feathers.Application) => {
    let { factory, paginate = undefined, hooks = {}, filters = undefined, middlewares = [] } = opts;
    const opts = {
      name,
      Model: factory(app),
      paginate: paginate || app.get('paginate'), // { default: 5, max: 25 }
    };

    app.use(`/${name}`, createService(opts), ...middlewares);
    const service = <feathers.Service<any> & { hooks(hooks: HooksObject): void, filter(fn: FilterFn }> app.service(name);
    service.hooks(hooks);
    if (service.filter && filters) {
      service.filter(filters);
    }
  })(obj);
};
