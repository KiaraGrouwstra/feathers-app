import * as feathers from 'feathers';
import handler = require('feathers-errors/handler');
import notFound = require('feathers-errors/not-found');

export function middleware(this: feathers.Application) {
  const app = this;


  // these 2 last
  app.use(<any> notFound());
  app.use(<any> handler());
};
