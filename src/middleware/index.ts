import * as R from 'ramda';
import * as feathers from 'feathers';
import handler = require('feathers-errors/handler');
import notFound = require('feathers-errors/not-found');

export function middleware(this: feathers.Application) {
  const app = this;

	R.forEach(x => app.use(x))([
	  // these last
		notFound(),
		// logger(app),
		handler(),
	]);
};
