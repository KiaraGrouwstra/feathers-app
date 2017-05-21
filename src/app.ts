import * as R from 'ramda';
import * as path from 'path';
import * as compress from 'compression';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as bodyParser from 'body-parser';
import * as feathers from 'feathers';
const configuration: (path: string) => () => void = require('feathers-configuration');
import * as hooks from 'feathers-hooks';
import { HooksObject } from 'feathers-hooks';
import * as rest from 'feathers-rest';
import * as socketio from 'feathers-socketio';

import { middleware } from './middleware';
import { services } from './services';
import { appHooks } from './app.hooks';
import { auth } from './authentication';

export const app = <feathers.Application & { hooks: (hooks: HooksObject) => void }> feathers();

// Load app configuration
app.configure(configuration(path.join(__dirname, '..')));
// Enable CORS, security, compression and body parsing
app.options('*', cors());

R.forEach(x => app.use(x))([
	cors(),
	helmet(),
	compress(),
	bodyParser.json(),
	bodyParser.urlencoded({ extended: true }),
]);

// Host the public folder
// app.use('/', feathers.static(app.get('public')));

R.forEach(x => app.configure(x))([
	// plugins and providers
	hooks(),
	rest(),
	socketio(),
	auth,

	services,
	middleware, // last
]);

app.hooks(appHooks);

// querying: $limit, $skip, $sort, $select, $in, $nin, $lt, $lte, $gt, $gte, $ne, $or
// { total: 5, limit: 25, skip: 2, data: [] }
