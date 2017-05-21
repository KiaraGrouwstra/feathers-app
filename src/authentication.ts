import * as R from 'ramda';
import * as feathers from 'feathers';
import * as authentication from 'feathers-authentication';
const jwt = require('feathers-authentication-jwt');
const local = require('feathers-authentication-local');
const oauth2 = require('feathers-authentication-oauth2');
import * as GoogleStrategy from 'passport-google-oauth20';
import * as FacebookStrategy from 'passport-facebook';
// import * as GithubStrategy from 'passport-github';
const GithubStrategy = require('passport-github');

const oauths = {
  google: {
    Strategy: GoogleStrategy,
  },
  facebook: {
    Strategy: FacebookStrategy,
    // clientID: '<your client id>',
    // clientSecret: '<your client secret>',
    // scope: ['public_profile', 'email'],
  },
  github: {
    Strategy: GithubStrategy,
  },
};

export function auth(this: feathers.Application) {
  const app = this;
  const config = app.get('authentication');
  const forceAuth = authentication.hooks.authenticate(config.strategies);

  R.forEach(x => app.configure(x))([
    // Set up authentication with the secret
    authentication(config),
    jwt(),
    local(config.local),
    ...R.pipe(R.mapObjIndexed((props: object, name: string) => oauth2(Object.assign({ name }, props, config[name])), R.values)(oauths),
  ]);

  // The `authentication` service is used to create a JWT.
  // The before `create` hook registers strategies that can be used
  // to create a new valid JWT (e.g. local or oauth2)
  (<any> app.service('authentication'))['hooks']({
    before: {
      create: [forceAuth],
      remove: [forceAuth],
    },
  });
};
