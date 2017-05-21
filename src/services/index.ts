import * as R from 'ramda';
import * as feathers from 'feathers';
import { makeServices } from './tools';

import { users } from './users';
// import { media } from './media';
const services = makeServices({ users }); // , media

export function services(this: feathers.Application) {
  const app = this;
  R.forEach(app.configure)(services);
};
