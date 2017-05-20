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
app.use(cors());
app.use(helmet());
app.use(compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Host the public folder

// app.use('/', feathers.static(app.get('public')));

// Set up Plugins and providers
app.configure(hooks());
app.configure(rest());
app.configure(socketio());
app.configure(auth);

// Set up our services (see `services/index.ts`)
app.configure(services);
// Configure middleware (see `middleware/index.ts`) - always has to be last
app.configure(middleware);
app.hooks(appHooks);
