import * as feathers from 'feathers';
import * as authentication from 'feathers-authentication';
const jwt = require('feathers-authentication-jwt');
const local = require('feathers-authentication-local');
const oauth2 = require('feathers-authentication-oauth2');
import * as GoogleStrategy from 'passport-google-oauth20';
import * as FacebookStrategy from 'passport-facebook';
// import * as GithubStrategy from 'passport-github';
const GithubStrategy = require('passport-github'); 

export function auth(this: feathers.Application) {
  const app = this;
  const config = app.get('authentication');

  // Set up authentication with the secret
  app.configure(authentication(config));
  app.configure(jwt());
  app.configure(local(config.local));

  app.configure(oauth2(Object.assign({
    name: 'google',
    Strategy: GoogleStrategy,
  }, config.google)));

  app.configure(oauth2(Object.assign({
    name: 'facebook',
    Strategy: FacebookStrategy,
  }, config.facebook)));

  app.configure(oauth2(Object.assign({
    name: 'github',
    Strategy: GithubStrategy,
  }, config.github)));

  // The `authentication` service is used to create a JWT.
  // The before `create` hook registers strategies that can be used
  // to create a new valid JWT (e.g. local or oauth2)
  (<any> app.service('authentication'))['hooks']({
    before: {
      create: [
        authentication.hooks.authenticate(config.strategies),
      ],
      remove: [
        authentication.hooks.authenticate('jwt'),
      ]
    }
  });
};
