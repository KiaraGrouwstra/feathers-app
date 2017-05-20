import { HooksObject, HookProps, Hook } from 'feathers-hooks';
type Hooks = { [k: string]: (...pars: any[]) => Hook };
const commonHooks: Hooks = require('feathers-hooks-common');
import { hooks as authHooks } from 'feathers-authentication';
const { authenticate } = authHooks;
const { restrictToOwner } = require('feathers-authentication-hooks');
const localHooks: Hooks = require('feathers-authentication-local').hooks;
const { hashPassword } = localHooks;

export const restrict = [
  authenticate('jwt'),
  restrictToOwner({
    idField: '_id',
    ownerField: '_id',
  }),
];

export const hooks: HooksObject = {
  before: {
    all: [],
    find: [ authenticate('jwt') ],
    get: [ ...restrict ],
    create: [ hashPassword() ],
    update: [ ...restrict, hashPassword() ],
    patch: [ ...restrict, hashPassword() ],
    remove: [ ...restrict ],
  },

  after: {
    all: [
      commonHooks.when(
        (hook: HookProps<any>) => hook.params.provider,
        commonHooks.discard('password'),
      ),
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
