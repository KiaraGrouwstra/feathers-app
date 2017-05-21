import * as R from 'ramda';
import { HooksObject, HookProps, Hook } from 'feathers-hooks';
type Hooks = { [k: string]: (...pars: any[]) => Hook };
const commonHooks: Hooks = require('feathers-hooks-common');
const { unless, discard, populate, depopulate, getItems, replaceItems, iff, remove, removeQuery, pluck, pluckQuery, serialize } = commonHooks;
import { hooks as authHooks } from 'feathers-authentication';
const { authenticate, hashPassword, verifyToken, populateUser, restrictToAuthenticated } = authHooks;
const { restrictToOwner } = require('feathers-authentication-hooks');
const localHooks: Hooks = require('feathers-authentication-local').hooks;
const { softDelete, when, validateSchema, setCreatedAt, setUpdatedAt, setNow } = localHooks;
const sift = require('sift');
const { sifter } = require('feathers-hooks-common');
import * as Ajv from 'ajv';
// hashPassword,

const selectCountry = hook => sift({ 'address.country': hook.params.country });

// Trim strings
export const restrict = [
  authenticate('jwt'),
  restrictToOwner({
    idField: '_id',
    ownerField: '_id',
  }),
];

export const alterItems = <T>(fn: (item: T) => any) => (hook: HookParams<T>) => {
  const items = getItems(hook);
  let mapped = !Array.isArray(items) ? fn(items) : R.map(fn, items);
  replaceItems(hook, mapped);
}

function userSchema() {
  return {
   title: 'User Schema',
   $schema: 'http://json-schema.org/draft-04/schema#',
   type: 'object',
   required: [ 'email', 'password' ],
   additionalProperties: false,
   properties: {
     email: { type: 'string', maxLength: 100, minLength: 6 },
     password: { type: 'string', maxLength: 30, minLength: 8 },
   },
  };
}

export const hooks: HooksObject = {
  before: {
    all: [
      authenticate('jwt'),
      when(hook => hook.method !== 'find', softDelete()),
      // messages:
      verifyToken(),
      populateUser(),
      restrictToAuthenticated(),
    ],
    find: [
      // If a token was included, authenticate it with the `jwt` strategy.
      iff(
        hook => hook.params.token,
        authenticate('jwt')
      // No token was found, so limit the query to include `public: true`
      ).else(
        hook => Object.assign(hook.params.query, { public: true })
      ),
    ],
    get: [ ...restrict ],
    create: [
      // ...restrict, // not sensible for user
      validateSchema(userSchema(), Ajv),
      // validate(R.T),
      processUser(),
      hashPassword(),
      // setCreatedAt(),
      // setUpdatedAt(),
      setNow('createdAt', 'updatedAt'),
      lowerCase('email', 'username'),

      // setSlug('storeId'), // for nested service e.g. `app.use('/stores/:storeId/candies', ...);`, add `storeId` to `hook.params.query`
    ],
    update: [ ...restrict, processUser(), hashPassword(), setNow('updatedAt') ],
    patch: [ ...restrict, processUser(), hashPassword(), depopulate(), preventChanges('isAdmin'), setNow('updatedAt') ],
    remove: [ ...restrict ],
  },

  after: {
    all: [
      // when(
      //   (hook: HookProps<any>) => hook.params.provider,
      //   discard('password'),
      // ),
      // unless(
      //   (hook: HookProps<any>) => hook.method === 'find',
      //   remove('password'),
      // ),
      remove('password', 'salt'),
      // populate({ schema: { include: [{ service: 'roles', nameAs: 'roles', parentField: 'roleIds', childField: '_id' }] } }),
      // serialize({ only: [], exclude: [], computed: {}, child: {} }),
    ],
    find: [
      // sifter(selectCountry),
      // alterItems(R.identity),
    ],
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
